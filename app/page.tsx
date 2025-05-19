import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Millionaire Quiz</h1>
      <Link href="/play/random" className="btn btn-primary">Play Random Quiz</Link>
      <Link href="/leaderboard" className="btn btn-outline">Leaderboard</Link>
    </main>
  )
}
