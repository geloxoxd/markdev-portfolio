import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { MotionConfig, motion, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowUp, ArrowUpRight, Command, Mail, Menu, Search, X } from 'lucide-react'
import Github from './components/GithubIcon'
import SocialIcon from './components/SocialIcon'
import Introduction from './components/Introduction'
import { profile, socialLinks } from './data/portfolio'
import HomePage from './pages/HomePage'

const ProjectPage = lazy(() => import('./pages/ProjectPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'portfolio', label: 'Work' },
  { id: 'journey', label: 'Journey' },
  { id: 'contact', label: 'Contact' },
]

function RouteEffects() {
  const { pathname, hash } = useLocation()
  const previousPath = useRef(pathname)
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
      else if (previousPath.current !== pathname) window.scrollTo({ top: 0, behavior: 'instant' })
      previousPath.current = pathname
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])
  return null
}

function Header({ onCommand }: { onCommand: () => void }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const { pathname } = useLocation()
  useEffect(() => {
    const surface = header.current
    if (!surface) return
    const finePointer = window.matchMedia('(any-hover: hover) and (any-pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let previousTime = 0
    let active = false
    let initialized = false
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    function paint() {
      surface!.style.setProperty('--glass-x', `${x.toFixed(2)}px`)
      surface!.style.setProperty('--glass-y', `${y.toFixed(2)}px`)
    }
    function follow(time: number) {
      frame = 0
      if (!active || reducedMotion.matches) return
      const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16
      previousTime = time
      const ease = 1 - Math.exp(-elapsed / 50)
      x += (targetX - x) * ease
      y += (targetY - y) * ease
      paint()
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.1) {
        frame = requestAnimationFrame(follow)
      }
    }
    function clear() {
      active = false
      cancelAnimationFrame(frame)
      frame = 0
      previousTime = 0
      surface!.removeAttribute('data-glass-active')
    }
    function move(event: PointerEvent) {
      if (event.pointerType !== 'mouse' || !finePointer.matches) return
      const bounds = surface!.getBoundingClientRect()
      targetX = event.clientX - bounds.left
      targetY = event.clientY - bounds.top
      if (targetX < 0 || targetX > bounds.width || targetY < 0 || targetY > bounds.height) {
        clear()
        return
      }
      active = true
      surface!.setAttribute('data-glass-active', 'true')
      if (reducedMotion.matches) {
        surface!.style.setProperty('--glass-x', '50%')
        surface!.style.setProperty('--glass-y', '50%')
        return
      }
      // Keep pointer animation outside React state and stop rendering once it settles.
      if (!initialized) {
        x = targetX
        y = targetY
        initialized = true
        paint()
      }
      if (!frame) {
        previousTime = 0
        frame = requestAnimationFrame(follow)
      }
    }
    surface.addEventListener('pointerenter', move)
    surface.addEventListener('pointermove', move)
    surface.addEventListener('pointerleave', clear)
    surface.addEventListener('pointercancel', clear)
    finePointer.addEventListener('change', clear)
    reducedMotion.addEventListener('change', clear)
    window.addEventListener('blur', clear)
    return () => {
      clear()
      surface.removeEventListener('pointerenter', move)
      surface.removeEventListener('pointermove', move)
      surface.removeEventListener('pointerleave', clear)
      surface.removeEventListener('pointercancel', clear)
      finePointer.removeEventListener('change', clear)
      reducedMotion.removeEventListener('change', clear)
      window.removeEventListener('blur', clear)
      surface.style.removeProperty('--glass-x')
      surface.style.removeProperty('--glass-y')
    }
  }, [])
  useEffect(() => {
    if (pathname !== '/') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0 },
    )
    navigation.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [pathname])
  return (
    <header
      ref={header}
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
    >
      <Link
        className="wordmark"
        to="/#home"
        aria-label="mark.dev home"
        onClick={() => setOpen(false)}
      >
        mark<span>.dev</span>
        <span className="wordmark-dot" aria-hidden="true" />
      </Link>
      <nav
        className={open ? 'main-navigation is-open' : 'main-navigation'}
        id="main-navigation"
        aria-label="Main navigation"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false)
            toggle.current?.focus()
          }
        }}
      >
        {navigation.map(({ id, label }) => (
          <Link
            key={id}
            to={`/#${id}`}
            className={pathname === '/' && active === id ? 'nav-link active' : 'nav-link'}
            aria-current={pathname === '/' && active === id ? 'location' : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <button className="command-trigger" aria-label="Open quick navigation" onClick={onCommand}>
          <Command size={15} />
          <span>K</span>
        </button>
        <a className="header-contact" href={`mailto:${profile.publicEmail}`}>
          Let’s talk <ArrowUpRight size={14} aria-hidden="true" />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={open}
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  )
}

function QuickNavigation({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const search = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  useEffect(() => {
    if (open) {
      dialog.current?.showModal()
      search.current?.focus()
    } else dialog.current?.close()
  }, [open])
  return (
    <dialog
      ref={dialog}
      className="command-dialog"
      aria-labelledby="command-title"
      onClose={() => {
        setQuery('')
        onClose()
      }}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close()
      }}
    >
      <div className="command-heading">
        <h2 id="command-title">Where to?</h2>
        <button
          className="icon-button"
          aria-label="Close quick navigation"
          onClick={() => dialog.current?.close()}
        >
          <X size={18} />
        </button>
      </div>
      <div className="command-search">
        <Search size={18} aria-hidden="true" />
        <input
          ref={search}
          aria-label="Search navigation"
          placeholder="Find your way around…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="command-results">
        {navigation
          .filter(({ label }) => label.toLowerCase().includes(query.toLowerCase()))
          .map(({ id, label }, index) => (
            <Link key={id} to={`/#${id}`} onClick={() => dialog.current?.close()}>
              <span>
                <span className="command-number">0{index + 1}</span>
                {label === 'Work' ? 'Selected work' : label}
              </span>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        {navigation.every(({ label }) => !label.toLowerCase().includes(query.toLowerCase())) && (
          <p className="command-empty">No section found. Try “work” or “contact”.</p>
        )}
      </div>
      <p className="command-hint">
        Tab to navigate <span>Esc to close</span>
      </p>
    </dialog>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-top">
        <Link className="wordmark" to="/#home">
          mark<span>.dev</span>
        </Link>
        <p>
          Built with care.
          <br />
          Always a work in progress.
        </p>
        <a
          href="#"
          className="back-top"
          onClick={(event) => {
            event.preventDefault()
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
                ? 'instant'
                : 'smooth',
            })
          }}
          aria-label="Back to top"
        >
          <ArrowUp size={19} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Mark Angelo Dela Cruz</span>
        <div className="footer-social-links">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github size={14} aria-hidden="true" /> GitHub
          </a>
          <a
            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.publicEmail)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail size={14} aria-hidden="true" /> Email
          </a>
          {socialLinks.map(({ platform, label, url }) => (
            <a key={platform} href={url} target="_blank" rel="noopener noreferrer">
              <SocialIcon platform={platform} aria-hidden="true" /> {label}
            </a>
          ))}
        </div>
        <span className="footer-note">DESIGNED & DEVELOPED WITH INTENTION</span>
      </div>
    </footer>
  )
}

export default function App() {
  const [commandOpen, setCommandOpen] = useState(false)
  const [introComplete, setIntroComplete] = useState(false)
  const completeIntroduction = useCallback(() => setIntroComplete(true), [])
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 })
  const reduced = useReducedMotion()
  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((value) => !value)
      }
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <motion.div
        className="reading-progress"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
        aria-hidden="true"
      />
      <Introduction onComplete={completeIntroduction} />
      <Header onCommand={() => setCommandOpen(true)} />
      <RouteEffects />
      <Suspense
        fallback={
          <main className="route-loading section-shell" id="main-content">
            <p>Opening project…</p>
          </main>
        }
      >
        <Routes>
          <Route path="/" element={<HomePage introComplete={introComplete} />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
      <QuickNavigation open={commandOpen} onClose={() => setCommandOpen(false)} />
    </MotionConfig>
  )
}
