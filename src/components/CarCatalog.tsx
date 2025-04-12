'use client'

import { useState } from 'react'
import Image from 'next/image'
import CarModal from './CarModal'

type Car = {
  id: number
  name: string
  price: string
  image: string
  description?: string
}

const cars: Car[] = [
  {
    id: 1,
    name: 'Zeekr 001 White',
    price: 'от 85,000 ₸ / день',
    image: '/cars/zeekr1w.jpg',
    description: 'Эталон комфорта и стиля. Идеален для бизнес-поездок.',
  },
  {
    id: 2,
    name: 'Dodge SRT',
    price: 'от 80,000 ₸ / день',
    image: '/cars/dodgesrt.jpg',
    description: 'Спортивный дух и максимальное удобство.',
  },
  {
    id: 3,
    name: 'Mercedes-Benz G63 AMG',
    price: 'от 78,000 ₸ / день',
    image: '/cars/g63.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
  // ... add the remaining cars here
]

export default function CarCatalog() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">Каталог автомобилей</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-white/10"
          >
            <Image
              src={car.image}
              alt={car.name}
              width={500}
              height={300}
              className="h-48 w-full object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <p className="text-sm text-white/70">{car.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setSelectedCar(car)}
                  className="text-sm px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition"
                >
                  Подробнее
                </button>
                <button className="text-sm px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black transition">
                  Забронировать
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <CarModal
          isOpen={true}
          onClose={() => setSelectedCar(null)}
          car={selectedCar}
        />
      )}
    </section>
  )
}

