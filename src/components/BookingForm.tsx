'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BookingForm() {
  const [carName, setCarName] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [userName, setUserName] = useState('')
  const [userPhone, setUserPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    if (!carName || !dateFrom || !dateTo || !userName || !userPhone) {
      setError('Пожалуйста, заполните все поля.')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('bookings').insert([
      {
        user_name: userName,
        user_phone: userPhone,
        car_name: carName,
        date_from: dateFrom,
        date_to: dateTo,
      },
    ])

    if (error) {
      setError('Ошибка при отправке бронирования.')
    } else {
      setSuccess(true)
      setCarName('')
      setDateFrom('')
      setDateTo('')
      setUserName('')
      setUserPhone('')
    }

    setLoading(false)
  }

  return (
    <section id="booking" className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
        Бронирование авто
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm"
      >
        <input
          placeholder="Выберите авто"
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          className="bg-black border border-white/20 p-3 rounded-md text-white focus:outline-none"
        />

        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          className="bg-black border border-white/20 p-3 rounded-md text-white focus:outline-none"
        />

        <input
          placeholder="ФИО"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />

        <input
          placeholder="Телефон"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
        />

        {error && <p className="text-red-400 text-sm">{error}</p>}
        {success && (
          <p className="text-green-400 text-sm">Бронирование успешно отправлено!</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition"
        >
          {loading ? 'Отправка...' : 'Отправить заявку'}
        </button>
      </form>
    </section>
  )
}

