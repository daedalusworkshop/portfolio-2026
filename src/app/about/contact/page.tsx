export const metadata = { title: 'contact' }

export default function Contact() {
  return (
    <div className="min-h-screen px-6 py-32 max-w-lg mx-auto">
      <h1 className="font-serif text-xs uppercase tracking-[0.3em] text-white/25 mb-16">
        contact
      </h1>
      <div className="space-y-4">
        <a
          href="mailto:k2mikaili@gmail.com"
          className="block text-white/60 hover:text-white transition-colors font-serif text-lg"
        >
          k2mikaili@gmail.com
        </a>
      </div>
    </div>
  )
}
