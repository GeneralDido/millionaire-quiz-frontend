// app/admin/games/[gameId]/page.tsx
'use client'
import {useParams, useRouter} from 'next/navigation'
import {useGame} from '@/hooks/useGame'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import {Button} from '@/components/ui/button'

export default function AdminGameDetail() {
  const params = useParams();
  const gameId = params?.gameId ? String(params.gameId) : '';

  const router = useRouter()
  // Turn “123” → 123
  const id = gameId ? Number(gameId) : NaN
  const {data: game, isLoading, error} = useGame(id)

  if (isLoading) return <p>Loading game…</p>
  if (error || !game)
    return (
      <p className="text-center text-red-600">
        Error loading game #{gameId}
      </p>
    )

  return (
    <div className="px-4 py-8 space-y-6">
      <Button variant="link" onClick={() => router.push('/admin')}>
        ← Back to Admin
      </Button>

      <h1 className="text-2xl font-bold">
        Game {game.game_id} — Questions Overview
      </h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
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
              <TableCell>{q.q}</TableCell>
              <TableCell>{q.correct}</TableCell>
              <TableCell>{q.wrong.join(', ')}</TableCell>
              <TableCell>{q.hint || '—'}</TableCell>
            </TableRow>
          ))}

          {game.bonus_question && (
            <TableRow key="bonus">
              <TableCell>Bonus</TableCell>
              <TableCell>{game.bonus_question.q}</TableCell>
              <TableCell>{game.bonus_question.correct}</TableCell>
              <TableCell>
                {game.bonus_question.wrong.join(', ')}
              </TableCell>
              <TableCell>{game.bonus_question.hint || '—'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
