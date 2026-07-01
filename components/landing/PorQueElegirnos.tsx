'use client'

import { Users, Heart, Clock, Shield } from 'lucide-react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface PorQueElegirnos {
  lang: Lang
}

const iconMap = {
  Users,
  Heart,
  Clock,
  Shield,
}

export default function PorQueElegirnos({ lang }: PorQueElegirnos) {
  const t = translations[lang].why

  return (
    <section className="py-24 bg-brand-bg">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {t.items.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            return (
              <div
                key={item.title}
                className="flex gap-5 p-6 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all duration-300"
              >
                <div
                  className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#111111' }}
                >
                  <Icon size={26} style={{ color: '#16C784' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-brand-black mb-1.5">{item.title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
