import {
  Braces,
  Code2,
  Database,
  GitBranch,
  Globe,
  Layers3,
  Network,
  Package,
  Terminal,
  Wind,
} from 'lucide-react'
import Github from './GithubIcon'

export default function TechIcon({ name }: { name: string }) {
  if (name === 'React')
    return (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="3" fill="currentColor" />
        {[0, 60, 120].map((angle) => (
          <ellipse
            key={angle}
            cx="20"
            cy="20"
            rx="18"
            ry="7"
            stroke="currentColor"
            strokeWidth="1.5"
            transform={`rotate(${angle} 20 20)`}
          />
        ))}
      </svg>
    )
  if (name === 'TypeScript' || name === 'JavaScript')
    return (
      <span className="letter-icon" aria-hidden="true">
        {name === 'TypeScript' ? 'TS' : 'JS'}
      </span>
    )
  if (name === 'HTML' || name === 'CSS')
    return (
      <span className="shield-icon" aria-hidden="true">
        {name === 'HTML' ? '5' : '3'}
      </span>
    )
  const Icon =
    name === 'GitHub'
      ? Github
      : name === 'Git'
        ? GitBranch
        : name === 'PostgreSQL'
          ? Database
          : name === 'Prisma'
            ? Layers3
            : name === 'Tailwind CSS'
              ? Wind
              : name === 'npm'
                ? Package
                : name === 'REST APIs' || name === 'API testing'
                  ? Network
                  : name === 'Node.js'
                    ? Braces
                    : name === 'Express'
                      ? Globe
                      : name === 'VS Code'
                        ? Code2
                        : Terminal
  return <Icon size={31} strokeWidth={1.4} aria-hidden="true" />
}
