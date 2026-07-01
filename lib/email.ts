interface PedidoEmailData {
  nombre: string
  email: string
  empresa: string
  descripcion: string
  id: number
}

function buildEmailHtml(pedido: PedidoEmailData): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Nuevo pedido — WebsDigitales</title>
</head>
<body style="margin:0;padding:0;background:#FAFAFA;font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#111111;padding:24px 32px;">
              <span style="font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-1px;">webs</span>
              <span style="display:inline-block;width:8px;height:8px;background:#16C784;border-radius:50%;margin:0 6px;vertical-align:middle;"></span>
              <span style="font-size:18px;font-weight:200;color:#cccccc;letter-spacing:-0.5px;">digitales</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h1 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#111111;">Nuevo pedido recibido</h1>
              <p style="margin:0 0 24px;color:#555;font-size:14px;">ID del pedido: <strong>#${pedido.id}</strong></p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Nombre</div>
                    <div style="font-size:15px;color:#111111;">${pedido.nombre}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Email</div>
                    <div style="font-size:15px;color:#111111;">
                      <a href="mailto:${pedido.email}" style="color:#16C784;text-decoration:none;">${pedido.email}</a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;border-bottom:1px solid #f0f0f0;">
                    <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Empresa</div>
                    <div style="font-size:15px;color:#111111;">${pedido.empresa}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <div style="font-size:11px;font-weight:600;color:#999;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:4px;">Descripción del proyecto</div>
                    <div style="font-size:15px;color:#333333;line-height:1.6;white-space:pre-wrap;">${pedido.descripcion}</div>
                  </td>
                </tr>
              </table>

              <div style="margin-top:32px;">
                <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/pedidos/${pedido.id}"
                   style="display:inline-block;background:#16C784;color:#ffffff;font-weight:600;font-size:14px;padding:12px 24px;border-radius:8px;text-decoration:none;">
                  Ver en el panel de administración
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px;background:#f5f5f5;text-align:center;">
              <p style="margin:0;font-size:12px;color:#999;">© 2025 WebsDigitales · contacto@websdigitales.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

async function sendViaResend(pedido: PedidoEmailData): Promise<void> {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'WebsDigitales <no-reply@websdigitales.com>',
    to: [process.env.NOTIFY_EMAIL || 'contacto@websdigitales.com'],
    subject: `Nuevo pedido de ${pedido.empresa} — WebsDigitales`,
    html: buildEmailHtml(pedido),
  })

  if (error) {
    throw new Error(`Resend error: ${error.message}`)
  }
}

async function sendViaNodmailer(pedido: PedidoEmailData): Promise<void> {
  const nodemailer = await import('nodemailer')

  const transporter = nodemailer.default.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"WebsDigitales" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL || 'contacto@websdigitales.com',
    subject: `Nuevo pedido de ${pedido.empresa} — WebsDigitales`,
    html: buildEmailHtml(pedido),
  })
}

export async function sendNotificationEmail(pedido: PedidoEmailData): Promise<void> {
  if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY.startsWith('re_')) {
    await sendViaResend(pedido)
  } else if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    await sendViaNodmailer(pedido)
  } else {
    console.warn(
      '[email] No email provider configured. Set RESEND_API_KEY or SMTP_HOST/SMTP_USER/SMTP_PASS in .env'
    )
  }
}
