'use client'

import { useState } from 'react'
import CarModal from './CarModal'

const cars = [
  {
    id: 1,
    name: 'Zeekr 001 White',
    price: 'от 85,000 ₸ / день',
    image: '/cars/zeekr1w.jpg',
    description: 'Эталон комфорта и стиля. Идеален для бизнес-поездок.',
  },
  {
    id: 2,
    name: 'BMW 7 Series',
    price: 'от 80,000 ₸ / день',
    image: '/cars/bmw-7-series.jpg',
    description: 'Спортивный дух и максимальное удобство.',
  },
  {
    id: 3,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
  {
    id: 4,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
  {
    id: 5,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
{
    id: 6,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
{
    id: 7,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
{
    id: 8,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
{
    id: 9,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
{
    id: 10,
    name: 'Audi A8',
    price: 'от 78,000 ₸ / день',
    image: '/cars/audi-a8.jpg',
    description: 'Технологичность, тишина и немецкий люкс.',
  },
  // add the rest of your 30 cars here, same structure
]

export default function CarCatalog() {
  const [selectedCar, setSelectedCar] = useState<any | null>(null)

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10">Каталог автомобилей</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-white/5 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition border border-white/10"
          >
            <img
              src={car.image}
              alt={car.name}
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

