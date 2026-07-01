'use client'

import { useState } from 'react'
import type { Lang } from '@/lib/translations'
import Header from '@/components/landing/Header'
import Hero from '@/components/landing/Hero'
import Servicios from '@/components/landing/Servicios'
import PorQueElegirnos from '@/components/landing/PorQueElegirnos'
import Portafolio from '@/components/landing/Portafolio'
import Formulario from '@/components/landing/Formulario'
import Footer from '@/components/landing/Footer'

export default function HomePage() {
  const [lang, setLang] = useState<Lang>('es')

  return (
    <>
      <Header lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Servicios lang={lang} />
        <PorQueElegirnos lang={lang} />
        <Portafolio lang={lang} />
        <Formulario lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  )
}
