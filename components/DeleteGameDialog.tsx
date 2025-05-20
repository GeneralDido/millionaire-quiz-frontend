// components/DeleteGameDialog.tsx
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
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Game {gameId}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this game? This will permanently remove the game and all its scores. This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center items-center gap-3 sm:justify-center">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400"
          >
            Delete Game
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
