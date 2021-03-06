import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './Home.css'
import { formatTime } from '../../utils/formatTime'
import Mobsters from '../../components/Mobsters'
import Settings from '../../components/Settings'
import Break from '../../components/Break'
import DefaultButton from '../../components/Button/DefaultButton'
import ResetButton from '../../components/Button/ResetButton'

type HomeProps = {
  count: number
  isOnBreak: boolean
  isRunning: boolean
  handleIsRunningClick: (isRunning: boolean) => void
  handleResetClick: () => void
  reachedEnd: boolean
  resetBreak: () => void
}

const Home = ({
  count,
  isOnBreak,
  isRunning,
  handleIsRunningClick,
  handleResetClick,
  reachedEnd,
  resetBreak
}: HomeProps) => (
  <div className={styles.wrap} data-tid="container">
    <div className={styles.dragArea} />
    <div className={styles.mobstersWrap}>
      <Mobsters reachedEnd={reachedEnd} />
    </div>

    <div className={styles.container}>
      <Settings />
      {isOnBreak && <Break resetBreak={resetBreak} />}
      <h2 className={styles.header}>UR Mob</h2>
      <h3 className={styles.timeLeft} data-e2e="duration-time-left">
        <FormattedMessage id="timeLeft" />: {formatTime(count)}
      </h3>

      <div className={styles.buttonsWrap}>
        {isRunning ? (
          <DefaultButton
            handleClick={() => handleIsRunningClick(false)}
            textId="pauseButton"
          />
        ) : (
          <DefaultButton
            handleClick={() => handleIsRunningClick(true)}
            textId="startButton"
          />
        )}

        <ResetButton handleClick={handleResetClick} id="resetButton" />
      </div>
    </div>
  </div>
)

export default Home
