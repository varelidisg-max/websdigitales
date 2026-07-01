import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import AdminDashboard from '@/components/admin/AdminDashboard'
import type { Pedido } from '@prisma/client'

async function getStats() {
  const [total, nuevo, en_contacto, cerrado] = await Promise.all([
    db.pedido.count(),
    db.pedido.count({ where: { estado: 'nuevo' } }),
    db.pedido.count({ where: { estado: 'en_contacto' } }),
    db.pedido.count({ where: { estado: 'cerrado' } }),
  ])
  return { total, nuevo, en_contacto, cerrado }
}

async function getPedidos(): Promise<Pedido[]> {
  return db.pedido.findMany({
    orderBy: { fecha: 'desc' },
    take: 50,
  })
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  const [stats, pedidos] = await Promise.all([getStats(), getPedidos()])

  return (
    <AdminDashboard
      pedidos={pedidos}
      stats={stats}
      userEmail={session.user?.email || ''}
    />
  )
}
