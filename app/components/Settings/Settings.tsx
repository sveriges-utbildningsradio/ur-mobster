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

const Settings = () => {
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
        data-e2e="settings-toggle-button"
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
          <div>
            <div className={styles.innerWrap}>
              <h2 className={styles.header} data-e2e="settings-header">
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
                  <SettingsDuration
                    dataE2EDecrease="decrease-duration"
                    dataE2EIncrease="increase-duration"
                    time={duration}
                    updaterFn={updateDuration}
                    updateByMinute
                  />
                </li>
                <li className={styles.settingWrap}>
                  <img
                    alt="Pause settings"
                    className={styles.icon}
                    src={Break}
                  />
                  <span className={styles.settingLabel}>
                    <FormattedMessage id="break" />
                  </span>
                  <FormattedMessage id="length">
                    {msg => (
                      <SettingsDuration
                        dataE2EDecrease="decrease-break-duration"
                        dataE2EIncrease="increase-break-duration"
                        prefixLabel={`${msg} `}
                        time={breakDuration}
                        updaterFn={updateBreakDuration}
                      />
                    )}
                  </FormattedMessage>

                  <FormattedMessage id="interval">
                    {msg => (
                      <SettingsDuration
                        dataE2EDecrease="decrease-break-frequency"
                        dataE2EIncrease="increase-break-frequency"
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
                  <SettingsToggle
                    active={language}
                    options={LANGUAGE_OPTIONS}
                  />
                </li>
              </ul>
              <DefaultButton
                handleClick={() => toggleShowingSettings(false)}
                textId="doneButton"
              />
            </div>
          </div>
          <FormattedMessage
            id="createdBy"
            values={{
              andre: <a href="https://github.com/Aelmoznino">@Aelmoznino</a>,
              agnes: <a href="https://github.com/agnesforsell">@AgnesForsell</a>
            }}
          />
        </div>
      )}
    </>
  )
}

export default Settings
