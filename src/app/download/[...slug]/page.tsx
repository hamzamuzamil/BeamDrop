import { JSX } from 'react'
import { notFound } from 'next/navigation'
import { getOrCreateChannelRepo } from '../../../channel'
import { Logo } from '../../../components/beamdrop/Logo/Logo'
import { DownloadCard } from '../../../components/beamdrop/DownloadCard/DownloadCard'
import WebRTCPeerProvider from '../../../components/WebRTCProvider'
import ReportTermsViolationButton from '../../../components/ReportTermsViolationButton'
import { Hero } from '../../../components/beamdrop/Layout/Hero/Hero'

const normalizeSlug = (rawSlug: string | string[]): string => {
  if (typeof rawSlug === 'string') {
    return rawSlug
  } else {
    return rawSlug.join('/')
  }
}

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<JSX.Element> {
  const { slug: slugRaw } = await params
  const slug = normalizeSlug(slugRaw)
  const channel = await getOrCreateChannelRepo().fetchChannel(slug)

  if (!channel) {
    notFound()
  }

  return (
    <Hero>
      <div className="w-full">
        <WebRTCPeerProvider>
          <DownloadCard uploaderPeerID={channel.uploaderPeerID} />
          <div className="mt-6 flex justify-center">
            <ReportTermsViolationButton
              uploaderPeerID={channel.uploaderPeerID}
              slug={slug}
            />
          </div>
        </WebRTCPeerProvider>
      </div>
    </Hero>
  )
}
