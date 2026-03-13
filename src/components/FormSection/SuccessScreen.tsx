import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface SuccessScreenProps {
  academyName: string
  onNewReferral: () => void
  prefersReducedMotion: boolean
}

export default function SuccessScreen({ academyName, onNewReferral, prefersReducedMotion }: SuccessScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

    if (iconRef.current) {
      gsap.fromTo(iconRef.current.querySelector('svg'),
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(1.4)', delay: 0.15 }
      )
    }

    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [prefersReducedMotion])

  return (
    <div className="success-screen" ref={containerRef}>
      <div className="success-screen__icon" ref={iconRef}>
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="30" stroke="#FFDB0D" strokeWidth="3" />
          <path d="M20 33l8 8L44 25" stroke="#FFDB0D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="success-screen__title">INDICAÇÃO ENVIADA!</h3>
      <p className="success-screen__text">
        Nossa equipe comercial entrará em contato com a <strong>{academyName}</strong> em até 24h.
      </p>
      <p className="success-screen__status">
        Você receberá uma atualização assim que a reunião for agendada.
      </p>
      <button type="button" className="btn btn--primary btn--full" onClick={onNewReferral}>
        INDICAR OUTRA ACADEMIA
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12m-6-6h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
