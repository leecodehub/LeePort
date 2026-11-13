import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { certificates } from '../data/portfolio'
import { ArrowUpRight, Close } from '../components/Icons'

type Visibility = 'public' | 'friends' | 'private'
type SlotBox = { x: number; y: number; w: number; h: number }
type BoardState = {
  visibility: Visibility
  tags: string[]
  slots: (string | null)[]
  layout: SlotBox[]
}

const STORAGE = 'sbl-certificate-board'
const SLOT_COUNT = 12

const SLOT_LAYOUT: SlotBox[] = [
  { x: 4, y: 17, w: 29, h: 20 },
  { x: 36, y: 14, w: 20, h: 16 },
  { x: 60, y: 17, w: 34, h: 22 },
  { x: 7, y: 41, w: 17, h: 14 },
  { x: 28, y: 36, w: 20, h: 18 },
  { x: 52, y: 43, w: 15, h: 12 },
  { x: 71, y: 43, w: 22, h: 17 },
  { x: 4, y: 61, w: 22, h: 16 },
  { x: 30, y: 59, w: 18, h: 15 },
  { x: 53, y: 63, w: 25, h: 19 },
  { x: 82, y: 64, w: 14, h: 13 },
  { x: 35, y: 79, w: 23, h: 16 },
]

const FAN_CARDS = [
  { rank: 'A', suit: '♠', color: '#9fe0c1' },
  { rank: 'K', suit: '♥', color: '#f3e7d1' },
  { rank: 'Q', suit: '♦', color: '#9ed7ea' },
  { rank: 'J', suit: '♣', color: '#eda8bf' },
  { rank: '10', suit: '♠', color: '#eacb93' },
  { rank: '9', suit: '♥', color: '#bda8ea' },
  { rank: '8', suit: '♦', color: '#9fe0c1' },
  { rank: '7', suit: '♣', color: '#f3e7d1' },
  { rank: 'A', suit: '♠', color: '#9ed7ea' },
  { rank: 'K', suit: '♥', color: '#eda8bf' },
  { rank: 'Q', suit: '♦', color: '#eacb93' },
  { rank: 'J', suit: '♣', color: '#bda8ea' },
]

function isSlotBox(value: unknown): value is SlotBox {
  if (!value || typeof value !== 'object') return false
  const box = value as SlotBox
  return [box.x, box.y, box.w, box.h].every((number) => typeof number === 'number' && Number.isFinite(number))
}

function isLayout(value: unknown): value is SlotBox[] {
  return Array.isArray(value) && value.length === SLOT_COUNT && value.every(isSlotBox)
}

function shuffledLayout(): SlotBox[] {
  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
  const round = (value: number) => Math.round(value * 10) / 10
  const boxes = SLOT_LAYOUT.map((slot) => {
    const w = clamp(slot.w + (Math.random() * 6 - 3), 13, 34)
    const h = clamp(slot.h + (Math.random() * 5 - 2.5), 11, 23)
    return {
      x: round(clamp(slot.x + (Math.random() * 6 - 3), 3, 98 - w)),
      y: round(clamp(slot.y + (Math.random() * 5 - 2.5), 11, 84 - h)),
      w: round(w),
      h: round(h),
    }
  })
  for (let index = boxes.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    ;[boxes[index], boxes[target]] = [boxes[target], boxes[index]]
  }
  return boxes
}

function loadBoard(): BoardState {
  try {
    const raw = window.localStorage.getItem(STORAGE)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<BoardState>
      if (
        parsed &&
        (parsed.visibility === 'public' || parsed.visibility === 'friends' || parsed.visibility === 'private') &&
        Array.isArray(parsed.tags) &&
        Array.isArray(parsed.slots) &&
        parsed.slots.length === SLOT_COUNT
      ) {
        return {
          visibility: parsed.visibility,
          tags: parsed.tags,
          slots: parsed.slots,
          layout: isLayout(parsed.layout) ? parsed.layout : SLOT_LAYOUT,
        }
      }
    }
  } catch {
    // Start with a clean local board.
  }
  return { visibility: 'public', tags: [], slots: Array(SLOT_COUNT).fill(null), layout: SLOT_LAYOUT }
}

