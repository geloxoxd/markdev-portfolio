import { useRef, useState } from 'react'
import type { KeyboardEvent, PointerEvent, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Check,
  CheckCheck,
  Code2,
  Copy,
  Download,
  GraduationCap,
  Mail,
  Monitor,
  Shirt,
  Sparkles,
} from 'lucide-react'
import Github from '../components/GithubIcon'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { journey, profile, projects, skillCategories } from '../data/portfolio'
import Reveal from '../components/Reveal'
import TechIcon from '../components/TechIcon'
import DisciplineStrip from '../components/DisciplineStrip'
import PortraitCard from '../components/PortraitCard'

function MagneticLink({
  href,
  children,
  className = '',
  download = false,
}: {
  href: string
  children: ReactNode
  className?: string
  download?: boolean
}) {
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (
      event.pointerType !== 'mouse' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
      return
    const box = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty(
      '--mx',
      `${(event.clientX - box.left - box.width / 2) * 0.07}px`,
    )
    event.currentTarget.style.setProperty(
      '--my',
      `${(event.clientY - box.top - box.height / 2) * 0.1}px`,
    )
  }
  return (
    <a
      href={href}
      className={`button magnetic ${className}`}
      download={download || undefined}
      onPointerMove={move}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty('--mx', '0px')
        event.currentTarget.style.setProperty('--my', '0px')
      }}
    >
      <span className="magnetic-content">{children}</span>
    </a>
  )
}

function Hero({ introComplete }: { introComplete: boolean }) {
  const reduced = useReducedMotion()
  return (
    <section id="home" className="hero section-shell">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span className="status-dot" aria-hidden="true" /> {profile.studentLabel}
            <span className="hero-edition">PORTFOLIO / {new Date().getFullYear()}</span>
          </div>
          <p className="hero-name">MARK ANGELO DELA CRUZ</p>
          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Full-stack
            <br />
            <span>Developer.</span>
            <span className="headline-asterisk" aria-hidden="true">
              ✳
            </span>
          </motion.h1>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-actions">
            <MagneticLink href="#portfolio" className="button-primary">
              Explore my work <ArrowDownRight size={19} aria-hidden="true" />
            </MagneticLink>
            <MagneticLink href="#contact" className="button-secondary">
              Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
            </MagneticLink>
          </div>
          <div className="hero-links">
            <a href={profile.resumeUrl} download aria-label="Download resume">
              <Download size={15} aria-hidden="true" /> Download resume
            </a>
            <span aria-hidden="true" />
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              <Github size={16} aria-hidden="true" /> GitHub{' '}
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          </div>
        </div>
        <PortraitCard ready={introComplete} />
      </div>
      <div className="hero-bottom">
        <p>
          THOUGHTFUL INTERFACES.
          <br />
          <span>PRACTICAL APPLICATIONS.</span>
        </p>
        <a href="#about" className="scroll-cue">
          SCROLL TO EXPLORE <ArrowDown size={15} aria-hidden="true" />
        </a>
        <span className="hero-section-number">01 — INTRODUCTION</span>
      </div>
    </section>
  )
}

