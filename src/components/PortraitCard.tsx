import { useId } from 'react'
import { profile } from '../data/portfolio'
import useLanyard from '../hooks/useLanyard'

export default function PortraitCard({ ready }: { ready: boolean }) {
  const { stage, rig, cord, body, card } = useLanyard(ready)
  const id = useId()
  const pathId = `lanyard-path-${id}`
  const instructionsId = `lanyard-help-${id}`

  return (
    <div className="portrait-stage" ref={stage}>
      <span className="portrait-coordinate">PERSONAL EDITION / 001</span>
      <div className="portrait-orbit orbit-one" aria-hidden="true" />
      <div className="portrait-orbit orbit-two" aria-hidden="true" />
      <div className="lanyard-rig" ref={rig} data-ready={ready} data-drag-state="idle">
        <svg className="lanyard-strap" ref={cord} aria-hidden="true">
          <path data-cord-path="" d="M139 0V257" stroke="#45453f" strokeWidth="28" fill="none" />
          <path data-cord-path="" d="M139 0V257" stroke="#20201e" strokeWidth="25" fill="none" />
          <path
            data-cord-path=""
            id={pathId}
            d="M139 0V257"
            stroke="#2a2a26"
            strokeWidth="15"
            fill="none"
          />
          <text className="lanyard-lettering" dy="-1">
            <textPath href={`#${pathId}`} startOffset="12">
              MARKDEV — DESIGN / DEVELOP / ITERATE — MARKDEV
            </textPath>
          </text>
        </svg>
        <div className="lanyard-body" ref={body}>
          <div className="lanyard-clip" aria-hidden="true" />
          <button
            className="identity-card"
            ref={card}
            type="button"
            aria-describedby={instructionsId}
            title="Drag the ID card and release to swing"
            aria-pressed="false"
            tabIndex={ready ? 0 : -1}
          >
            <span className="identity-top">
              <span>MARK / DEV</span>
              <span>PORTFOLIO</span>
            </span>
            <span className="identity-photo">
              <img
                src={profile.idPortraitUrl}
                alt="Mark Angelo Dela Cruz wearing a black jacket in a mirror portrait"
                width="3024"
                height="4032"
                fetchPriority="high"
                draggable="false"
              />
            </span>
            <span className="identity-bottom">
              <span>
                <strong>Mark Angelo</strong>
                <span className="identity-role">FULL-STACK DEVELOPER</span>
              </span>
              <svg viewBox="0 0 35 25" aria-hidden="true">
                <path
                  d="M2 2v21M6 2v21M9 2v21M15 2v21M18 2v21M21 2v21M27 2v21M32 2v21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <span className="sr-only" id={instructionsId}>
        Drag the card and release to swing. With a keyboard, use arrow keys to move it, Enter or
        Space to release, and Escape or Home to reset.
      </span>
      <div className="portrait-caption">
        <span className="crosshair" aria-hidden="true">
          +
        </span>
        <p>
          Learning by building.
          <br />
          <span>One idea at a time.</span>
        </p>
      </div>
      <span className="portrait-side-note">A HUMAN BEHIND THE CODE</span>
    </div>
  )
}
