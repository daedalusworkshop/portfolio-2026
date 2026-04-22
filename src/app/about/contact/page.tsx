import Image from 'next/image'

export const metadata = { title: 'contact' }

const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/kasra_makes_art' },
  { label: 'Twitter', href: 'https://x.com/huggingpuppy' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kasra-mikaili-b211401b6' },
]

export default function Contact() {
  return (
    <div className="min-h-screen flex pt-16">
      <div className="relative w-1/2">
        <Image
          src="/images/DSC_0299.jpg"
          alt="Kasra Mikaili"
          fill
          sizes="50vw"
          className="object-cover [object-position:20%_50%]"
          priority
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center px-16 py-16">
        <div className="flex flex-col gap-1 mb-4">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-serif text-sm text-white/50 hover:text-white/90 underline underline-offset-2 decoration-white/20 hover:decoration-white/60 transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
        <a
          href="mailto:k2mikaili@gmail.com"
          className="font-serif text-sm text-white/50 hover:text-white/90 transition-colors mb-8"
        >
          k2mikaili@gmail.com
        </a>
        <p className="font-serif text-sm text-white">
          I would love to hear from you :)
        </p>
      </div>
    </div>
  )
}
