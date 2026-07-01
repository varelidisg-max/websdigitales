'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Pedido } from '@prisma/client'
import AdminNavbar from './AdminNavbar'
import { ArrowLeft, Save, CheckCircle, AlertCircle, Mail, Building2, Calendar, FileText } from 'lucide-react'

interface PedidoDetalleProps {
  pedido: Pedido
  userEmail: string
}

const estadoOptions = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'en_contacto', label: 'En contacto' },
  { value: 'cerrado', label: 'Cerrado' },
]

const estadoBadge: Record<string, string> = {
  nuevo: 'bg-green-100 text-green-700 border border-green-200',
  en_contacto: 'bg-amber-100 text-amber-700 border border-amber-200',
  cerrado: 'bg-gray-100 text-gray-600 border border-gray-200',
}

export default function PedidoDetalle({ pedido, userEmail }: PedidoDetalleProps) {
  const [estado, setEstado] = useState(pedido.estado)
  const [notas, setNotas] = useState(pedido.notas)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const res = await fetch(`/api/admin/pedidos/${pedido.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado, notas }),
      })
      const data = await res.json()
      if (data.success) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        setError(data.error || 'Error al guardar.')
      }
    } catch {
      setError('Error de conexión.')
    } finally {
      setSaving(false)
    }
  }

  function formatDate(d: Date | string) {
    return new Date(d).toLocaleDateString('es-ES', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const currentBadge = estadoBadge[estado] || estadoBadge.nuevo
  const currentLabel = estadoOptions.find((o) => o.value === estado)?.label || estado

  return (
    <>
      <AdminNavbar userEmail={userEmail} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back link */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-black transition-colors mb-6"
        >
          <ArrowLeft size={15} />
          Volver al panel
        </Link>

        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-brand-black" style={{ letterSpacing: '-0.5px' }}>
              Pedido #{pedido.id}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
              <Calendar size={13} />
              {formatDate(pedido.fecha)}
            </p>
          </div>
          <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${currentBadge}`}>
            {currentLabel}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Contact info */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Información de contacto
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-brand-gray">
                      {pedido.nombre.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Nombre</p>
                    <p className="font-semibold text-brand-black">{pedido.nombre}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail size={14} className="text-brand-gray" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Email</p>
                    <a
                      href={`mailto:${pedido.email}`}
                      className="font-medium text-brand-black hover:text-brand-green transition-colors"
                    >
                      {pedido.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-bg rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Building2 size={14} className="text-brand-gray" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Empresa</p>
                    <p className="font-semibold text-brand-black">{pedido.empresa}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <FileText size={14} />
                Descripción del proyecto
              </h2>
              <p className="text-brand-gray text-sm leading-relaxed whitespace-pre-wrap">
                {pedido.descripcion}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Estado */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Estado
              </h2>
              <select
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
              >
                {estadoOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Notas */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Notas internas
              </h2>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                rows={6}
                placeholder="Añade notas sobre este pedido..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent resize-none"
              />
            </div>

            {/* Save button */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {saved && (
              <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-700">
                <CheckCircle size={15} className="flex-shrink-0" />
                Cambios guardados
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-2.5 bg-brand-green text-white font-semibold text-sm rounded-xl hover:bg-green-500 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {saving ? (
                <svg
                  className="animate-spin h-4 w-4 text-white"
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
              ) : (
                <Save size={15} />
              )}
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
