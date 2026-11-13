/**
 * ─────────────────────────────────────────────────────────────
 *  PORTFOLIO CONTENT
 *  Edit this file to update everything shown on the site.
 * ─────────────────────────────────────────────────────────────
 *
 *  Rules of thumb:
 *  · Only add skills, certificates, and projects that are real.
 *  · Leave a field as an empty string ("") to show a clear
 *    "to be added" state instead of inventing details.
 *  · Images can be Cloudinary public IDs or full image URLs.
 */

export type PortfolioImage = {
  /** Cloudinary public ID, e.g. "portfolio/sololearn-certificate". */
  publicId?: string
  /** Or any full image URL. Takes priority over publicId. */
  url?: string
  alt: string
  width?: number
  height?: number
}

export type Certificate = {
  id: string
  title: string
  issuer: string
  date: string
  credentialUrl: string
  image: PortfolioImage | null
  /** Keeps unknown details visibly labelled as placeholders. */
  status: 'placeholder' | 'verified'
}

export type Project = {
  id: string
  title: string
  summary: string
  /** One or two short paragraphs for the expanded card. */
  description?: string
  tech: string[]
  year?: string
  repoUrl?: string
  demoUrl?: string
  image?: PortfolioImage | null
}

export type LearningItem = {
  name: string
  /** Highlight a subject that currently has Steven's attention. */
  current?: boolean
}

export type LearningGroup = {
  label: string
  items: LearningItem[]
}

export type SocialLink = {
  id: 'facebook' | 'instagram' | 'github' | 'linkedin' | 'tiktok' | 'email'
  label: string
  /** Add the full profile URL here. Empty means "link pending". */
  url: string
  handle?: string
}

