// @flow
import React from 'react'
import styles from './Home.css'
import { formatTime } from '../utils/formatTime'

type HomeProps = {
  count: number,
  isRunning: boolean,
  handleIsRunningClick: (isRunning: boolean) => void,
  handleResetClick: () => void
}

export const Home = ({
  count,
  isRunning,
  handleIsRunningClick,
  handleResetClick
}: HomeProps) => (
  <div className={styles.container} data-tid="container">
    <h2>UR Mobster</h2>
    <p>Tid kvar: {formatTime(count)}</p>

    <div className={styles.buttonsWrap}>
      {isRunning ? (
        <button
          className={styles.timerButton}
          onClick={() => handleIsRunningClick(false)}
          type="button"
        >
          Pausa mobben!
        </button>
      ) : (
        <button
          className={styles.timerButton}
          onClick={() => handleIsRunningClick(true)}
          type="button"
        >
          Starta mobben
        </button>
      )}

      <button
        className={styles.resetButton}
        onClick={() => handleResetClick()}
        type="button"
      >
        Nollställ
      </button>
    </div>
  </div>
)

export default Home
