import type { SVGProps } from 'react'
import type { SocialLink } from '../data/portfolio'

type IconProps = SVGProps<SVGSVGElement>

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M7 17 17 7M8 7h9v9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function ArrowDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M12 4v16m0 0 6-6m-6 6-6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function ArrowUp(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M12 20V4m0 0 6 6m-6-6-6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function Sun(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function Moon(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M20 15.2A8.2 8.2 0 0 1 8.8 4a8.2 8.2 0 1 0 11.2 11.2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export function Palette(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M12 3a9 9 0 1 0 0 18h1.2a1.8 1.8 0 0 0 0-3.6h-.8a1.7 1.7 0 0 1 0-3.4H16A5 5 0 0 0 21 9c0-3.3-4-6-9-6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="7.4" cy="10" r="1.1" fill="currentColor" />
      <circle cx="10.2" cy="6.7" r="1.1" fill="currentColor" />
      <circle cx="15" cy="6.9" r="1.1" fill="currentColor" />
      <circle cx="7.7" cy="14.6" r="1.1" fill="currentColor" />
    </Svg>
  )
}

export function Menu(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function Close(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="m5 5 14 14M19 5 5 19"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function External(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function Check(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="m4 12.5 5 5L20 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </Svg>
  )
}

export function SocialIcon({ id, ...props }: IconProps & { id: SocialLink['id'] }) {
  switch (id) {
    case 'facebook':
      return (
        <Svg {...props}>
          <path
            d="M13.5 21v-8h2.8l.4-3.2h-3.2V7.7c0-.9.3-1.6 1.7-1.6h1.7V3.2c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.2H7v3.2h2.9v8h3.6Z"
            fill="currentColor"
          />
        </Svg>
      )
    case 'instagram':
      return (
        <Svg {...props}>
          <rect
            x="3.4"
            y="3.4"
            width="17.2"
            height="17.2"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
          <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
        </Svg>
      )
    case 'github':
      return (
        <Svg {...props}>
          <path
            d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.18.08 1.8 1.21 1.8 1.21 1.05 1.79 2.75 1.27 3.42.97.11-.76.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.21.68.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z"
            fill="currentColor"
          />
        </Svg>
      )
    case 'linkedin':
      return (
        <Svg {...props}>
          <path
            d="M4.4 8.7H8V21H4.4V8.7ZM6.2 3a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2ZM10.4 8.7h3.4v1.7h.1c.5-.9 1.7-1.9 3.4-1.9 3.7 0 4.4 2.4 4.4 5.5V21h-3.6v-6.2c0-1.5-.1-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V21h-3.6V8.7Z"
            fill="currentColor"
          />
        </Svg>
      )
    case 'tiktok':
      return (
        <Svg {...props}>
          <path
            d="M15.8 3c.4 2.3 1.8 3.9 4.2 4.1v3.1c-1.5.1-2.9-.3-4.2-1.1v5.7c0 4.4-3.5 6.5-6.7 5.5-2.4-.7-4.1-2.9-3.8-5.5.3-3 3.2-5.2 6.2-4.6v3.3c-.4-.1-.8-.2-1.2-.1-1.4.1-2.3 1.2-2.2 2.5.1 1.3 1.2 2.2 2.4 2.1 1.2-.1 2-1 2-2.4V3h3.3Z"
            fill="currentColor"
          />
        </Svg>
      )
    case 'email':
      return (
        <Svg {...props}>
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="m3.8 6.5 8.2 6 8.2-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
          />
        </Svg>
      )
  }
}
