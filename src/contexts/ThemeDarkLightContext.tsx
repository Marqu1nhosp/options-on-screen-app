/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface PropsChildren {
  children: ReactNode
}

interface ThemeDarkLightData {
  theme: string
  setTheme: (value: string) => void
}

export const ThemeDarkLightContext = createContext({} as ThemeDarkLightData)

export default function ThemeContextProvider({ children }: PropsChildren) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const root = window.document.documentElement
    const removeOldTheme = theme === 'dark' ? 'light' : 'dark'

    root.classList.remove(removeOldTheme)
    root.classList.add(theme)
  }, [theme])

  return (
    <ThemeDarkLightContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeDarkLightContext.Provider>
  )
}
