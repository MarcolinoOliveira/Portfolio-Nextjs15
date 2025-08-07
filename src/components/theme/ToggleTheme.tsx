'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from 'lucide-react';

const ToggleTheme = () => {

  const [isDark, setIsDark] = useState<boolean>()

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    setIsDark(prev => !prev)
  }

  useEffect(() => {
    setIsDark(theme === 'dark' ? true : false)
  }, [])

  return (
    <div>
      <button
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-14 h-8 bg-muted rounded-full transition-colors cursor-pointer border border-border"
      >
        <div
          className={`absolute left-1 w-6 h-6 bg-background rounded-full shadow transform transition-transform duration-300 ${isDark ? 'translate-x-6' : 'translate-x-0'
            }`}
        />
        <Sun
          className={`absolute left-2 w-4 h-4 text-yellow-500 transition-opacity duration-300 delay-150 ${isDark ? 'opacity-0' : 'opacity-100'
            }`}
        />
        <Moon
          className={`absolute right-2 w-4 h-4 text-blue-300 transition-opacity duration-300 delay-150 ${isDark ? 'opacity-100' : 'opacity-0'
            }`}
        />
      </button>
    </div>
  );
}

export default ToggleTheme;