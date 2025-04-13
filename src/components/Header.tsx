'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import LoginModal from './LoginModal'

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [user, setUser] = useState<{ phone: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-white/10 text-white px-4 py-2 flex items-center justify-between transition-transform duration-300"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg font-bold flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt="TopCar logo"
            width={24}
            height={24}
            className="w-6 h-6"
          />
          TopCar
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-4"
        >
          <Link href="/download">
            <button className="px-4 py-2 rounded-full border border-white text-sm hover:bg-white hover:text-black transition font-medium">
              Скачать
            </button>
          </Link>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/70">Привет, {user.phone}</span>
              <button
                onClick={() => {
                  localStorage.removeItem('topcar-user')
                  window.location.reload()
                }}
                className="px-3 py-1.5 rounded-full border border-white text-sm hover:bg-white hover:text-black transition"
              >
                Выйти
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 rounded-full bg-white text-black text-sm hover:bg-gray-200 transition font-medium"
            >
              Войти
            </button>
          )}
        </motion.div>

        {/* Mobile menu icon */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            <span className="text-white text-2xl">{menuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </motion.header>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-64 bg-black z-40 border-l border-white/10 px-6 py-8 flex flex-col gap-4"
          >
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-lg text-white hover:text-gray-300 transition">
              Главная
            </Link>
            <Link href="/download" onClick={() => setMenuOpen(false)} className="text-lg text-white hover:text-gray-300 transition">
              Скачать
            </Link>
            {user ? (
              <button
                onClick={() => {
                  localStorage.removeItem('topcar-user')
                  window.location.reload()
                }}
                className="mt-4 px-4 py-2 border border-white text-white rounded-full font-medium hover:bg-white hover:text-black"
              >
                Выйти
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsLoginOpen(true)
                  setMenuOpen(false)
                }}
                className="mt-4 px-4 py-2 bg-white text-black rounded-full font-medium hover:bg-gray-200"
              >
                Войти
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}

