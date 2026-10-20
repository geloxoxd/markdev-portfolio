export interface Profile {
  name: string
  role: string
  studentLabel: string
  publicEmail: string
  githubUrl: string
  resumeUrl: string
  idPortraitUrl: string
  portraitUrl: string
  introduction: string
  biography: string
}

export interface SkillCategory {
  id: 'frontend' | 'backend' | 'data' | 'tools'
  label: string
  description: string
  skills: string[]
}

export interface JourneyEntry {
  id: string
  kind: 'Education' | 'Experience'
  title: string
  organization: string
  period: string
  description: string
}

export interface Project {
  id: string
  title: string
  category: 'Full stack' | 'Frontend'
  status: string
  description: string
  summary: string
  technologies: string[]
  features: string[]
  plannedFeatures: string[]
  image?: string
  githubUrl?: string
  liveUrl?: string
  evidenceNote: string
}

export const profile: Profile = {
  name: 'Mark Angelo Dela Cruz',
  role: 'Full-Stack Developer',
  studentLabel: 'Third-Year BSIT Student',
  publicEmail: 'markangelod52@gmail.com',
  githubUrl: 'https://github.com/geloxoxd',
  resumeUrl: '/mark-angelo-dela-cruz-resume.pdf',
  idPortraitUrl: '/images/mark-angelo-id.jpg',
  portraitUrl: '/images/mark-angelo.jpg',
  introduction:
    'A third-year IT student turning ideas into practical web experiences, from the interface to the database.',
  biography:
    'I’m Mark Angelo Dela Cruz, a third-year BSIT student at ICCT Colleges, Cainta Main Campus, working toward a career in professional web development. I’m interested in building practical, well-designed full-stack applications and exploring AI integrations and developer automation. My background also includes IT support at Concentrix, where I diagnosed and resolved hardware, software, network, and system-related issues.',
}

export const socialLinks = [
  { platform: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/gelorxch/' },
  { platform: 'tiktok', label: 'TikTok', url: 'https://www.tiktok.com/@mcfloaaaaaaat' },
  {
    platform: 'facebook',
    label: 'Facebook',
    url: 'https://www.facebook.com/markangelo.delacruz.792303/',
  },
] as const

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Interfaces, interactions, and the details people see.',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'backend',
    label: 'Backend',
    description: 'Application logic and the APIs connecting it all.',
    skills: ['Node.js', 'Express', 'REST APIs'],
  },
  {
    id: 'data',
    label: 'Data',
    description: 'Organizing application data with a clear structure.',
    skills: ['PostgreSQL', 'Prisma'],
  },
  {
    id: 'tools',
    label: 'Workflow',
    description: 'The everyday tools behind development and testing.',
    skills: ['Git', 'GitHub', 'VS Code', 'npm', 'API testing'],
  },
]

export const journey: JourneyEntry[] = [
  {
    id: 'icct',
    kind: 'Education',
    title: 'Bachelor of Science in Information Technology',
    organization: 'ICCT Colleges · Cainta Main Campus, Rizal',
    period: 'Currently in third year',
    description:
      'Building a foundation in information technology while pursuing a career in full-stack web development.',
  },
  {
    id: 'concentrix',
    kind: 'Experience',
    title: 'IT Support',
    organization: 'Concentrix',
    period: 'July 23, 2023 — August 19, 2024',
    description:
      'Diagnosed and resolved hardware, software, network, and system-related issues through technical troubleshooting.',
  },
]

export const projects: Project[] = [
  {
    id: 'closetiq',
    title: 'ClosetIQ',
    category: 'Full stack',
    status: 'Public deployment',
    description:
      'A personal wardrobe application for organizing clothes, building outfits, and keeping everyday clothing routines in order.',
    summary:
      'ClosetIQ brings a personal wardrobe into one application: organize garments, track what is clean or in the laundry, and build outfits from existing clothes. Its React interface connects to a TypeScript and Express API, while PostgreSQL and Prisma organize each user’s clothing, outfits, and wear history. A rule-based stylist suggests combinations from clean items for different occasions.',
    technologies: [
      'React',
      'Vite',
      'TypeScript',
      'CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Prisma',
      'Cloudinary',
    ],
    features: [
      'Session-based accounts with per-user wardrobe data',
      'Clothing catalog with search, filters, favorites, and image uploads',
      'Clean, worn, and laundry states with wear tracking',
      'Create, edit, and save outfits from existing garments',
      'Wardrobe statistics and most-worn item insights',
      'Rule-based outfit suggestions for casual, work, school, and formal occasions',
    ],
    plannedFeatures: [],
    image: '/images/closetiq-preview.png',
    liveUrl: 'https://closet-iq.onrender.com',
    evidenceNote:
      'Public entry verified. Features are documented from source; protected workflows were not exercised. The source repository is private.',
  },
  {
    id: 'markdev-portfolio',
    title: 'MarkDev Portfolio',
    category: 'Frontend',
    status: 'Live',
    description:
      'An original monochrome portfolio with a portrait-led introduction, project stories, and a focused developer experience.',
    summary:
      'A personal space for my work, development journey, and growing full-stack practice. The design pairs expressive typography and a suspended portrait card with a restrained monochrome palette. The application is built with React and TypeScript, using reusable sections and structured content to make future updates straightforward.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Motion', 'React Router'],
    features: [
      'Responsive monochrome interface',
      'Draggable suspended ID with a flexible strap and damped swing',
      'Repeatable scroll reveals and an animated two-row text strip',
      'Individual project case-study routes',
      'Categorized technology showcase',
      'Gmail compose and social profile links in the footer',
      'Reduced-motion support',
    ],
    plannedFeatures: [],
    image: '/images/portfolio-preview.png',
    githubUrl: 'https://github.com/geloxoxd/markdev-portfolio',
    liveUrl: 'https://markdev-portfolio-iota.vercel.app',
    evidenceNote:
      'Deployed on Vercel with a public HTTPS entry point and source published on GitHub. Local checks cover TypeScript, linting, automated tests, and the production build.',
  },
]