function CertificateFan({ onBack }: { onBack: () => void }) {
  const [rotation, setRotation] = useState(0)
  const stageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const dragStart = useRef<number | null>(null)
  const lastPointer = useRef(0)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      setRotation((current) => current + event.deltaY * 0.1)
    }
    stage.addEventListener('wheel', onWheel, { passive: false })
    return () => stage.removeEventListener('wheel', onWheel)
  }, [])

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientY
    lastPointer.current = event.clientY
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return
    const delta = event.clientY - lastPointer.current
    lastPointer.current = event.clientY
    setRotation((current) => current + delta * 0.28)
  }

  const endDrag = () => {
    dragStart.current = null
  }

  return (
    <main className="fan-scene">
      <button type="button" className="fan-back" onClick={onBack}>
        <span aria-hidden="true">←</span>
        Display board
      </button>
      <div className="fan-scene__head">
        <p className="experience-eyebrow">Certificate archive</p>
        <h1 ref={headingRef} tabIndex={-1}>Certificate fan</h1>
        <p>Scroll, swipe, or use ↑ ↓ to spin the fan.</p>
      </div>

      <div
        className="fan-stage"
        ref={stageRef}
        tabIndex={0}
        role="group"
        aria-label="Certificate fan. Scroll or swipe to spin."
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault()
            setRotation((current) => current + 12)
          }
          if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault()
            setRotation((current) => current - 12)
          }
        }}
      >
        <div className="fan-stage__table" aria-hidden="true" />
        <div className="fan-spin" style={{ transform: `rotate(${rotation}deg)` }} aria-hidden="true">
          {FAN_CARDS.map((card, index) => (
            <div
              className="fan-card"
              key={index}
              style={
                {
                  '--angle': `${-39.6 + index * 7.2}deg`,
                  '--accent': card.color,
                  zIndex: index + 1,
                } as CSSProperties
              }
            >
              <span className="fan-card__letter">{card.rank}</span>
              <span className="fan-card__suit">{card.suit}</span>
              <span className="fan-card__pip" aria-hidden="true">{card.suit}</span>
            </div>
          ))}
        </div>
        <span className="fan-pivot" aria-hidden="true" />
      </div>

      <p className="fan-scene__note">
        Certificate details are still placeholders. The fan is a visual archive until real
        certificates and images are added.
      </p>
    </main>
  )
}

