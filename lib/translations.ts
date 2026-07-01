export type Lang = 'es' | 'en'

export const translations = {
  es: {
    nav: {
      inicio: 'Inicio',
      servicios: 'Servicios',
      portafolio: 'Portafolio',
      contacto: 'Contacto',
      solicitarProyecto: 'Solicitar proyecto',
    },
    hero: {
      headline: 'Webs que convierten visitantes en clientes',
      subtitle:
        'Somos un equipo de 5 profesionales especializados en diseño y desarrollo web para empresas que quieren destacar en el mundo digital.',
      ctaPrimary: 'Solicitar proyecto',
      ctaSecondary: 'Ver portafolio',
    },
    services: {
      title: 'Nuestros servicios',
      cards: [
        {
          icon: 'Globe',
          title: 'Landing Pages',
          description:
            'Páginas de aterrizaje optimizadas para conversión, diseñadas para captar leads y maximizar el ROI de tus campañas.',
        },
        {
          icon: 'ShoppingCart',
          title: 'E-commerce',
          description:
            'Tiendas online completas con carrito de compra, pasarela de pago y gestión de inventario integrada.',
        },
        {
          icon: 'Building2',
          title: 'Webs Corporativas',
          description:
            'Presencia digital profesional para tu empresa: imagen sólida, contenido claro y experiencia de usuario impecable.',
        },
        {
          icon: 'Zap',
          title: 'Rediseño Web',
          description:
            'Modernizamos tu web actual con nuevo diseño, mejor rendimiento y tecnologías actualizadas sin perder tu identidad.',
        },
      ],
    },
    why: {
      title: '¿Por qué elegirnos?',
      items: [
        {
          icon: 'Users',
          title: 'Equipo de 5 profesionales',
          description:
            'Cada proyecto cuenta con diseñador, desarrollador frontend, backend, SEO y gestor de proyecto dedicados.',
        },
        {
          icon: 'Heart',
          title: 'Atención personalizada',
          description:
            'Tienes un interlocutor directo en todo momento. Sin intermediarios, sin burocracia, sin perder el tiempo.',
        },
        {
          icon: 'Clock',
          title: 'Entrega rápida',
          description:
            'Comprometidos con los plazos. La mayoría de proyectos se entregan en 2-4 semanas según la complejidad.',
        },
        {
          icon: 'Shield',
          title: 'Soporte incluido',
          description:
            'Todos los proyectos incluyen 3 meses de soporte post-lanzamiento sin coste adicional.',
        },
      ],
    },
    portfolio: {
      title: 'Portafolio',
      subtitle: 'Algunos de nuestros proyectos recientes',
      projects: [
        {
          title: 'TiendaGourmet',
          description: 'E-commerce de productos gourmet con más de 500 referencias',
          tags: ['Next.js', 'Stripe', 'PostgreSQL'],
          color: '#16C784',
        },
        {
          title: 'ConsultoríaLegal Pro',
          description: 'Web corporativa para despacho de abogados con área de clientes',
          tags: ['React', 'Node.js', 'MySQL'],
          color: '#111111',
        },
        {
          title: 'FitLife Academy',
          description: 'Landing page de alta conversión para academia de fitness online',
          tags: ['Next.js', 'Tailwind', 'Vercel'],
          color: '#333333',
        },
      ],
    },
    contact: {
      title: 'Cuéntanos tu proyecto',
      subtitle:
        'Rellena el formulario y te respondemos en menos de 24 horas con un presupuesto sin compromiso.',
      nombre: 'Nombre completo',
      email: 'Correo electrónico',
      empresa: 'Empresa',
      descripcion: 'Descripción del proyecto',
      descripcionPlaceholder:
        'Cuéntanos qué necesitas: tipo de web, funcionalidades, plazos, presupuesto aproximado... (mínimo 50 caracteres)',
      submit: 'Enviar solicitud',
      submitting: 'Enviando...',
      success: '¡Solicitud enviada! Te contactaremos en menos de 24 horas.',
      error: 'Hubo un error al enviar. Por favor, inténtalo de nuevo.',
      validationRequired: 'Este campo es obligatorio.',
      validationEmail: 'Introduce un correo electrónico válido.',
      validationDescripcion: 'La descripción debe tener al menos 50 caracteres.',
    },
    footer: {
      email: 'contacto@websdigitales.com',
      copyright: '© 2025 WebsDigitales. Todos los derechos reservados.',
      quickLinks: 'Enlaces rápidos',
      contacto: 'Contacto',
    },
  },
  en: {
    nav: {
      inicio: 'Home',
      servicios: 'Services',
      portafolio: 'Portfolio',
      contacto: 'Contact',
      solicitarProyecto: 'Request project',
    },
    hero: {
      headline: 'Websites that turn visitors into customers',
      subtitle:
        'We are a team of 5 professionals specializing in web design and development for businesses that want to stand out in the digital world.',
      ctaPrimary: 'Request project',
      ctaSecondary: 'View portfolio',
    },
    services: {
      title: 'Our services',
      cards: [
        {
          icon: 'Globe',
          title: 'Landing Pages',
          description:
            'Conversion-optimized landing pages designed to capture leads and maximize the ROI of your campaigns.',
        },
        {
          icon: 'ShoppingCart',
          title: 'E-commerce',
          description:
            'Full online stores with shopping cart, payment gateway and integrated inventory management.',
        },
        {
          icon: 'Building2',
          title: 'Corporate Websites',
          description:
            'Professional digital presence for your company: solid image, clear content and flawless user experience.',
        },
        {
          icon: 'Zap',
          title: 'Web Redesign',
          description:
            'We modernize your current website with new design, better performance and updated technologies without losing your identity.',
        },
      ],
    },
    why: {
      title: 'Why choose us?',
      items: [
        {
          icon: 'Users',
          title: 'Team of 5 professionals',
          description:
            'Each project has a dedicated designer, frontend developer, backend, SEO specialist and project manager.',
        },
        {
          icon: 'Heart',
          title: 'Personalized attention',
          description:
            'You have a direct contact at all times. No intermediaries, no bureaucracy, no wasted time.',
        },
        {
          icon: 'Clock',
          title: 'Fast delivery',
          description:
            'Committed to deadlines. Most projects are delivered in 2-4 weeks depending on complexity.',
        },
        {
          icon: 'Shield',
          title: 'Support included',
          description:
            'All projects include 3 months of post-launch support at no additional cost.',
        },
      ],
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Some of our recent projects',
      projects: [
        {
          title: 'TiendaGourmet',
          description: 'E-commerce for gourmet products with over 500 references',
          tags: ['Next.js', 'Stripe', 'PostgreSQL'],
          color: '#16C784',
        },
        {
          title: 'ConsultoríaLegal Pro',
          description: 'Corporate website for law firm with client area',
          tags: ['React', 'Node.js', 'MySQL'],
          color: '#111111',
        },
        {
          title: 'FitLife Academy',
          description: 'High-conversion landing page for online fitness academy',
          tags: ['Next.js', 'Tailwind', 'Vercel'],
          color: '#333333',
        },
      ],
    },
    contact: {
      title: 'Tell us about your project',
      subtitle:
        'Fill out the form and we will get back to you in less than 24 hours with a no-commitment quote.',
      nombre: 'Full name',
      email: 'Email address',
      empresa: 'Company',
      descripcion: 'Project description',
      descripcionPlaceholder:
        'Tell us what you need: type of website, features, deadlines, approximate budget... (minimum 50 characters)',
      submit: 'Send request',
      submitting: 'Sending...',
      success: 'Request sent! We will contact you within 24 hours.',
      error: 'There was an error sending. Please try again.',
      validationRequired: 'This field is required.',
      validationEmail: 'Enter a valid email address.',
      validationDescripcion: 'The description must be at least 50 characters.',
    },
    footer: {
      email: 'contacto@websdigitales.com',
      copyright: '© 2025 WebsDigitales. All rights reserved.',
      quickLinks: 'Quick links',
      contacto: 'Contact',
    },
  },
} as const

export type Translations = typeof translations
