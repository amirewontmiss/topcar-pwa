'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-12">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-lg w-full text-center shadow-md backdrop-blur">
        <Image src="/logo.png" alt="TopCar Logo" width={80} height={80} className="mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Установите TopCar</h1>
        <p className="text-white/70 text-sm mb-6">
          Добавьте это приложение на главный экран вашего устройства и получите скидку 30% на первую аренду.
        </p>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/50">
            Откройте меню браузера и нажмите <strong>“Добавить на главный экран”</strong>
          </p>

          <p className="text-sm text-white/50">
            После установки вы сможете использовать TopCar как полноценное приложение.
          </p>
        </div>

        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-[#d4af37] hover:text-white transition"
        >
          Назад на главную
        </Link>
      </div>
    </main>
  )
}

