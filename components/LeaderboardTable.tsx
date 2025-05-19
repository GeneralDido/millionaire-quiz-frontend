// components/LeaderboardTable.tsx
'use client'

import type {LeaderboardEntry} from '@/utils/apiTypes'
import {Card, CardHeader, CardContent} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table'
import {formatDate} from '@/utils/format'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export default function LeaderboardTable({entries}: LeaderboardTableProps) {
  return (
    <Card className="max-w-lg mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Game ID</TableHead>
              <TableHead>Best Score</TableHead>
              <TableHead>Played At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((e, i) => (
              <TableRow key={i}>
                <TableCell>{e.player}</TableCell>
                <TableCell>{e.game_id}</TableCell>
                <TableCell>{e.best}</TableCell>
                <TableCell>{formatDate(e.played_at)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
