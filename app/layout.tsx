// app/layout.tsx
import '@/styles/globals.css'
import {Providers} from './providers'
import Link from 'next/link'

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>
    <Providers>
      <header className="p-4 bg-gray-100 dark:bg-gray-800">
        <nav className="max-w-4xl mx-auto flex space-x-4">
          <Link href="/" className="text-gray-700 hover:underline">Home</Link>
          <Link href="/leaderboard" className="text-gray-700 hover:underline">Leaderboard</Link>
          <Link href="/admin" className="text-gray-700 hover:underline">Admin</Link>
        </nav>
      </header>
      <main className="max-w-4xl mx-auto">{children}</main>
    </Providers>
    </body>
    </html>
  )
}
