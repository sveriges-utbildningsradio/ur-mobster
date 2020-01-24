// @flow

import React, { useContext } from 'react'
import styles from './SettingsDuration.css'
import Add from '../../../../assets/plus-default.png'
import AddActive from '../../../../assets/plus-active.png'
import Remove from '../../../../assets/minus-default.png'
import RemoveActive from '../../../../assets/minus-active.png'
import { SettingsStoreContext } from '../../../../store/store'
import { FIVE_MINUTES } from '../../../../constants'

type SettingsToggleProps = {
  dataE2EDecrease: string,
  dataE2EIncrease: string,
  prefixLabel?: string,
  time: number,
  updaterFn: (time: number) => void
}

const SettingsDuration = ({
  dataE2EDecrease,
  dataE2EIncrease,
  prefixLabel,
  time,
  updaterFn
}: SettingsToggleProps) => {
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
        {!!prefixLabel && !!prefixLabel.length && prefixLabel}
        {time / 60} min
      </p>
      <div className={styles.buttonsWrap}>
        {/* eslint-disable no-return-assign */}
        <button
          className={styles.button}
          data-e2e={dataE2EIncrease}
          onClick={() => handleClickIncrease()}
          onKeyPress={() => handleClickIncrease()}
          type="button"
        >
          <img
            alt="Increase time 5 minutes"
            className={styles.icon}
            onBlur={e => (e.currentTarget.src = Add)}
            onFocus={e => (e.currentTarget.src = AddActive)}
            onMouseOut={e => (e.currentTarget.src = Add)}
            onMouseOver={e => (e.currentTarget.src = AddActive)}
            src={Add}
          />
        </button>
        <button
          className={styles.button}
          onClick={() => handleClickDecrease()}
          onKeyPress={() => handleClickDecrease()}
          type="button"
        >
          <img
            alt="Decrease time 5 minutes"
            className={styles.icon}
            data-e2e={dataE2EDecrease}
            onBlur={e => (e.currentTarget.src = Remove)}
            onFocus={e => (e.currentTarget.src = RemoveActive)}
            onMouseOut={e => (e.currentTarget.src = Remove)}
            onMouseOver={e => (e.currentTarget.src = RemoveActive)}
            src={Remove}
          />
        </button>
      </div>
      {/* eslint-enable no-return-assign */}
    </div>
  )
}

SettingsDuration.defaultProps = {
  prefixLabel: ''
}

export default SettingsDuration
