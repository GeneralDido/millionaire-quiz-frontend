// app/page.tsx
'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'

export default function Home() {
  const router = useRouter()
  const [code, setCode] = useState('')

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

        <div className="flex space-x-2">
          <Input
            placeholder="Enter quiz code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="h-12 text-lg"
          />
          <Button
            onClick={() => router.push(`/play/${code}`)}
            disabled={!code}
            className="px-8 h-12 bg-primary hover:bg-primary/90 transition-colors"
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  )
}
