'use client'

import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface HeroProps {
  lang: Lang
}

export default function Hero({ lang }: HeroProps) {
  const t = translations[lang].hero

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 dot-pattern"
    >
      {/* Gradient overlay to soften the dot pattern near center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(250,250,250,0.85) 0%, transparent 100%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-semibold text-brand-gray shadow-sm mb-8">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ backgroundColor: '#16C784' }}
          />
          Equipo de 5 profesionales
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-black leading-tight mb-6"
          style={{ letterSpacing: '-1.5px' }}
        >
          {t.headline}
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-brand-gray font-light leading-relaxed max-w-2xl mx-auto mb-10">
          {t.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => scrollTo('contacto')}
            className="w-full sm:w-auto px-8 py-3.5 bg-brand-green text-white font-bold rounded-xl hover:bg-green-500 transition-all hover:shadow-lg hover:-translate-y-0.5 text-base"
          >
            {t.ctaPrimary}
          </button>
          <button
            onClick={() => scrollTo('portafolio')}
            className="w-full sm:w-auto px-8 py-3.5 bg-white border-2 border-brand-black text-brand-black font-bold rounded-xl hover:bg-gray-50 transition-all text-base"
          >
            {t.ctaSecondary}
          </button>
        </div>

        {/* Social proof row */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-bold text-brand-black text-lg">+50</span>
            <span>{lang === 'es' ? 'proyectos entregados' : 'projects delivered'}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-brand-black text-lg">2-4</span>
            <span>{lang === 'es' ? 'semanas de entrega' : 'weeks delivery'}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="font-bold text-brand-black text-lg">3</span>
            <span>{lang === 'es' ? 'meses de soporte gratis' : 'months free support'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
