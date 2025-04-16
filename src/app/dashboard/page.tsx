'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { QRCodeCanvas } from 'qrcode.react'
import Image from 'next/image'

type Booking = {
  id: string
  car_name: string
  date_from: string
  date_to: string
  created_at: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<{ phone: string; name?: string; email?: string } | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      const parsed = JSON.parse(stored)
      setUser(parsed)
      fetchBookings(parsed.phone)
    } else {
      router.push('/')
    }
  }, [router])

  const fetchBookings = async (phone: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_phone', phone)
      .order('created_at', { ascending: false })

    if (error) console.error('Booking fetch error:', error)
    else setBookings(data)
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 md:px-10 space-y-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          Добро пожаловать, {user.name || user.phone} 👋
        </h1>
        <button
          onClick={() => router.push('/#booking')}
          className="text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition"
        >
          + Новое бронирование
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <section className="md:col-span-1 bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">👤 Профиль</h2>
          <div className="space-y-2 text-white/80">
            <p><span className="font-medium text-white">Имя:</span> {user.name || '—'}</p>
            <p><span className="font-medium text-white">Телефон:</span> {user.phone}</p>
            <p><span className="font-medium text-white">Email:</span> {user.email || '—'}</p>
          </div>
        </section>

        {/* Bookings Section */}
        <section className="md:col-span-2 bg-white/5 border border-white/10 rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">📅 История бронирований</h2>

          {bookings.length === 0 ? (
            <p className="text-white/60">У вас пока нет бронирований.</p>
          ) : (
            <ul className="space-y-4">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="bg-white/10 rounded-lg overflow-hidden border border-white/10 shadow-md"
                >
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 items-center">
                    <Image
                      src={`/cars/${b.car_name.toLowerCase().replaceAll(' ', '')}.jpg`}
                      alt={b.car_name}
                      width={100}
                      height={75}
                      className="w-full h-24 object-cover rounded-md col-span-1"
                    />
                    <div className="col-span-2 sm:col-span-2 space-y-1">
                      <p className="text-lg font-semibold">{b.car_name}</p>
                      <p className="text-white/60 text-sm">
                        📅 С {b.date_from} по {b.date_to}
                      </p>
                      <p className="text-white/40 text-xs">
                        Добавлено: {new Date(b.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="col-span-1 flex justify-center items-center">
                      <QRCodeCanvas
                        value={b.id}
                        size={64}
                        bgColor="#000000"
                        fgColor="#ffffff"
                        level="H"
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

