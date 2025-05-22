import type {Metadata} from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      {url: '/favicon.ico', sizes: '32x32'},
      { url: '/favicon.svg', type: 'image/svg+xml' },
      {url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png'},
      {url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png'}
    ],
    shortcut: '/favicon.ico',
    apple: [
      {url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png'}
    ],
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
