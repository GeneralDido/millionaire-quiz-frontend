// components/admin/GameGenerator.tsx
'use client'

import {useTranslations} from 'next-intl'
import {Button} from '@/components/ui/button'
import {useAdminGenerate} from '@/hooks/useAdminGenerate'
import {Loader2} from 'lucide-react'

export function GameGenerator() {
  const gen = useAdminGenerate()
  const t = useTranslations('AdminDashboard')

  return (
    <div className="bg-card rounded-lg p-6 border border-border shadow-sm">
      <h2 className="text-lg font-medium mb-4">{t('gameGenerator')}</h2>
      <Button
        onClick={() => gen.mutate()}
        disabled={gen.isPending}
        className="min-w-[180px] h-10"
        variant="default"
      >
        {gen.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            {t('generating')}
          </>
        ) : (
          t('generateNewGame')
        )}
      </Button>

      {gen.isSuccess && (
        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
          {t('gameGenerated')}
        </p>
      )}

      {gen.isError && (
        <p className="mt-2 text-sm text-red-600">
          {(gen.error as Error).message || t('errorGenerating')}
        </p>
      )}
    </div>
  )
}
