export default function Footer() {
  return (
    <footer className="bg-black text-white/80 pt-16 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        
        {/* Branding */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src="/logo.png" alt="TopCar" className="h-8 w-8" />
            <span className="text-xl font-semibold tracking-wide text-white">TOPCAR</span>
          </div>
          <p className="text-sm text-white/60">
            Премиальная аренда автомобилей. Элегантность, мощь и комфорт — без компромиссов.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Разделы</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#catalog" className="hover:text-white transition">Автопарк</a></li>
            <li><a href="#terms" className="hover:text-white transition">Условия</a></li>
            <li><a href="#services" className="hover:text-white transition">Услуги</a></li>
            <li><a href="#contacts" className="hover:text-white transition">Контакты</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Контакты</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Алматы, Казахстан</li>
            <li>📞 +7 (700) 000 00 00</li>
            <li>✉️ info@topcar.kz</li>
            <li>🕓 Работаем 24/7</li>
          </ul>
        </div>

        {/* Поддержка и Соц. сети */}
        <div>
          <h4 className="font-semibold mb-4 text-white">Нужна помощь?</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">💬 Напишите в WhatsApp</a></li>
            <li><a href="#" className="hover:text-white transition">📨 Напишите в Telegram</a></li>
          </ul>

          <h4 className="font-semibold mt-6 mb-2 text-white">Подписывайтесь</h4>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-white transition">📸</a>
            <a href="#" className="hover:text-white transition">🎥</a>
            <a href="#" className="hover:text-white transition">📘</a>
            <a href="#" className="hover:text-white transition">🎵</a>
          </div>
        </div>
      </div>

      <div className="text-xs text-white/30 text-center mt-12">
        © {new Date().getFullYear()} TopCar. Все права защищены.
      </div>
    </footer>
  )
}
