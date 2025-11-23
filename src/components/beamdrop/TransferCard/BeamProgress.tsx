import React, { JSX } from 'react'

export function BeamProgress({
  value,
}: {
  value: number
}): JSX.Element {
  const percentage = Math.min(100, Math.max(0, value * 100))

  return (
    <div className="w-full relative">
      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full transition-all duration-500 ease-out relative overflow-hidden"
          style={{
            width: `${percentage}%`,
            background: 'linear-gradient(to right, #A1C4FD, #C2E9FB, #A1C4FD)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-white/70 text-sm font-medium">
          Beaming progress
        </span>
        <span className="text-white text-sm font-semibold">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  )
}

