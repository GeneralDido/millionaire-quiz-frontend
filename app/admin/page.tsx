// app/admin/page.tsx
'use client'
import {useEffect, useState} from 'react'
import {useRouter} from 'next/navigation'
import {useAdminGenerate} from '@/hooks/useAdminGenerate'
import {useGamesList, GameListEntry} from '@/hooks/useGamesList'
import {useAdminDeleteGame} from '@/hooks/useAdminDeleteGame'
import {Button} from '@/components/ui/button'
import {DeleteGameDialog} from '@/components/DeleteGameDialog'
import Link from 'next/link'
import {formatDate} from '@/utils/format'
import {Loader2, Trash2} from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const gen = useAdminGenerate()
  const delGame = useAdminDeleteGame()
  const {data: games, isLoading, error} = useGamesList()

  const [checking, setChecking] = useState(true)
  const [deletingGameId, setDeletingGameId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/me').then((r) => {
      if (!r.ok) router.push('/admin/login')
      else setChecking(false)
    })
  }, [router])

  const handleDeleteGame = async (gameId: number) => {
    setDeletingGameId(gameId)
    try {
      await delGame.mutateAsync(gameId)
    } finally {
      setDeletingGameId(null)
    }
  }

  if (checking) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary"/>
          <p className="text-sm text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Game Generator</h2>
        <Button
          onClick={() => gen.mutate()}
          disabled={gen.isPending}
          className="min-w-[180px] h-10"
          variant="default"
        >
          {gen.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
              Generating...
            </>
          ) : (
            'Generate New Game'
          )}
        </Button>

        {gen.isSuccess && (
          <p className="mt-2 text-sm text-green-600 dark:text-green-400">
            Game successfully generated!
          </p>
        )}

        {gen.isError && (
          <p className="mt-2 text-sm text-red-600">
            {(gen.error as Error).message || 'Error generating game'}
          </p>
        )}
      </div>

      <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
        <h2 className="text-lg font-medium mb-4">Existing Games</h2>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary"/>
          </div>
        ) : error ? (
          <p className="py-4 text-red-600">Error loading games</p>
        ) : games && games.length > 0 ? (
          <ul className="divide-y divide-border">
            {games.map((g: GameListEntry) => {
              const isDeleting = deletingGameId === g.game_id
              return (
                <li key={g.game_id} className="flex justify-between items-center py-3">
                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin/games/${g.game_id}`}
                      className="text-primary hover:text-primary/80 hover:underline font-medium"
                    >
                      Game {g.game_id}
                    </Link>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(g.created_at)}
                    </span>
                  </div>
                  <DeleteGameDialog
                    gameId={g.game_id}
                    onConfirm={() => handleDeleteGame(g.game_id)}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isDeleting}
                      className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-600"
                    >
                      {isDeleting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-1 animate-spin"/>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-1"/>
                          Delete
                        </>
                      )}
                    </Button>
                  </DeleteGameDialog>
                </li>
              )
            })}
          </ul>
        ) : (
          <p className="py-4 text-center text-muted-foreground">No games found</p>
        )}
      </div>
    </div>
  )
}
