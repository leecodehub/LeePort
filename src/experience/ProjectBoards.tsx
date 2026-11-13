import { useEffect, useRef, useState } from 'react'
import { Close } from '../components/Icons'

type SceneId = 'atelier' | 'grove' | 'dusk'
type CaseId = 'silver' | 'noir' | 'frost'
type CardId = 'reserved-01' | 'reserved-02' | 'reserved-03' | 'reserved-04' | 'reserved-05' | 'reserved-06'

type Board = {
  id: string
  scene: SceneId
  caseStyle: CaseId
  card: CardId
}

const SCENES: { id: SceneId; label: string }[] = [
  { id: 'atelier', label: 'Atelier' },
  { id: 'grove', label: 'Green room' },
  { id: 'dusk', label: 'Dusk' },
]

const CASES: { id: CaseId; label: string }[] = [
  { id: 'silver', label: 'Silver' },
  { id: 'noir', label: 'Noir' },
  { id: 'frost', label: 'Frost' },
]

const RESERVED_CARDS: { id: CardId; label: string }[] = [
  { id: 'reserved-01', label: 'Reserved 01' },
  { id: 'reserved-02', label: 'Reserved 02' },
  { id: 'reserved-03', label: 'Reserved 03' },
  { id: 'reserved-04', label: 'Reserved 04' },
  { id: 'reserved-05', label: 'Reserved 05' },
  { id: 'reserved-06', label: 'Reserved 06' },
]

const STORAGE = 'sbl-project-displays'
const BOARD_ID_BASE = Math.random().toString(36).slice(2, 8)

const SEED: Board[] = [
  { id: 'board-seed-1', scene: 'atelier', caseStyle: 'silver', card: 'reserved-01' },
  { id: 'board-seed-2', scene: 'grove', caseStyle: 'noir', card: 'reserved-02' },
]

function loadBoards(): Board[] {
  try {
    const raw = window.localStorage.getItem(STORAGE)
    if (!raw) return SEED
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : SEED
  } catch {
    return SEED
  }
}

function CardArt({ card }: { card: CardId }) {
  const number = Number(card.slice(-2))
  return (
    <div className={`reserved-card reserved-card--${number}`}>
      <svg viewBox="0 0 180 250" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={`rc-sky-${number}`} x1="90" y1="0" x2="90" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="var(--rc-a)" />
            <stop offset=".55" stopColor="var(--rc-b)" />
            <stop offset="1" stopColor="var(--rc-c)" />
          </linearGradient>
        </defs>
        <rect width="180" height="250" fill={`url(#rc-sky-${number})`} />
        <circle cx="126" cy="48" r="18" fill="#f6e7b8" opacity=".9" />
        <circle cx="134" cy="41" r="17" fill="var(--rc-a)" />
        <path d="M-10 170h30v-12h24v-12h22v12h20v12h16v-18h18v-10h20v10h16v18h40v80H-10Z" fill="#0b1b25" opacity=".55" />
        <path d="M-10 186h36v-8h26v-6h28v6h20v8h38v-6h22v6h30v64H-10Z" fill="#09202b" opacity=".72" />
        <path d="M88 106 66 150l22 54 22-54Z" fill="#fff0d1" fillOpacity=".82" />
        <path d="M88 106v98M66 150h44" stroke="#fff" strokeOpacity=".3" />
        <g stroke="#e7f7f1" strokeOpacity=".4">
          <path d="M-10 212c42-26 72-6 106-22s56-14 96 6" />
          <path d="M-10 222c42-26 72-6 106-22s56-14 96 6" strokeOpacity=".18" />
        </g>
        <rect x="8" y="8" width="164" height="234" rx="5" stroke="#f7eddb" strokeOpacity=".35" />
      </svg>
      <span className="reserved-card__seal">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M16 2 19 13 30 16 19 19 16 30 13 19 2 16 13 13Z" fill="#fff1cf" fillOpacity=".9" />
          <circle cx="16" cy="16" r="3.5" fill="var(--rc-b)" />
        </svg>
      </span>
      <span className="reserved-card__label">Reserved</span>
    </div>
  )
}

