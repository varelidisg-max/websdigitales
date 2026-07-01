import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const VALID_ESTADOS = ['nuevo', 'en_contacto', 'cerrado']

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  const id = parseInt(params.id, 10)
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID inválido.' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const updateData: Record<string, string> = {}

    if (body.estado !== undefined) {
      if (!VALID_ESTADOS.includes(body.estado)) {
        return NextResponse.json({ error: 'Estado inválido.' }, { status: 400 })
      }
      updateData.estado = body.estado
    }

    if (body.notas !== undefined) {
      if (typeof body.notas !== 'string') {
        return NextResponse.json({ error: 'Notas inválidas.' }, { status: 400 })
      }
      updateData.notas = body.notas
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'No hay datos para actualizar.' }, { status: 400 })
    }

    const pedido = await db.pedido.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, pedido })
  } catch (error: unknown) {
    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code: string }).code === 'P2025'
    ) {
      return NextResponse.json({ error: 'Pedido no encontrado.' }, { status: 404 })
    }
    console.error('[admin/pedidos/[id]] PATCH error:', error)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
