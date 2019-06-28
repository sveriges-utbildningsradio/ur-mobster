// @flow

import React from 'react'
import styles from './SettingsDuration.css'
import Add from '../../../../assets/plus-default.png'
import AddActive from '../../../../assets/plus-active.png'
import Remove from '../../../../assets/minus-default.png'
import RemoveActive from '../../../../assets/minus-active.png'

type SettingsToggleProps = {
  prefixLabel?: string,
  setting: string,
  time: number
}

const SettingsDuration = ({ label, prefixLabel, time }) => (
  <div className={styles.wrap}>
    <p className={styles.time}>
      {!!prefixLabel && prefixLabel}
      {time} min
    </p>
    <div className={styles.buttonsWrap}>
      <button className={styles.button}>
        <img
          alt="Decrease time 5 minutes"
          className={styles.icon}
          src={Remove}
        />
      </button>
      <button className={styles.button}>
        <img alt="Increase time 5 minutes" className={styles.icon} src={Add} />
      </button>
    </div>
  </div>
)

export default SettingsDuration
