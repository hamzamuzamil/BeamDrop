import React, { JSX } from 'react'
import { Logo } from '../../Logo/Logo'
import { Mascot } from '../../Mascot/Mascot'

export function Hero({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4 w-full">
      <div className="flex flex-col items-center space-y-8 max-w-3xl w-full">
        <div className="flex flex-col items-center space-y-6">
          <Logo />
          <Mascot animated={true} />
          <p className="text-white/70 text-lg text-center italic">
            Drop it. Beam it. Done.
          </p>
        </div>
        <div className="glass-soft rounded-3xl p-8 md:p-10 w-full shadow-2xl space-y-6 border border-white/10">
          {children}
        </div>
      </div>
    </div>
  )
}

