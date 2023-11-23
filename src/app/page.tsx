import { OptionsOnScreen } from '@/pages/OptionsOnScreen'
import '../styles/global.css'
import ThemeContextProvider from '@/contexts/ThemeDarkLightContext'

export default function Home() {
  return (
    <ThemeContextProvider>
      <OptionsOnScreen />
    </ThemeContextProvider>
  )
}
