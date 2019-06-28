// @flow
import React, { useState } from 'react'
import styles from './Home.css'
import { formatTime } from '../../utils/formatTime'
import Mobsters from '../../components/Mobsters'
import Settings from '../../components/Settings/Settings'
import DefaultButton from '../../components/Button/DefaultButton'

type HomeProps = {
  count: number,
  isRunning: boolean,
  handleIsRunningClick: (isRunning: boolean) => void,
  handleResetClick: () => void,
  reachedEnd: boolean
}

export const Home = ({
  count,
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
      <h2 className={styles.header}>UR Mob</h2>
      <h3 className={styles.timeLeft}>Tid kvar: {formatTime(count)}</h3>

      <div className={styles.buttonsWrap}>
        {isRunning ? (
          <DefaultButton
            handleClick={() => handleIsRunningClick(false)}
            text="Pausa mobben!"
          />
        ) : (
          <DefaultButton
            handleClick={() => handleIsRunningClick(true)}
            text="Starta mobben!"
          />
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
