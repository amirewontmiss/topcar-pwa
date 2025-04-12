'use client'

import { useEffect } from 'react'
import Image from 'next/image'

type Car = {
  name: string
  price: string
  image: string
  description?: string
}

type CarModalProps = {
  isOpen: boolean
  onClose: () => void
  car: Car
}

export default function CarModal({ isOpen, onClose, car }: CarModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-fadeInUp">
        <Image
          src={car.image}
          alt={car.name}
          width={1000}
          height={400}
          className="w-full h-60 object-cover border-b border-white/10"
        />
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">{car.name}</h2>
            <button
              onClick={onClose}
              className="text-white/50 hover:text-white text-2xl leading-none"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-white/80 mb-4">{car.price}</p>
          <p className="text-white/70 text-sm leading-relaxed">
            {car.description ||
              'Премиум-комфорт, идеален для деловых поездок и мероприятий. В наличии последние модели с полным обслуживанием.'}
          </p>
        </div>
      </div>
    </div>
  )
}

