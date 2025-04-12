import Image from 'next/image'
import Header from '@/components/Header'
import CarCatalog from '@/components/CarCatalog'
import ServicesSection from '@/components/ServicesSection'
import RentalCalculator from '@/components/RentalCalculator'
import BookingForm from '@/components/BookingForm'
import FAQ from '@/components/FAQ'
import Subscription from '@/components/Subscription'
import PWABonus from '@/components/PWABonus'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <Header />

      <section className="flex flex-col items-center justify-center py-32 px-6 md:py-48 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="TopCar logo"
            width={48}
            height={48}
            className="w-12 h-12"
          />
          TopCar
        </h1>
        <p className="text-lg md:text-xl text-center max-w-2xl mb-10">
          Арендуй автомобили в пару кликов. Минималистично. Быстро. Надежно.
        </p>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white text-black rounded-full text-sm font-semibold transition hover:bg-gray-200">
            Забронировать авто
          </button>
          <button className="px-6 py-3 border border-white text-white rounded-full text-sm font-semibold transition hover:bg-white hover:text-black">
            Подробнее
          </button>
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

