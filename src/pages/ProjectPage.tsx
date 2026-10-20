import { useEffect } from 'react'
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Check, Layers3 } from 'lucide-react'
import Github from '../components/GithubIcon'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/portfolio'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>()
  const project = projects.find((item) => item.id === id)

  useEffect(() => {
    if (!project) return

    const previousTitle = document.title
    document.title = `${project.title} — Mark Angelo Dela Cruz`
    return () => {
      document.title = previousTitle
    }
  }, [project])

  if (!project) return <NotFoundPage />

  const projectIndex = projects.findIndex((item) => item.id === project.id)
  const nextProject = projects[(projectIndex + 1) % projects.length]

  return (
    <main id="main-content" className="case-page section-shell" tabIndex={-1}>
      <Link to="/#portfolio" className="case-back">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to selected work
      </Link>

      <header className="case-header">
        <div className="case-kicker">
          <span className="eyebrow">
            Project notes / {String(projectIndex + 1).padStart(2, '0')}
          </span>
          <span className="case-status">{project.status}</span>
        </div>
        <h1>
          {project.title}
          <span className="case-title-dot" aria-hidden="true">
            .
          </span>
        </h1>
        <div className="case-header-bottom">
          <p className="case-description">{project.description}</p>
          <ArrowDownRight
            className="case-header-arrow"
            size={64}
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
        {(project.liveUrl || project.githubUrl) && (
          <div className="case-actions">
            {project.liveUrl && (
              <a
                className="button button-primary"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                View live project <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            )}
            {project.githubUrl && (
              <a
                className="button button-secondary"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} aria-hidden="true" /> View repository
              </a>
            )}
          </div>
        )}
      </header>

      <div
        className={`case-cover case-cover-${project.id}`}
        aria-label={`${project.title} project identity`}
      >
        {project.image ? (
          <img src={project.image} alt={`${project.title} application preview`} />
        ) : (
          <div className="case-identity">
            <span className="case-identity-label">
              {project.category} /{' '}
              {project.id === 'closetiq' ? 'Clothing management' : 'Personal portfolio'}
            </span>
            <span className="case-identity-wordmark" aria-hidden="true">
              {project.id === 'closetiq' ? (
                <>
                  closet<span>IQ</span>
                </>
              ) : (
                <>
                  mark<span>.dev</span>
                </>
              )}
            </span>
            <span className="case-identity-footnote">
              Project identity · Application screenshots pending
            </span>
          </div>
        )}
      </div>

      <div className="case-body">
        <aside className="case-facts" aria-label="Project details">
          <div>
            <span className="eyebrow">Discipline</span>
            <p>{project.category} development</p>
          </div>
          <div>
            <span className="eyebrow">Status</span>
            <p>{project.status}</p>
          </div>
          <div>
            <span className="eyebrow">Built with</span>
            <div className="case-technologies">
              {project.technologies.map((technology) => (
                <span className="tech-chip" key={technology}>
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </aside>

        <div className="case-story">
          <section aria-labelledby="case-overview-title">
            <span className="eyebrow">01 / The project</span>
            <h2 id="case-overview-title">From idea to application.</h2>
            <p>{project.summary}</p>
          </section>

          {project.features.length > 0 && (
            <section aria-labelledby="case-features-title">
              <span className="eyebrow">02 / Current scope</span>
              <h2 id="case-features-title">Inside the experience.</h2>
              <ul className="case-feature-list">
                {project.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.plannedFeatures.length > 0 && (
            <section aria-labelledby="case-planned-title">
              <span className="eyebrow">Future direction</span>
              <h2 id="case-planned-title">Planned, not yet shipped.</h2>
              <ul className="case-feature-list case-planned-list">
                {project.plannedFeatures.map((feature) => (
                  <li key={feature}>
                    <Layers3 size={17} aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <aside className="case-evidence" aria-label="Project verification note">
            <span className="eyebrow">A note on this case study</span>
            <p>{project.evidenceNote}</p>
          </aside>
        </div>
      </div>

      {nextProject && nextProject.id !== project.id && (
        <Link className="case-next" to={`/projects/${nextProject.id}`}>
          <div>
            <span className="eyebrow">Next project</span>
            <h2>{nextProject.title}</h2>
          </div>
          <ArrowUpRight size={42} strokeWidth={1.25} aria-hidden="true" />
        </Link>
      )}
    </main>
  )
}
