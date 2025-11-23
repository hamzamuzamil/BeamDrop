'use client'

import { JSX } from 'react'

export default function AuroraBackground(): JSX.Element {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-[#2a4a6a] to-[#1a3a5a] dark:from-[#0a1520] dark:via-[#1a2a40] dark:to-[#0f1f30]">
        <div className="absolute top-0 -left-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-2000" style={{ background: '#A1C4FD', animation: 'blob 20s infinite' }}></div>
        <div className="absolute top-0 -right-4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-4000" style={{ background: '#C2E9FB', animation: 'blob 20s infinite 2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animation-delay-6000" style={{ background: '#7BA3F5', animation: 'blob 20s infinite 4s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20" style={{ background: '#9DD4E8', animation: 'blob 20s infinite 6s' }}></div>
      </div>
      <div className="dark:hidden absolute inset-0 bg-gradient-to-br from-[#E8F4F8]/20 via-[#C2E9FB]/30 to-[#A1C4FD]/20"></div>
    </div>
  )
}

