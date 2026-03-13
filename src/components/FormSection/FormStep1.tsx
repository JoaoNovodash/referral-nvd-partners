interface FormStep1Props {
  values: { referrerName: string; referrerAcademy: string; referrerEmail: string }
  errors: Record<string, string>
  onChange: (field: string, value: string) => void
  onBlur: (field: string) => void
  onNext: () => void
}

export default function FormStep1({ values, errors, onChange, onBlur, onNext }: FormStep1Props) {
  return (
    <div className="form-step form-step--active" data-form-step="1">
      <div className="form-step__header">
        <h3 className="form-step__title">Quem está indicando?</h3>
        <p className="form-step__desc">Informe seus dados como cliente Novo Dash.</p>
      </div>

      <div className="form-group">
        <label htmlFor="referrerName" className="form-label">Nome Completo</label>
        <input
          type="text"
          id="referrerName"
          name="referrerName"
          className={`form-input${errors.referrerName ? ' form-input--error' : ''}`}
          required
          autoComplete="name"
          placeholder="Seu nome completo"
          value={values.referrerName}
          onChange={(e) => onChange('referrerName', e.target.value)}
          onBlur={() => onBlur('referrerName')}
        />
        <span className={`form-error${errors.referrerName ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.referrerName || ''}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="referrerAcademy" className="form-label">Nome da sua Academia</label>
        <input
          type="text"
          id="referrerAcademy"
          name="referrerAcademy"
          className={`form-input${errors.referrerAcademy ? ' form-input--error' : ''}`}
          required
          placeholder="Ex: CT Gracie Barra"
          value={values.referrerAcademy}
          onChange={(e) => onChange('referrerAcademy', e.target.value)}
          onBlur={() => onBlur('referrerAcademy')}
        />
        <span className={`form-error${errors.referrerAcademy ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.referrerAcademy || ''}
        </span>
      </div>

      <div className="form-group">
        <label htmlFor="referrerEmail" className="form-label">E-mail (cadastrado na Novo Dash)</label>
        <input
          type="email"
          id="referrerEmail"
          name="referrerEmail"
          className={`form-input${errors.referrerEmail ? ' form-input--error' : ''}`}
          required
          autoComplete="email"
          placeholder="seuemail@exemplo.com"
          value={values.referrerEmail}
          onChange={(e) => onChange('referrerEmail', e.target.value)}
          onBlur={() => onBlur('referrerEmail')}
        />
        <span className={`form-error${errors.referrerEmail ? ' form-error--visible' : ''}`} aria-live="polite">
          {errors.referrerEmail || ''}
        </span>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn--primary btn--full" onClick={onNext}>
          PRÓXIMO
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h12m0 0l-4-4m4 4l-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
