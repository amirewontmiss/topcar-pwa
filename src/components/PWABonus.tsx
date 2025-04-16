import FadeInWhenVisible from './FadeInWhenVisible'

export default function PWABonus() {
  return (
    <section className="py-20 px-6 max-w-3xl mx-auto">
      <FadeInWhenVisible>
        <h2 className="text-4xl font-extrabold mb-10 text-center tracking-tight text-white">
          Скидка за установку
        </h2>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-sm">
          <p className="text-white/80 text-sm leading-relaxed mb-4">
            Установите наше приложение как PWA и получите <span className="text-white font-semibold">скидку 30%</span> на первую аренду.
            Просто нажмите «Установить» в браузере и используйте промокод:
          </p>

          <div className="bg-black border border-white/10 rounded-lg p-4 text-center mb-4">
            <p className="text-xl font-bold text-[#d4af37] tracking-widest">TOPCAR30</p>
          </div>

          <div className="bg-white/10 p-4 rounded-lg mt-6">
            <p className="text-sm text-white/70">📅 Ближайшие аренды будут отображаться здесь.</p>
          </div>
        </div>
      </FadeInWhenVisible>
    </section>
  )
}

