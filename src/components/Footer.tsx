'use client'

import React, { JSX, useCallback } from 'react'

const DONATE_HREF =
  'https://commerce.coinbase.com/checkout/247b6ffe-fb4e-47a8-9a76-e6b7ef83ea22'

function FooterLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}): JSX.Element {
  return (
    <a
      className="text-white/80 underline hover:text-white transition-colors"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}

export function Footer(): JSX.Element {
  const handleDonate = useCallback(() => {
    window.location.href = DONATE_HREF
  }, [])

  return (
    <>
      <div className="h-[100px]" /> {/* Spacer to account for footer height */}
      <footer className="fixed bottom-0 left-0 right-0 text-center py-2.5 pb-4 text-xs border-t border-white/20 shadow-[0_-1px_2px_rgba(0,0,0,0.04)] glass">
        <div className="flex flex-col items-center space-y-1 px-4 sm:px-6 md:px-8">
          <div className="flex items-center space-x-2">
            <p className="text-white/80">
              <strong>Like BeamDrop?</strong> Support its development!{' '}
            </p>
            <button
              className="px-1.5 py-0.5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200 font-medium text-[10px]"
              onClick={handleDonate}
            >
              Donate
            </button>
          </div>

          <p className="text-white/80">
            Built with ❤️ by{' '}
            <FooterLink href="https://github.com/hamzamuzamil">Hamza Muzamil</FooterLink>{' '}
            &middot;{' '}
            <FooterLink href="https://github.com/hamzamuzamil/fileshare#faq">
              FAQ
            </FooterLink>{' '}
            &middot;{' '}
            <FooterLink href="https://github.com/hamzamuzamil/fileshare">
              GitHub
            </FooterLink>
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
