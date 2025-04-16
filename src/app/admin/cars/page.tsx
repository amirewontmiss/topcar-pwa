'use client'

import { useEffect, useState, ChangeEvent } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

type Car = {
  id: number
  name: string
  price: number
  image: string
  brand: string
  class: string
}

export default function AdminCarsPage() {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)
  const [newCar, setNewCar] = useState({
    name: '',
    brand: '',
    class: '',
    price: '',
    image: '',
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
      setNewCar((p) => ({ ...p, file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleAddCar = async () => {
    if (!newCar.file) return alert('Загрузите изображение авто')

    const fileExt = newCar.file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `cars/${fileName}`

    // Upload image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('cars')
      .upload(filePath, newCar.file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return
    }

    // Insert car record
    const { data, error } = await supabase.from('cars').insert([
      {
        name: newCar.name,
        brand: newCar.brand,
        class: newCar.class,
        price: parseInt(newCar.price),
        image: `/storage/v1/object/public/cars/${fileName}`,
      },
    ])

    if (!error) {
      setNewCar({ name: '', brand: '', class: '', price: '', image: '', file: null })
      setPreview(null)
      fetchCars()
    }
  }

  const deleteCar = async (id: number) => {
    const { error } = await supabase.from('cars').delete().eq('id', id)
    if (!error) setCars((prev) => prev.filter((car) => car.id !== id))
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-8">🚘 Управление автопарком</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4">+ Добавить авто</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Название"
            value={newCar.name}
            onChange={(e) => setNewCar((p) => ({ ...p, name: e.target.value }))}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="text"
            placeholder="Марка"
            value={newCar.brand}
            onChange={(e) => setNewCar((p) => ({ ...p, brand: e.target.value }))}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="text"
            placeholder="Класс"
            value={newCar.class}
            onChange={(e) => setNewCar((p) => ({ ...p, class: e.target.value }))}
            className="bg-black p-3 border border-white/20 rounded-md"
          />
          <input
            type="number"
            placeholder="Цена"
            value={newCar.price}
            onChange={(e) => setNewCar((p) => ({ ...p, price: e.target.value }))}
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

      {/* Car List */}
      {loading ? (
        <p className="text-white/70">Загрузка...</p>
      ) : (
        <ul className="space-y-6">
          {cars.map((car) => (
            <li
              key={car.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={car.image}
                  alt={car.name}
                  width={100}
                  height={60}
                  className="rounded-lg object-cover w-32 h-20"
                />
                <div>
                  <p className="font-semibold text-lg">{car.name}</p>
                  <p className="text-sm text-white/60">{car.brand} — {car.class}</p>
                  <p className="text-sm text-white/70">{car.price.toLocaleString()} ₸ / день</p>
                </div>
              </div>
              <button
                onClick={() => deleteCar(car.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-full font-semibold"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

