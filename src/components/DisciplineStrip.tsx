import { useRef, useState } from 'react'
import { useInView } from 'motion/react'
import { Pause, Play } from 'lucide-react'

const disciplines = ['DESIGN', 'DEVELOP', 'ITERATE', 'KEEP LEARNING']
const rows = [disciplines, [...disciplines.slice(2), ...disciplines.slice(0, 2)]]

export default function DisciplineStrip() {
  const element = useRef<HTMLDivElement>(null)
  const inView = useInView(element, { margin: '80px' })
  const [paused, setPaused] = useState(false)

  return (
    <div ref={element} className="discipline-strip" data-in-view={inView} data-paused={paused}>
      <div className="discipline-marquee" aria-hidden="true">
        {rows.map((labels, row) => (
          <div className="discipline-row" key={row}>
            <div className="discipline-track">
              {[0, 1].map((copy) => (
                <div className="discipline-group" key={copy}>
                  {labels.map((label) => (
                    <span className="discipline-item" key={label}>
                      {label}
                      <svg className="discipline-star" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 1v22M1 12h22M4.2 4.2l15.6 15.6M4.2 19.8 19.8 4.2"
                          stroke="currentColor"
                          strokeWidth="1.3"
                        />
                      </svg>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="discipline-pause"
        aria-label={paused ? 'Resume scrolling text' : 'Pause scrolling text'}
        aria-pressed={paused}
        title={paused ? 'Resume scrolling text' : 'Pause scrolling text'}
        onClick={() => setPaused((current) => !current)}
      >
        {paused ? <Play size={13} aria-hidden="true" /> : <Pause size={13} aria-hidden="true" />}
      </button>
    </div>
  )
}