export function CertificateBoard({ onBack }: { onBack: () => void }) {
  const [board, setBoard] = useState<BoardState>(loadBoard)
  const [showFan, setShowFan] = useState(false)
  const [pickerSlot, setPickerSlot] = useState<number | null>(null)
  const [tagsOpen, setTagsOpen] = useState(false)
  const [tagDraft, setTagDraft] = useState(board.tags.join(', '))
  const [editing, setEditing] = useState(false)
  const pickerRef = useRef<HTMLDialogElement>(null)
  const boardHeadingRef = useRef<HTMLHeadingElement>(null)
  const filled = board.slots.filter(Boolean).length
  const firstEmpty = board.slots.findIndex((slot) => slot === null)

  useEffect(() => {
    if (showFan) return
    boardHeadingRef.current?.focus({ preventScroll: true })
  }, [showFan])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(board))
    } catch {
      // The board still works for this session.
    }
  }, [board])

  useEffect(() => {
    const dialog = pickerRef.current
    if (!dialog) return
    if (pickerSlot !== null && !dialog.open) dialog.showModal()
    if (pickerSlot === null && dialog.open) dialog.close()
  }, [pickerSlot])

  if (showFan) return <CertificateFan onBack={() => setShowFan(false)} />

  const chooseCertificate = (certificateId: string | null) => {
    if (pickerSlot === null) return
    setBoard((current) => {
      const slots = [...current.slots]
      slots[pickerSlot] = certificateId
      return { ...current, slots }
    })
    setPickerSlot(null)
  }

  const saveTags = () => {
    const tags = tagDraft
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 6)
    setBoard((current) => ({ ...current, tags }))
    setTagsOpen(false)
  }

  const shuffleSlots = () => setBoard((current) => ({ ...current, layout: shuffledLayout() }))
  const resetSlots = () => setBoard((current) => ({ ...current, layout: SLOT_LAYOUT }))

  return (
    <main className="cert-scene">
      <h1 ref={boardHeadingRef} tabIndex={-1} className="sr-only">Certificate display board</h1>
      <div className={`cert-board-shell ${editing ? 'is-editing' : ''}`}>
        <div className="cert-board-top">
          <div className="cert-board-top__left">
            <button type="button" className="cert-back" onClick={onBack} aria-label="Back to pack shelf">
              <span aria-hidden="true">←</span>
            </button>
            <label className="cert-visibility">
              <span className="cert-visibility__globe" aria-hidden="true">
                ◌
              </span>
              <select
                value={board.visibility}
                onChange={(event) =>
                  setBoard((current) => ({
                    ...current,
                    visibility: event.target.value as Visibility,
                  }))
                }
                aria-label="Board visibility"
                aria-describedby="cert-board-local-note"
              >
                <option value="public">Public</option>
                <option value="friends">Friends only</option>
                <option value="private">Private</option>
              </select>
            </label>
            <button
              type="button"
              className="cert-tags"
              aria-expanded={tagsOpen}
              onClick={() => {
                setTagsOpen((open) => !open)
                setEditing(false)
              }}
            >
              {board.tags.length ? 'Tags set' : 'Add tags'}
            </button>
          </div>

          <div className="cert-board-top__right">
            <span className="cert-count">
              <span aria-hidden="true">▤</span>
              {filled} / {SLOT_COUNT}
            </span>
            <button
              type="button"
              className="cert-top-button"
              onClick={() => {
                if (firstEmpty >= 0) setPickerSlot(firstEmpty)
              }}
              disabled={firstEmpty < 0}
              aria-label="Fill the first empty slot"
            >
              <span aria-hidden="true">+</span>
            </button>
            <button
              type="button"
              className={`cert-top-button ${editing ? 'is-active' : ''}`}
              onClick={() => {
                setEditing((value) => !value)
                setTagsOpen(false)
              }}
              aria-pressed={editing}
              aria-label="Toggle slot arrangement"
            >
              <span aria-hidden="true">✎</span>
            </button>
          </div>
        </div>

        <p className="cert-local-note" id="cert-board-local-note">
          Local board · not shared · visibility is a label
        </p>

        {tagsOpen ? (
          <div className="cert-tags-panel">
            <label>
              Tags
              <input
                value={tagDraft}
                onChange={(event) => setTagDraft(event.target.value)}
                placeholder="student, frontend, 2026"
              />
            </label>
            <button type="button" onClick={saveTags}>Save tags</button>
          </div>
        ) : null}

        {editing ? (
          <div className="cert-edit-panel" role="group" aria-label="Arrange certificate slots">
            <p>Arrange slots</p>
            <div className="cert-edit-panel__actions">
              <button type="button" onClick={shuffleSlots}>Shuffle</button>
              <button type="button" onClick={resetSlots}>Reset</button>
              <button type="button" onClick={() => setEditing(false)}>Done</button>
            </div>
          </div>
        ) : null}

        <div className="cert-board-canvas">
          {board.layout.map((slot, index) => {
            const certificateId = board.slots[index]
            const certificate = certificates.find((item) => item.id === certificateId)
            return (
              <button
                key={index}
                type="button"
                className={`cert-slot ${certificate ? 'is-filled' : ''} ${editing ? 'is-editable' : ''}`}
                style={{
                  left: `${slot.x}%`,
                  top: `${slot.y}%`,
                  width: `${slot.w}%`,
                  height: `${slot.h}%`,
                }}
                onClick={() => setPickerSlot(index)}
                aria-label={
                  certificate
                    ? undefined
                    : `Empty certificate slot ${index + 1}. Add a certificate`
                }
              >
                {certificate ? (
                  <>
                    <span className="sr-only">Slot {index + 1}.</span>{' '}
                    <span className="cert-slot__filled-card">
                      <span className="cert-slot__issuer">{certificate.issuer}</span>{' '}
                      <span className="cert-slot__seal" aria-hidden="true">
                        <span />
                      </span>{' '}
                      <span className="cert-slot__title">Title pending</span>{' '}
                      <span className="cert-slot__status">Details pending</span>
                    </span>{' '}
                    <span className="sr-only">Replace or remove this certificate.</span>
                  </>
                ) : (
                  <span className="cert-slot__plus" aria-hidden="true">+</span>
                )}
              </button>
            )
          })}
        </div>

        <div className="cert-board-bottom">
          <button type="button" className="cert-fan-button" onClick={() => setShowFan(true)}>
            View card fan
            <ArrowUpRight />
          </button>
          <span>{board.tags.length ? board.tags.join(' · ') : 'No tags yet'}</span>
        </div>
      </div>

      <dialog
        ref={pickerRef}
        className="cert-picker"
        aria-labelledby="cert-picker-title"
        onClose={() => setPickerSlot(null)}
        onClick={(event) => {
          if (event.target === pickerRef.current) setPickerSlot(null)
        }}
      >
        <div className="cert-picker__panel">
          <div className="cert-picker__head">
            <div>
              <p className="experience-eyebrow">Certificate slot</p>
              <h2 id="cert-picker-title">Choose a card</h2>
            </div>
            <button type="button" className="scene-icon-button" onClick={() => setPickerSlot(null)} aria-label="Close certificate picker">
              <Close />
            </button>
          </div>
          <div className="cert-picker__options">
            {certificates.map((certificate) => (
              <button
                type="button"
                key={certificate.id}
                className="cert-picker__option"
                onClick={() => chooseCertificate(certificate.id)}
              >
                <span className="cert-picker__seal" aria-hidden="true" />
                <span>
                  <strong>{certificate.issuer}</strong>
                  <small>Title pending</small>
                </span>
              </button>
            ))}
          </div>
          <p className="cert-picker__note">
            These are the two labelled certificate placeholders. Real certificate cards and
            images can be added later.
          </p>
          {pickerSlot !== null && board.slots[pickerSlot] ? (
            <button type="button" className="experience-button experience-button--quiet" onClick={() => chooseCertificate(null)}>
              Remove from this slot
            </button>
          ) : null}
        </div>
      </dialog>
    </main>
  )
}
