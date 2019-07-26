import React, { useContext } from 'react'
import styles from './SettingsDuration.css'
import Add from '../../../../assets/plus-default.png'
import AddActive from '../../../../assets/plus-active.png'
import Remove from '../../../../assets/minus-default.png'
import RemoveActive from '../../../../assets/minus-active.png'
import { SettingsStoreContext } from '../../../../store/store'

type SettingsToggleProps = {
  prefixLabel?: string
  time: number
  updaterFn: () => void
}

const FIVE_MINUTES = 60 * 5

const SettingsDuration = ({
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
        {!!prefixLabel.length && prefixLabel}
        {time / 60} min
      </p>
      <div className={styles.buttonsWrap}>
        <button className={styles.button} type="button">
          <img
            alt="Increase time 5 minutes"
            className={styles.icon}
            onBlur={e => (e.currentTarget.src = Add)}
            onClick={() => handleClickIncrease()}
            onFocus={e => (e.currentTarget.src = AddActive)}
            onMouseOut={e => (e.currentTarget.src = Add)}
            onMouseOver={e => (e.currentTarget.src = AddActive)}
            src={Add}
          />
        </button>
        <button className={styles.button} type="button">
          <img
            alt="Decrease time 5 minutes"
            className={styles.icon}
            onBlur={e => (e.currentTarget.src = Remove)}
            onClick={() => handleClickDecrease()}
            onFocus={e => (e.currentTarget.src = RemoveActive)}
            onMouseOut={e => (e.currentTarget.src = Remove)}
            onMouseOver={e => (e.currentTarget.src = RemoveActive)}
            src={Remove}
          />
        </button>
      </div>
    </div>
  )
}

SettingsDuration.defaultProps = {
  prefixLabel: ''
}

export default SettingsDuration
