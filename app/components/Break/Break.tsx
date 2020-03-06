import React, { useContext } from 'react'
import Lottie from 'react-lottie'
import { SettingsStoreContext } from '../../store/store'
import { formatTime } from '../../utils/formatTime'
import styles from './Break.css'
import ResetButton from '../Button/ResetButton'
import * as animationData from '../../assets/animations/break.json'

type BreakProps = {
  resetBreak: () => void
}

const Break = ({ resetBreak }: BreakProps) => {
  const { breakTimeLeft } = useContext(SettingsStoreContext)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
  }

  return (
    <div className={styles.breakWrap}>
      <div>
        <Lottie options={defaultOptions} height={500} width={500} />
        <p className={styles.text}>{formatTime(breakTimeLeft)}</p>
        <ResetButton handleClick={resetBreak} id="resetBreak" />
      </div>
    </div>
  )
}

export default Break
