import { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import Stepper from './Stepper'
import FormStep1 from './FormStep1'
import FormStep2 from './FormStep2'
import FormStep3 from './FormStep3'
import SuccessScreen from './SuccessScreen'
import { validators } from '../../utils/validators'
import { submitReferral } from '../../utils/submitForm'
import type { FormState, SubmissionPayload } from '../../types/form'

const TOTAL_STEPS = 3

const initialReferrer = { referrerName: '', referrerAcademy: '', referrerEmail: '' }
const initialLead = { leadAcademy: '', leadOwner: '', leadPhone: '', leadInstagram: '' }

interface FormSectionProps {
  prefersReducedMotion: boolean
}

export default function FormSection({ prefersReducedMotion }: FormSectionProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormState>({
    referrer: { ...initialReferrer },
    lead: { ...initialLead },
    consent: null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedAcademyName, setSubmittedAcademyName] = useState('')

  const stepRef = useRef<HTMLDivElement>(null)

  // Animate step transitions
  useEffect(() => {
    if (isSubmitted || prefersReducedMotion) return
    if (stepRef.current) {
      gsap.fromTo(stepRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [currentStep, isSubmitted, prefersReducedMotion])

  const handleFieldChange = useCallback((field: string, value: string) => {
    // Determine if referrer or lead field
    if (field.startsWith('referrer')) {
      setFormData(prev => ({
        ...prev,
        referrer: { ...prev.referrer, [field]: value },
      }))
    } else if (field.startsWith('lead')) {
      setFormData(prev => ({
        ...prev,
        lead: { ...prev.lead, [field]: value },
      }))
    }

    // Clear error on change if errored
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }, [errors])

  const handleBlur = useCallback((field: string) => {
    const value = field.startsWith('referrer')
      ? formData.referrer[field as keyof typeof formData.referrer]
      : formData.lead[field as keyof typeof formData.lead]

    const validator = validators[field]
    if (validator) {
      const error = validator(value)
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }))
      } else {
        setErrors(prev => {
          const next = { ...prev }
          delete next[field]
          return next
        })
      }
    }
  }, [formData])

  function validateStep(step: number): boolean {
    const fields = step === 1 ? formData.referrer : formData.lead
    const newErrors: Record<string, string> = {}
    let valid = true

    for (const [field, value] of Object.entries(fields)) {
      const validator = validators[field]
      if (validator) {
        const error = validator(value)
        if (error) {
          newErrors[field] = error
          valid = false
        }
      }
    }

    setErrors(prev => ({ ...prev, ...newErrors }))
    return valid
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS))
    }
  }

  function handleBack() {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  function handleConsentChange(value: 'yes' | 'no') {
    setFormData(prev => ({ ...prev, consent: value }))
  }

  async function handleSubmit() {
    if (!validateStep(1) || !validateStep(2)) return
    if (formData.consent !== 'yes') return

    setIsSubmitting(true)

    const payload: SubmissionPayload = {
      referrer: {
        name: formData.referrer.referrerName.trim(),
        academy: formData.referrer.referrerAcademy.trim(),
        email: formData.referrer.referrerEmail.trim(),
      },
      lead: {
        academy: formData.lead.leadAcademy.trim(),
        owner: formData.lead.leadOwner.trim(),
        phone: formData.lead.leadPhone.trim(),
        instagram: '@' + formData.lead.leadInstagram.replace('@', '').trim(),
      },
      consent: formData.consent,
      timestamp: new Date().toISOString(),
    }

    try {
      await submitReferral(payload)
    } catch (err) {
      console.error('Submission error:', err)
    }

    setSubmittedAcademyName(payload.lead.academy)
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  function handleNewReferral() {
    setFormData(prev => ({
      ...prev,
      lead: { ...initialLead },
      consent: null,
    }))
    setErrors({})
    setIsSubmitted(false)
    setCurrentStep(2)

    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="form-section" id="formulario">
      <div className="form-section__pattern" aria-hidden="true"></div>
      <div className="container">
        <h2 className="form-section__heading">
          ENVIE SUA<br />
          <span className="text-circle-wrap">
            INDICAÇÃO
            <span className="circle-deco circle-deco--3" aria-hidden="true"></span>
          </span>
        </h2>

        {!isSubmitted && (
          <Stepper currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        )}

        <div className="form-wrapper">
          {isSubmitted ? (
            <SuccessScreen
              academyName={submittedAcademyName}
              onNewReferral={handleNewReferral}
              prefersReducedMotion={prefersReducedMotion}
            />
          ) : (
            <form noValidate onSubmit={(e) => e.preventDefault()}>
              <div ref={stepRef}>
                {currentStep === 1 && (
                  <FormStep1
                    values={formData.referrer}
                    errors={errors}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 2 && (
                  <FormStep2
                    values={formData.lead}
                    errors={errors}
                    onChange={handleFieldChange}
                    onBlur={handleBlur}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 3 && (
                  <FormStep3
                    consentValue={formData.consent}
                    onConsentChange={handleConsentChange}
                    onBack={handleBack}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
