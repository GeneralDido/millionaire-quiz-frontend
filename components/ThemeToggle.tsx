// components/ThemeToggle.tsx
'use client'

import {useState, useEffect} from 'react'
import {Button} from '@/components/ui/button'
import {Moon, Sun} from 'lucide-react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  // Initialize from localStorage on mount
  useEffect(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')

    // Set dark mode based on saved preference or system preference
    const prefersDark = savedTheme === 'dark' ||
      (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)

    setIsDark(prefersDark)

    // Apply the theme
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDark(prev => {
      const newValue = !prev

      // Save to localStorage
      localStorage.setItem('theme', newValue ? 'dark' : 'light')

      // Apply the theme
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }

      return newValue
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun size={20}/> : <Moon size={20}/>}
    </Button>
  )
}
