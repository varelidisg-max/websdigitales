'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface HeaderProps {
  lang: Lang
  setLang: (lang: Lang) => void
}

const LogoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 560 160"
    width="140"
    height="40"
    aria-label="WebsDigitales"
  >
    <rect width="560" height="160" rx="14" fill="#FAFAFA" />
    <text
      x="40"
      y="105"
      fontFamily="'Segoe UI','Helvetica Neue',Arial,sans-serif"
      fontSize="72"
      fontWeight="900"
      fill="#111111"
      letterSpacing="-3"
    >
      webs
    </text>
    <circle cx="260" cy="90" r="9" fill="#16C784" />
    <text
      x="283"
      y="105"
      fontFamily="'Segoe UI','Helvetica Neue',Arial,sans-serif"
      fontSize="58"
      fontWeight="200"
      fill="#333333"
      letterSpacing="-1"
    >
      digitales
    </text>
  </svg>
)

export default function Header({ lang, setLang }: HeaderProps) {
  const t = translations[lang].nav
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navLinks = [
    { label: t.inicio, id: 'hero' },
    { label: t.servicios, id: 'servicios' },
    { label: t.portafolio, id: 'portafolio' },
    { label: t.contacto, id: 'contacto' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex-shrink-0 focus:outline-none"
            aria-label="Inicio"
          >
            <LogoSVG />
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-brand-gray hover:text-brand-black transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setLang('es')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'es'
                    ? 'bg-brand-green text-white'
                    : 'text-brand-gray hover:bg-gray-50'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1.5 transition-colors ${
                  lang === 'en'
                    ? 'bg-brand-green text-white'
                    : 'text-brand-gray hover:bg-gray-50'
                }`}
              >
                EN
              </button>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo('contacto')}
              className="px-4 py-2 bg-brand-green text-white text-sm font-semibold rounded-lg hover:bg-green-500 transition-colors"
            >
              {t.solicitarProyecto}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-brand-gray hover:text-brand-black transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3 py-2.5 text-sm font-medium text-brand-gray hover:text-brand-black hover:bg-gray-50 rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-gray-100 mt-2">
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden text-xs font-semibold">
                <button
                  onClick={() => { setLang('es'); setMenuOpen(false) }}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === 'es' ? 'bg-brand-green text-white' : 'text-brand-gray'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => { setLang('en'); setMenuOpen(false) }}
                  className={`px-2.5 py-1.5 transition-colors ${
                    lang === 'en' ? 'bg-brand-green text-white' : 'text-brand-gray'
                  }`}
                >
                  EN
                </button>
              </div>
              <button
                onClick={() => scrollTo('contacto')}
                className="flex-1 py-2 bg-brand-green text-white text-sm font-semibold rounded-lg hover:bg-green-500 transition-colors text-center"
              >
                {t.solicitarProyecto}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
