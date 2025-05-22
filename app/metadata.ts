import type {Metadata} from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      '/favicon-16x16.png',
      '/favicon-32x32.png',
      '/favicon.ico',
      {url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml'}
    ],

    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',

    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  manifest: '/site.webmanifest'
}
