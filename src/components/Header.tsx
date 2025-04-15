'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginModal from './LoginModal'

const capitalize = (name: string) => name.charAt(0).toUpperCase() + name.slice(1)

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
    <header className="relative z-40 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-black text-white">

      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="TopCar Logo" width={32} height={32} />
        <span className="text-xl font-bold tracking-wide text-gradient-gold">TOPCAR</span>
      </div>

      {/* Center Navigation */}
      <nav className="hidden lg:flex gap-6 text-sm">
        <a href="#" className="hover:text-white/80 transition">Автопарк ▾</a>
        <a href="#" className="hover:text-white/80 transition">Условия ▾</a>
        <a href="#" className="hover:text-white/80 transition">Услуги ▾</a>
        <a href="#" className="hover:text-white/80 transition">Контакты</a>
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4 text-sm">
        <span className="hidden sm:block text-white/70 underline underline-offset-2">Алматы ▾</span>
        <span className="hidden sm:block text-white/70">₸ KZT ▾</span>

        <div className="flex items-center gap-2 text-lg">
          <button className="hover:opacity-70 transition" title="Избранное">🤍</button>
          <button className="hover:opacity-70 transition" title="WhatsApp">🟢</button>
          <button className="hover:opacity-70 transition" title="Telegram">📨</button>
        </div>

        <div className="text-right hidden md:block">
          <p className="text-white text-sm font-medium">+7 (700) 000 00 00 ▾</p>
          <p className="text-xs text-white/60">работаем 24/7</p>
        </div>

        <Link
          href="/download"
          className="px-4 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition hidden sm:block"
        >
          Скачать
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Выйти
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Войти
          </button>
        )}
      </div>

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  )
}

