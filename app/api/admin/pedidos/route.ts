import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const PAGE_SIZE = 10

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const estado = searchParams.get('estado') || ''
    const q = searchParams.get('q') || ''
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))

    const where: Record<string, unknown> = {}

    if (estado && estado !== 'todos') {
      where.estado = estado
    }

    if (q.trim()) {
      where.OR = [
        { nombre: { contains: q.trim() } },
        { email: { contains: q.trim() } },
        { empresa: { contains: q.trim() } },
        { descripcion: { contains: q.trim() } },
      ]
    }

    const [total, pedidos] = await Promise.all([
      db.pedido.count({ where }),
      db.pedido.findMany({
        where,
        orderBy: { fecha: 'desc' },
        skip: (page - 1) * PAGE_SIZE,
        take: PAGE_SIZE,
      }),
    ])

    return NextResponse.json({
      pedidos,
      total,
      page,
      pageSize: PAGE_SIZE,
      totalPages: Math.ceil(total / PAGE_SIZE),
    })
  } catch (error) {
    console.error('[admin/pedidos] GET error:', error)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
