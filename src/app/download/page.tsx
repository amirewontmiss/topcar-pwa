'use client'

import Image from 'next/image'

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16 flex flex-col items-center justify-center text-center">
      <Image src="/logo.png" alt="TopCar Logo" width={64} height={64} className="mb-4" />
      <h1 className="text-4xl font-extrabold mb-4">Установите TopCar</h1>
      <p className="text-white/70 max-w-md mb-6">
        Получите удобный доступ к премиум-аренде авто. Скачайте наше PWA-приложение и получите <span className="text-white font-semibold">скидку 30%</span> на первую аренду!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <a
          href="/"
          className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-[#d4af37] hover:text-white transition"
        >
          Установить сейчас
        </a>
        <a
          href="/"
          className="px-6 py-3 border border-white text-white rounded-full font-semibold hover:bg-white hover:text-black transition"
        >
          Назад
        </a>
      </div>
    </main>
  )
}

