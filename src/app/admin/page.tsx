'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminUploadPanel from '@/components/AdminUploadPanel'

export default function AdminPage() {
  const [authorized, setAuthorized] = useState(false)
  const [checked, setChecked] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const stored = localStorage.getItem('topcar-user')
    if (stored) {
      const user = JSON.parse(stored)
      const adminPhones = ['+77001112233', '+77009998877'] // replace with your admin numbers
      if (adminPhones.includes(user.phone)) {
        setAuthorized(true)
      } else {
        router.push('/')
      }
    } else {
      router.push('/')
    }
    setChecked(true)
  }, [router])

  if (!checked) return null

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">👑 Админ-панель</h1>
      {authorized && <AdminUploadPanel />}
    </main>
  )
}

