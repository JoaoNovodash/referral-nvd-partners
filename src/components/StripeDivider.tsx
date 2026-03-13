interface StripeDividerProps {
  reverse?: boolean
}

export default function StripeDivider({ reverse }: StripeDividerProps) {
  return (
    <div
      className={`stripe-divider${reverse ? ' stripe-divider--reverse' : ''}`}
      aria-hidden="true"
    />
  )
}
