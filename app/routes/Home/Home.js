// @flow
import React from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './Home.css'
import { formatTime } from '../../utils/formatTime'
import Mobsters from '../../components/Mobsters'
import Settings from '../../components/Settings'
import Break from '../../components/Break'
import DefaultButton from '../../components/Button/DefaultButton'

type HomeProps = {
  breakTimeLeft: number,
  count: number,
  isOnBreak: boolean,
  isRunning: boolean,
  handleIsRunningClick: (isRunning: boolean) => void,
  handleResetClick: () => void,
  reachedEnd: boolean
}

export const Home = ({
  breakTimeLeft,
  count,
  isOnBreak,
  isRunning,
  handleIsRunningClick,
  handleResetClick,
  reachedEnd
}: HomeProps) => (
  <div className={styles.wrap} data-tid="container">
    <div className={styles.mobstersWrap}>
      <Mobsters reachedEnd={reachedEnd} />
    </div>

    <div className={styles.container}>
      <Settings />
      {isOnBreak && <Break breakTimeLeft={breakTimeLeft} />}
      <h2 className={styles.header}>UR Mob</h2>
      <h3 className={styles.timeLeft}>
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

        <button
          className={styles.resetButton}
          onClick={() => handleResetClick()}
          type="button"
        >
          <FormattedMessage id="resetButton" />
        </button>
      </div>
    </div>
  </div>
)

export default Home
