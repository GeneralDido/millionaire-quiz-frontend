// app/layout.tsx
import '@/styles/globals.css'
import {Providers} from './providers'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import React from 'react'

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen bg-gradient-to-b from-background to-secondary">
    <Providers>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 px-6 border-b border-border/50 backdrop-blur-sm bg-background/80">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span
                className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Millionaire Quiz
              </span>
              <nav className="hidden sm:flex space-x-6 ml-8">
                <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
                <Link href="/leaderboard"
                      className="text-foreground/80 hover:text-primary transition-colors">Leaderboard</Link>
                <Link href="/admin" className="text-foreground/80 hover:text-primary transition-colors">Admin</Link>
              </nav>
            </div>
            <ThemeToggle/>
          </div>
        </header>
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="py-6 text-center text-sm text-foreground/60">
          <div className="max-w-7xl mx-auto">
            Millionaire Quiz Game &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </Providers>
    </body>
    </html>
  )
}
