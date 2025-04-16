'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-14 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-base">

        {/* Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src="/logo.png" alt="TopCar Logo" width={40} height={40} />
            <h3 className="text-2xl font-bold tracking-wide">TOPCAR</h3>
          </div>
          <p className="text-white/60 leading-relaxed max-w-xs text-base">
            Премиальная аренда автомобилей без компромиссов. Работаем 24/7.
          </p>
        </div>

        {/* Навигация */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-lg">Разделы</h4>
          <ul className="space-y-3 text-white/70 text-base">
            <li><Link href="#car-catalog" className="hover:text-white transition">Автопарк</Link></li>
            <li><Link href="#services" className="hover:text-white transition">Услуги</Link></li>
            <li><Link href="#faq" className="hover:text-white transition">FAQ</Link></li>
            <li><Link href="#contacts" className="hover:text-white transition">Контакты</Link></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-lg">Контакты</h4>
          <ul className="space-y-3 text-white/70 text-base">
            <li>Алматы, Казахстан</li>
            <li>+7 (700) 000 00 00</li>
            <li>hello@topcar.kz</li>
            <li>Работаем 24/7</li>
          </ul>
        </div>

        {/* Поддержка */}
        <div>
          <h4 className="text-white font-semibold mb-4 tracking-wide text-lg">Поддержка</h4>
          <ul className="space-y-3 text-white/70 text-base">
            <li>
              <a href="https://wa.me/77000000000" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                WhatsApp
              </a>
            </li>
            <li>
              <a href="https://t.me/topcar_support" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                Telegram
              </a>
            </li>
            <li>
              <a href="mailto:hello@topcar.kz" className="hover:text-white transition">
                Написать нам
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center text-white/30 text-sm mt-10">
        © 2025 TopCar. Все права защищены.
      </div>
    </footer>
  )
}