function About() {
  const portrait = useRef<HTMLDivElement>(null)
  const portraitInView = useInView(portrait, { amount: 0.2 })
  const reduced = useReducedMotion()
  return (
    <section id="about" className="about-section section-shell section-space">
      <Reveal className="section-heading">
        <span className="eyebrow">
          <span className="section-index">01 /</span> THE PERSON BEHIND THE PIXELS
        </span>
        <h2>
          A little context.
          <br />
          <span>A lot of curiosity.</span>
        </h2>
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-photo-card" direction="left">
          <div
            ref={portrait}
            className={`about-portrait-orbit${portraitInView && !reduced ? ' is-in-view' : ''}`}
          >
            <div className="about-photo-frame">
              <img
                src={profile.portraitUrl}
                alt="Portrait of Mark Angelo Dela Cruz"
                width="460"
                height="599"
                loading="lazy"
              />
            </div>
          </div>
          <div className="about-photo-caption">
            <span>Mark Angelo Dela Cruz</span>
            <span>↗ THAT’S ME</span>
          </div>
        </Reveal>
        <div className="about-copy">
          <Reveal direction="right">
            <p className="about-lead">
              I’m Mark. A student,
              <br />a problem-solver,
              <br />
              <span>and a builder at heart.</span>
            </p>
            <p>{profile.biography}</p>
          </Reveal>
          <Reveal className="about-detail-grid" direction="right" delay={0.08}>
            <div className="about-detail">
              <GraduationCap size={21} strokeWidth={1.5} aria-hidden="true" />
              <span className="eyebrow">LEARNING</span>
              <h3>
                BS Information
                <br />
                Technology
              </h3>
              <p>
                ICCT Colleges
                <br />
                Cainta Main Campus
              </p>
            </div>
            <div className="about-detail">
              <Braces size={21} strokeWidth={1.5} aria-hidden="true" />
              <span className="eyebrow">EXPLORING</span>
              <h3>
                Beyond
                <br />
                the interface.
              </h3>
              <p>
                Full-stack applications,
                <br />
                AI integrations & automation
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal className="about-note" direction="right">
        <span className="note-mark" aria-hidden="true">
          ↳
        </span>
        <p>
          Good work starts with understanding the problem.
          <br />
          <span>I’m here to keep learning, keep building, and make things that help.</span>
        </p>
        <a href="#journey">
          My journey <ArrowDownRight size={17} aria-hidden="true" />
        </a>
      </Reveal>
    </section>
  )
}

