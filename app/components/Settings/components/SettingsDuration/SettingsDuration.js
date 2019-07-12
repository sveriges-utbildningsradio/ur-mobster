// @flow

import React, { useContext } from 'react'
import styles from './SettingsDuration.css'
import Add from '../../../../assets/plus-default.png'
import AddActive from '../../../../assets/plus-active.png'
import Remove from '../../../../assets/minus-default.png'
import RemoveActive from '../../../../assets/minus-active.png'
import { SettingsStoreContext } from '../../../../store/store'

type SettingsToggleProps = {
  prefixLabel?: string,
  setting: string,
  time: number,
  updaterFn: () => void
}

const FIVE_MINUTES = 60 * 5

const SettingsDuration = ({ label, prefixLabel, time, updaterFn }) => {
  const { dispatch } = useContext(SettingsStoreContext)

  const handleClickDecrease = () => {
    if (time === FIVE_MINUTES) return

    dispatch(updaterFn(time - FIVE_MINUTES))
  }

  const handleClickIncrease = () => {
    dispatch(updaterFn(time + FIVE_MINUTES))
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.time}>
        {!!prefixLabel && prefixLabel}
        {time / 60} min
      </p>
      <div className={styles.buttonsWrap}>
        <button className={styles.button}>
          <img
            alt="Increase time 5 minutes"
            className={styles.icon}
            onClick={() => handleClickIncrease()}
            onMouseOver={e => (e.currentTarget.src = AddActive)}
            onMouseOut={e => (e.currentTarget.src = Add)}
            src={Add}
          />
        </button>
        <button className={styles.button}>
          <img
            alt="Decrease time 5 minutes"
            className={styles.icon}
            onClick={() => handleClickDecrease()}
            onMouseOver={e => (e.currentTarget.src = RemoveActive)}
            onMouseOut={e => (e.currentTarget.src = Remove)}
            src={Remove}
          />
        </button>
      </div>
    </div>
  )
}

export default SettingsDuration
