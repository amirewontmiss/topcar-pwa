'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type Props = {
  onClose: () => void
}

export default function LoginModal({ onClose }: Props) {
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (isSignup) {
      const { data, error } = await supabase.from('users').insert([
        { name, email, phone, password },
      ])

      if (error) {
        setError('Ошибка при регистрации')
      } else {
        localStorage.setItem('topcar-user', JSON.stringify({ name, email, phone }))
        window.location.reload()
      }
    } else {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single()

      if (error || !data) {
        setError('Ошибка при входе. Проверьте данные.')
      } else {
        localStorage.setItem('topcar-user', JSON.stringify(data))
        window.location.reload()
      }
    }

    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
      <div className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isSignup ? 'Регистрация в TopCar' : 'Вход в TopCar'}
        </h2>

        <div className="space-y-4">
          {isSignup && (
            <input
              type="text"
              placeholder="Имя"
              className="w-full p-3 rounded bg-white/5 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded bg-white/5 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {isSignup && (
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full p-3 rounded bg-white/5 text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          )}
          <input
            type="password"
            placeholder="Пароль"
            className="w-full p-3 rounded bg-white/5 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-400 text-sm mt-4">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          {loading
            ? isSignup
              ? 'Регистрация...'
              : 'Вход...'
            : isSignup
            ? 'Зарегистрироваться'
            : 'Продолжить'}
        </button>

        <p className="mt-4 text-sm text-white/60 text-center">
          {isSignup ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button
            className="underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </p>

        <button
          onClick={onClose}
          className="mt-2 text-sm text-white/60 underline block text-center"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}

