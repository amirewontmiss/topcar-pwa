export default function ServicesSection() {
  return (
    <section className="py-20 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Услуги и акции</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { title: 'Долгосрочная аренда' },
          { title: 'Трансфер' },
          { title: 'Аренда с водителем' },
          { title: 'Скидки на повторную аренду' },
        ].map(({ title }, idx) => (
          <div key={idx} className="bg-white/5 p-4 rounded-lg hover:bg-white/10 transition">
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-white/70 mt-1">Нажмите для подробностей</p>
          </div>
        ))}
      </div>
    </section>
  )
}
