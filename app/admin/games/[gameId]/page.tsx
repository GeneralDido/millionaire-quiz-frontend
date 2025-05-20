// app/admin/games/[gameId]/page.tsx
'use client'
import {useParams, useRouter} from 'next/navigation'
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

export default function AdminGameDetail() {
  const params = useParams()
  const gameId = params?.gameId ? String(params.gameId) : ''
  const id = gameId ? Number(gameId) : NaN
  const router = useRouter()
  const {data: game, isLoading, error} = useGame(id)
  const delGame = useAdminDeleteGame()

  if (isLoading) return <p>Loading game…</p>
  if (error || !game)
    return (
      <p className="text-center text-red-600">
        Error loading game #{gameId}
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
          Back to Admin
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
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-4 w-4 mr-2"/>
                Delete Game
              </>
            )}
          </Button>
        </DeleteGameDialog>
      </div>

      <h1 className="text-2xl font-bold">
        Game {game.game_id} — Questions Overview
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Difficulty</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Correct</TableHead>
            <TableHead>Wrong</TableHead>
            <TableHead>Hint</TableHead>
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
              <TableCell>Bonus</TableCell>
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
    </div>
  )
}
