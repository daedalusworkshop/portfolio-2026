import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Project Telephone' }

export default function ProjectTelephonePage() {
  return (
    <iframe
      src="https://project-telephone-6onxzs6si-k2mikaili-gmailcoms-projects.vercel.app/portfolio.html"
      title="Project Telephone"
      className="fixed inset-0 w-full h-full border-0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
    />
  )
}
