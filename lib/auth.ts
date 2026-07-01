import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

function getAdmins(): Array<{ email: string; password: string }> {
  const admins: Array<{ email: string; password: string }> = []
  for (let i = 1; i <= 5; i++) {
    const email = process.env[`ADMIN_${i}_EMAIL`]
    const password = process.env[`ADMIN_${i}_PASSWORD`]
    if (email && password) {
      admins.push({ email, password })
    }
  }
  return admins
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const admins = getAdmins()
        const admin = admins.find(
          (a) =>
            a.email.toLowerCase() === credentials.email.toLowerCase() &&
            a.password === credentials.password
        )

        if (!admin) {
          return null
        }

        return {
          id: admin.email,
          email: admin.email,
          name: admin.email.split('@')[0],
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
