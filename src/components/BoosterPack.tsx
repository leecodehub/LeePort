export function PersonGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      vectorEffect="non-scaling-stroke"
      aria-hidden="true"
    >
      <circle cx="70" cy="52" r="20" strokeWidth="2.4" />
      <path
        d="M34 108c4-28 17-42 36-42s32 14 36 42"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function PackFront() {
  return (
    <div className="pack-face pack-face--front">
      <div className="pack-crimp pack-crimp--top" aria-hidden="true" />
      <div className="pack-crimp pack-crimp--bottom" aria-hidden="true" />
      <div className="pack-art">
        <div className="pack-emblem">
          <PersonGlyph className="pack-person" />
        </div>
      </div>
      <span className="pack-sheen" aria-hidden="true" />
    </div>
  )
}

export function PackBack({
  name,
  role,
  aspiration,
  email,
  phone,
  phoneIsPlaceholder = true,
}: {
  name: string
  role: string
  aspiration: string
  email: string
  phone: string
  phoneIsPlaceholder?: boolean
}) {
  return (
    <div className="pack-face pack-face--back">
      <div className="pack-crimp pack-crimp--top" aria-hidden="true" />
      <div className="pack-crimp pack-crimp--bottom" aria-hidden="true" />
      <div className="pack-back-inner">
        <div className="pack-back-mark">
          <PersonGlyph />
        </div>
        <p className="pack-back-label">Profile · 001</p>
        <h2>{name}</h2>
        <p className="pack-back-role">
          {role}
          <br />
          {aspiration}
        </p>
        <dl className="pack-back-details">
          <div>
            <dt>Email</dt>
            <dd>{email}</dd>
          </div>
          <div>
            <dt>Contact</dt>
            <dd>
              {phone}
              {phoneIsPlaceholder ? <span className="pack-back-tag">placeholder</span> : null}
            </dd>
          </div>
        </dl>
        <span className="pack-back-rule" aria-hidden="true" />
      </div>
      <span className="pack-sheen" aria-hidden="true" />
    </div>
  )
}
