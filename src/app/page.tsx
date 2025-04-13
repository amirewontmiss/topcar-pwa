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

      
      <section className="flex flex-col items-center justify-center py-28 md:py-40 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4 flex items-center gap-3">
          <img src="/logo.png" alt="TopCar logo" className="w-10 h-10 md:w-12 md:h-12" />
          TopCar
      </h1>
      <p className="text-base md:text-lg text-white/70 max-w-xl mb-6 leading-relaxed">
          Арендуй автомобили в пару кликов. Минималистично. Быстро. Надежно.
      </p>
      <div className="flex flex-col md:flex-row gap-4">
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

