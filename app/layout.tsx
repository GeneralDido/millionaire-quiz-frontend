// app/layout.tsx
import '@/styles/globals.css'
import {SpeedInsights} from "@vercel/speed-insights/next"
import {Analytics} from "@vercel/analytics/next"
import {Providers} from './providers'
import React from 'react'
import {NextIntlClientProvider} from 'next-intl'
import {getMessages, getTranslations} from 'next-intl/server'
import {metadata as appMetadata} from './metadata'
import {Metadata} from 'next'
import {AppHeader} from '@/components/navigation/AppHeader'

export const metadata: Metadata = appMetadata

export default async function RootLayout({children}: { children: React.ReactNode }) {
  const messages = await getMessages()
  const tFooter = await getTranslations('Footer')

  return (
    <html lang="en">
    <body className="min-h-screen bg-gradient-to-b from-background to-secondary">
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <div className="flex flex-col min-h-screen">
          <AppHeader/>
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
      <Analytics/>
    </NextIntlClientProvider>
    </body>
    </html>
  )
}
