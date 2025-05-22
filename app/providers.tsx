'use client'

import type {ReactNode} from 'react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {Toaster} from 'react-hot-toast'

const queryClient = new QueryClient()

interface ProvidersProps {
  children: ReactNode
}

export function Providers({children}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false}/>
      <Toaster/>
    </QueryClientProvider>
  )
}
