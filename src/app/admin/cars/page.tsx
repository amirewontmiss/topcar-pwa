'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Car = {
  id: number
  name: string
  brand: string
  class: string
  price: number
  image_url: string
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    class: '',
    price: '',
    file: null as File | null,
  })
  const [preview, setPreview] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      const user = JSON.parse(stored)
      if (user.email !== 'admin@topcar.kz') {
        router.push('/')
      } else {
        fetchCars()
      }
    } else {
      router.push('/')
    }
  }, [router])

  const fetchCars = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('cars').select('*')
    if (!error && data) setCars(data)
    setLoading(false)
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCar((prev) => ({ ...prev, file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleAddCar = async () => {
    if (!newCar.name || !newCar.brand || !newCar.class || !newCar.price || !newCar.file) {
      alert('Пожалуйста, заполните все поля')
      return
    }

    const fileExt = newCar.file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase.storage
      .from('cars')
      .upload(fileName, newCar.file, { upsert: true })

    if (uploadError) {
      alert(`Ошибка загрузки: ${uploadError.message}`)
      return
    }

    const image_url = `/storage/v1/object/public/cars/${fileName}`

    const { error: insertError } = await supabase.from('cars').insert([
      {
        name: newCar.name,
        brand: newCar.brand,
        class: newCar.class,
        price: parseInt(newCar.price),
        image_url,
      },
    ])

    if (insertError) {
      alert(`Ошибка добавления в базу: ${insertError.message}`)
    } else {
      setNewCar({ name: '', brand: '', class: '', price: '', file: null })
      setPreview(null)
      fetchCars()
    }
  }

  const handleDeleteCar = async (id: number) => {
    const { error } = await supabase.from('cars').delete().eq('id', id)
    if (!error) {
      setCars((prev) => prev.filter((car) => car.id !== id))
    }
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">Админ-панель: Автомобили</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">Добавить авто</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Название"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="text"
            placeholder="Марка"
            value={newCar.brand}
            onChange={(e) => setNewCar({ ...newCar, brand: e.target.value })}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="text"
            placeholder="Класс"
            value={newCar.class}
            onChange={(e) => setNewCar({ ...newCar, class: e.target.value })}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="number"
            placeholder="Цена"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="bg-black p-3 border border-white/20 rounded-md text-white"
          />
        </div>

        {preview && (
          <div className="mt-4">
            <Image
              src={preview}
              alt="preview"
              width={200}
              height={150}
              className="rounded-lg object-cover"
            />
          </div>
        )}

        <button
          onClick={handleAddCar}
          className="mt-6 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-[#d4af37] hover:text-white transition"
        >
          Добавить авто
        </button>
      </div>

      <div className="space-y-6">
        {loading ? (
          <p className="text-white/70">Загрузка...</p>
        ) : cars.length === 0 ? (
          <p className="text-white/70">Автомобили не найдены.</p>
        ) : (
          cars.map((car) => (
            <div
              key={car.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={car.image_url}
                  alt={car.name}
                  width={100}
                  height={60}
                  className="rounded-md object-cover w-28 h-20"
                />
                <div>
                  <p className="text-lg font-semibold">{car.name}</p>
                  <p className="text-sm text-white/60">{car.brand} • {car.class}</p>
                  <p className="text-sm text-white/70">{car.price.toLocaleString()} ₸ / день</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteCar(car.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full"
              >
                Удалить
              </button>
            </div>
          ))
        )}
      </div>
    </main>
  )
}

