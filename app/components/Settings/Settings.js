// @flow
import React, { useState } from 'react'
import styles from './Settings.css'
import Cog from '../../assets/cog.png'
import Time from '../../assets/time.png'
import DefaultButton from '../Button/DefaultButton'

export const Settings = () => {
  const [showingSettings, toggleShowingSettings] = useState(false)

  return (
    <>
      <div
        className={styles.buttonWrap}
        onClick={() => toggleShowingSettings(!showingSettings)}
      >
        {showingSettings ? (
          <span>Stäng</span>
        ) : (
          <img className={styles.cog} src={Cog} />
        )}
      </div>
      {!!showingSettings && (
        <div className={styles.pageWrap}>
          <div className={styles.innerWrap}>
            <h2 className={styles.header}>Mobster-inställningar</h2>
            <ul className={styles.settingsWrap}>
              <li className={styles.settingWrap}>
                <img src={Time} />
                <span className={styles.settingLabel}>Tid</span>
                <span>10 min</span>
              </li>
              <li className={styles.settingWrap}>
                <img src={Time} />
                <span className={styles.settingLabel}>Rast</span>
                <span>längd 5 min intervall 20 min</span>
              </li>
              <li className={styles.settingWrap}>
                <img src={Time} />
                <span className={styles.settingLabel}>Språk</span>
                <span>svenska</span>
              </li>
            </ul>
            <DefaultButton
              handleClick={() => toggleShowingSettings(false)}
              text="Klar!"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
