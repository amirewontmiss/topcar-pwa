'use client'

import { useState, useMemo } from 'react'
import FadeInWhenVisible from './FadeInWhenVisible'

const cars = [
  { id: 1, name: 'Zeekr 001 White', price: 45000 },
  { id: 2, name: 'Dodge SRT', price: 60000 },
  { id: 3, name: 'Mercedes-Benz G63 AMG', price: 90000 },
]

export default function RentalCalculator() {
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const selectedCar = useMemo(() => cars.find((c) => c.id === selectedCarId) || null, [selectedCarId])
  const totalDays = useMemo(() => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return diff > 0 ? diff : 0
  }, [startDate, endDate])
  const totalPrice = useMemo(() => selectedCar ? totalDays * selectedCar.price : 0, [selectedCar, totalDays])

  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <FadeInWhenVisible>
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
          Калькулятор аренды
        </h2>

        <form className="grid gap-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
          <select
            className="bg-black border border-white/20 p-3 rounded-md text-white focus:outline-none"
            value={selectedCarId ?? ''}
            onChange={(e) => setSelectedCarId(Number(e.target.value))}
          >
            <option value="">Выбрать авто</option>
            {cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.name} — {car.price.toLocaleString()} ₸/день
              </option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="bg-black border border-white/20 p-3 rounded-md text-white"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="bg-black border border-white/20 p-3 rounded-md text-white"
          />

          <div className="text-xl font-semibold text-white/90">
            Итоговая цена:{' '}
            {totalPrice > 0
              ? `${totalPrice.toLocaleString()} ₸ за ${totalDays} дней`
              : '0 ₸'}
          </div>

          <button type="submit" className="mt-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition">
            Оставить заявку
          </button>
        </form>
      </FadeInWhenVisible>
    </section>
  )
}

