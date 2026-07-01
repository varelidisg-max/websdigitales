import { getServerSession } from 'next-auth'
import { redirect, notFound } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import PedidoDetalle from '@/components/admin/PedidoDetalle'

export default async function PedidoDetallePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/admin/login')
  }

  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    notFound()
  }

  const pedido = await db.pedido.findUnique({ where: { id } })
  if (!pedido) {
    notFound()
  }

  return <PedidoDetalle pedido={pedido} userEmail={session.user?.email || ''} />
}