function DisplayCase({ board }: { board: Board }) {
  return (
    <div className={`display-case display-case--${board.caseStyle}`}>
      <span className="display-case__screw display-case__screw--tl" aria-hidden="true" />
      <span className="display-case__screw display-case__screw--tr" aria-hidden="true" />
      <span className="display-case__screw display-case__screw--bl" aria-hidden="true" />
      <span className="display-case__screw display-case__screw--br" aria-hidden="true" />
      <span className="display-case__glass" aria-hidden="true" />
      <CardArt card={board.card} />
    </div>
  )
}

function BoardTile({ board, onOpen, onEdit, onMove, onDelete, index, total }: {
  board: Board
  onOpen: () => void
  onEdit: () => void
  onMove: (direction: -1 | 1) => void
  onDelete: () => void
  index: number
  total: number
}) {
  return (
    <article className={`board-tile board-scene--${board.scene}`}>
      <button className="board-tile__open" type="button" onClick={onOpen} aria-label={`View display board ${index + 1}. Reserved project card.`}>
        <DisplayCase board={board} />
      </button>
      <div className="board-tile__meta">
        <span>Display {String(index + 1).padStart(2, '0')}</span>
        <span className="board-tile__actions">
          <button type="button" onClick={() => onMove(-1)} disabled={index === 0} aria-label="Move display left"><span aria-hidden="true">←</span></button>
          <button type="button" onClick={() => onMove(1)} disabled={index === total - 1} aria-label="Move display right"><span aria-hidden="true">→</span></button>
          <button type="button" onClick={onEdit} aria-label={`Edit display board ${index + 1}`}>Edit</button>
          <button type="button" onClick={onDelete} aria-label={`Delete display board ${index + 1}`}><span aria-hidden="true">×</span></button>
        </span>
      </div>
    </article>
  )
}

