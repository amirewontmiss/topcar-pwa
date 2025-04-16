import FadeInWhenVisible from './FadeInWhenVisible'

export default function Subscription() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <FadeInWhenVisible>
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
          Подписка от TopCar
        </h2>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
          <ul className="list-disc pl-6 text-white/80 mb-6 space-y-2">
            <li>Бесплатное бронирование</li>
            <li>Скидки на аренду</li>
            <li>Приоритет в бронировании</li>
          </ul>

          <button className="w-full mt-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition">
            Оформить подписку
          </button>
        </div>
      </FadeInWhenVisible>
    </section>
  )
}

