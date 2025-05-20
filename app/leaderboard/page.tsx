// app/leaderboard/page.tsx
'use client'

import {useLeaderboard} from '@/hooks/useLeaderboard'
import {LEADERBOARD_SIZE} from '@/utils/game'
import LeaderboardTable from '@/components/LeaderboardTable'

export default function LeaderboardPage() {
  const {data: entries, isLoading, error} = useLeaderboard(LEADERBOARD_SIZE)

  if (isLoading) return <p className="text-center">Loading leaderboard…</p>
  if (error || !entries) return <p className="text-center text-red-500">Error loading leaderboard.</p>

  return (
    <div className="px-4 py-8">
      <LeaderboardTable entries={entries}/>
    </div>
  )
}
