export default function ServicesSection() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
        Услуги и акции
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {[
          { title: 'Долгосрочная аренда', desc: 'Экономия при аренде на 1+ месяц.' },
          { title: 'Трансфер', desc: 'Премиум трансфер до/из аэропорта.' },
          { title: 'Аренда с водителем', desc: 'Личный шофёр — комфорт без стресса.' },
          { title: 'Скидки на повторную аренду', desc: 'До -20% на следующую поездку.' },
        ].map(({ title, desc }, idx) => (
          <div
            key={idx}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold text-white mb-1">
              {title}
            </h3>
            <p className="text-sm text-white/70">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

