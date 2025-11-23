import React from 'react'

export default function StartButton({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}): React.ReactElement {
  return (
    <button
      id="start-button"
      type="button"
      onClick={onClick}
      className="px-8 py-3 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] font-semibold flex-1 sm:flex-none focus:ring-2 focus:ring-white/50"
      style={{
        background: 'linear-gradient(to right, #A1C4FD, #C2E9FB)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background =
          'linear-gradient(to right, #7BA3F5, #9DD4E8)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background =
          'linear-gradient(to right, #A1C4FD, #C2E9FB)'
      }}
    >
      Start Upload
    </button>
  )
}
