'use client'

import { signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import Link from 'next/link'

interface AdminNavbarProps {
  userEmail: string
}

const LogoSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 560 160"
    width="112"
    height="32"
    aria-label="WebsDigitales"
  >
    <rect width="560" height="160" rx="14" fill="transparent" />
    <text
      x="40"
      y="105"
      fontFamily="'Segoe UI','Helvetica Neue',Arial,sans-serif"
      fontSize="72"
      fontWeight="900"
      fill="#111111"
      letterSpacing="-3"
    >
      webs
    </text>
    <circle cx="260" cy="90" r="9" fill="#16C784" />
    <text
      x="283"
      y="105"
      fontFamily="'Segoe UI','Helvetica Neue',Arial,sans-serif"
      fontSize="58"
      fontWeight="200"
      fill="#333333"
      letterSpacing="-1"
    >
      digitales
    </text>
  </svg>
)

export default function AdminNavbar({ userEmail }: AdminNavbarProps) {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <LogoSVG />
            </Link>
            <span className="hidden sm:block text-sm font-medium text-brand-gray border-l border-gray-200 pl-4">
              Panel de administración
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-400 truncate max-w-[180px]">
              {userEmail}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-brand-gray hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut size={15} />
              <span className="hidden sm:block">Cerrar sesión</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
