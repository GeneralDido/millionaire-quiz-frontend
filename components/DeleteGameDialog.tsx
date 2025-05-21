// components/DeleteGameDialog.tsx
import {useTranslations} from 'next-intl'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import React from 'react'

interface DeleteGameDialogProps {
  gameId: number
  onConfirm: () => void
  children: React.ReactNode
}

export function DeleteGameDialog({gameId, onConfirm, children}: DeleteGameDialogProps) {
  const t = useTranslations('DeleteDialog')

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title', {id: gameId})}</AlertDialogTitle>
          <AlertDialogDescription>
            {t('description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-3 sm:justify-center">
          <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
          >
            {t('delete')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
