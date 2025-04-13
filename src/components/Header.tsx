'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-sm border-b border-white/10 text-white px-4 py-2 flex items-center justify-between">
      <div className="text-base md:text-lg font-bold flex items-center gap-2">
        <img src="/logo.png" alt="TopCar logo" className="w-6 h-6" />
        TopCar
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Link href="/download">
          <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white text-sm md:text-base hover:bg-white hover:text-black transition font-medium">
            Скачать
          </button>
        </Link>
        <button className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white text-black text-sm md:text-base hover:bg-gray-200 transition font-medium">
          Войти
        </button>
      </div>
    </header>
  )
}

