'use client'

import React, { JSX, useState, useCallback } from 'react'
import { useDownloader } from '../../../hooks/useDownloader'
import PasswordField from '../../PasswordField'
import UnlockButton from '../../UnlockButton'
import UploadFileList from '../../UploadFileList'
import DownloadButton from '../../DownloadButton'
import StopButton from '../../StopButton'
import ProgressBar from '../../ProgressBar'
import { pluralize } from '../../../utils/pluralize'
import { ErrorMessage } from '../../ErrorMessage'
import { Mascot } from '../Mascot/Mascot'
import { BeamProgress } from '../TransferCard/BeamProgress'
import ReturnHome from '../../ReturnHome'

interface FileInfo {
  fileName: string
  size: number
  type: string
}

export function ConnectingToUploader({
  showTroubleshootingAfter = 3000,
}: {
  showTroubleshootingAfter?: number
}): JSX.Element {
  const [showTroubleshooting, setShowTroubleshooting] = useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowTroubleshooting(true)
    }, showTroubleshootingAfter)
    return () => clearTimeout(timer)
  }, [showTroubleshootingAfter])

  if (!showTroubleshooting) {
    return (
      <div className="flex flex-col items-center space-y-6 py-12">
        <Mascot animated={true} />
        <p className="text-white/90 text-lg">Beam incoming...</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-col items-center space-y-6 py-12">
        <Mascot animated={true} />
        <p className="text-white/90 text-lg">Beam incoming...</p>
      </div>

      <div className="glass-soft rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-white">
          Having trouble connecting?
        </h2>

        <div className="space-y-4 text-white/90">
          <p className="text-sm">
            BeamDrop uses direct peer-to-peer connections. Sometimes the panda
            needs a moment to focus. Here are some possible reasons:
          </p>

          <ul className="list-none space-y-3">
            <li className="flex items-start gap-3 px-4 py-2 rounded-lg glass-soft">
              <span className="text-base">🚪</span>
              <span className="text-sm">
                The uploader may have closed their browser or lost connectivity.
                BeamDrop requires the uploader to stay online.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-2 rounded-lg glass-soft">
              <span className="text-base">🔒</span>
              <span className="text-sm">
                Your network might have strict firewalls or NAT settings.
              </span>
            </li>
            <li className="flex items-start gap-3 px-4 py-2 rounded-lg glass-soft">
              <span className="text-base">🌐</span>
              <span className="text-sm">
                Some corporate or school networks block peer-to-peer
                connections.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <ReturnHome />
    </>
  )
}

export function DownloadComplete({
  filesInfo,
  bytesDownloaded,
  totalSize,
}: {
  filesInfo: FileInfo[]
  bytesDownloaded: number
  totalSize: number
}): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <Mascot animated={false} />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Beamed! 🎉
        </h2>
        <p className="text-white/80">
          You downloaded {pluralize(filesInfo.length, 'file', 'files')}.
        </p>
      </div>
      <div className="flex flex-col space-y-5 w-full">
        <UploadFileList files={filesInfo} />
        <div className="w-full">
          <ProgressBar value={bytesDownloaded} max={totalSize} />
        </div>
        <ReturnHome />
      </div>
    </div>
  )
}

export function DownloadInProgress({
  filesInfo,
  bytesDownloaded,
  totalSize,
  onStop,
}: {
  filesInfo: FileInfo[]
  bytesDownloaded: number
  totalSize: number
  onStop: () => void
}): JSX.Element {
  const percentage = totalSize > 0 ? (bytesDownloaded / totalSize) * 100 : 0

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <Mascot animated={true} />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Beaming... the panda is focusing.
        </h2>
        <p className="text-white/80">
          You are downloading {pluralize(filesInfo.length, 'file', 'files')}.
        </p>
      </div>
      <div className="flex flex-col space-y-5 w-full">
        <UploadFileList files={filesInfo} />
        <div className="w-full">
          <BeamProgress value={percentage / 100} />
        </div>
        <div className="flex justify-center w-full">
          <StopButton onClick={onStop} isDownloading />
        </div>
      </div>
    </div>
  )
}

export function ReadyToDownload({
  filesInfo,
  onStart,
}: {
  filesInfo: FileInfo[]
  onStart: () => void
}): JSX.Element {
  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <Mascot animated={false} />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Beam incoming! 📡
        </h2>
        <p className="text-white/80">
          You are about to start downloading{' '}
          {pluralize(filesInfo.length, 'file', 'files')}.
        </p>
      </div>
      <div className="flex flex-col space-y-5 w-full">
        <UploadFileList files={filesInfo} />
        <DownloadButton onClick={onStart} />
      </div>
    </div>
  )
}

export function PasswordEntry({
  onSubmit,
  errorMessage,
}: {
  onSubmit: (password: string) => void
  errorMessage: string | null
}): JSX.Element {
  const [password, setPassword] = useState('')
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(password)
    },
    [onSubmit, password],
  )

  return (
    <div className="flex flex-col items-center space-y-6 w-full">
      <Mascot animated={false} />
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          This beam is protected
        </h2>
        <p className="text-white/80">
          Enter the password to unlock this download.
        </p>
      </div>
      <div className="flex flex-col space-y-5 w-full max-w-md">
        <form
          action="#"
          method="post"
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="flex flex-col space-y-5 w-full">
            <PasswordField
              value={password}
              onChange={setPassword}
              isRequired
              isInvalid={Boolean(errorMessage)}
            />
            <UnlockButton />
          </div>
        </form>
      </div>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  )
}

export function DownloadCard({
  uploaderPeerID,
}: {
  uploaderPeerID: string
}): JSX.Element {
  const {
    filesInfo,
    isConnected,
    isPasswordRequired,
    isDownloading,
    isDone,
    errorMessage,
    submitPassword,
    startDownload,
    stopDownload,
    totalSize,
    bytesDownloaded,
  } = useDownloader(uploaderPeerID)

  if (isDone && filesInfo) {
    return (
      <DownloadComplete
        filesInfo={filesInfo}
        bytesDownloaded={bytesDownloaded}
        totalSize={totalSize}
      />
    )
  }

  if (isPasswordRequired) {
    return (
      <PasswordEntry errorMessage={errorMessage} onSubmit={submitPassword} />
    )
  }

  if (errorMessage) {
    return (
      <>
        <div className="flex flex-col items-center space-y-4">
          <Mascot animated={false} />
          <p className="text-white/90 text-lg">
            Oops — the panda tripped. Try again.
          </p>
        </div>
        <ErrorMessage message={errorMessage} />
        <ReturnHome />
      </>
    )
  }

  if (isDownloading && filesInfo) {
    return (
      <DownloadInProgress
        filesInfo={filesInfo}
        bytesDownloaded={bytesDownloaded}
        totalSize={totalSize}
        onStop={stopDownload}
      />
    )
  }

  if (filesInfo) {
    return <ReadyToDownload filesInfo={filesInfo} onStart={startDownload} />
  }

  if (!isConnected) {
    return <ConnectingToUploader />
  }

  return (
    <div className="flex flex-col items-center space-y-6 py-12">
      <Mascot animated={false} />
      <p className="text-white/90 text-lg">Uh oh... Something went wrong.</p>
    </div>
  )
}

