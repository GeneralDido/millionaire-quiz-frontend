// components/admin/GamesList.tsx
'use client'

import {useState} from 'react'
import Link from 'next/link'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {DeleteGameDialog} from '@/components/DeleteGameDialog'
import {useGamesList, GameListEntry} from '@/hooks/useGamesList'
import {useAdminDeleteGame} from '@/hooks/useAdminDeleteGame'
import {formatDate} from '@/utils/format'
import {Loader2, Trash2} from 'lucide-react'
import {LoadingState} from '@/components/ui/LoadingState'
import {EmptyState} from '@/components/ui/EmptyState'

export function GamesList() {
  const {data: games, isLoading, error} = useGamesList()
  const delGame = useAdminDeleteGame()
  const t = useTranslations('AdminDashboard')
  const [deletingGameId, setDeletingGameId] = useState<number | null>(null)

  const handleDeleteGame = async (gameId: number) => {
    setDeletingGameId(gameId)
    try {
      await delGame.mutateAsync(gameId)
    } finally {
      setDeletingGameId(null)
    }
  }

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
      <h2 className="text-lg font-medium mb-4">{t('existingGames')}</h2>

      {isLoading ? (
        <LoadingState className="py-8" size="md"/>
      ) : error ? (
        <p className="py-4 text-red-600">{t('errorLoadingGames')}</p>
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
                    {t('gameNumber', {id: g.game_id})}
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
                        {t('deleting')}
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-1"/>
                        {t('delete')}
                      </>
                    )}
                  </Button>
                </DeleteGameDialog>
              </li>
            )
          })}
        </ul>
      ) : (
        <EmptyState
          title={t('noGamesFound')}
          className="py-4"
        />
      )}
    </div>
  )
}
