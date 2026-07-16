'use client'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/suryansh-thakur-65443b154/', external: true },
]

export default function Footer() {
  const handleNav = (href: string) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.open(href, '_blank', 'noopener noreferrer')
    }
  }

  return (
    <footer className="border-t border-zinc-100 dark:border-white/[0.05] bg-white dark:bg-zinc-950">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-10 flex flex-col items-center md:flex-row md:justify-between gap-6">

        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-plus-jakarta font-bold text-[14px] text-zinc-800 dark:text-zinc-200 tracking-tight">
            Suryansh Thakur
          </span>
          <span className="font-dm-sans text-[12px] text-zinc-400 dark:text-zinc-600">
            Product Designer
          </span>
        </div>

        <nav className="flex items-center gap-6">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-dm-sans text-[13px] text-zinc-400 dark:text-zinc-600 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200 flex items-center gap-1"
            >
              {link.label}
              {link.external && <span className="text-[10px]">↗</span>}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 opacity-60" />
          <span className="font-dm-sans text-[12px] text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} Suryansh Thakur
          </span>
        </div>
      </div>
    </footer>
  )
}
