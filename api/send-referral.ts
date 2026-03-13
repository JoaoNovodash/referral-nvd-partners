import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const RECIPIENTS = [
  'mafra@novodash.com',
  'guilherme@novodash.com',
  'pedro.ambrozio@novodash.com',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { referrer, lead, consent, timestamp } = req.body

    if (!referrer || !lead || consent !== 'yes') {
      return res.status(400).json({ error: 'Dados inválidos' })
    }

    const { data, error } = await resend.emails.send({
      from: 'Novo Dash Partners <partners@novodash.com>',
      to: RECIPIENTS,
      subject: `Nova Indicação Partners — ${lead.academy}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #FFDB0D; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; color: #0C0C0C; font-size: 22px;">Nova Indicação Recebida</h1>
          </div>

          <div style="background: #161616; padding: 32px; color: #F1F1F1; border-radius: 0 0 8px 8px;">
            <h2 style="color: #FFDB0D; font-size: 16px; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em;">
              Quem indicou
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55); width: 140px;">Nome</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${referrer.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55);">Academia</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${referrer.academy}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55);">E-mail</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${referrer.email}</td>
              </tr>
            </table>

            <h2 style="color: #FFDB0D; font-size: 16px; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em;">
              Academia indicada
            </h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 28px;">
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55); width: 140px;">Academia</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${lead.academy}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55);">Dono</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${lead.owner}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55);">Telefone</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${lead.phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: rgba(241,241,241,0.55);">Instagram</td>
                <td style="padding: 8px 0; color: #F1F1F1;">${lead.instagram}</td>
              </tr>
            </table>

            <div style="padding: 16px; background: rgba(255,219,13,0.08); border: 1px solid rgba(255,219,13,0.2); border-radius: 6px; font-size: 13px; color: rgba(241,241,241,0.55);">
              Consentimento: <strong style="color: #FFDB0D;">Sim, a academia foi avisada</strong><br/>
              Enviado em: ${new Date(timestamp).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
            </div>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return res.status(500).json({ error: 'Falha ao enviar email' })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Server error:', err)
    return res.status(500).json({ error: 'Erro interno' })
  }
}
