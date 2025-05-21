// app/layout.tsx
import '@/styles/globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Providers} from './providers'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'
import MobileNavigation from '@/components/MobileNavigation'
import React from 'react'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'


export default async function RootLayout({children}: { children: React.ReactNode }) {
  const messages = await getMessages();
  const t = await getTranslations('Navigation');
  const tFooter = await getTranslations('Footer');

  return (
    <html lang="en">
    <body className="min-h-screen bg-gradient-to-b from-background to-secondary">
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <header className="py-4 px-6 border-b border-border/50 backdrop-blur-sm bg-background/80 relative">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {t('PeakPuzzlerQuiz')}
                </span>
                {/* Desktop navigation - hidden on mobile */}
                <nav className="hidden sm:flex space-x-6 ml-8">
                  <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">{t('home')}</Link>
                  <Link href="/leaderboard"
                        className="text-foreground/80 hover:text-primary transition-colors">{t('leaderboard')}</Link>
                  <Link href="/how-to-play"
                        className="text-foreground/80 hover:text-primary transition-colors">{t('howToPlay')}</Link>
                  <Link href="/admin"
                        className="text-foreground/80 hover:text-primary transition-colors">{t('admin')}</Link>
                </nav>
              </div>

              <div className="flex items-center gap-2">
                <ThemeToggle/>
                {/* Mobile navigation button */}
                <MobileNavigation/>
              </div>
            </div>
          </header>

          <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>

          <footer className="py-6 text-center text-sm text-foreground/60">
            <div className="max-w-7xl mx-auto">
              {tFooter('copyright', {year: new Date().getFullYear()})}
            </div>
          </footer>
        </div>
      </Providers>
      <SpeedInsights/>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
