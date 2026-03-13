interface StepperProps {
  currentStep: number
  totalSteps: number
}

const labels = ['Seus dados', 'Academia indicada', 'Confirmação']

export default function Stepper({ currentStep, totalSteps }: StepperProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100

  return (
    <div className="stepper" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="stepper__track">
        <div className="stepper__fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="stepper__steps">
        {labels.map((label, i) => {
          const stepNum = i + 1
          let cls = 'stepper__step'
          if (stepNum === currentStep) cls += ' stepper__step--active'
          else if (stepNum < currentStep) cls += ' stepper__step--completed'

          return (
            <div className={cls} data-step-indicator={stepNum} key={stepNum}>
              <div className="stepper__dot"><span>{stepNum}</span></div>
              <span className="stepper__label">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
