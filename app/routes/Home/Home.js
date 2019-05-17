// @flow
import React from 'react'
import styles from './Home.css'
import { formatTime } from '../../utils/formatTime'
import Mobsters from '../../components/Mobsters'

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
  <div className={styles.wrap} data-tid="container">
    <div className={styles.mobstersWrap}>
      <Mobsters />
    </div>

    <div className={styles.container}>
      <h2 className={styles.header}>UR Mob</h2>
      <h3 className={styles.timeLeft}>Tid kvar: {formatTime(count)}</h3>

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
            Starta mobben!
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
  </div>
)

export default Home
