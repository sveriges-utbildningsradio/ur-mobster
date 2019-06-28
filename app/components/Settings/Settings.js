// @flow
import React, { useState } from 'react'
import styles from './Settings.css'
import Cog from '../../assets/cog.png'
import Close from '../../assets/close.png'
import Time from '../../assets/time.png'
import Break from '../../assets/break.png'
import Language from '../../assets/language.png'
import DefaultButton from '../Button/DefaultButton'
import SettingsToggle from './components/SettingsToggle'
import SettingsDuration from './components/SettingsDuration/SettingsDuration'

export const LANGUAGE_OPTIONS = [
  {
    label: 'Svenska',
    value: 'sv'
  },
  {
    label: 'Engelska',
    value: 'en'
  }
]

export const Settings = () => {
  const [showingSettings, toggleShowingSettings] = useState(false)

  return (
    <>
      <div
        className={styles.buttonWrap}
        onClick={() => toggleShowingSettings(!showingSettings)}
      >
        {showingSettings ? (
          <span className={styles.settingsButtonWrapper}>
            Stäng
            <img
              alt="Close settings"
              className={styles.settingsButton}
              src={Close}
            />
          </span>
        ) : (
          <img
            alt="Settings page"
            className={styles.settingsButton}
            src={Cog}
          />
        )}
      </div>
      {!!showingSettings && (
        <div className={styles.pageWrap}>
          <div className={styles.innerWrap}>
            <h2 className={styles.header}>Mobster-inställningar</h2>
            <ul className={styles.settingsWrap}>
              <li className={styles.settingWrap}>
                <img
                  alt="Duration settings"
                  className={styles.icon}
                  src={Time}
                />
                <span className={styles.settingLabel}>Tid</span>
                <SettingsDuration time={10} />
              </li>
              <li className={styles.settingWrap}>
                <img alt="Pause settings" className={styles.icon} src={Break} />
                <span className={styles.settingLabel}>Rast</span>
                <SettingsDuration prefixLabel="Längd " time={5} />
                <SettingsDuration prefixLabel="Intervall " time={50} />
              </li>
              <li className={styles.settingWrap}>
                <img
                  alt="Language settings"
                  className={styles.icon}
                  src={Language}
                />
                <span className={styles.settingLabel}>Språk</span>
                <SettingsToggle
                  active={LANGUAGE_OPTIONS[0].value}
                  options={LANGUAGE_OPTIONS}
                />
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
