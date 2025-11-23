import React, { JSX } from 'react'

export function Logo({ className = '' }: { className?: string }): JSX.Element {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/assets/logo-beamdrop.svg"
        alt="BeamDrop"
        width={200}
        height={60}
        className="h-auto w-auto"
      />
    </div>
  )
}

