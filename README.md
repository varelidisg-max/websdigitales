# WebsDigitales

Sitio web y panel de administración para la agencia **WebsDigitales**.

## Stack

- **Next.js 14** App Router + TypeScript
- **Tailwind CSS** para estilos
- **Prisma ORM** + SQLite para la base de datos
- **NextAuth.js v4** con CredentialsProvider (5 administradores vía variables de entorno)
- **Nodemailer** / **Resend** para notificaciones por email

---

## Configuración inicial

### 1. Copiar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` y rellena:

- `NEXTAUTH_SECRET` — una cadena aleatoria segura (puedes generar una con `openssl rand -base64 32`)
- `NEXTAUTH_URL` — la URL base de tu app (ej. `http://localhost:3000` en desarrollo)
- `ADMIN_1_EMAIL` … `ADMIN_5_EMAIL` — emails de los 5 socios
- `ADMIN_1_PASSWORD` … `ADMIN_5_PASSWORD` — contraseñas de cada socio
- Email: elige **Resend** (añade `RESEND_API_KEY`) o **SMTP** (añade `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`)
- `NOTIFY_EMAIL` — email donde se recibirán las notificaciones de nuevos pedidos

### 2. Instalar dependencias

```bash
npm install
```

### 3. Crear la base de datos

```bash
npx prisma db push
```

Esto crea el archivo `prisma/dev.db` con la tabla `Pedido`.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

---

## URLs

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3000` | Landing page (ES/EN) |
| `http://localhost:3000/admin` | Panel de administración |
| `http://localhost:3000/admin/login` | Login de administradores |
| `http://localhost:3000/admin/pedidos/[id]` | Detalle de pedido |

---

## Comandos útiles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npx prisma db push   # Sincronizar schema con la DB
npx prisma studio    # GUI para explorar la base de datos
```

---

## Despliegue en producción

1. Elige un proveedor (Vercel, Railway, Fly.io, VPS propio...)
2. Configura todas las variables de entorno en el panel del proveedor
3. Cambia `DATABASE_URL` a una base de datos de producción (PostgreSQL recomendado)
4. En el `schema.prisma`, cambia `provider = "sqlite"` a `provider = "postgresql"`
5. Ejecuta `npx prisma migrate deploy` en producción

---

## Estructura del proyecto

```
websdigitales/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handler
│   │   ├── contact/              # POST /api/contact
│   │   └── admin/pedidos/        # GET + PATCH pedidos
│   ├── admin/
│   │   ├── login/                # Página de login
│   │   ├── pedidos/[id]/         # Detalle de pedido
│   │   └── page.tsx              # Dashboard principal
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Landing page
├── components/
│   ├── landing/                  # Header, Hero, Servicios, etc.
│   └── admin/                    # AdminDashboard, PedidoDetalle, AdminNavbar
├── lib/
│   ├── auth.ts                   # NextAuth options
│   ├── db.ts                     # Singleton Prisma client
│   ├── email.ts                  # Envío de emails
│   └── translations.ts           # Textos ES/EN
├── prisma/
│   └── schema.prisma
└── .env.example
```
