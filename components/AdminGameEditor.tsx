'use client'
import {useState} from 'react'
import {Button} from '@/components/ui/button'
import {Textarea} from '@/components/ui/textarea'
import {Loader2} from 'lucide-react'
import {useAdminUpdateGame} from '@/hooks/useAdminUpdateGame'
import {toast} from 'react-hot-toast'
import {useTranslations} from 'next-intl'

interface AdminGameEditorProps {
  gameId: number
}

export function AdminGameEditor({gameId}: AdminGameEditorProps) {
  const t = useTranslations('AdminGameEditor')
  const [prompt, setPrompt] = useState<string>('')
  const mutation = useAdminUpdateGame(gameId)
  const isUpdating = mutation.isPending

  const handleSubmit = async () => {
    if (!prompt.trim()) return
    try {
      await mutation.mutateAsync({prompt})
      toast.success(t('successMessage'))
      setPrompt('')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : t('errorMessage')
      toast.error(message)
    }
  }

  return (
    <div className="mt-6 p-4 border border-border rounded-lg bg-card">
      <h2 className="text-lg font-medium mb-4">{t('title')}</h2>
      <Textarea
        placeholder={t('placeholder')}
        rows={4}
        value={prompt}
        onChange={(e) => setPrompt(e.currentTarget.value)}
        disabled={isUpdating}
      />
      <Button
        className="mt-2"
        onClick={handleSubmit}
        disabled={isUpdating || !prompt.trim()}
      >
        {isUpdating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin"/>{t('updating')}
          </>
        ) : (
          t('buttonUpdate')
        )}
      </Button>
    </div>
  )
}
