'use client'

import { Github, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface FooterProps {
  lang: Lang
}

const LogoSmall = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 560 160"
    width="112"
    height="32"
    aria-label="WebsDigitales"
  >
    <rect width="560" height="160" rx="14" fill="transparent" />
    <text
      x="40"
      y="105"
      fontFamily="'Segoe UI','Helvetica Neue',Arial,sans-serif"
      fontSize="72"
      fontWeight="900"
      fill="#ffffff"
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
      fill="#999999"
      letterSpacing="-1"
    >
      digitales
    </text>
  </svg>
)

export default function Footer({ lang }: FooterProps) {
  const t = translations[lang].footer
  const nav = translations[lang].nav

  const quickLinks = [
    { label: nav.inicio, id: 'hero' },
    { label: nav.servicios, id: 'servicios' },
    { label: nav.portafolio, id: 'portafolio' },
    { label: nav.contacto, id: 'contacto' },
  ]

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#111111' }} className="text-gray-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand column */}
          <div>
            <div className="mb-4">
              <LogoSmall />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              {lang === 'es'
                ? 'Diseño y desarrollo web profesional para empresas que quieren destacar.'
                : 'Professional web design and development for businesses that want to stand out.'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-widest">
              {t.contacto}
            </h4>
            <a
              href={`mailto:${t.email}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={14} />
              {t.email}
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Github, label: 'GitHub' },
                { Icon: Twitter, label: 'Twitter / X' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Linkedin, label: 'LinkedIn' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-gray-600">{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
