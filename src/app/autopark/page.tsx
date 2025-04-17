'use client'

import { useState } from 'react'
import Image from 'next/image'

type Car = {
  name: string
  class: string
  brand: string
  price: number
  image: string
  desc: string
}

const cars: Car[] = [
  {
    name: 'Mercedes-Benz G63 AMG',
    class: 'Люкс',
    brand: 'Mercedes',
    price: 90000,
    image: '/cars/g63.jpg',
    desc: 'Абсолютная роскошь, мощь и комфорт для тех, кто выбирает только лучшее.',
  },
  {
    name: 'Dodge SRT',
    class: 'Бизнес',
    brand: 'Dodge',
    price: 60000,
    image: '/cars/dodgesrt.jpg',
    desc: 'Мускулистый стиль и производительность. Идеален для города и трассы.',
  },
  {
    name: 'Zeekr 001 White',
    class: 'Премиум',
    brand: 'Zeekr',
    price: 45000,
    image: '/cars/zeekr1w.jpg',
    desc: 'Электрический шик с умной начинкой. Технологии будущего уже сегодня.',
  },
]

const allBrands = Array.from(new Set(cars.map((c) => c.brand)))
const allClasses = Array.from(new Set(cars.map((c) => c.class)))

export default function AutoparkPage() {
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedClass, setSelectedClass] = useState('')

  const filteredCars = cars.filter((car) => {
    return (
      (selectedBrand ? car.brand === selectedBrand : true) &&
      (selectedClass ? car.class === selectedClass : true)
    )
  })

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative h-[55vh] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(/hero-luxury.jpg)' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 z-10" />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4">Автопарк TopCar</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Лучшие автомобили Казахстана — от роскошных внедорожников до премиальных электрокаров.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-black px-4 sm:px-10 py-14 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-10">
          <select
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Все классы</option>
            {allClasses.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Все марки</option>
            {allBrands.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectedClass('')
              setSelectedBrand('')
            }}
            className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            Сбросить фильтры
          </button>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCars.map((car, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl shadow-xl hover:shadow-2xl transition hover:scale-[1.01]"
            >
              <Image
                src={car.image}
                alt={car.name}
                width={600}
                height={400}
                className="w-full h-60 object-cover rounded-xl mb-4"
              />
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold">{car.name}</h3>
                <span className="text-sm text-white/60">{car.class}</span>
              </div>
              <p className="text-white/70 mb-4 text-sm">{car.desc}</p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">{car.price.toLocaleString()} ₸ / день</p>
                <button className="px-5 py-2 bg-white text-black rounded-full text-sm font-semibold hover:bg-[#d4af37] hover:text-white transition">
                  Забронировать
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <p className="text-white/60 mt-12 text-center text-lg">Нет машин по заданным фильтрам.</p>
        )}
      </section>
    </main>
  )
}
