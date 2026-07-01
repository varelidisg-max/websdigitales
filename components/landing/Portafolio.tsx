'use client'

import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface PortafolioProps {
  lang: Lang
}

export default function Portafolio({ lang }: PortafolioProps) {
  const t = translations[lang].portfolio

  return (
    <section id="portafolio" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2
            className="text-3xl sm:text-4xl font-black text-brand-black mb-3"
            style={{ letterSpacing: '-1px' }}
          >
            {t.title}
          </h2>
          <p className="text-brand-gray mt-2">{t.subtitle}</p>
          <div
            className="mx-auto mt-3 rounded-full"
            style={{ width: 48, height: 4, backgroundColor: '#16C784' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.projects.map((project) => (
            <div
              key={project.title}
              className="group rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-brand-bg"
            >
              {/* Colored placeholder */}
              <div
                className="h-48 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: project.color }}
              >
                {/* Abstract grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 40px)',
                  }}
                />
                <div className="relative z-10 text-center px-4">
                  <div className="text-white/80 text-4xl font-black" style={{ letterSpacing: '-2px' }}>
                    {project.title.charAt(0)}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-brand-black mb-1">{project.title}</h3>
                <p className="text-sm text-brand-gray mb-3 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-gray-100 text-brand-gray text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
