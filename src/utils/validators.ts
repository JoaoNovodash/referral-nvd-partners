export type ValidatorFn = (value: string) => string

export const validators: Record<string, ValidatorFn> = {
  referrerName: (val) => val.trim().length >= 2 ? '' : 'Informe seu nome completo.',
  referrerAcademy: (val) => val.trim().length >= 2 ? '' : 'Informe o nome da sua academia.',
  referrerEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ? '' : 'Informe um e-mail válido.',
  leadAcademy: (val) => val.trim().length >= 2 ? '' : 'Informe o nome da academia indicada.',
  leadOwner: (val) => val.trim().length >= 2 ? '' : 'Informe o nome do dono.',
  leadPhone: (val) => val.replace(/\D/g, '').length >= 10 ? '' : 'Informe um telefone válido.',
  leadInstagram: (val) => val.replace('@', '').trim().length >= 2 ? '' : 'Informe o Instagram da academia.',
}

export function validateFields(fields: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {}
  for (const [name, value] of Object.entries(fields)) {
    const validator = validators[name]
    if (validator) {
      const error = validator(value)
      if (error) errors[name] = error
    }
  }
  return errors
}
