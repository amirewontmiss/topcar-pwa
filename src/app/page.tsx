'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import CarCatalog from '@/components/CarCatalog'
import ServicesSection from '@/components/ServicesSection'
import RentalCalculator from '@/components/RentalCalculator'
import BookingForm from '@/components/BookingForm'
import FAQ from '@/components/FAQ'
import Subscription from '@/components/Subscription'
import PWABonus from '@/components/PWABonus'

export default function HomePage() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('topcar-user')
    if (user) {
      setLoggedIn(true)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Header />

      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 flex items-center gap-4">
          <img src="/logo.png" alt="TopCar logo" className="w-12 h-12" />
          TopCar
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          Арендуй автомобили в пару кликов. Минималистично. Быстро. Надежно.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold transition hover:bg-gray-200">
            Забронировать авто
          </button>
          <button className="px-6 py-3 border border-white text-white rounded-full text-sm font-semibold transition hover:bg-white hover:text-black">
            Подробнее
          </button>

          {loggedIn && (
            <button
              onClick={() => router.push('/dashboard')}
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold transition hover:bg-gray-200"
            >
              Перейти в личный кабинет
            </button>
          )}
        </div>
      </section>

      <CarCatalog />
      <ServicesSection />
      <RentalCalculator />
      <BookingForm />
      <FAQ />
      <Subscription />
      <PWABonus />
    </main>
  )
}