export const site = {
  name: 'Steven B. Lee',
  shortName: 'Steven',
  initials: 'SL',
  role: 'BSIT Student · Aspiring Frontend Developer',
  title: 'Steven B. Lee — Pack Shelf Portfolio',
  description:
    'A collectible-card portfolio by Steven B. Lee: open a booster pack, browse the profile card, and explore about, certificates, projects, skills, and contact.',
  intro:
    "I'm Steven B. Lee, a third-year BSIT student and aspiring frontend developer. I'm building my skills in web development and enjoy creating clear, engaging digital experiences. This portfolio is where I share my learning journey, certificates, and projects as I grow.",
  email: 'leesprospects@gmail.com',
  emailNote: 'The fastest way to reach me.',
  /** Clearly dummy number shown on the pack until a real one is supplied. */
  contactNumber: '+63 000 000 0000',
  contactNumberIsPlaceholder: true,
  location: '',
  nav: [
    { id: 'about', label: 'About' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ],
} as const

export const about = {
  headline: 'Still becoming.',
  paragraphs: [
    "I'm in my third year of Information Technology, learning in public and taking the long way through the fundamentals. Most of what I know so far comes from coursework, curiosity, and the stubborn work of trying something until it finally makes sense.",
    "I care about interfaces that feel obvious to use: clear hierarchy, readable type, and room to breathe. I'm not a professional developer yet, and this portfolio doesn't pretend otherwise. It's a record of the work I'm doing to get there.",
  ],
  current: [
    { label: 'Currently', value: 'Third year, BSIT' },
    { label: 'Focus', value: 'Frontend development' },
    { label: 'On the desk', value: 'C#' },
    { label: 'Next up', value: 'First real projects' },
  ],
  principles: [
    {
      title: 'Start simple',
      body: 'A clear layout beats a clever one. I try to remove anything that does not help the person using it.',
    },
    {
      title: 'Stay honest',
      body: 'No inflated titles or invented experience. The work here will speak for itself, one project at a time.',
    },
    {
      title: 'Keep learning',
      body: 'I would rather ask a good question than pretend to know. The learning log is part of the portfolio.',
    },
  ],
}

export const certificates: Certificate[] = [
  {
    id: 'sololearn',
    // Unknown details stay blank so the UI can label them honestly.
    title: '',
    issuer: 'SoloLearn',
    date: '',
    credentialUrl: '',
    image: null,
    status: 'placeholder',
  },
  {
    id: 'certiport',
    title: '',
    issuer: 'Certiport',
    date: '',
    credentialUrl: '',
    image: null,
    status: 'placeholder',
  },
]

export const projects: Project[] = [
  /*
   *  When you have a real project, copy this shape into the array
   *  above and fill in only the parts that are true:
   *
   *  {
   *    id: 'first-project',
   *    title: 'Project name',
   *    summary: 'A one-sentence description of what it does.',
   *    description: 'A short note about what you built and learned.',
   *    tech: ['HTML', 'CSS'],
   *    year: '2026',
   *    repoUrl: 'https://github.com/your-handle/repo',
   *    demoUrl: 'https://your-project.example',
   *    image: {
   *      publicId: 'portfolio/first-project',
   *      alt: 'Screenshot of the project home page',
   *    },
   *  },
   */
]

export const learningGroups: LearningGroup[] = [
  {
    label: 'Markup & styling',
    items: [{ name: 'HTML' }, { name: 'CSS' }],
  },
  {
    label: 'Programming',
    items: [{ name: 'Java' }, { name: 'Python' }, { name: 'C#', current: true }],
  },
  {
    label: 'Backend',
    items: [{ name: 'Laravel' }],
  },
  {
    label: 'Database',
    items: [{ name: 'MySQL / MariaDB' }],
  },
  {
    label: 'Mobile',
    items: [{ name: 'Flutter' }],
  },
  {
    label: 'Design',
    items: [{ name: 'Figma' }],
  },
  {
    label: 'Networking',
    items: [{ name: 'Networking fundamentals' }],
  },
]

export const socials: SocialLink[] = [
  { id: 'facebook', label: 'Facebook', url: '' },
  { id: 'instagram', label: 'Instagram', url: '' },
  { id: 'github', label: 'GitHub', url: '' },
  { id: 'linkedin', label: 'LinkedIn', url: '' },
  { id: 'tiktok', label: 'TikTok', url: '' },
  { id: 'email', label: 'Email', url: `mailto:${site.email}` },
]

export const pack = {
  name: 'Steven B. Lee',
  role: 'Third-year BSIT student',
  aspiration: 'Aspiring Frontend Developer',
  note: 'Learning in public. No invented credentials.',
}

export type ChapterId = 'about' | 'certificates' | 'projects' | 'skills' | 'contact'

export type Chapter = {
  id: ChapterId
  number: string
  title: string
  eyebrow: string
  summary: string
  detail: string
  meta: string
}

export const chapters: Chapter[] = [
  {
    id: 'about',
    number: '01',
    title: 'About',
    eyebrow: 'The short version',
    summary: 'Still becoming.',
    detail: 'A third-year BSIT student learning frontend development in public.',
    meta: 'Third-year BSIT',
  },
  {
    id: 'certificates',
    number: '02',
    title: 'Certificates',
    eyebrow: 'Credentials',
    summary: 'Proof, in progress.',
    detail: 'SoloLearn and Certiport, kept as labelled placeholders on a local certificate board.',
    meta: '2 pending',
  },
  {
    id: 'projects',
    number: '03',
    title: 'Projects',
    eyebrow: 'Work',
    summary: 'Six open slots.',
    detail: 'A shelf of acrylic display boards with reserved project cards.',
    meta: 'In progress',
  },
  {
    id: 'skills',
    number: '04',
    title: 'Skills',
    eyebrow: 'Learning log',
    summary: 'Tools I’m learning.',
    detail: 'A record of practice, not a proficiency chart.',
    meta: 'C# current',
  },
  {
    id: 'contact',
    number: '05',
    title: 'Contact',
    eyebrow: 'Say hello',
    summary: 'The inbox is open.',
    detail: 'Email and social links, without the fake destinations.',
    meta: 'Email',
  },
]

