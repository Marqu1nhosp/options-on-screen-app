import React from 'react'
import { Moon } from 'phosphor-react'

interface ButtonThemeLightProps {
  onClick: () => Promise<void>
}

export function ButtonThemeDark(props: ButtonThemeLightProps) {
  return (
    <div className="absolute right-4 top-4 bg-slate-300 rounded">
      <button
        className="w-8 h-8 leading-9 rounded-full m-1"
        onClick={props.onClick}
      >
        <Moon size={32} className="text-black " />
      </button>
    </div>
  )
}
