'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  carName: string
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ carName, isOpen, onClose }: Props) {
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  if (!isOpen) return null

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    const user = JSON.parse(localStorage.getItem('topcar-user') || '{}')
    const phone = user?.phone

    if (!phone || !dateFrom || !dateTo) {
      setMessage('Пожалуйста, заполните все поля')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('bookings').insert([
      {
        user_phone: phone,
        car_name: carName,
        date_from: dateFrom,
        date_to: dateTo,
      },
    ])

    if (error) {
      setMessage('Ошибка при бронировании')
    } else {
      setMessage('Бронирование успешно ✅')
      setTimeout(() => {
        onClose()
        setDateFrom('')
        setDateTo('')
        setMessage('')
      }, 1000)
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-black border border-white/10 rounded-xl p-6 max-w-md w-full space-y-4">
        <h2 className="text-xl font-bold mb-2">Бронирование: {carName}</h2>

        <div className="space-y-2">
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-full p-3 rounded-md bg-white/5 text-white"
            placeholder="С даты"
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-full p-3 rounded-md bg-white/5 text-white"
            placeholder="По дату"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-white text-black font-semibold rounded-full mt-4 hover:bg-gray-100 transition"
        >
          {loading ? 'Отправка...' : 'Подтвердить бронирование'}
        </button>

        {message && <p className="text-sm text-center text-white/70">{message}</p>}

        <button
          onClick={onClose}
          className="text-sm text-white/50 underline mt-4 block mx-auto"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}
