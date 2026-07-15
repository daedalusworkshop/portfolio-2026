export type RadioSegmentType = 'host' | 'poem' | 'performance' | 'music' | 'jam'

export type RadioSegment = {
  id: string
  title: string
  type: RadioSegmentType
  eyebrow: string
  description: string
  durationLabel: string
  durationSeconds: number
  src?: string
}

export const KASRA_RADIO_PROGRAM: RadioSegment[] = [
  {
    id: 'welcome-to-my-world',
    title: 'Hello, welcome to my world',
    type: 'host',
    eyebrow: 'Kasra speaking',
    description:
      'While you look through my world, feel free to listen here too. This is a stream of my poetry, performances, and music I have created.',
    durationLabel: '0:10',
    durationSeconds: 10,
  },
  {
    id: 'jacob-retreat-jam',
    title: 'A spontaneous jam from Jacob Collier retreat',
    type: 'jam',
    eyebrow: 'Hosted recording',
    description:
      "Back in August of 2025, I went to Jacob Collier's retreat. There were many spontaneous jams. This was one of them.",
    durationLabel: '3:40',
    durationSeconds: 220,
  },
  {
    id: 'computergrass',
    title: 'Computergrass',
    type: 'poem',
    eyebrow: 'Poem',
    description: 'A poem from the radio program.',
    durationLabel: '2:30',
    durationSeconds: 150,
  },
  {
    id: 'ode-to-jacob',
    title: 'Ode to Jacob',
    type: 'performance',
    eyebrow: 'Poem and performance',
    description: 'A performed piece from the program.',
    durationLabel: '4:10',
    durationSeconds: 250,
  },
  {
    id: 'music-interlude',
    title: 'Music interlude',
    type: 'music',
    eyebrow: 'Music',
    description: 'A musical passage from Kasra Radio.',
    durationLabel: '3:20',
    durationSeconds: 200,
  },
]

export function getRadioSegment(index: number) {
  return KASRA_RADIO_PROGRAM[index] ?? KASRA_RADIO_PROGRAM[0]
}

export function getNextSegmentIndex(index: number) {
  if (KASRA_RADIO_PROGRAM.length === 0) return 0
  return (index + 1) % KASRA_RADIO_PROGRAM.length
}

export function getPreviousSegmentIndex(index: number) {
  if (KASRA_RADIO_PROGRAM.length === 0) return 0
  return (index - 1 + KASRA_RADIO_PROGRAM.length) % KASRA_RADIO_PROGRAM.length
}

export function getProgramDurationLabel() {
  return '20 min program'
}
