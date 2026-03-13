export interface ReferrerData {
  referrerName: string
  referrerAcademy: string
  referrerEmail: string
}

export interface LeadData {
  leadAcademy: string
  leadOwner: string
  leadPhone: string
  leadInstagram: string
}

export interface FormState {
  referrer: ReferrerData
  lead: LeadData
  consent: 'yes' | 'no' | null
}

export interface SubmissionPayload {
  referrer: {
    name: string
    academy: string
    email: string
  }
  lead: {
    academy: string
    owner: string
    phone: string
    instagram: string
  }
  consent: string
  timestamp: string
}
