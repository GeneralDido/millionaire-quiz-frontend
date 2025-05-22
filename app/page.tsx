'use client'

import React, {useState} from 'react'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {useGamesList} from '@/hooks/useGamesList'
import {formatDate} from '@/utils/format'

export default function Home() {
  const router = useRouter()
  const [selectedGameId, setSelectedGameId] = useState<string>('')
  const t = useTranslations('HomePage')

  const {data: games, isLoading, error} = useGamesList()

  const handleGameSelect = (gameId: string) => {
    setSelectedGameId(gameId)
  }

  const handlePlaySelectedGame = () => {
    if (selectedGameId) {
      router.push(`/play/${selectedGameId}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] -mt-16 space-y-12">
      <div className="text-center space-y-6 py-10 sm:py-0">
        <Image
          src="/favicon.svg"
          alt="PeakPuzzler logo"
          width={96}
          height={96}
          className="mx-auto"
        />
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            {t('title')}
          </span>
          <span className="block text-foreground">{t('subtitle')}</span>
        </h1>
        <p className="max-w-md mx-auto text-lg text-foreground/70">
          {t('description')}
        </p>
      </div>
      <div className="w-full max-w-md space-y-8">
        <Button
          onClick={() => router.push('/play/random')}
          className="w-full h-16 text-xl shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all"
        >
          {t('playRandom')}
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            {t('orChooseSpecific')}
          </p>
        </div>

        <div className="space-y-2">
          <div className="h-6">
            {error && (
              <p className="text-sm text-red-500">{t('failedToLoadQuizList')}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Select value={selectedGameId} onValueChange={handleGameSelect}>
                <SelectTrigger className="h-12 text-lg bg-card border-border">
                  <SelectValue placeholder={
                    isLoading
                      ? t('loadingQuizzes')
                      : error
                        ? t('errorLoadingQuizzes')
                        : t('selectQuiz')
                  }/>
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {games?.map((game) => (
                    <SelectItem key={game.game_id} value={game.game_id.toString()}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">
                          {t('quizNumber', {id: game.game_id})}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {t('created', {date: formatDate(game.created_at)})}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                  {games?.length === 0 && (
                    <SelectItem value="no-games" disabled>
                      {t('noQuizzesAvailable')}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handlePlaySelectedGame}
              disabled={!selectedGameId || isLoading || !!error}
              className="px-8 h-12 bg-primary hover:bg-primary/90 transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                           strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('loading')}
                </span>
              ) : (
                t('play')
              )}
            </Button>
          </div>

          <div className="h-6">
            {selectedGameId && (
              <p className="text-sm text-green-500">{t('quizSelected')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
