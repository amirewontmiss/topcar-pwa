'use client'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-20 sm:px-6">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Связаться с нами</h1>
        <p className="text-white/70 text-lg">
          Мы всегда на связи. Выберите удобный способ для связи или оставьте заявку — мы ответим в течение 15 минут.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-16">
        {/* Contact Info Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold">Контакты</h3>
          <p className="text-sm text-white/70">📍 Алматы, Казахстан</p>
          <p className="text-sm text-white/70">📞 +7 (700) 000 00 00</p>
          <p className="text-sm text-white/70">✉ hello@topcar.kz</p>
          <p className="text-sm text-white/70">🕐 Работаем круглосуточно</p>
        </div>

        {/* Messengers Card */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md space-y-4">
          <h3 className="text-xl font-semibold">Мессенджеры</h3>
          <a href="https://wa.me/77000000000" target="_blank" className="block text-sm text-white/70 hover:text-white">
            WhatsApp: +7 700 000 00 00
          </a>
          <a href="https://t.me/topcar_support" target="_blank" className="block text-sm text-white/70 hover:text-white">
            Telegram: @topcar_support
          </a>
          <a href="mailto:hello@topcar.kz" className="block text-sm text-white/70 hover:text-white">
            Email: hello@topcar.kz
          </a>
        </div>
      </div>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto">
        <form className="grid gap-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-md">
          <input
            type="text"
            placeholder="Ваше имя"
            className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
          />
          <input
            type="email"
            placeholder="Email или телефон"
            className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
          />
          <textarea
            rows={4}
            placeholder="Ваше сообщение"
            className="bg-black border border-white/20 p-3 rounded-md text-white placeholder-white/50 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition"
          >
            Отправить сообщение
          </button>
        </form>
      </section>
    </main>
  )
}

