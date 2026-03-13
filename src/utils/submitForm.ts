import type { SubmissionPayload } from '../types/form'

export async function submitReferral(data: SubmissionPayload): Promise<void> {
  const res = await fetch('/api/send-referral', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Falha ao enviar indicação')
  }
}
