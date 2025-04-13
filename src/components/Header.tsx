'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import LoginModal from './LoginModal'

const capitalize = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1)

export default function Header() {
  const [user, setUser] = useState<{ name?: string; phone?: string } | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const router = useRouter()

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
    <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black text-white">
      <h1 className="text-lg font-bold">TopCar</h1>

      <div className="flex items-center gap-4">
        <Link
          href="/download"
          className="px-5 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
        >
          Скачать
        </Link>

        {user && (
          <p className="text-white/60 text-sm hidden sm:block">
            Привет,{' '}
            {user.name
              ? capitalize(user.name)
              : user.phone
              ? `+${user.phone}`
              : 'Гость'}
          </p>
        )}

        {user ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Выйти
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="px-5 py-2 border border-white rounded-full text-sm hover:bg-white hover:text-black transition"
          >
            Войти
          </button>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  )
}

