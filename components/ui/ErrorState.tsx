// components/ui/ErrorState.tsx
'use client'

import {useRouter} from 'next/navigation'
import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {AlertCircle} from 'lucide-react'

interface ErrorStateProps {
  title?: string
  message?: string
  showReturnHome?: boolean
  onRetry?: () => void
  className?: string
}

export function ErrorState({
                             title,
                             message,
                             showReturnHome = true,
                             onRetry,
                             className = "min-h-[60vh]"
                           }: ErrorStateProps) {
  const router = useRouter()
  const t = useTranslations('Common')

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <div className="p-3 rounded-full bg-destructive/10 text-destructive mb-4">
        <AlertCircle className="w-6 h-6"/>
      </div>
      <h2 className="text-xl font-semibold mb-2">
        {title || t('errorOccurred')}
      </h2>
      {message && (
        <p className="text-red-600 mb-4 max-w-md">{message}</p>
      )}
      <div className="flex gap-2">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="px-4 py-2"
          >
            {t('retry')}
          </Button>
        )}
        {showReturnHome && (
          <Button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {t('returnHome')}
          </Button>
        )}
      </div>
    </div>
  )
}
