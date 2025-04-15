// src/components/InstallPromo.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function InstallPromo() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 7000) // show after 7s
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/10 border border-white/20 backdrop-blur-md text-white rounded-xl shadow-xl p-4 max-w-xs w-full animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-sm mb-1">🎉 Получите скидку 30%</p>
          <p className="text-xs text-white/70">Скачайте приложение и получите скидку на первую аренду</p>
        </div>
        <button onClick={() => setVisible(false)} className="text-white/60 text-sm hover:text-white ml-2">
          ✕
        </button>
      </div>
      <Link
        href="/download"
        className="block mt-3 text-center px-4 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-200 transition"
      >
        Скачать приложение
      </Link>
    </div>
  )
}