export function ProjectBoards({ onBack }: { onBack: () => void }) {
  const [boards, setBoards] = useState<Board[]>(loadBoards)
  const [editing, setEditing] = useState<Board | null>(null)
  const [viewing, setViewing] = useState<string | null>(null)
  const [draft, setDraft] = useState<Board | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const idSeed = useRef(0)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [viewing])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(boards))
    } catch {
      // Local-only prototype: persist when the browser allows it.
    }
  }, [boards])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (editing && !dialog.open) dialog.showModal()
    if (!editing && dialog.open) dialog.close()
  }, [editing])

  const openEditor = (board?: Board) => {
    const next = board ?? {
      id: `board-${BOARD_ID_BASE}-${++idSeed.current}`,
      scene: 'atelier',
      caseStyle: 'silver',
      card: 'reserved-01',
    }
    setDraft(next)
    setEditing(next)
  }

  const saveBoard = () => {
    if (!draft) return
    setBoards((current) => {
      const exists = current.some((board) => board.id === draft.id)
      return exists ? current.map((board) => (board.id === draft.id ? draft : board)) : [...current, draft]
    })
    setEditing(null)
    setDraft(null)
  }

  const deleteBoard = (id: string) => {
    if (!window.confirm('Delete this display board?')) return
    setBoards((current) => current.filter((board) => board.id !== id))
    setViewing(null)
    setEditing(null)
  }

  const moveBoard = (id: string, direction: -1 | 1) => {
    setBoards((current) => {
      const index = current.findIndex((board) => board.id === id)
      const target = index + direction
      if (index < 0 || target < 0 || target >= current.length) return current
      const next = [...current]
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }

  const activeBoard = boards.find((board) => board.id === viewing)
  const activeIndex = activeBoard ? boards.findIndex((board) => board.id === activeBoard.id) : -1

  return (
    <main className={`project-scene ${activeBoard ? 'is-detail' : ''}`}>
      <button type="button" className="scene-back" onClick={activeBoard ? () => setViewing(null) : onBack}>
        <span aria-hidden="true">←</span>
        {activeBoard ? 'Display boards' : 'Pack shelf'}
      </button>
      <header className="project-scene__head">
        <p className="experience-eyebrow">Collection / 02</p>
        <h1 ref={headingRef} tabIndex={-1}>{activeBoard ? 'Display board' : 'Project displays'}</h1>
        <p>
          {activeBoard
            ? 'A reserved project card in its acrylic case.'
            : 'A shelf of acrylic display boards, saved in this browser. Every card is a reserved slot until a real project is ready.'}
        </p>
      </header>

      {activeBoard ? (
        <section className={`board-full board-scene--${activeBoard.scene}`}>
          <div className="board-full__case">
            <DisplayCase board={activeBoard} />
          </div>
          <div className="board-full__actions">
            <button type="button" className="experience-button" onClick={() => openEditor(activeBoard)}>Edit board</button>
            <button type="button" className="experience-button experience-button--quiet" disabled={activeIndex <= 0} onClick={() => moveBoard(activeBoard.id, -1)}>Move left</button>
            <button type="button" className="experience-button experience-button--quiet" disabled={activeIndex >= boards.length - 1} onClick={() => moveBoard(activeBoard.id, 1)}>Move right</button>
            <button type="button" className="experience-button experience-button--danger" onClick={() => deleteBoard(activeBoard.id)}>Delete</button>
          </div>
          <p className="board-full__note">Saved in this browser. Real project cards can replace the reserved card later.</p>
        </section>
      ) : (
        <div className="board-gallery">
          {boards.map((board, index) => (
            <BoardTile
              key={board.id}
              board={board}
              index={index}
              total={boards.length}
              onOpen={() => setViewing(board.id)}
              onEdit={() => openEditor(board)}
              onMove={(direction) => moveBoard(board.id, direction)}
              onDelete={() => deleteBoard(board.id)}
            />
          ))}
          <button type="button" className="board-add" onClick={() => openEditor()}>
            <span aria-hidden="true">+</span>
            <strong>New display board</strong>
            <span>Choose a card, scene, and case.</span>
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="board-editor"
        aria-labelledby="board-editor-title"
        onClose={() => setEditing(null)}
        onClick={(event) => {
          if (event.target === dialogRef.current) setEditing(null)
        }}
      >
        {draft ? (
          <div className="board-editor__panel">
            <div className="board-editor__head">
              <div>
                <p className="experience-eyebrow">Project display</p>
                <h2 id="board-editor-title">{boards.some((board) => board.id === draft.id) ? 'Edit display' : 'New display'}</h2>
              </div>
              <button type="button" className="scene-icon-button" onClick={() => setEditing(null)} aria-label="Close editor">
                <Close />
              </button>
            </div>

            <div className="board-editor__preview">
              <div className={`board-editor__scene board-scene--${draft.scene}`}>
                <DisplayCase board={draft} />
              </div>
            </div>

            <fieldset className="board-editor__group">
              <legend>Reserved card</legend>
              <div className="board-editor__cards">
                {RESERVED_CARDS.map((card) => (
                  <label key={card.id} className="board-card-choice">
                    <input
                      type="radio"
                      name="board-card"
                      checked={draft.card === card.id}
                      onChange={() => setDraft({ ...draft, card: card.id })}
                    />
                    <span className={`reserved-card reserved-card--${Number(card.id.slice(-2))} is-mini`} aria-hidden="true" />
                    <span>{card.label}</span>
                  </label>
                ))}
              </div>
              <p className="board-editor__hint">Only reserved cards are available until real projects are added.</p>
            </fieldset>

            <fieldset className="board-editor__group">
              <legend>Background scene</legend>
              <div className="board-editor__options">
                {SCENES.map((scene) => (
                  <label key={scene.id} className="board-option">
                    <input
                      type="radio"
                      name="board-scene"
                      checked={draft.scene === scene.id}
                      onChange={() => setDraft({ ...draft, scene: scene.id })}
                    />
                    <span className={`board-scene-swatch board-scene--${scene.id}`} aria-hidden="true" />
                    <span>{scene.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="board-editor__group">
              <legend>Case style</legend>
              <div className="board-editor__options">
                {CASES.map((caseStyle) => (
                  <label key={caseStyle.id} className="board-option">
                    <input
                      type="radio"
                      name="board-case"
                      checked={draft.caseStyle === caseStyle.id}
                      onChange={() => setDraft({ ...draft, caseStyle: caseStyle.id })}
                    />
                    <span className={`case-swatch case-swatch--${caseStyle.id}`} aria-hidden="true" />
                    <span>{caseStyle.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="board-editor__actions">
              <button type="button" className="experience-button" onClick={saveBoard}>Save display</button>
              {boards.some((board) => board.id === draft.id) ? (
                <button type="button" className="experience-button experience-button--danger" onClick={() => deleteBoard(draft.id)}>Delete</button>
              ) : null}
              <button type="button" className="experience-button experience-button--quiet" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        ) : null}
      </dialog>
    </main>
  )
}
