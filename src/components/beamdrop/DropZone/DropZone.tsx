'use client'

import React, { JSX, useState, useCallback, useEffect, useRef } from 'react'
import { extractFileList } from '../../../fs'
import { UploadedFile } from '../../../types'
import { Mascot } from '../Mascot/Mascot'

export function DropZone({
  onDrop,
}: {
  onDrop: (files: UploadedFile[]) => void
}): JSX.Element {
  const [isDragging, setIsDragging] = useState(false)
  const [fileCount, setFileCount] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setFileCount(e.dataTransfer?.items.length || 0)
  }, [])

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault()

    const currentTarget =
      e.currentTarget === window ? window.document : e.currentTarget
    if (
      e.relatedTarget &&
      currentTarget instanceof Node &&
      currentTarget.contains(e.relatedTarget as Node)
    ) {
      return
    }

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }, [])

  const handleDrop = useCallback(
    async (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)

      if (e.dataTransfer) {
        try {
          const files = await extractFileList(e)
          if (files.length > 0) {
            onDrop(files)
          }
        } catch (error) {
          console.error('[DropZone] Error extracting files:', error)
        }
      }
    },
    [onDrop],
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileInputChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files) as UploadedFile[]
        if (files.length > 0) {
          onDrop(files)
        }
        e.target.value = ''
      }
    },
    [onDrop],
  )

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter)
    window.addEventListener('dragleave', handleDragLeave)
    window.addEventListener('dragover', handleDragOver)
    window.addEventListener('drop', handleDrop)

    return () => {
      window.removeEventListener('dragenter', handleDragEnter)
      window.removeEventListener('dragleave', handleDragLeave)
      window.removeEventListener('dragover', handleDragOver)
      window.removeEventListener('drop', handleDrop)
    }
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop])

  return (
    <>
      <div
        className={`fixed inset-0 backdrop-blur-md flex flex-col justify-center items-center text-2xl text-white transition-all duration-300 z-50 ${
          isDragging ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        style={{
          background: isDragging
            ? 'linear-gradient(to bottom right, rgba(161, 196, 253, 0.3), rgba(194, 233, 251, 0.3))'
            : 'transparent',
        }}
      >
        <div className="transform scale-110 transition-transform duration-300">
          <Mascot animated={false} />
        </div>
        <p className="mt-6 font-semibold">
          Drop to beam {fileCount} file{fileCount !== 1 ? 's' : ''}
        </p>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
        multiple
      />
      <button
        id="drop-zone-button"
        type="button"
        className="group relative py-8 px-10 text-lg font-semibold text-white backdrop-blur-xl rounded-3xl transition-all duration-300 ease-in-out outline-none hover:scale-[1.02] active:scale-[0.98] focus:ring-2 shadow-2xl w-full border border-white/20 hover:border-white/40"
        style={{
          background: 'linear-gradient(to bottom right, rgba(161, 196, 253, 0.2), rgba(194, 233, 251, 0.2))',
        }}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center space-y-4">
          <Mascot className="w-20 h-20" animated={true} />
          <span className="text-center block text-xl">
            Drop a file and the panda will beam it.
          </span>
          <span className="text-sm text-white/70 font-normal">
            or click to select files
          </span>
        </div>
        <div
          className="absolute inset-0 rounded-3xl transition-all duration-300"
          style={{
            background: 'linear-gradient(to bottom right, rgba(161, 196, 253, 0), rgba(194, 233, 251, 0))',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(to bottom right, rgba(161, 196, 253, 0.1), rgba(194, 233, 251, 0.1))'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(to bottom right, rgba(161, 196, 253, 0), rgba(194, 233, 251, 0))'
          }}
        />
      </button>
    </>
  )
}

