import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import { CardExperience } from './experience/CardExperience'
import { CardIntro } from './experience/CardIntro'

function shouldShowIntro() {
  try {
    if (new URLSearchParams(window.location.search).get('intro') === '1') return true
    return window.sessionStorage.getItem('sbl-intro-seen') !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const [introVisible, setIntroVisible] = useState(shouldShowIntro)

  const finishIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem('sbl-intro-seen', '1')
    } catch {
      // The intro can replay when storage is unavailable.
    }
    if (new URLSearchParams(window.location.search).get('intro') === '1') {
      window.history.replaceState({}, '', window.location.pathname + window.location.hash)
    }
    setIntroVisible(false)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      {introVisible ? <CardIntro onComplete={finishIntro} /> : <CardExperience />}
    </MotionConfig>
  )
}
