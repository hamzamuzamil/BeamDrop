'use client'

import React, { JSX } from 'react'
import { UploadedFile, UploaderConnectionStatus } from '../../../types'
import { useWebRTCPeer } from '../../WebRTCProvider'
import QRCode from 'react-qr-code'
import { useUploaderChannel } from '../../../hooks/useUploaderChannel'
import { useUploaderConnections } from '../../../hooks/useUploaderConnections'
import { CopyableInput } from '../../CopyableInput'
import { ConnectionListItem } from '../../ConnectionListItem'
import { ErrorMessage } from '../../ErrorMessage'
import { setRotating } from '../../../hooks/useRotatingSpinner'
import { Mascot } from '../Mascot/Mascot'
import { BeamProgress } from './BeamProgress'

const QR_CODE_SIZE = 128

export function TransferCard({
  files,
  password,
  onStop,
}: {
  files: UploadedFile[]
  password: string
  onStop: () => void
}): JSX.Element {
  const { peer, stop } = useWebRTCPeer()
  const { isLoading, error, longSlug, shortSlug, longURL, shortURL } =
    useUploaderChannel(peer.id)
  const connections = useUploaderConnections(peer, files, password)

  const handleStop = () => {
    stop()
    onStop()
  }

  const activeDownloaders = connections.filter(
    (conn) => conn.status === UploaderConnectionStatus.Uploading,
  ).length

  React.useEffect(() => {
    setRotating(activeDownloaders > 0)
  }, [activeDownloaders])

  if (isLoading || !longSlug || !shortSlug) {
    return (
      <div className="flex flex-col items-center space-y-6 py-12">
        <Mascot animated={true} />
        <p className="text-white/90 text-lg">Creating channel...</p>
      </div>
    )
  }

  if (error) {
    return <ErrorMessage message={error.message} />
  }

  const totalProgress =
    connections.length > 0
      ? connections.reduce((acc, conn) => {
          const connProgress =
            conn.completedFiles === conn.totalFiles
              ? 1
              : (conn.completedFiles + conn.currentFileProgress) /
                conn.totalFiles
          return acc + connProgress
        }, 0) / connections.length
      : 0

  return (
    <div className="flex flex-col space-y-6 w-full">
      <div className="flex flex-col items-center space-y-4">
        <Mascot animated={activeDownloaders > 0} />
        <div className="text-center">
          <p className="text-white text-xl font-semibold">
            {activeDownloaders > 0
              ? `Beaming... the panda is focusing.`
              : `Ready to beam! Share this link.`}
          </p>
          {activeDownloaders > 0 && (
            <p className="text-white/70 text-sm mt-2">
              {activeDownloaders} active download{activeDownloaders !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>

      {activeDownloaders > 0 && (
        <div className="w-full">
          <BeamProgress value={totalProgress} />
        </div>
      )}

      <div className="flex w-full items-center gap-4">
        <div className="flex-none glass-soft p-4 rounded-2xl">
          <QRCode value={shortURL ?? ''} size={QR_CODE_SIZE} />
        </div>
        <div className="flex-auto flex flex-col justify-center space-y-3">
          <CopyableInput label="Long URL" value={longURL ?? ''} />
          <CopyableInput label="Short URL" value={shortURL ?? ''} />
        </div>
      </div>

      <div className="mt-4 pt-6 border-t border-white/10 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            {activeDownloaders} Downloading, {connections.length} Total
          </h2>
          <button
            onClick={handleStop}
            className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl transition-colors duration-200 text-sm font-medium border border-red-500/30"
          >
            Stop
          </button>
        </div>
        <div className="space-y-3">
          {connections.map((conn, i) => (
            <ConnectionListItem key={i} conn={conn} />
          ))}
        </div>
      </div>
    </div>
  )
}

