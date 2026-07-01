'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Pedido } from '@prisma/client'
import AdminNavbar from './AdminNavbar'
import { Search, ChevronLeft, ChevronRight, Eye } from 'lucide-react'

interface Stats {
  total: number
  nuevo: number
  en_contacto: number
  cerrado: number
}

interface AdminDashboardProps {
  pedidos: Pedido[]
  stats: Stats
  userEmail: string
}

const PAGE_SIZE = 10

const estadoConfig: Record<string, { label: string; className: string }> = {
  nuevo: { label: 'Nuevo', className: 'bg-green-100 text-green-700 border border-green-200' },
  en_contacto: { label: 'En contacto', className: 'bg-amber-100 text-amber-700 border border-amber-200' },
  cerrado: { label: 'Cerrado', className: 'bg-gray-100 text-gray-600 border border-gray-200' },
}

function StatCard({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`bg-white rounded-2xl border p-5 ${accent ? 'border-brand-green/30' : 'border-gray-100'}`}>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className={`text-3xl font-black ${accent ? 'text-brand-green' : 'text-brand-black'}`}>
        {value}
      </p>
    </div>
  )
}

export default function AdminDashboard({ pedidos, stats, userEmail }: AdminDashboardProps) {
  const [estadoFilter, setEstadoFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    let result = pedidos
    if (estadoFilter !== 'todos') {
      result = result.filter((p) => p.estado === estadoFilter)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.empresa.toLowerCase().includes(q) ||
          p.descripcion.toLowerCase().includes(q)
      )
    }
    return result
  }, [pedidos, estadoFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function handleFilterChange(value: string) {
    setEstadoFilter(value)
    setPage(1)
  }

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function formatDate(d: Date | string) {
    return new Date(d).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
  }

  return (
    <>
      <AdminNavbar userEmail={userEmail} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Total pedidos" value={stats.total} />
          <StatCard label="Nuevos" value={stats.nuevo} accent />
          <StatCard label="En contacto" value={stats.en_contacto} />
          <StatCard label="Cerrados" value={stats.cerrado} />
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Buscar por nombre, email, empresa..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
            />
          </div>
          <select
            value={estadoFilter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-brand-black bg-white focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
          >
            <option value="todos">Todos los estados</option>
            <option value="nuevo">Nuevo</option>
            <option value="en_contacto">En contacto</option>
            <option value="cerrado">Cerrado</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                    Nombre
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                    Email
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-gray-400 text-sm">
                      No se encontraron pedidos
                    </td>
                  </tr>
                ) : (
                  paginated.map((p) => {
                    const ec = estadoConfig[p.estado] || estadoConfig.nuevo
                    return (
                      <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">
                          {formatDate(p.fecha)}
                        </td>
                        <td className="px-5 py-3.5 font-medium text-brand-black whitespace-nowrap">
                          {p.empresa}
                        </td>
                        <td className="px-5 py-3.5 text-brand-gray hidden md:table-cell whitespace-nowrap">
                          {p.nombre}
                        </td>
                        <td className="px-5 py-3.5 text-brand-gray hidden lg:table-cell">
                          <a
                            href={`mailto:${p.email}`}
                            className="hover:text-brand-green transition-colors"
                          >
                            {p.email}
                          </a>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${ec.className}`}>
                            {ec.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <Link
                            href={`/admin/pedidos/${p.id}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-gray border border-gray-200 rounded-lg hover:border-brand-green hover:text-brand-green transition-all"
                          >
                            <Eye size={13} />
                            Ver
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-5 py-3.5 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                {filtered.length} pedido{filtered.length !== 1 ? 's' : ''} ·{' '}
                Página {currentPage} de {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-brand-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((n) => Math.abs(n - currentPage) <= 2)
                  .map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition ${
                        n === currentPage
                          ? 'bg-brand-green text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-brand-black hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
