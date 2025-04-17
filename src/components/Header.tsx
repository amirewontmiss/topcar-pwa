'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LoginModal from './LoginModal'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/solid'

export default function Header() {
  const [user, setUser] = useState<{ name?: string; phone?: string } | null>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

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
    <header className="relative z-50 bg-black text-white border-b border-white/10 px-4 sm:px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo.png" alt="TopCar Logo" width={32} height={32} />
        <span className="text-xl font-bold tracking-wide text-gradient-gold">TOPCAR</span>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden lg:flex gap-6 text-sm">
        <Link href="/autopark" className="hover:text-white/80 transition">Автопарк</Link>
        <Link href="/terms" className="hover:text-white/80 transition">Terms</Link>
        <Link href="/services" className="hover:text-white/80 transition">Services</Link>
        <Link href="/contact" className="hover:text-white/80 transition">Contact</Link>
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-3 text-sm">
        <Link
          href="/download"
          className="px-4 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition hidden sm:block"
        >
          Скачать
        </Link>

        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Выйти
          </button>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="px-4 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition"
          >
            Войти
          </button>
        )}

        {/* Burger Menu Button (Mobile) */}
        <button
          className="lg:hidden ml-2"
          onClick={() => setMobileNavOpen(true)}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col items-end">
          <div className="w-3/4 max-w-xs bg-black h-full p-6 text-white flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold">Меню</span>
              <button onClick={() => setMobileNavOpen(false)}>
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col gap-4 text-base font-medium">
              <Link href="/autopark" className="hover:text-white/80 transition">Автопарк</Link>
              <Link href="/terms" className="hover:text-white/80 transition">Terms</Link>
              <Link href="/services" className="hover:text-white/80 transition">Services</Link>
              <Link href="/contact" className="hover:text-white/80 transition">Contact</Link>
              <Link
                href="/download"
                className="mt-6 inline-block px-4 py-2 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition"
              >
                Скачать приложение
              </Link>
            </nav>
          </div>
          <div className="flex-1 w-full" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  )
}

