'use client'

import React, {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import {useGamesList} from '@/hooks/useGamesList'
import {formatDate} from '@/utils/format'

export default function Home() {
  const router = useRouter()
  const [selectedGameId, setSelectedGameId] = useState<string>('')

  // Fetch the games list
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
      <div className="text-center space-y-6">
        <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
            Millionaire
          </span>
          <span className="block text-foreground">Quiz Game</span>
        </h1>
        <p className="max-w-md mx-auto text-lg text-foreground/70">
          Test your knowledge and climb to the top of the leaderboard!
        </p>
      </div>

      <div className="w-full max-w-md space-y-8">
        <Button
          onClick={() => router.push('/play/random')}
          className="w-full h-16 text-xl shadow-lg bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all"
        >
          Play Random Quiz
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or choose a specific quiz</span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Fixed-height message container to prevent layout shift */}
          <div className="h-6">
            {error && (
              <p className="text-sm text-red-500">Failed to load quiz list</p>
            )}
            {selectedGameId && (
              <p className="text-sm text-green-500">Quiz selected</p>
            )}
          </div>

          <div className="flex space-x-2">
            <div className="flex-1">
              <Select value={selectedGameId} onValueChange={handleGameSelect}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue placeholder={
                    isLoading
                      ? "Loading quizzes..."
                      : error
                        ? "Error loading quizzes"
                        : "Select a quiz"
                  }/>
                </SelectTrigger>
                <SelectContent>
                  {games?.map((game) => (
                    <SelectItem key={game.game_id} value={game.game_id.toString()}>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Quiz #{game.game_id}</span>
                        <span className="text-sm text-muted-foreground">
                          Created: {formatDate(game.created_at)}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                  {games?.length === 0 && (
                    <SelectItem value="no-games" disabled>
                      No quizzes available
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
                  Loading
                </span>
              ) : (
                'Play'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
