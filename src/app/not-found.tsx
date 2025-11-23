import { JSX } from 'react'
import Spinner from '../components/Spinner'
import Wordmark from '../components/Wordmark'
import ReturnHome from '../components/ReturnHome'
import TitleText from '../components/TitleText'

import { Logo } from '../components/beamdrop/Logo/Logo'
import { Mascot } from '../components/beamdrop/Mascot/Mascot'

export const metadata = {
  title: 'BeamDrop - 404: Page Not Found',
  description: 'Oops! This page seems to be missing.',
}

export default async function NotFound(): Promise<JSX.Element> {
  return (
    <div className="flex flex-col items-center space-y-5 py-10 max-w-2xl mx-auto px-4">
      <Logo />
      <Mascot animated={false} />
      <div className="glass-soft rounded-3xl p-6 w-full border border-white/10">
        <TitleText>404: Oops — the panda couldn't find this page!</TitleText>
        <p className="text-white/70 text-center text-sm mt-2">
          The page you're looking for seems to have wandered off.
        </p>
        <ReturnHome />
      </div>
    </div>
  )
}
