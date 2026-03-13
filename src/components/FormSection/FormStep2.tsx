import { applyPhoneMask } from '../../utils/phoneMask'

interface FormStep2Props {
  values: { leadAcademy: string; leadOwner: string; leadPhone: string; leadInstagram: string }
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onBlur: (field: string) => void
  onNext: () => void
  onBack: () => void
}

export default function FormStep2({ values, errors, onChange, onBlur, onNext, onBack }: FormStep2Props) {
  function handlePhoneChange(val: string) {
    onChange('leadPhone', applyPhoneMask(val))
  }

  function handleInstagramChange(val: string) {
    onChange('leadInstagram', val.startsWith('@') ? val.slice(1) : val)
  }

  return (
    <div className="form-step form-step--active" data-form-step="2">
      <div className="form-step__header">
        <h3 className="form-step__title">Para quem você está indicando?</h3>
        <p className="form-step__desc">Dados da academia que você quer indicar.</p>
      </div>

      <div className="form-group">
        <label htmlFor="leadAcademy" className="form-label">Nome da Academia</label>
        <input
          type="text"
          id="leadAcademy"
          name="leadAcademy"
          className={`form-input${errors.leadAcademy ? ' form-input--error' : ''}`}
          required
          placeholder="Nome da academia indicada"
          value={values.leadAcademy}
          onChange={(e) => onChange('leadAcademy', e.target.value)}
          onBlur={() => onBlur('leadAcademy')}
        />
        <span className={`form-error${errors.leadAcademy ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.leadAcademy || ''}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="leadOwner" className="form-label">Nome do Dono</label>
        <input
          type="text"
          id="leadOwner"
          name="leadOwner"
          className={`form-input${errors.leadOwner ? ' form-input--error' : ''}`}
          required
          placeholder="Nome completo do proprietário"
          value={values.leadOwner}
          onChange={(e) => onChange('leadOwner', e.target.value)}
          onBlur={() => onBlur('leadOwner')}
        />
        <span className={`form-error${errors.leadOwner ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.leadOwner || ''}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="leadPhone" className="form-label">Telefone de Contato</label>
        <input
          type="tel"
          id="leadPhone"
          name="leadPhone"
          className={`form-input${errors.leadPhone ? ' form-input--error' : ''}`}
          required
          placeholder="(00) 00000-0000"
          value={values.leadPhone}
          onChange={(e) => handlePhoneChange(e.target.value)}
          onBlur={() => onBlur('leadPhone')}
        />
        <span className={`form-error${errors.leadPhone ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.leadPhone || ''}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="leadInstagram" className="form-label">Instagram da Academia</label>
        <div className="form-input-wrapper">
          <span className="form-input-prefix">@</span>
          <input
            type="text"
            id="leadInstagram"
            name="leadInstagram"
            className={`form-input form-input--prefix${errors.leadInstagram ? ' form-input--error' : ''}`}
            required
            placeholder="nomedaacademia"
            value={values.leadInstagram}
            onChange={(e) => handleInstagramChange(e.target.value)}
            onBlur={() => onBlur('leadInstagram')}
          />
        </div>
        <span className={`form-error${errors.leadInstagram ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.leadInstagram || ''}
        </span>
      </div>

      <div className="form-actions form-actions--split">
        <button type="button" className="btn btn--ghost" onClick={onBack}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M16 10H4m0 0l4-4m-4 4l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          VOLTAR
        </button>
        <button type="button" className="btn btn--primary" onClick={onNext}>
          PRÓXIMO
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
