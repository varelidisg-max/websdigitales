import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WebsDigitales — Diseño y Desarrollo Web Profesional',
  description:
    'Equipo de 5 profesionales especializados en diseño y desarrollo web: landing pages, e-commerce, webs corporativas y rediseño web.',
  keywords: ['diseño web', 'desarrollo web', 'landing pages', 'e-commerce', 'webs corporativas'],
  openGraph: {
    title: 'WebsDigitales — Diseño y Desarrollo Web Profesional',
    description:
      'Equipo de 5 profesionales especializados en diseño y desarrollo web para empresas.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-brand-bg text-brand-gray font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
