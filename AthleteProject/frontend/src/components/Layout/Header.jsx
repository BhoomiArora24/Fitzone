import { useEffect, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { brand, nav, hero } from '../../data/siteContent'
import ProfileDropdown from './ProfileDropdown'

/* ── Colour themes ─────────────────────────────────────────────
   Edit ONLY these two objects to restyle either state.
   - onHero  : header sitting transparent over the hero photo
   - onSolid : header after scrolling past the hero (white bar)
   If your hero is dark, change onHero.text to 'text-white'.      */
const theme = {
  onHero: {
    bar: 'bg-transparent border-transparent',
    text: 'text-black',
    tagline: 'text-black/70',
    hover: 'hover:text-black/60',
    divider: 'border-black/10',
  },
  onDarkHero: {
    bar: 'bg-transparent border-transparent',
    text: 'text-[#F5F1E9]',
    tagline: 'text-[#AAA995]',
    hover: 'hover:text-white',
    divider: 'border-white/10',
  },
  onSolid: {
    bar: 'bg-white/90 backdrop-blur-md border-black/10 shadow-[0_1px_12px_rgba(0,0,0,0.06)]',
    text: 'text-[#1B1C16]',
    tagline: 'text-[#6D6A61]',
    hover: 'hover:text-[#5E6844]',
    divider: 'border-black/10',
  },
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isAbout = location.pathname === '/about'

  // Become solid once the hero section has scrolled up behind the header
  useEffect(() => {
    if (!isHome) {
      if (isAbout) {
        const onScroll = () => setPastHero(window.scrollY > 100)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
      }
      setPastHero(true)
      return
    }

    const heroEl = document.getElementById('home')

    if (!heroEl || !('IntersectionObserver' in window)) {
      const onScroll = () => setPastHero(window.scrollY > 40)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    const headerHeight = window.innerWidth >= 768 ? 68 : 56
    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 }
    )
    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [isHome, isAbout])

  // Select appropriate theme based on page and scroll position
  let t = theme.onSolid
  if (!open && !pastHero) {
    t = isAbout ? theme.onDarkHero : (isHome ? theme.onHero : theme.onSolid)
  }

  const getLinkHref = (href) => {
    if (isHome) return href
    return href.startsWith('#') ? `/${href}` : href
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,color] duration-300 ${t.bar} ${t.text}`}
    >
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-6 px-[var(--pad)] md:h-[68px]">
        <Link to="/" className="flex flex-col leading-none" aria-label={`${brand.name} ${brand.tagline}`}>
          <span className="font-logo text-[28px] font-medium italic leading-none">{brand.name}</span>
          <span className={`mt-1 text-[6.5px] uppercase tracking-[.24em] transition-colors duration-300 ${t.tagline}`}>
            {brand.tagline}
          </span>
        </Link>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={`${open ? 'flex' : 'hidden'} absolute left-0 right-0 top-14 flex-col border-b ${theme.onSolid.divider} bg-white px-[var(--pad)] pb-5 pt-1.5
                      md:static md:mx-auto md:flex md:flex-row md:gap-5 md:border-0 md:bg-transparent md:p-0 lg:gap-9`}
        >
          {nav.map((n) => {
            const isRouterLink = n.href.startsWith('/') && !n.href.includes('#')
            const href = getLinkHref(n.href)
            const linkClass = `border-b py-3.5 text-[10px] font-medium uppercase tracking-[.12em] transition-colors duration-300 md:border-0 md:py-1.5 ${t.divider} ${t.text} ${t.hover} ${location.pathname === n.href ? 'border-b-2 font-bold' : ''}`

            return isRouterLink ? (
              <Link
                key={n.href}
                to={n.href}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.href}
                href={href}
                onClick={() => setOpen(false)}
                className={linkClass}
              >
                {n.label}
              </a>
            )
          })}
          <a
            href={getLinkHref(hero.cta.href)}
            onClick={() => setOpen(false)}
            className="btn mt-4 justify-center bg-[#5E6844] hover:bg-[#6E7A52] md:hidden"
          >
            {hero.cta.label}
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={getLinkHref(hero.cta.href)}
            className="btn hidden rounded-[3px] bg-[#5E6844] px-5 py-3 text-[10px] tracking-[.1em] hover:bg-[#6E7A52] lg:inline-flex"
          >
            {hero.cta.label}
          </a>

          <ProfileDropdown isDarkTheme={t === theme.onDarkHero} />

          <button
            className="p-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="site-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}
