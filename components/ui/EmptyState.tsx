// components/ui/EmptyState.tsx
import React from 'react'

interface EmptyStateProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function EmptyState({
                             title,
                             description,
                             children,
                             className = "min-h-[40vh]"
                           }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4 max-w-md">{description}</p>
      )}
      {children}
    </div>
  )
}
