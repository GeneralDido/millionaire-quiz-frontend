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
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Millionaire Quiz</h1>
      <div>
        <Button onClick={() => router.push('/play/random')}>Play Random Quiz</Button>
      </div>
      <div className="flex space-x-2">
        <Input
          placeholder="Enter quiz code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button onClick={() => router.push(`/play/${code}`)} disabled={!code}>
          Go
        </Button>
      </div>
    </div>
  )
}
