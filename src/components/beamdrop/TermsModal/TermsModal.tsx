'use client'

import React, { JSX, useState } from 'react'

export function TermsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}): JSX.Element {
  if (!isOpen) return <></>

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className="glass-soft rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="modal-title"
          className="text-2xl font-bold mb-6 text-white text-center"
        >
          BeamDrop Terms
        </h2>

        <div className="space-y-4 text-white/90">
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-3 px-4 py-3 rounded-xl glass-soft">
              <span className="text-xl">📤</span>
              <span className="text-sm leading-relaxed">
                Files are beamed directly between browsers — no server storage.
                The panda handles everything peer-to-peer.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 rounded-xl glass-soft">
              <span className="text-xl">✅</span>
              <span className="text-sm leading-relaxed">
                Only beam files you have the right to share. The panda trusts
                you!
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 rounded-xl glass-soft">
              <span className="text-xl">🔒</span>
              <span className="text-sm leading-relaxed">
                Share download links only with known recipients. Keep your beams
                secure.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-3 rounded-xl glass-soft">
              <span className="text-xl">⚠️</span>
              <span className="text-sm leading-relaxed">
                No illegal or harmful content allowed. The panda has standards!
              </span>
            </li>
          </ul>

          <p className="text-sm italic text-center text-white/70 mt-6">
            By uploading a file, you confirm that you understand and agree to
            these terms. The panda appreciates it! 🐼
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 text-white rounded-xl font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg"
            style={{
              background: 'linear-gradient(to right, #A1C4FD, #C2E9FB)',
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}

export function TermsAcceptance(): JSX.Element {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className="flex justify-center">
        <span className="text-xs text-white/80">
          By selecting a file, you agree to{' '}
          <button
            onClick={() => setShowModal(true)}
            className="underline hover:text-white transition-colors duration-200 font-medium"
            aria-label="View upload terms"
          >
            our terms
          </button>
          .
        </span>
      </div>
      <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}

