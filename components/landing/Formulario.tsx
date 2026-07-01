'use client'

import { useState, FormEvent } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import type { Lang } from '@/lib/translations'
import { translations } from '@/lib/translations'

interface FormularioProps {
  lang: Lang
}

interface FormState {
  nombre: string
  email: string
  empresa: string
  descripcion: string
}

interface FormErrors {
  nombre?: string
  email?: string
  empresa?: string
  descripcion?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Formulario({ lang }: FormularioProps) {
  const t = translations[lang].contact

  const [form, setForm] = useState<FormState>({
    nombre: '',
    email: '',
    empresa: '',
    descripcion: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverError, setServerError] = useState('')

  function validate(): FormErrors {
    const errs: FormErrors = {}
    if (!form.nombre.trim()) errs.nombre = t.validationRequired
    if (!form.email.trim() || !EMAIL_REGEX.test(form.email.trim())) errs.email = t.validationEmail
    if (!form.empresa.trim()) errs.empresa = t.validationRequired
    if (!form.descripcion.trim() || form.descripcion.trim().length < 50)
      errs.descripcion = t.validationDescripcion
    return errs
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    setServerError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ nombre: '', email: '', empresa: '', descripcion: '' })
      } else {
        setStatus('error')
        setServerError(data.error || t.error)
      }
    } catch {
      setStatus('error')
      setServerError(t.error)
    }
  }

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const inputClass = (field: keyof FormErrors) =>
    `w-full px-4 py-3 border rounded-xl text-brand-black bg-white focus:outline-none focus:ring-2 transition ${
      errors[field]
        ? 'border-red-300 focus:ring-red-300'
        : 'border-gray-200 focus:ring-brand-green focus:border-transparent'
    }`

  return (
    <section id="contacto" className="py-24 bg-brand-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl font-black text-brand-black mb-3"
            style={{ letterSpacing: '-1px' }}
          >
            {t.title}
          </h2>
          <p className="text-brand-gray leading-relaxed">{t.subtitle}</p>
          <div
            className="mx-auto mt-3 rounded-full"
            style={{ width: 48, height: 4, backgroundColor: '#16C784' }}
          />
        </div>

        {status === 'success' ? (
          <div className="bg-white border border-green-200 rounded-2xl p-10 text-center">
            <CheckCircle size={48} style={{ color: '#16C784' }} className="mx-auto mb-4" />
            <p className="text-lg font-semibold text-brand-black">{t.success}</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5"
          >
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-semibold text-brand-black mb-1.5">
                {t.nombre} <span className="text-red-400">*</span>
              </label>
              <input
                id="nombre"
                type="text"
                value={form.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                className={inputClass('nombre')}
                placeholder="Ana García"
              />
              {errors.nombre && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-brand-black mb-1.5">
                {t.email} <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={inputClass('email')}
                placeholder="ana@empresa.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Empresa */}
            <div>
              <label htmlFor="empresa" className="block text-sm font-semibold text-brand-black mb-1.5">
                {t.empresa} <span className="text-red-400">*</span>
              </label>
              <input
                id="empresa"
                type="text"
                value={form.empresa}
                onChange={(e) => handleChange('empresa', e.target.value)}
                className={inputClass('empresa')}
                placeholder="Mi Empresa S.L."
              />
              {errors.empresa && (
                <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.empresa}
                </p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label
                htmlFor="descripcion"
                className="block text-sm font-semibold text-brand-black mb-1.5"
              >
                {t.descripcion} <span className="text-red-400">*</span>
              </label>
              <textarea
                id="descripcion"
                rows={5}
                value={form.descripcion}
                onChange={(e) => handleChange('descripcion', e.target.value)}
                className={`${inputClass('descripcion')} resize-none`}
                placeholder={t.descripcionPlaceholder}
              />
              <div className="mt-1 flex items-center justify-between">
                {errors.descripcion ? (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.descripcion}
                  </p>
                ) : (
                  <span />
                )}
                <span
                  className={`text-xs ml-auto ${
                    form.descripcion.length < 50 ? 'text-gray-400' : 'text-brand-green'
                  }`}
                >
                  {form.descripcion.length}/50 {lang === 'es' ? 'mín.' : 'min.'}
                </span>
              </div>
            </div>

            {/* Server error */}
            {status === 'error' && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                <AlertCircle size={16} className="flex-shrink-0" />
                {serverError || t.error}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3.5 bg-brand-green text-white font-bold rounded-xl hover:bg-green-500 transition-all hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
            >
              {status === 'loading' && (
                <svg
                  className="animate-spin h-5 w-5 text-white flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              )}
              {status === 'loading' ? t.submitting : t.submit}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
