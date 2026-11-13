import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { useReducedMotion } from 'framer-motion'
import { chapters, type ChapterId } from '../data/portfolio'
import { ArrowUpRight } from '../components/Icons'
import { FantasyPack } from './FantasyPack'

function offsetFor(index: number, active: number, total: number) {
  let offset = index - active
  const half = Math.floor(total / 2)
  if (offset > half) offset -= total
  if (offset < -half) offset += total
  return offset
}

export function PackWheel({
  initialActive,
  onOpen,
}: {
  initialActive: ChapterId
  onOpen: (id: ChapterId) => void
}) {
  const [active, setActive] = useState(() =>
    Math.max(
      0,
      chapters.findIndex((chapter) => chapter.id === initialActive),
    ),
  )
  const [opening, setOpening] = useState(false)
  const deckRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const packRefs = useRef<(HTMLButtonElement | null)[]>([])
  const pointerStart = useRef<number | null>(null)
  const dragged = useRef(false)
  const suppressClick = useRef(false)
  const reducedMotion = useReducedMotion()

  const chapter = chapters[active]

  const move = (direction: 1 | -1) => {
    if (opening) return
    setActive((current) => (current + direction + chapters.length) % chapters.length)
  }

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => packRefs.current[active]?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [active])

  useEffect(() => {
    if (!opening) return
    const timeout = window.setTimeout(() => onOpen(chapter.id), reducedMotion ? 80 : 520)
    return () => window.clearTimeout(timeout)
  }, [opening, chapter.id, onOpen, reducedMotion])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (opening) return
    pointerStart.current = event.clientX
    dragged.current = false
    suppressClick.current = false
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return
    const delta = event.clientX - pointerStart.current
    if (Math.abs(delta) > 8) dragged.current = true
    if (!reducedMotion && trackRef.current) {
      trackRef.current.style.transform = `translateX(${Math.max(-100, Math.min(100, delta * 0.32))}px)`
    }
  }

  const finishDrag = () => {
    if (pointerStart.current !== null && dragged.current) {
      if (trackRef.current) trackRef.current.style.transform = ''
      suppressClick.current = true
      window.setTimeout(() => {
        suppressClick.current = false
      }, 250)
    }
    pointerStart.current = null
    dragged.current = false
  }

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current !== null) {
      const delta = event.clientX - pointerStart.current
      if (Math.abs(delta) > 46) move(delta < 0 ? 1 : -1)
    }
    finishDrag()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      move(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      move(-1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      setActive(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setActive(chapters.length - 1)
    }
  }

  const handlePackClick = (index: number) => {
    if (opening) return
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    if (index === active) {
      setOpening(true)
    } else {
      setActive(index)
    }
  }

  return (
    <main className={`pack-wheel-screen ${opening ? 'is-opening' : ''}`}>
      <div className="pack-wheel-atmosphere" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <header className="pack-wheel-head">
        <h1 className="sr-only">Choose a portfolio section</h1>
        <p>Tap a booster pack you want to open!</p>
        <span>Drag, swipe, or use ← → to spin the wheel.</span>
      </header>

      <div
        className="pack-wheel-stage"
        ref={deckRef}
        role="group"
        aria-roledescription="carousel"
        aria-label="Portfolio pack wheel"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={finishDrag}
        onPointerLeave={finishDrag}
        onKeyDown={onKeyDown}
      >
        <div className="pack-wheel-track" ref={trackRef}>
          {chapters.map((item, index) => {
            const offset = offsetFor(index, active, chapters.length)
            const absolute = Math.abs(offset)
            const activePack = offset === 0
            return (
              <button
                key={item.id}
                ref={(element) => {
                  packRefs.current[index] = element
                }}
                type="button"
                className={`wheel-pack ${activePack ? 'is-center' : ''}`}
                style={
                  {
                    '--offset': offset,
                    '--abs': absolute,
                    zIndex: 10 - absolute,
                  } as CSSProperties
                }
                tabIndex={activePack ? 0 : -1}
                aria-label={activePack ? `Open ${item.title}` : `Show ${item.title} in the center`}
                onClick={() => handlePackClick(index)}
              >
                <span className="wheel-pack__visual" aria-hidden="true">
                  <FantasyPack />
                </span>
              </button>
            )
          })}
          <div className="wheel-reflection" aria-hidden="true">
            <span className="wheel-reflection__art">
              <FantasyPack />
            </span>
          </div>
        </div>
      </div>

      <div className="pack-wheel-caption">
        <p className="pack-wheel-caption__index">
          {chapter.number} / {String(chapters.length).padStart(2, '0')}
        </p>
        <h2>{chapter.title}</h2>
        <p>{chapter.summary}</p>
        <button
          type="button"
          className="wheel-open"
          onClick={() => setOpening(true)}
          disabled={opening}
        >
          Open {chapter.title}
          <ArrowUpRight />
        </button>
      </div>

      <div className="pack-wheel-controls">
        <button type="button" className="wheel-nav" onClick={() => move(-1)} aria-label="Previous pack">
          <span aria-hidden="true">←</span>
        </button>
        <span className="wheel-hint" aria-hidden="true">
          swipe to spin
        </span>
        <button type="button" className="wheel-nav" onClick={() => move(1)} aria-label="Next pack">
          <span aria-hidden="true">→</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        {chapter.title}. {chapter.summary}
      </p>
    </main>
  )
}
