export default function DownloadPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Скачать приложение TopCar</h1>
      <p className="text-white/70 text-lg mb-8">Доступно в App Store и Google Play</p>

      <div className="flex gap-4 mb-10">
        <button className="px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed">
          App Store (Coming Soon)
        </button>
        <button className="px-6 py-3 bg-white text-black rounded-xl text-sm font-semibold opacity-50 cursor-not-allowed">
          Google Play (Coming Soon)
        </button>
      </div>

      <p className="text-sm text-white/50">🚧 Мобильное приложение находится в разработке</p>
    </main>
  )
}
