import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { pack, site } from '../data/portfolio'
import { ArrowUpRight } from '../components/Icons'
import { PackBack, PackFront, PersonGlyph } from '../components/BoosterPack'

type Step = 'idle' | 'zoomed' | 'cut' | 'card' | 'opening'

export function CardIntro({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState<Step>('idle')
  const [flipped, setFlipped] = useState(false)
  const reducedMotion = useReducedMotion()
  const cardRef = useRef<HTMLButtonElement>(null)
  const suppressClick = useRef(false)
  const dragStart = useRef<number | null>(null)
  const dragDistance = useRef(0)
  const dragDelta = useRef(0)

  const tiltX = useSpring(0, { stiffness: 140, damping: 20, mass: 0.5 })
  const tiltY = useSpring(0, { stiffness: 140, damping: 20, mass: 0.5 })
  const flip = useSpring(0, { stiffness: 95, damping: 16, mass: 0.8 })
  const dragOffset = useSpring(0, { stiffness: 190, damping: 26, mass: 0.6 })
  const rotateY = useTransform([tiltY, flip, dragOffset], ([tilt, turn, drag]: number[]) => tilt + turn + drag)
  const rotateZ = useTransform(tiltY, (tilt: number) => tilt * -0.08)

  useEffect(() => {
    flip.set(flipped ? 180 : 0)
  }, [flipped, flip])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onComplete()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onComplete])

  useEffect(() => {
    if (step !== 'cut') return
    const timeout = window.setTimeout(() => setStep('card'), reducedMotion ? 80 : 900)
    return () => window.clearTimeout(timeout)
  }, [step, reducedMotion])

  useEffect(() => {
    if (step !== 'opening') return
    const timeout = window.setTimeout(onComplete, reducedMotion ? 80 : 520)
    return () => window.clearTimeout(timeout)
  }, [step, onComplete, reducedMotion])

  useEffect(() => {
    if (step === 'card') cardRef.current?.focus()
  }, [step])

  const hint =
    step === 'idle'
      ? 'Drag, swipe, or use ← → to turn. Click to open.'
      : step === 'zoomed'
        ? 'Click to cut the seal.'
        : step === 'cut'
          ? 'Opening the pack…'
          : step === 'card'
            ? 'Click the card to open the pack shelf.'
            : 'Opening the shelf…'

  const activatePack = () => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    if (step === 'idle') setStep('zoomed')
    else if (step === 'zoomed') setStep('cut')
  }

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (reducedMotion) return
    if (dragStart.current !== null) {
      const delta = event.clientX - dragStart.current
      dragDistance.current = Math.abs(delta)
      dragDelta.current = delta
      dragOffset.set(Math.max(-120, Math.min(120, delta * 0.65)))
      return
    }
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    tiltY.set(x * 22)
    tiltX.set(-y * 16)
  }

  const resetTilt = () => {
    if (dragStart.current !== null) return
    tiltX.set(0)
    tiltY.set(0)
    dragOffset.set(0)
  }

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    dragStart.current = event.clientX
    dragDistance.current = 0
    dragDelta.current = 0
    suppressClick.current = false
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragDistance.current > 10) {
      if (Math.abs(dragDelta.current) > 44) setFlipped((value) => !value)
      suppressClick.current = true
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    dragStart.current = null
    dragDistance.current = 0
    dragDelta.current = 0
    dragOffset.set(0)
    tiltX.set(0)
    tiltY.set(0)
  }

  const onPointerCancel = () => {
    dragStart.current = null
    dragDistance.current = 0
    dragDelta.current = 0
    dragOffset.set(0)
    suppressClick.current = false
  }

  const onPackKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      setFlipped((value) => !value)
    }
  }

  const packHidden = step === 'card' || step === 'opening'

  return (
    <motion.div
      className={`intro ${step === 'opening' ? 'is-opening' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: step === 'opening' ? 0 : 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="intro-grain" aria-hidden="true" />
      <button type="button" className="intro-skip" onClick={onComplete} disabled={step === 'opening'}>
        Skip intro
        <span aria-hidden="true">↗</span>
      </button>

      <div className="intro-center">
        <div className="intro-stage">
          {step === 'card' || step === 'opening' ? (
            <motion.button
              ref={cardRef}
              type="button"
              className="profile-reveal"
              onClick={() => setStep('opening')}
              disabled={step === 'opening'}
              initial={{ opacity: 0, y: 36, scale: 0.86 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <svg className="profile-reveal__waves" viewBox="0 0 360 462" preserveAspectRatio="none" fill="none" aria-hidden="true">
                <g stroke="#dbe8ff" strokeWidth=".8">
                  <path d="M-20 336c72-84 134-64 196 4s104 54 204-30" opacity=".16" />
                  <path d="M-20 348c72-84 134-64 196 4s104 54 204-30" opacity=".11" />
                  <path d="M-20 360c72-84 134-64 196 4s104 54 204-30" opacity=".07" />
                  <path d="M-20 120c56 32 104 24 154-8s114-24 186 26" opacity=".08" />
                </g>
              </svg>
              <span className="profile-reveal__label">Profile · 001</span>
              <span className="profile-reveal__mark"><PersonGlyph /></span>
              <span className="profile-reveal__name">Steven B. Lee</span>
              <span className="profile-reveal__role">Third-year BSIT student<br />Aspiring Frontend Developer</span>
              <span className="profile-reveal__rule" aria-hidden="true" />
              <span className="profile-reveal__enter">Open the pack shelf <ArrowUpRight /></span>
            </motion.button>
          ) : null}

          <motion.div
            className={`pack-scene ${step === 'zoomed' ? 'is-zoomed' : ''}`}
            animate={{ scale: step === 'zoomed' ? 1.1 : step === 'cut' ? 0.94 : 1, opacity: packHidden ? 0 : 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pack-halo" aria-hidden="true" />
            <div className="pack-interactive">
              <motion.div
                className={`pack-visual ${step === 'cut' ? 'is-cut' : ''}`}
                aria-hidden="true"
                style={{ rotateX: tiltX, rotateY, rotateZ }}
                animate={{ scale: step === 'zoomed' ? 1.04 : 1 }}
              >
                <span className="pack-card3d">
                  <span className="pack-side pack-side--front"><PackFront /></span>
                  <span className="pack-side pack-side--back">
                    <PackBack name={pack.name} role={pack.role} aspiration={pack.aspiration} email={site.email} phone={site.contactNumber} phoneIsPlaceholder={site.contactNumberIsPlaceholder} />
                  </span>
                </span>
              </motion.div>
              <button
                type="button"
                className="pack-button"
                aria-label={step === 'idle' ? 'Open the profile pack' : 'Cut the seal and open the profile pack'}
                aria-describedby="pack-details"
                aria-keyshortcuts="ArrowLeft ArrowRight"
                onClick={activatePack}
                onKeyDown={onPackKeyDown}
                onPointerMove={onPointerMove}
                onPointerDown={onPointerDown}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                onPointerLeave={resetTilt}
                disabled={packHidden || step === 'cut'}
              />
              {step === 'cut' ? (
                <span className="cut-fx" aria-hidden="true">
                  <span className="cut-edge" />
                  <span className="cut-strip" />
                </span>
              ) : null}
            </div>
          </motion.div>
        </div>

        <p className="intro-hint" aria-live="polite">{hint}</p>
        <p id="pack-details" className="sr-only">
          {pack.name}. Drag or swipe to flip the pack; arrow keys also turn it. Press Enter to open.
        </p>
      </div>

      <p className="intro-note">An optional introduction. The pack shelf is one click away.</p>
    </motion.div>
  )
}