function ProjectGrid() {
  const [filter, setFilter] = useState('All')
  const visible = projects.filter((project) => filter === 'All' || project.category === filter)
  return (
    <>
      <div className="project-filter-row">
        <div className="filter-group" aria-label="Filter projects">
          {['All', 'Full stack', 'Frontend'].map((category) => (
            <button
              key={category}
              aria-pressed={filter === category}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <span className="result-count" aria-live="polite">
          {String(visible.length).padStart(2, '0')} SELECTED{' '}
          {visible.length === 1 ? 'PROJECT' : 'PROJECTS'}
        </span>
      </div>
      <div className="project-grid">
        {visible.map((project, index) => (
          <Reveal
            className={`project-card project-${project.id}`}
            key={project.id}
            direction={index % 2 === 0 ? 'left' : 'right'}
            delay={index * 0.08}
          >
            <Link
              className="project-preview"
              to={`/projects/${project.id}`}
              aria-label={`View ${project.title} case study — 0${projects.findIndex((item) => item.id === project.id) + 1} / ${project.category.toUpperCase()}`}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={`${project.title} application screenshot`}
                  loading="lazy"
                  width="1440"
                  height="1000"
                />
              ) : (
                <div className="project-identity">
                  {project.id === 'closetiq' ? (
                    <Shirt size={38} strokeWidth={1} aria-hidden="true" />
                  ) : (
                    <Code2 size={38} strokeWidth={1} aria-hidden="true" />
                  )}
                  <span>
                    {project.id === 'closetiq' ? (
                      <>
                        closet<strong>IQ</strong>
                      </>
                    ) : (
                      <>
                        mark<strong>.dev</strong>
                      </>
                    )}
                  </span>
                  <p>
                    {project.id === 'closetiq'
                      ? 'CLOTHING MANAGEMENT'
                      : 'A PERSONAL SPACE FOR THE WEB'}
                  </p>
                </div>
              )}
              <span className="project-open">
                <ArrowUpRight size={21} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="preview-index">
                0{projects.findIndex((item) => item.id === project.id) + 1} /{' '}
                {project.category.toUpperCase()}
              </span>
            </Link>
            <div className="project-card-body">
              <div className="project-meta">
                <span>{project.category} development</span>
                <span className="project-status">
                  <span aria-hidden="true" />
                  {project.status}
                </span>
              </div>
              <Link className="project-title" to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
                <ArrowUpRight size={24} aria-hidden="true" />
              </Link>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.technologies.slice(0, 4).map((technology) => (
                  <span key={technology} className="tech-chip">
                    {technology}
                  </span>
                ))}
              </div>
              <div className="project-card-footer">
                <Link to={`/projects/${project.id}`}>
                  Explore case study <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  )
}

function Skills() {
  const [category, setCategory] = useState('all')
  const categories =
    category === 'all' ? skillCategories : skillCategories.filter((item) => item.id === category)
  return (
    <div className="skills-panel">
      <Reveal className="skills-intro" direction="right">
        <p>
          Different tools.
          <br />
          <span>One connected experience.</span>
        </p>
        <span>
          The technologies I work with
          <br />
          across the development process.
        </span>
      </Reveal>
      <div className="filter-group skill-filters" aria-label="Filter technologies">
        <button aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
          All tools
        </button>
        {skillCategories.map((item) => (
          <button
            key={item.id}
            aria-pressed={category === item.id}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="skill-groups">
        {categories.map((group) => (
          <div key={group.id} className="skill-group">
            <Reveal className="skill-group-heading" direction="left">
              <h3>{group.label}</h3>
              <p>{group.description}</p>
            </Reveal>
            <div className="skill-grid">
              {group.skills.map((skill, index) => (
                <Reveal
                  key={skill}
                  className="skill-tile"
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={(index % 4) * 0.08}
                >
                  <TechIcon name={skill} />
                  <span>{skill}</span>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Reveal className="learning-note" direction="right">
        <Sparkles size={16} aria-hidden="true" />
        <p>
          On my learning radar: <strong>AI integrations & developer automation.</strong>
        </p>
        <span>STAY CURIOUS.</span>
      </Reveal>
    </div>
  )
}

function Showcase() {
  const [tab, setTab] = useState<'projects' | 'skills'>('projects')
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : index === 0 ? 1 : 0
    setTab(next === 0 ? 'projects' : 'skills')
    buttons.current[next]?.focus()
  }
  return (
    <section id="portfolio" className="showcase-section section-space">
      <div className="section-shell">
        <Reveal className="section-heading showcase-heading" direction="right">
          <div>
            <span className="eyebrow">
              <span className="section-index">02 /</span> SELECTED WORK & EVERYDAY TOOLS
            </span>
            <h2>
              A few things
              <br />
              <span>I’ve put together.</span>
            </h2>
          </div>
          <p>
            From the first idea to the last detail.
            <br />
            Here’s what I’m building with.
          </p>
        </Reveal>
        <div className="showcase-tabs" role="tablist" aria-label="Portfolio showcase">
          <button
            id="tab-projects"
            role="tab"
            aria-selected={tab === 'projects'}
            aria-controls="panel-projects"
            tabIndex={tab === 'projects' ? 0 : -1}
            ref={(node) => {
              buttons.current[0] = node
            }}
            onKeyDown={(event) => onKey(event, 0)}
            onClick={() => setTab('projects')}
          >
            <Code2 size={16} aria-hidden="true" /> Projects{' '}
            <span>{String(projects.length).padStart(2, '0')}</span>
          </button>
          <button
            id="tab-skills"
            role="tab"
            aria-selected={tab === 'skills'}
            aria-controls="panel-skills"
            tabIndex={tab === 'skills' ? 0 : -1}
            ref={(node) => {
              buttons.current[1] = node
            }}
            onKeyDown={(event) => onKey(event, 1)}
            onClick={() => setTab('skills')}
          >
            <Braces size={16} aria-hidden="true" /> Tech stack <span>↗</span>
          </button>
        </div>
        <div
          id="panel-projects"
          role="tabpanel"
          aria-labelledby="tab-projects"
          hidden={tab !== 'projects'}
        >
          <ProjectGrid />
        </div>
        <div
          id="panel-skills"
          role="tabpanel"
          aria-labelledby="tab-skills"
          hidden={tab !== 'skills'}
        >
          <Skills />
        </div>
      </div>
    </section>
  )
}

function Journey() {
  return (
    <section id="journey" className="journey-section section-shell section-space">
      <Reveal className="section-heading">
        <span className="eyebrow">
          <span className="section-index">03 /</span> THE PATH SO FAR
        </span>
        <h2>
          Every step
          <br />
          <span>adds something.</span>
        </h2>
      </Reveal>
      <div className="journey-layout">
        <Reveal className="journey-intro">
          <span className="journey-symbol" aria-hidden="true">
            ↗
          </span>
          <h3>
            From solving issues
            <br />
            to building solutions.
          </h3>
          <p>Education and hands-on experience, shaping how I approach the next challenge.</p>
          <a href={profile.resumeUrl} download>
            <Download size={16} aria-hidden="true" /> Download my resume{' '}
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </Reveal>
        <div className="timeline">
          {journey.map((entry, index) => (
            <Reveal
              className="timeline-entry"
              key={entry.id}
              direction="right"
              delay={index * 0.08}
            >
              <div className="timeline-marker" aria-hidden="true">
                {entry.kind === 'Education' ? <GraduationCap size={18} /> : <Monitor size={18} />}
              </div>
              <div className="timeline-top">
                <span className="eyebrow">{entry.kind}</span>
                <span>{entry.period}</span>
              </div>
              <h3>{entry.title}</h3>
              <p className="timeline-organization">{entry.organization}</p>
              <p>{entry.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const emailText = useRef<HTMLAnchorElement>(null)
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.publicEmail)
      setCopyState('copied')
    } catch {
      const range = document.createRange()
      if (emailText.current) {
        range.selectNodeContents(emailText.current)
        const selection = window.getSelection()
        selection?.removeAllRanges()
        selection?.addRange(range)
      }
      setCopyState('failed')
    }
  }
  return (
    <section id="contact" className="contact-section section-shell section-space">
      <Reveal>
        <div className="contact-kicker">
          <span className="eyebrow">
            <span className="section-index">04 /</span> LET’S START A CONVERSATION
          </span>
          <span className="contact-star" aria-hidden="true">
            ✳
          </span>
        </div>
        <h2>
          Have something
          <br />
          in mind<span>?</span>
        </h2>
      </Reveal>
      <div className="contact-bottom">
        <Reveal direction="left">
          <p>
            A project, an opportunity, or just a hello.
            <br />
            <span>My inbox is a good place to start.</span>
          </p>
          <MagneticLink
            href={`mailto:${profile.publicEmail}`}
            className="button-primary contact-cta"
          >
            Let’s talk about it <ArrowUpRight size={20} aria-hidden="true" />
          </MagneticLink>
        </Reveal>
        <Reveal className="contact-links" direction="right" delay={0.08}>
          <div className="email-row">
            <a ref={emailText} href={`mailto:${profile.publicEmail}`}>
              {profile.publicEmail}
            </a>
            <button className="icon-button" aria-label="Copy email" onClick={copyEmail}>
              {copyState === 'copied' ? <CheckCheck size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <div className="copy-status" role="status">
            {copyState === 'copied'
              ? 'Email copied'
              : copyState === 'failed'
                ? 'Email selected. Copy it or open the email link.'
                : ''}
          </div>
          <a className="contact-social" href={profile.githubUrl} target="_blank" rel="noreferrer">
            <span>
              <Github size={18} aria-hidden="true" /> Find me on GitHub
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <div className="contact-signoff">
            <Mail size={14} aria-hidden="true" />
            <span>Good conversations can lead to great things.</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function HomePage({ introComplete }: { introComplete: boolean }) {
  return (
    <main id="main-content" tabIndex={-1}>
      <Hero introComplete={introComplete} />
      <DisciplineStrip />
      <div className="reveal-content">
        <About />
        <Showcase />
        <Journey />
        <Contact />
      </div>
      <div className="closing-line section-shell">
        <Check size={13} aria-hidden="true" /> Small details. Lasting impressions.
      </div>
    </main>
  )
}
