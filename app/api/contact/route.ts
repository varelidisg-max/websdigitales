import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { sendNotificationEmail } from '@/lib/email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, email, empresa, descripcion } = body

    // Validation
    const errors: Record<string, string> = {}

    if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
      errors.nombre = 'El nombre es obligatorio.'
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Introduce un correo electrónico válido.'
    }

    if (!empresa || typeof empresa !== 'string' || empresa.trim().length === 0) {
      errors.empresa = 'La empresa es obligatoria.'
    }

    if (!descripcion || typeof descripcion !== 'string' || descripcion.trim().length < 50) {
      errors.descripcion = 'La descripción debe tener al menos 50 caracteres.'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos.', errors },
        { status: 400 }
      )
    }

    // Save to DB
    const pedido = await db.pedido.create({
      data: {
        nombre: nombre.trim(),
        email: email.trim().toLowerCase(),
        empresa: empresa.trim(),
        descripcion: descripcion.trim(),
      },
    })

    // Send notification email (non-blocking — don't fail the response if email fails)
    sendNotificationEmail({
      nombre: pedido.nombre,
      email: pedido.email,
      empresa: pedido.empresa,
      descripcion: pedido.descripcion,
      id: pedido.id,
    }).catch((err) => {
      console.error('[contact] Failed to send notification email:', err)
    })

    return NextResponse.json({ success: true, id: pedido.id }, { status: 201 })
  } catch (error) {
    console.error('[contact] POST error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
