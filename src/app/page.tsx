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
import Footer from '@/components/Footer'
import Image from 'next/image'

export default function HomePage() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [showPromo, setShowPromo] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem('topcar-user')
    if (user) setLoggedIn(true)

    const promoClosed = localStorage.getItem('topcar-promo-closed')
    if (promoClosed) setShowPromo(false)
  }, [])

  const handlePromoClose = () => {
    setShowPromo(false)
    localStorage.setItem('topcar-promo-closed', 'true')
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-fixed">
        <Image
          src="/hero-luxury.jpg"
          alt="Luxury Car Hero"
          layout="fill"
          objectFit="cover"
          priority
          className="absolute inset-0 z-0 opacity-70 brightness-[1.35] contrast-125"
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90" />

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white relative inline-block overflow-hidden">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f5f5f5] animate-shine">
              TopCar
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-white/80 font-light">
            Премиум аренда автомобилей. Без компромиссов.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#car-catalog"
              className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition"
            >
              Забронировать
            </a>
            <button className="px-6 py-3 border border-white text-white rounded-full text-sm font-semibold hover:bg-white hover:text-black transition">
              Подробнее
            </button>
            {loggedIn && (
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold transition hover:bg-gray-200"
              >
                Личный кабинет
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-6 text-white/70 text-2xl animate-bounce">↓</div>
      </section>

      {/* App Install Promo */}
      {showPromo && (
        <div className="fixed bottom-6 left-6 bg-gradient-to-br from-white to-neutral-100 text-black p-4 pr-6 rounded-xl shadow-xl border border-white/30 flex items-center gap-4 max-w-sm z-50">
          <Image
            src="/logo.png"
            alt="TopCar Logo"
            width={60}
            height={60}
            className="rounded-full opacity-60"
          />
          <div className="flex-1">
            <p className="font-semibold text-sm">Получите приложение TopCar</p>
            <p className="text-xs text-black/80">
              Скачайте полное приложение и получите <strong>скидку 30%</strong> на первую аренду
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href="/download"
                className="px-4 py-1.5 text-sm bg-black text-white rounded-full font-semibold hover:bg-zinc-800 transition"
              >
                Установить
              </a>
              <button onClick={handlePromoClose} className="text-sm text-black underline">
                Позже
              </button>
            </div>
          </div>
        </div>
      )}

      <CarCatalog />
      <ServicesSection />
      <RentalCalculator />
      <BookingForm />
      <FAQ />
      <Subscription />
      <PWABonus />
      <Footer />
    </main>
  )
}

