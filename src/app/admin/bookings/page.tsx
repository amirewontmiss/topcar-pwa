'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

type Booking = {
  id: string
  car_name: string
  user_name?: string
  user_phone: string
  date_from: string
  date_to: string
  created_at: string
}

export default function AdminBookingsPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      const user = JSON.parse(stored)
      if (user.email !== 'admin@topcar.kz') {
        router.push('/')
      } else {
        fetchBookings()
      }
    } else {
      router.push('/')
    }
  }, [router])

  const fetchBookings = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) setBookings(data)
    setLoading(false)
  }

  const deleteBooking = async (id: string) => {
    const { error } = await supabase.from('bookings').delete().eq('id', id)
    if (!error) {
      setBookings((prev) => prev.filter((b) => b.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">📋 Все бронирования</h1>

      {loading ? (
        <p className="text-white/70">Загрузка...</p>
      ) : bookings.length === 0 ? (
        <p className="text-white/60">Нет доступных бронирований.</p>
      ) : (
        <ul className="space-y-6">
          {bookings.map((b) => (
            <li
              key={b.id}
              className="bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-sm"
            >
              <div className="grid sm:grid-cols-5 gap-4 p-4 items-center">
                <Image
                  src={`/cars/${b.car_name.toLowerCase().replaceAll(' ', '')}.jpg`}
                  alt={b.car_name}
                  width={120}
                  height={80}
                  className="w-full h-24 object-cover rounded-lg col-span-2 sm:col-span-1"
                />
                <div className="sm:col-span-3 space-y-1">
                  <p className="text-lg font-semibold">{b.car_name}</p>
                  <p className="text-sm text-white/70">👤 {b.user_name || 'Без имени'} — {b.user_phone}</p>
                  <p className="text-sm text-white/60">
                    📅 {b.date_from} → {b.date_to}
                  </p>
                  <p className="text-xs text-white/40">Добавлено: {new Date(b.created_at).toLocaleString()}</p>
                </div>
                <div className="flex justify-end sm:col-span-1">
                  <button
                    onClick={() => deleteBooking(b.id)}
                    className="text-sm px-4 py-2 bg-red-600 hover:bg-red-700 transition text-white rounded-full font-semibold"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
