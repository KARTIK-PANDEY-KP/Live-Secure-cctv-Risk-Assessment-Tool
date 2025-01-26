"use client"

import Link from 'next/link'
import { useTheme } from '@/context/ThemeContext'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { SunIcon, MoonIcon } from './ThemeIcons'

export default function Navigation() {
  const { isDark, toggleTheme } = useTheme()
  const { isLoggedIn, logout } = useAuth()
  const router = useRouter()

  const handleSignOut = () => {
    logout()
    router.push('/')
  }

  return (
    <nav className="bg-[#003087] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">
          <div className="flex space-x-8 items-center">
            <Link href="/" className="text-white hover:text-gray-200 text-lg font-medium">
              Home
            </Link>
            
            {!isLoggedIn ? (
              <>
                <Link href="/register" className="text-white hover:text-gray-200 text-lg font-medium">
                  Register
                </Link>
                <Link href="/login" className="text-white hover:text-gray-200 text-lg font-medium">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link href="/employee-dashboard" className="text-white hover:text-gray-200 text-lg font-medium">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-white hover:text-gray-200 text-lg font-medium"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}