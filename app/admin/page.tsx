// app/admin/page.tsx
'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useAdminGenerate} from '@/hooks/useAdminGenerate'
import {useGamesList, GameListEntry} from '@/hooks/useGamesList'
import {Button} from '@/components/ui/button'
import Link from 'next/link'

export default function AdminPage() {
  const router = useRouter()
  const gen = useAdminGenerate()
  const {data: games, isLoading, error} = useGamesList()

  const [checking, setChecking] = useState(true)
  useEffect(() => {
    fetch('/api/admin/me').then((r) => {
      if (!r.ok) router.push('/admin/login')
      else setChecking(false)
    })
  }, [router])

  if (checking) return <p>Verifying credentials…</p>

  return (
    <div className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Button
        onClick={() => gen.mutate()}
        disabled={gen.isPending}
      >
        Generate New Game
      </Button>
      {gen.isError && (
        <p className="text-red-600">
          {(gen.error as Error).message || 'Error generating game'}
        </p>
      )}

      <h2 className="text-lg font-medium">Existing Games</h2>
      {isLoading && <p>Loading games…</p>}
      {error && <p className="text-red-600">Error loading games</p>}
      <ul className="space-y-2">
        {games?.map((g: GameListEntry) => (
          <li key={g.game_id} className="flex justify-between">
            <Link
              href={`/admin/games/${g.game_id}`}
              className="text-blue-600 underline"
            >
              Game {g.game_id}
            </Link>
            <span className="text-sm text-gray-500">
              {new Date(g.created_at).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
