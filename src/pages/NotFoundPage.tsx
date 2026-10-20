import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main id="main-content" className="notfound-page section-shell" tabIndex={-1}>
      <span className="eyebrow">A little off the grid</span>
      <p className="notfound-code" aria-hidden="true">
        404
      </p>
      <h1>This page took a different route.</h1>
      <p className="notfound-description">
        The link may have changed. Head back home or explore a project while you’re here.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="button button-primary">
          <ArrowLeft size={17} aria-hidden="true" /> Back to home
        </Link>
        <Link to="/#portfolio" className="button button-secondary">
          Explore projects <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}
