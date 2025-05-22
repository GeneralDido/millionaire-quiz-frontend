import type {Metadata} from 'next'

export const metadata: Metadata = {
  icons: {
    icon: [
      {url: '/favicon.svg?v=2', type: 'image/svg+xml'},
      {url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png'},
      {url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png'}
    ],
    shortcut: '/favicon-32x32.png?v=2',
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
