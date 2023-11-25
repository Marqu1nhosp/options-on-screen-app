import React from 'react'
interface ButtonFindMovieProps {
  name: string
  onClick: () => Promise<void>
}

export function ButtonFindMovie(props: ButtonFindMovieProps) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={props.onClick}
        className="dark:bg-neutral-100 dark:hover:bg-neutral-400 bg-zinc-950 hover:bg-zinc-800 rounded text-center text-white dark:text-black font-bold h-8 w-36"
      >
        {props.name}
      </button>
    </div>
  )
}
