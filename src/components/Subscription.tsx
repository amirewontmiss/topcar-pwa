export default function Subscription() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Подписка от TopCar</h2>
      <div className="bg-white/5 p-6 rounded-lg">
        <ul className="list-disc pl-5 text-white/80 mb-4">
          <li>Бесплатное бронирование</li>
          <li>Скидки на аренду</li>
          <li>Приоритет в бронировании</li>
        </ul>
        <button className="px-6 py-3 bg-white text-black rounded-full font-semibold">
          Оформить подписку
        </button>
      </div>
    </section>
  )
}
