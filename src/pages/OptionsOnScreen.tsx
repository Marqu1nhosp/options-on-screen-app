/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import axios from 'axios'
import { useContext, useState } from 'react'
import { api, apiImg } from '@/services/api'
import { ClickFindMovie } from '@/components/ClickFindMovie'
import { DontKnowWhatToWatch } from '@/components/DontKnowWhatToWatch'
import { ButtonFindMovie } from '@/components/ButtonFindMovie'
import { ButtonThemeDark } from '@/components/ButtonThemeDark'
import { ThemeDarkLightContext } from '@/contexts/ThemeDarkLightContext'
import { ButtonThemeLight } from '@/components/ButtonThemeLight'
import { DevCreate } from '@/components/DevCreate'

interface MovieData {
  title: string
  overview: string
  poster_path: string
}

export function OptionsOnScreen() {
  const [movie, setMovie] = useState<MovieData | undefined>()
  const [desableClickFindMovie, setDesableClickFindMovie] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const { theme, setTheme } = useContext(ThemeDarkLightContext)

  async function handleRandomMovie() {
    const response = await axios.get(`${api}&page=${currentPage}`)
    console.log(response)

    const results = response.data.results

    if (results.length === 0) {
      setCurrentPage(currentPage + 1)
    } else {
      const ramdomIndex = Math.floor(
        Math.random() * response.data.results.length,
      )
      const randomMovie = response.data.results[ramdomIndex]
      setDesableClickFindMovie(true)
      setMovie(randomMovie)
    }
    setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <div className="flex flex-col justify-center text-black dark:text-white items-center bg-gradiente-linear-light dark:bg-gradiente-linear-dark min-h-screen">
        {theme === 'light' ? (
          <ButtonThemeDark onClick={async () => setTheme('dark')} />
        ) : (
          <ButtonThemeLight onClick={async () => setTheme('light')} />
        )}
        <div className="mb-16 flex flex-col gap-4">
          <DontKnowWhatToWatch />
          {desableClickFindMovie ? (
            <div className="flex flex-col gap-3 md:flex-row md:items-center ">
              <div className="md:mt-3">
                <img
                  src={apiImg + movie?.poster_path}
                  width={200}
                  height={200}
                  alt=""
                  className="md:w-200 md:h-200 mx-auto self-center"
                />
              </div>
              <div className="flex flex-col gap-3">
                <div className="lg:flex lg:items-center lg:justify-center md:items-center">
                  <h1 className="font-bold text-lg md:text-xl text-center md:text-left">
                    {movie?.title}
                  </h1>
                </div>
                <div>
                  <h1 className="text-left w-96">{movie?.overview}</h1>
                </div>
              </div>
            </div>
          ) : (
            <ClickFindMovie />
          )}
          <ButtonFindMovie onClick={handleRandomMovie} name="Encontrar filme" />
        </div>
        <DevCreate />
      </div>
    </>
  )
}
