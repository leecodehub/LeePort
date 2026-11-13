import { useRef, useEffect, type RefObject } from 'react'
import { about, learningGroups, site, socials } from '../data/portfolio'
import { SocialIcon, ArrowUpRight } from '../components/Icons'

type InfoKind = 'about' | 'skills' | 'contact'

export function InfoScene({ kind, onBack }: { kind: InfoKind; onBack: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [kind])

  return (
    <main className={`info-scene info-scene--${kind}`}>
      <button type="button" className="scene-back" onClick={onBack}>
        <span aria-hidden="true">←</span>
        Pack shelf
      </button>
      <span className="scene-mark" aria-hidden="true">
        SBL / {kind === 'about' ? '01' : kind === 'skills' ? '04' : '05'}
      </span>

      <div className="info-card">
        {kind === 'about' ? <AboutCard headingRef={headingRef} /> : null}
        {kind === 'skills' ? <SkillsCard headingRef={headingRef} /> : null}
        {kind === 'contact' ? <ContactCard headingRef={headingRef} /> : null}
      </div>

      <p className="info-scene__note">A single card. No scrolling hidden underneath.</p>
    </main>
  )
}

function AboutCard({ headingRef }: { headingRef: RefObject<HTMLHeadingElement | null> }) {
  return (
    <>
      <div className="info-card__wave" aria-hidden="true">
        <svg viewBox="0 0 640 240" fill="none" stroke="currentColor">
          <path d="M-40 148C36 76 108 46 176 80s104 94 176 96 122-50 188-72 96-6 140 26" />
          <path d="M-40 170C36 98 108 68 176 102s104 94 176 96 122-50 188-72 96-6 140 26" opacity=".55" />
          <path d="M-40 192C36 120 108 90 176 124s104 94 176 96 122-50 188-72 96-6 140 26" opacity=".3" />
          <path d="M-40 214C36 142 108 112 176 146s104 94 176 96 122-50 188-72 96-6 140 26" opacity=".15" />
        </svg>
      </div>
      <div className="info-card__top">
        <span>Profile / 01</span>
        <span>Third-year BSIT</span>
      </div>
      <p className="info-card__eyebrow">About</p>
      <h1 ref={headingRef} tabIndex={-1}>
        Steven B. Lee
      </h1>
      <p className="info-card__role">BSIT Student · Aspiring Frontend Developer</p>
      <p className="info-card__copy">{site.intro}</p>
      <div className="info-card__facts">
        {about.current.slice(0, 3).map((item) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <div className="info-card__foot">
        <span className="info-card__signature">Still becoming.</span>
        <span>Learning in public</span>
      </div>
    </>
  )
}

function SkillsCard({ headingRef }: { headingRef: RefObject<HTMLHeadingElement | null> }) {
  return (
    <>
      <div className="info-card__top">
        <span>Learning log / 04</span>
        <span>C# current</span>
      </div>
      <p className="info-card__eyebrow">Skills</p>
      <h1 ref={headingRef} tabIndex={-1}>
        Tools I’m learning.
      </h1>
      <p className="info-card__role">A record of practice, not a proficiency chart.</p>
      <div className="info-card__skills">
        {learningGroups.map((group) => (
          <div key={group.label}>
            <span>{group.label}</span>
            <strong>{group.items.map((item) => item.name).join(' · ')}</strong>
          </div>
        ))}
      </div>
      <div className="info-card__foot">
        <span>Read. Build. Break it. Understand why.</span>
        <span>No percentages</span>
      </div>
    </>
  )
}

function ContactCard({ headingRef }: { headingRef: RefObject<HTMLHeadingElement | null> }) {
  const profiles = socials.filter((social) => social.id !== 'email')
  return (
    <>
      <div className="info-card__top">
        <span>Contact / 05</span>
        <span>No fake links</span>
      </div>
      <p className="info-card__eyebrow">Contact</p>
      <h1 ref={headingRef} tabIndex={-1}>
        Say hello.
      </h1>
      <p className="info-card__role">Questions, notes, or something worth practicing on.</p>
      <a className="info-email" href={`mailto:${site.email}`}>
        {site.email}
        <ArrowUpRight />
      </a>
      <div className="info-card__socials">
        {profiles.map((profile) => (
          <div className={`info-social ${profile.url ? '' : 'is-pending'}`} key={profile.id}>
            <span className="info-social__icon"><SocialIcon id={profile.id} /></span>
            <span className="info-social__name">{profile.label}</span>
            <span className="info-social__status">{profile.url ? 'Open' : 'Link pending'}</span>
          </div>
        ))}
      </div>
      <div className="info-card__foot">
        <span>{site.emailNote}</span>
        <span>No forms · no tracking</span>
      </div>
    </>
  )
}
