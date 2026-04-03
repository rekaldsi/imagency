interface Step {
  number: number
  label: string
}

interface StepWizardProps {
  steps: Step[]
  currentStep: number
}

export default function StepWizard({ steps, currentStep }: StepWizardProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                step.number < currentStep
                  ? 'bg-gold text-white'
                  : step.number === currentStep
                  ? 'bg-charcoal text-warm-white'
                  : 'bg-warm-cream text-charcoal-light border border-warm-border'
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs mt-1.5 whitespace-nowrap ${
                step.number === currentStep ? 'text-charcoal font-medium' : 'text-charcoal-light'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`h-px w-12 md:w-20 mx-2 mb-4 transition-colors ${
                step.number < currentStep ? 'bg-gold' : 'bg-warm-border'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
