// @flow
import React, { useContext, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import styles from './Settings.css'
import Cog from '../../assets/cog.png'
import Close from '../../assets/close.png'
import Time from '../../assets/time.png'
import Break from '../../assets/break.png'
import Language from '../../assets/language.png'
import DefaultButton from '../Button/DefaultButton'
import SettingsToggle from './components/SettingsToggle'
import SettingsDuration from './components/SettingsDuration/SettingsDuration'
import { SettingsStoreContext } from '../../store/store'

export const LANGUAGE_OPTIONS = [
  {
    label: 'Svenska',
    value: 'sv'
  },
  {
    label: 'English',
    value: 'en'
  }
]

export const Settings = () => {
  const {
    duration,
    breakDuration,
    breakFrequency,
    language,
    updateDuration,
    updateBreakDuration,
    updateBreakFrequency
  } = useContext(SettingsStoreContext)
  const [showingSettings, toggleShowingSettings] = useState(false)

  return (
    <>
      <button
        className={styles.buttonWrap}
        onClick={() => toggleShowingSettings(!showingSettings)}
        type="button"
      >
        {showingSettings ? (
          <span className={styles.settingsButtonWrapper}>
            <FormattedMessage id="close" />
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
      </button>
      {!!showingSettings && (
        <div className={styles.pageWrap}>
          <div className={styles.innerWrap}>
            <h2 className={styles.header}>
              <FormattedMessage id="settingsHeader" />
            </h2>
            <ul className={styles.settingsWrap}>
              <li className={styles.settingWrap}>
                <img
                  alt="Duration settings"
                  className={styles.icon}
                  src={Time}
                />
                <span className={styles.settingLabel}>
                  <FormattedMessage id="time" />
                </span>
                <SettingsDuration time={duration} updaterFn={updateDuration} />
              </li>
              <li className={styles.settingWrap}>
                <img alt="Pause settings" className={styles.icon} src={Break} />
                <span className={styles.settingLabel}>
                  <FormattedMessage id="break" />
                </span>
                <FormattedMessage id="length">
                  {msg => (
                    <SettingsDuration
                      prefixLabel={`${msg} `}
                      time={breakDuration}
                      updaterFn={updateBreakDuration}
                    />
                  )}
                </FormattedMessage>

                <FormattedMessage id="interval">
                  {msg => (
                    <SettingsDuration
                      prefixLabel={`${msg} `}
                      time={breakFrequency}
                      updaterFn={updateBreakFrequency}
                    />
                  )}
                </FormattedMessage>
              </li>
              <li className={styles.settingWrap}>
                <img
                  alt="Language settings"
                  className={styles.icon}
                  src={Language}
                />
                <span className={styles.settingLabel}>
                  <FormattedMessage id="language" />
                </span>
                <SettingsToggle active={language} options={LANGUAGE_OPTIONS} />
              </li>
            </ul>
            <DefaultButton
              handleClick={() => toggleShowingSettings(false)}
              textId="doneButton"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default Settings
