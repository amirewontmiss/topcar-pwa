export default function PWABonus() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
        Скидка за установку
      </h2>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
        <p className="text-white/80 mb-4 text-base leading-relaxed">
          Установите приложение и получите <span className="text-white font-bold">скидку 30%</span> на первую аренду.
          Используйте промокод: <strong className="text-[#d4af37]">TOPCAR30</strong>
        </p>

        <div className="mt-6 bg-white/10 border border-white/10 p-5 rounded-xl">
          <p className="text-sm text-white/70">
            📅 Ближайшие аренды будут отображаться здесь.
          </p>
        </div>
      </div>
    </section>
  )
}

