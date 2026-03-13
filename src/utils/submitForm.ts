import type { SubmissionPayload } from '../types/form'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

export async function submitReferral(data: SubmissionPayload): Promise<void> {
  if (FORM_ENDPOINT) {
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
  } else {
    console.log('Form data (no endpoint configured):', data)
  }
}
