'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.svg" alt="TopCar Logo" width={36} height={36} />
            <h3 className="text-xl font-semibold">TOPCAR</h3>
          </div>
          <p className="text-white/60 text-sm max-w-xs">
            Премиальная аренда автомобилей без компромиссов. Мы работаем круглосуточно.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="text-white font-semibold mb-2">Разделы</h4>
          <ul className="space-y-1 text-white/70 text-sm">
            <li><Link href="#car-catalog">Автопарк</Link></li>
            <li><Link href="#services">Услуги</Link></li>
            <li><Link href="#faq">FAQ</Link></li>
            <li><Link href="#contacts">Контакты</Link></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="text-white font-semibold mb-2">Контакты</h4>
          <ul className="space-y-1 text-white/70 text-sm">
            <li>📍 Алматы, Казахстан</li>
            <li>📞 +7 (700) 000 00 00</li>
            <li>📧 hello@topcar.kz</li>
            <li>🕒 Работаем 24/7</li>
          </ul>
        </div>

        {/* Поддержка */}
        <div>
          <h4 className="text-white font-semibold mb-2">Поддержка</h4>
          <ul className="space-y-1 text-white/70 text-sm">
            <li><a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a></li>
            <li><a href="https://t.me/topcar_support" target="_blank" rel="noopener noreferrer">📨 Telegram</a></li>
            <li><a href="mailto:hello@topcar.kz">📧 Написать нам</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-white/40 text-sm mt-10">
        © 2025 TopCar. Все права защищены.
      </div>
    </footer>
  )
}

