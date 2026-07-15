import type { Metadata } from 'next'
import ProjectTelephoneClient from './ProjectTelephoneClient'

export const metadata: Metadata = {
  title: 'Project Telephone',
  description: 'A telephone booth installation for leaving and hearing honest messages.',
}

export default function ProjectTelephonePage() {
  return <ProjectTelephoneClient />
}
