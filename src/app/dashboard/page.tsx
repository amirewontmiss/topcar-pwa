'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [user, setUser] = useState<{
    phone: string
    name?: string
    email?: string
  } | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      setUser(JSON.parse(stored))
    } else {
      router.push('/')
    }
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white p-6 space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold">
        Добро пожаловать, {user.name || user.phone} 👋
      </h1>

      {/* 👤 Profile Info */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-3">👤 Профиль</h2>
        <p className="text-white/70 mb-1">
          <span className="font-medium text-white">Имя:</span> {user.name || '—'}
        </p>
        <p className="text-white/70 mb-1">
          <span className="font-medium text-white">Телефон:</span> {user.phone}
        </p>
        <p className="text-white/70">
          <span className="font-medium text-white">Email:</span> {user.email || '—'}
        </p>
      </section>

      {/* 📅 Booking History */}
      <section className="bg-white/5 border border-white/10 rounded-xl p-5">
        <h2 className="text-xl font-semibold mb-3">📅 История бронирований</h2>
        <p className="text-white/60">Пока что здесь пусто. Забронируйте автомобиль, чтобы увидеть историю.</p>
        {/* Later: Add a list of bookings from Supabase */}
      </section>
    </div>
  )
}

