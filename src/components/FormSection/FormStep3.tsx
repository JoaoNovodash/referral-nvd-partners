import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface FormStep3Props {
  consentValue: 'yes' | 'no' | null
  onConsentChange: (value: 'yes' | 'no') => void
  onBack: () => void
  onSubmit: () => void
  isSubmitting: boolean
  prefersReducedMotion: boolean
}

export default function FormStep3({ consentValue, onConsentChange, onBack, onSubmit, isSubmitting, prefersReducedMotion }: FormStep3Props) {
  const warningRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (consentValue === 'no' && warningRef.current && !prefersReducedMotion) {
      gsap.fromTo(warningRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }, [consentValue, prefersReducedMotion])

  return (
    <div className="form-step form-step--active" data-form-step="3">
      <div className="form-step__header">
        <h3 className="form-step__title">Última etapa!</h3>
        <p className="form-step__desc">A academia indicada já sabe que entraremos em contato em seu nome?</p>
      </div>

      <div className="consent-options">
        <label className="consent-card" data-consent="yes">
          <input
            type="radio"
            name="consent"
            value="yes"
            className="consent-card__input"
            checked={consentValue === 'yes'}
            onChange={() => onConsentChange('yes')}
          />
          <div className="consent-card__body">
            <div className="consent-card__icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M7 14.5l5 5L21 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="consent-card__text">
              <strong>Sim, já avisei!</strong>
              <span>A academia sabe que a Novo Dash entrará em contato.</span>
            </div>
          </div>
        </label>

        <label className="consent-card" data-consent="no">
          <input
            type="radio"
            name="consent"
            value="no"
            className="consent-card__input"
            checked={consentValue === 'no'}
            onChange={() => onConsentChange('no')}
          />
          <div className="consent-card__body">
            <div className="consent-card__icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 9v6m0 4h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="consent-card__text">
              <strong>Ainda não</strong>
              <span>Preciso avisar antes de enviar a indicação.</span>
            </div>
          </div>
        </label>
      </div>

      {/* Warning for "No" */}
      {consentValue === 'no' && (
        <div className="consent-warning" ref={warningRef}>
          <div className="consent-warning__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 9v4m0 4h.01M12 3l9.66 16.59a1 1 0 01-.87 1.49H3.21a1 1 0 01-.87-1.49L12 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="consent-warning__content">
            <strong>Falta só um detalhe!</strong>
            <p>Para garantirmos uma abordagem ética e eficiente, e para que sua pontuação no programa Partners seja validada, pedimos que dê um "alô" rápido para eles avisando que a Novo Dash entrará em contato. Assim que avisá-los, pode voltar aqui e concluir!</p>
          </div>
        </div>
      )}

      <div className="form-actions form-actions--split">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M16 10H4m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          VOLTAR
        </button>
        <button
          type="button"
          className="btn btn--primary"
          disabled={consentValue !== 'yes' || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? 'ENVIANDO...' : (
            <>
              ENVIAR INDICAÇÃO
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
