'use client'

import React, { JSX } from 'react'

export function Mascot({
  className = '',
  animated = true,
}: {
  className?: string
  animated?: boolean
}): JSX.Element {
  return (
    <div
      className={`flex items-center justify-center ${className} ${
        animated ? 'animate-float' : ''
      }`}
    >
      <img
        src="/assets/mascot-panda.svg"
        alt="BeamDrop Panda Mascot"
        width={120}
        height={120}
        className="h-auto w-auto"
      />
    </div>
  )
}

