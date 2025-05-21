// components/LeaderboardTable.tsx
'use client'

import {useTranslations} from 'next-intl'
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
import {Trophy, Medal, Award} from 'lucide-react'

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export default function LeaderboardTable({entries}: LeaderboardTableProps) {
  const t = useTranslations('Leaderboard')

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <CardHeader className="peak-puzzler-gradient">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-6 h-6"/>
          {t('title')}
        </h2>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-16 text-center">{t('rank')}</TableHead>
              <TableHead>{t('player')}</TableHead>
              <TableHead className="text-center">{t('gameNumber')}</TableHead>
              <TableHead className="text-right">{t('score')}</TableHead>
              <TableHead className="hidden md:table-cell">{t('date')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry, i) => (
              <TableRow key={i} className={i < 3 ? 'bg-muted/20' : ''}>
                <TableCell className="text-center font-medium">
                  {i === 0 ? (
                    <div
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-money-gold/20 text-money-gold">
                      <Trophy className="w-4 h-4"/>
                    </div>
                  ) : i === 1 ? (
                    <div
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-300/20 text-gray-400">
                      <Medal className="w-4 h-4"/>
                    </div>
                  ) : i === 2 ? (
                    <div
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-700/20 text-amber-700">
                      <Award className="w-4 h-4"/>
                    </div>
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </TableCell>
                <TableCell className="font-medium">{entry.player}</TableCell>
                <TableCell className="text-center">{entry.game_id}</TableCell>
                <TableCell className="font-mono text-right">
                  {entry.best.toLocaleString()}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatDate(entry.played_at)}
                </TableCell>
              </TableRow>
            ))}
            {entries.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  {t('noScores')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
