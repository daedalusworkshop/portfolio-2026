'use client'

type Props = {
  progress: number
  label: string
}

export default function KasraRadioProgress({ progress, label }: Props) {
  return (
    <div className="radio-progress" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
      <span className="radio-progress__glow" style={{ transform: `scaleX(${Math.max(0.03, progress)})` }} />
      <span className="radio-progress__notch" style={{ left: `${Math.max(3, Math.min(97, progress * 100))}%` }} />
    </div>
  )
}
