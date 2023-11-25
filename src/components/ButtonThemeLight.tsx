import React from 'react'
import { SunDim } from 'phosphor-react'

interface ButtonThemeLightProps {
  onClick: () => Promise<void>
}

export function ButtonThemeLight(props: ButtonThemeLightProps) {
  return (
    <div className="absolute right-4 top-4 bg-[#172444] rounded">
      <button
        className="w-8 h-8 leading-9 rounded-full m-1"
        onClick={props.onClick}
      >
        <SunDim size={32} className="text-white " />
      </button>
    </div>
  )
}
