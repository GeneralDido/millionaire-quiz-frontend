// app/admin/page.tsx
'use client'

import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import {GameGenerator} from '@/components/admin/GameGenerator'
import {GamesList} from '@/components/admin/GamesList'
import {LoadingState} from '@/components/ui/LoadingState'

export default function AdminPage() {
  const router = useRouter()
  const t = useTranslations('AdminDashboard')
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    fetch('/api/admin/me').then((r) => {
      if (!r.ok) router.push('/admin/login')
      else setChecking(false)
    })
  }, [router])

  if (checking) {
    return (
      <LoadingState
        message={t('verifyingCredentials')}
        className="min-h-[60vh]"
      />
    )
  }

  return (
    <div className="px-4 py-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">{t('title')}</h1>
      <GameGenerator/>
      <GamesList/>
    </div>
  )
}
