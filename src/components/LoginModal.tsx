'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const router = useRouter()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSignupMode, setIsSignupMode] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    if (!phone.match(/^[0-9+\-()\s]{7,15}$/)) {
      setMessage('Введите корректный номер телефона')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setMessage('Пароль должен содержать минимум 6 символов')
      setLoading(false)
      return
    }

    if (isSignupMode) {
      if (!name.trim()) {
        setMessage('Введите имя')
        setLoading(false)
        return
      }

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        setMessage('Введите корректный email')
        setLoading(false)
        return
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const { data, error } = await supabase.from('users').insert([
        {
          phone,
          password: hashedPassword,
          name,
          email,
        },
      ])

      console.log('✅ Supabase data:', data)
      console.log('🚨 Supabase error:', error)

      if (error) {
        setMessage(`Ошибка при регистрации: ${error.message}`)
        setLoading(false)
        return
      }

      localStorage.setItem('topcar-user', JSON.stringify({ phone, name, email }))
      setMessage('Регистрация успешна ✅')
      setTimeout(() => {
        onClose()
        router.push('/dashboard')
      }, 1000)
    } else {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single()

      if (error || !user) {
        setMessage('Пользователь не найден')
        setLoading(false)
        return
      }

      const passwordMatch = await bcrypt.compare(password, user.password)
      if (!passwordMatch) {
        setMessage('Неверный пароль')
        setLoading(false)
        return
      }

      localStorage.setItem('topcar-user', JSON.stringify(user))
      setMessage('Вход выполнен ✅')
      setTimeout(() => {
        onClose()
        router.push('/dashboard')
      }, 1000)
    }

    setLoading(false)
  }

  const handleMagicLink = async () => {
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setMessage('Введите корректный email для ссылки входа')
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/dashboard`,
      },
    })

    if (error) {
      setMessage('Ошибка при отправке ссылки входа')
    } else {
      setMessage('Письмо со ссылкой отправлено ✅')
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-black border border-white/10 w-full max-w-md rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          {isSignupMode ? 'Регистрация в TopCar' : 'Вход в TopCar'}
        </h2>

        {isSignupMode && (
          <>
            <input
              type="text"
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 bg-white/5 text-white w-full rounded-md mb-3"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 bg-white/5 text-white w-full rounded-md mb-3"
            />
          </>
        )}

        <input
          type="text"
          placeholder="Телефон"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-3 bg-white/5 text-white w-full rounded-md mb-3"
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-white/5 text-white w-full rounded-md mb-4 pr-10"
          />
          <button
            type="button"
            className="absolute top-2.5 right-3 text-white/70 text-sm"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Скрыть' : 'Показать'}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-full font-semibold hover:bg-gray-200 transition"
        >
          {loading
            ? 'Загрузка...'
            : isSignupMode
            ? 'Зарегистрироваться'
            : 'Продолжить'}
        </button>

        {message && (
          <p className="text-sm text-white/70 mt-3 text-center">{message}</p>
        )}

        {!isSignupMode && (
          <div className="mt-4">
            <button
              onClick={handleMagicLink}
              className="text-sm text-white/60 hover:underline block mx-auto"
            >
              Войти через ссылку на email
            </button>
          </div>
        )}

        <div className="mt-4 text-center text-sm text-white/50">
          {isSignupMode ? (
            <>
              Уже есть аккаунт?{' '}
              <button
                onClick={() => setIsSignupMode(false)}
                className="text-white underline"
              >
                Войти
              </button>
            </>
          ) : (
            <>
              Впервые здесь?{' '}
              <button
                onClick={() => setIsSignupMode(true)}
                className="text-white underline"
              >
                Зарегистрироваться
              </button>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="text-sm text-white/40 hover:underline mt-4 block mx-auto"
        >
          Отмена
        </button>
      </div>
    </div>
  )
}

