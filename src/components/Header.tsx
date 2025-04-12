'use client'

import { useEffect, useState } from 'react'

export default function Header() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

    type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>
    }

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = () => {
    if (deferredPrompt && 'prompt' in deferredPrompt) {
      (deferredPrompt as any).prompt()
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-sm border-b border-white/10 text-white py-3 px-4 flex items-center justify-between">
      <div className="text-lg font-bold">TopCar</div>
      <div className="flex items-center gap-4">
        <button className="text-sm px-4 py-2 rounded-full bg-white text-black hover:bg-gray-200 transition font-medium">
          Войти
        </button>
        <button
          onClick={handleInstall}
          className="text-sm px-3 py-2 rounded-full border border-white hover:bg-white hover:text-black transition"
        >
          Установить PWA
        </button>
      </div>
    </header>
  )
}
