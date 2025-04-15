'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginModal from './LoginModal'

const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export default function Header() {
  const [user, setUser] = useState<{ name?: string; phone?: string } | null>(null)
  const [showLogin, setShowLogin] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('topcar-user')
    window.location.reload()
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black text-white sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3">
        <Image src="/logo.png" alt="TopCar Logo" width={36} height={36} />
      </Link>

      <div className="flex items-center gap-4">
        {/* Download button */}
        <Link
          href="/download"
          className="px-6 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
        >
          Скачать
        </Link>

        {/* Greeting */}
        {user && (
          <p className="text-white/60 text-sm hidden sm:block">
            Привет, {user.name ? capitalize(user.name) : `+${user.phone}`}
          </p>
        )}

        {/* Auth buttons */}
        {user ? (
          <button
            onClick={handleLogout}
            className="px-6 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Выйти
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="px-6 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Войти
          </button>
        )}
      </div>

      {/* Modal */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  )
}

