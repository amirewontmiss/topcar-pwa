'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import CarModal from './CarModal'
import BookingPopup from './BookingPopup'
import FadeInWhenVisible from './FadeInWhenVisible'

type Car = {
  id: number
  name: string
  price: number
  image: string
  brand: string
  class: 'Эконом' | 'Бизнес' | 'Премиум' | 'Люкс'
  description?: string
}

const cars: Car[] = [
  { id: 1, name: 'Zeekr 001 White', price: 45000, image: '/cars/zeekr1w.jpg', brand: 'Zeekr', class: 'Премиум' },
  { id: 2, name: 'Dodge SRT', price: 60000, image: '/cars/dodgesrt.jpg', brand: 'Dodge', class: 'Бизнес' },
  { id: 3, name: 'Mercedes-Benz G63 AMG', price: 90000, image: '/cars/g63.jpg', brand: 'Mercedes', class: 'Люкс' },
]

const allBrands = Array.from(new Set(cars.map((c) => c.brand)))
const allClasses = Array.from(new Set(cars.map((c) => c.class)))

export default function CarCatalog() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)
  const [bookingCar, setBookingCar] = useState<Car | null>(null)
  const [maxPrice, setMaxPrice] = useState(100000)
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedClass, setSelectedClass] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem('topcar-filters')
    if (stored) {
      const parsed = JSON.parse(stored)
      setMaxPrice(parsed.maxPrice || 100000)
      setSelectedBrand(parsed.selectedBrand || '')
      setSelectedClass(parsed.selectedClass || '')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('topcar-filters', JSON.stringify({ maxPrice, selectedBrand, selectedClass }))
  }, [maxPrice, selectedBrand, selectedClass])

  useEffect(() => {
    const scrollEl = scrollRef.current
    if (!scrollEl) return
    const handleScroll = () => {
      const endReached = scrollEl.scrollLeft + scrollEl.offsetWidth >= scrollEl.scrollWidth - 50
      if (endReached) setShowSwipeHint(false)
    }
    scrollEl.addEventListener('scroll', handleScroll)
    return () => scrollEl.removeEventListener('scroll', handleScroll)
  }, [])

  const filteredCars = cars.filter((car) =>
    car.price <= maxPrice &&
    (selectedBrand ? car.brand === selectedBrand : true) &&
    (selectedClass ? car.class === selectedClass : true)
  )

  return (
    <section className="pt-20 pb-10 px-4 sm:px-6 max-w-7xl mx-auto" id="car-catalog">
      <h2 className="text-4xl font-extrabold mb-8 text-center sm:text-left tracking-tight text-white">Каталог автомобилей</h2>

      {/* Filters */}
      <div className="md:hidden mb-4 flex justify-end">
        <button onClick={() => setShowFilters(prev => !prev)} className="px-4 py-2 text-sm border border-white rounded-full hover:bg-white hover:text-black transition">
          {showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>

      <div className={`bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl mb-6 z-40 ${showFilters ? 'block' : 'hidden'} md:block sticky top-20`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm mb-2">Максимальная цена: {maxPrice.toLocaleString()} ₸</label>
            <input type="range" min="30000" max="600000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <label className="block text-sm mb-2">Класс</label>
            <select className="w-full p-2 bg-black border border-white/20 rounded-md" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
              <option value="">Все</option>
              {allClasses.map(cls => <option key={cls} value={cls}>{cls}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-2">Марка</label>
            <select className="w-full p-2 bg-black border border-white/20 rounded-md" value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
              <option value="">Все</option>
              {allBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Grid (Desktop) */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCars.map((car) => (
          <FadeInWhenVisible key={car.id}>
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-md hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
              <Image src={car.image} alt={car.name} width={500} height={300} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-sm text-white/70">{car.price.toLocaleString()} ₸ / день</p>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <button onClick={() => setSelectedCar(car)} className="text-sm px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition">Подробнее</button>
                  <button onClick={() => setBookingCar(car)} className="text-sm px-4 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition">Забронировать</button>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="sm:hidden relative">
        {showSwipeHint && <div className="absolute top-2 right-4 z-10 text-xs text-white/50 animate-pulse">⬅ Листай</div>}
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4">
          {filteredCars.map((car) => (
            <div key={car.id} className="flex-shrink-0 w-72 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-md snap-center hover:scale-[1.02] transition-transform duration-300">
              <Image src={car.image} alt={car.name} width={500} height={300} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-sm text-white/70">{car.price.toLocaleString()} ₸ / день</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => setSelectedCar(car)} className="text-sm px-4 py-2 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition">Подробнее</button>
                  <button onClick={() => setBookingCar(car)} className="text-sm px-4 py-2 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition">Бронь</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedCar && <CarModal isOpen={true} onClose={() => setSelectedCar(null)} car={selectedCar} />}
      {bookingCar && <BookingPopup isOpen={true} onClose={() => setBookingCar(null)} carName={bookingCar.name} />}
    </section>
  )
}

