'use client'

import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import axios from 'axios'

export default function Home() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState('')

  // Handle input change - only allow numbers
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numeric input
    const numericValue = e.target.value.replace(/\D/g, '')
    setCode(numericValue)
  }

  // Validate code whenever it changes
  useEffect(() => {
    // Reset validation states when input changes
    setIsValid(null)
    setError('')

    // Skip validation for empty input
    if (!code) return

    // Set checking to true immediately to prevent premature button clicks
    setIsChecking(true)

    // Debounce validation to avoid too many requests
    const handler = setTimeout(async () => {
      try {
        // Check if game exists using your API
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/games/${code}/exists`)
        setIsValid(response.data.exists)
        if (!response.data.exists) {
          setError('This quiz code does not exist')
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setIsValid(false)
        setError('Error checking quiz code')
      } finally {
        setIsChecking(false)
      }
    }, 500) // Validate after 500ms of no typing

    return () => clearTimeout(handler)
  }, [code])

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
            <span className="bg-background px-2 text-muted-foreground">Or enter a game code</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex space-x-2">
            <div className="flex-1">
              <Input
                placeholder="Enter quiz code"
                value={code}
                onChange={handleCodeChange}
                inputMode="numeric"
                pattern="[0-9]*"
                className={`h-12 text-lg ${isValid === false ? 'border-red-500 focus-visible:ring-red-500' : isValid === true ? 'border-green-500 focus-visible:ring-green-500' : ''}`}
              />
              {/* Fixed-height validation message container to prevent layout shift */}
              <div className="h-6 mt-1">
                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
                {isValid === true && (
                  <p className="text-sm text-green-500">Valid quiz code</p>
                )}
              </div>
            </div>
            <Button
              onClick={() => router.push(`/play/${code}`)}
              disabled={isChecking || !code || isValid === false}
              className="px-8 h-12 bg-primary hover:bg-primary/90 transition-colors"
            >
              {isChecking ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg"
                       fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                            strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking
                </span>
              ) : (
                'Go'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
