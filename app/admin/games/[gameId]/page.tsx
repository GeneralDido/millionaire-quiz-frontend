// app/admin/games/[gameId]/page.tsx
'use client'
import {useParams, useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import {useGame} from '@/hooks/useGame'
import {useAdminDeleteGame} from '@/hooks/useAdminDeleteGame'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import {Button} from '@/components/ui/button'
import {DeleteGameDialog} from '@/components/DeleteGameDialog'
import {Loader2, Trash2, ArrowLeft} from 'lucide-react'
import {AdminGameEditor} from '@/components/AdminGameEditor'

export default function AdminGameDetail() {
  const params = useParams()
  const gameId = params?.gameId ? String(params.gameId) : ''
  const id = gameId ? Number(gameId) : NaN
  const router = useRouter()
  const {data: game, isLoading, error} = useGame(id)
  const delGame = useAdminDeleteGame()
  const t = useTranslations('AdminGameDetail')

  if (isLoading) return <p>{t('loadingGame')}</p>
  if (error || !game)
    return (
      <p className="text-center text-red-600">
        {t('errorLoading', {gameId})}
      </p>
    )

  return (

    <div className="px-4 py-8 space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/admin')}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4"/>
          {t('backToAdmin')}
        </Button>

        <DeleteGameDialog
          gameId={id}
          onConfirm={() => delGame.mutate(id, {
            onSuccess: () => router.push('/admin')
          })}
        >
          <Button
            variant="outline"
            disabled={delGame.isPending}
            className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:border-red-300 dark:hover:border-red-600"
          >
            {delGame.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin"/>
                {t('deleting')}
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2"/>
                {t('deleteGame')}
              </>
            )}
          </Button>
        </DeleteGameDialog>
      </div>

      <h1 className="text-2xl font-bold">
        {t('gameOverview', {id: game.game_id})}
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('tableHeaders.number')}</TableHead>
            <TableHead>{t('tableHeaders.category')}</TableHead>
            <TableHead>{t('tableHeaders.difficulty')}</TableHead>
            <TableHead>{t('tableHeaders.question')}</TableHead>
            <TableHead>{t('tableHeaders.correct')}</TableHead>
            <TableHead>{t('tableHeaders.wrong')}</TableHead>
            <TableHead>{t('tableHeaders.hint')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {game.questions.map((q, idx) => (
            <TableRow key={idx}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{q.category}</TableCell>
              <TableCell>{q.difficulty}</TableCell>
              <TableCell>{q.q}</TableCell>
              <TableCell>{q.correct}</TableCell>
              <TableCell>{q.wrong.join(', ')}</TableCell>
              <TableCell>{q.hint || '—'}</TableCell>
            </TableRow>
          ))}

          {game.bonus_question && (
            <TableRow key="bonus">
              <TableCell>{t('bonus')}</TableCell>
              <TableCell>{game.bonus_question.category}</TableCell>
              <TableCell>{game.bonus_question.difficulty}</TableCell>
              <TableCell>{game.bonus_question.q}</TableCell>
              <TableCell>{game.bonus_question.correct}</TableCell>
              <TableCell>{game.bonus_question.wrong.join(', ')}</TableCell>
              <TableCell>{game.bonus_question.hint || '—'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AdminGameEditor gameId={parseInt(gameId)}/>
    </div>
  )
}
