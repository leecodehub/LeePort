import { useEffect, useState } from 'react'
import type { ChapterId } from '../data/portfolio'
import { PackWheel } from './PackWheel'
import { InfoScene } from './InfoScene'
import { ProjectBoards } from './ProjectBoards'
import { CertificateBoard } from './CertificateBoard'

type Screen = 'wheel' | ChapterId

const TITLES: Record<Screen, string> = {
  wheel: 'Steven B. Lee — Pack shelf',
  about: 'About — Steven B. Lee',
  certificates: 'Certificates — Steven B. Lee',
  projects: 'Project displays — Steven B. Lee',
  skills: 'Skills — Steven B. Lee',
  contact: 'Contact — Steven B. Lee',
}

export function CardExperience() {
  const [screen, setScreen] = useState<Screen>('wheel')
  const [lastChapter, setLastChapter] = useState<ChapterId>('about')

  useEffect(() => {
    document.title = TITLES[screen]
  }, [screen])

  const openChapter = (id: ChapterId) => {
    setLastChapter(id)
    setScreen(id)
  }

  const backToWheel = () => setScreen('wheel')

  return (
    <div className={`card-experience card-experience--${screen}`}>
      <div className="experience-screen" key={screen}>
        {screen === 'wheel' ? (
          <PackWheel initialActive={lastChapter} onOpen={openChapter} />
        ) : null}
        {screen === 'about' ? <InfoScene kind="about" onBack={backToWheel} /> : null}
        {screen === 'skills' ? <InfoScene kind="skills" onBack={backToWheel} /> : null}
        {screen === 'contact' ? <InfoScene kind="contact" onBack={backToWheel} /> : null}
        {screen === 'projects' ? <ProjectBoards onBack={backToWheel} /> : null}
        {screen === 'certificates' ? <CertificateBoard onBack={backToWheel} /> : null}
      </div>
    </div>
  )
}
