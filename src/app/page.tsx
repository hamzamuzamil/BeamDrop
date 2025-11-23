'use client'

import React, { JSX, useCallback, useState } from 'react'
import WebRTCPeerProvider from '../components/WebRTCProvider'
import { DropZone } from '../components/beamdrop/DropZone/DropZone'
import UploadFileList from '../components/UploadFileList'
import { TransferCard } from '../components/beamdrop/TransferCard/TransferCard'
import PasswordField from '../components/PasswordField'
import StartButton from '../components/StartButton'
import { UploadedFile } from '../types'
import CancelButton from '../components/CancelButton'
import { useMemo } from 'react'
import { getFileName } from '../fs'
import TitleText from '../components/TitleText'
import { pluralize } from '../utils/pluralize'
import { TermsAcceptance } from '../components/beamdrop/TermsModal/TermsModal'
import AddFilesButton from '../components/AddFilesButton'
import { Hero } from '../components/beamdrop/Layout/Hero/Hero'

function InitialState({
  onDrop,
}: {
  onDrop: (files: UploadedFile[]) => void
}): JSX.Element {
  return (
    <Hero>
      <div className="flex flex-col items-center space-y-8 w-full">
        <div className="flex flex-col items-center space-y-4">
          <TitleText>
            Drop a file and the panda will beam it.
          </TitleText>
          <p className="text-white/70 text-center text-sm">
            Peer-to-peer file transfers in your browser. No servers, no storage,
            just direct beaming.
          </p>
        </div>
        <div className="w-full max-w-md">
          <DropZone onDrop={onDrop} />
        </div>
        <TermsAcceptance />
      </div>
    </Hero>
  )
}

function useUploaderFileListData(uploadedFiles: UploadedFile[]) {
  return useMemo(() => {
    return uploadedFiles.map((item) => ({
      fileName: getFileName(item),
      type: item.type,
    }))
  }, [uploadedFiles])
}

function ConfirmUploadState({
  uploadedFiles,
  password,
  onChangePassword,
  onCancel,
  onStart,
  onRemoveFile,
  onAddFiles,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  onChangePassword: (pw: string) => void
  onCancel: () => void
  onStart: () => void
  onRemoveFile: (index: number) => void
  onAddFiles: (files: UploadedFile[]) => void
}): JSX.Element {
  const fileListData = useUploaderFileListData(uploadedFiles)
  return (
    <Hero>
      <div className="flex flex-col items-center space-y-6 w-full">
        <TitleText>
          You are about to beam {pluralize(uploadedFiles.length, 'file', 'files')}.{' '}
          <AddFilesButton onAdd={onAddFiles} />
        </TitleText>
        <div className="w-full">
          <UploadFileList files={fileListData} onRemove={onRemoveFile} />
        </div>
        <div className="w-full max-w-md">
          <PasswordField value={password} onChange={onChangePassword} />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <CancelButton onClick={onCancel} />
          <StartButton onClick={onStart} />
        </div>
      </div>
    </Hero>
  )
}

function UploadingState({
  uploadedFiles,
  password,
  onStop,
}: {
  uploadedFiles: UploadedFile[]
  password: string
  onStop: () => void
}): JSX.Element {
  const fileListData = useUploaderFileListData(uploadedFiles)
  return (
    <Hero>
      <div className="flex flex-col items-center space-y-6 w-full">
        <div className="flex flex-col items-center space-y-2">
          <TitleText>
            Beaming {pluralize(uploadedFiles.length, 'file', 'files')}...
          </TitleText>
          <p className="text-white/70 text-center text-sm">
            Leave this tab open. BeamDrop does not store files — the panda beams
            directly between browsers.
          </p>
        </div>
        <div className="w-full">
          <UploadFileList files={fileListData} />
        </div>
        <div className="w-full">
          <WebRTCPeerProvider>
            <TransferCard files={uploadedFiles} password={password} onStop={onStop} />
          </WebRTCPeerProvider>
        </div>
      </div>
    </Hero>
  )
}

export default function UploadPage(): JSX.Element {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [password, setPassword] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleDrop = useCallback((files: UploadedFile[]): void => {
    setUploadedFiles(files)
  }, [])

  const handleChangePassword = useCallback((pw: string) => {
    setPassword(pw)
  }, [])

  const handleStart = useCallback(() => {
    setUploading(true)
  }, [])

  const handleStop = useCallback(() => {
    setUploading(false)
  }, [])

  const handleCancel = useCallback(() => {
    setUploadedFiles([])
    setUploading(false)
  }, [])

  const handleRemoveFile = useCallback((index: number) => {
    setUploadedFiles((fs) => fs.filter((_, i) => i !== index))
  }, [])

  const handleAddFiles = useCallback((files: UploadedFile[]) => {
    setUploadedFiles((fs) => [...fs, ...files])
  }, [])

  if (!uploadedFiles.length) {
    return <InitialState onDrop={handleDrop} />
  }

  if (!uploading) {
    return (
      <ConfirmUploadState
        uploadedFiles={uploadedFiles}
        password={password}
        onChangePassword={handleChangePassword}
        onCancel={handleCancel}
        onStart={handleStart}
        onRemoveFile={handleRemoveFile}
        onAddFiles={handleAddFiles}
      />
    )
  }

  return (
    <UploadingState
      uploadedFiles={uploadedFiles}
      password={password}
      onStop={handleStop}
    />
  )
}
