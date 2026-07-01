'use client'

import { Globe, ShoppingCart, Building2, Zap } from 'lucide-react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface ServiciosProps {
  lang: Lang
}

const iconMap = {
  Globe,
  ShoppingCart,
  Building2,
  Zap,
}

export default function Servicios({ lang }: ServiciosProps) {
  const t = translations[lang].services

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black text-brand-black mb-3"
            style={{ letterSpacing: '-1px' }}
          >
            {t.title}
          </h2>
          <div
            className="mx-auto mt-3 rounded-full"
            style={{ width: 48, height: 4, backgroundColor: '#16C784' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.cards.map((card) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap]
            return (
              <div
                key={card.title}
                className="group border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-brand-green/30 transition-all duration-300 bg-brand-bg"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: 'rgba(22,199,132,0.1)' }}
                >
                  <Icon size={24} style={{ color: '#16C784' }} />
                </div>
                <h3 className="text-base font-bold text-brand-black mb-2">{card.title}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{card.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
