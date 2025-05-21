// app/leaderboard/page.tsx
'use client'

import {useTranslations} from 'next-intl'
import {useLeaderboard} from '@/hooks/useLeaderboard'
import LeaderboardTable from '@/components/LeaderboardTable'

export default function LeaderboardPage() {
  const {data: entries, isLoading, error} = useLeaderboard()
  const t = useTranslations('Leaderboard')

  if (isLoading) return <p className="text-center">{t('loading')}</p>
  if (error || !entries) return <p className="text-center text-red-500">{t('error')}</p>

  return (
    <div className="px-4 py-8">
      <LeaderboardTable entries={entries}/>
    </div>
  )
}
