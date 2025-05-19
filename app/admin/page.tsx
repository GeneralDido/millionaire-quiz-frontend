// app/admin/page.tsx
'use client'

import {useAdminGenerate} from '@/hooks/useAdminGenerate'
import {useGamesList} from '@/hooks/useGamesList'
import {Button} from '@/components/ui/button'

export default function AdminPage() {
  const gen = useAdminGenerate()
  const {data: games, isLoading, error} = useGamesList()

  return (
    <div className="px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <Button onClick={() => gen.mutate()} disabled={gen.isPending}>
        Generate New Game
      </Button>
      {gen.isError && <p className="text-red-600">Error generating game</p>}
      <h2 className="text-lg font-medium">Existing Games</h2>
      {isLoading && <p>Loading games…</p>}
      {error && <p className="text-red-600">Error loading games list</p>}
      {games && (
        <ul className="space-y-1">
          {games.map((id) => (
            <li key={id} className="underline text-blue-600">
              <a href={`/play/${id}`}>Game {id}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
