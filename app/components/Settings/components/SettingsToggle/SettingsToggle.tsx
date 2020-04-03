import React, { useContext } from 'react'
import dot from '../../../../assets/dot-blue.png'
import { SettingsStoreContext } from '../../../../store/store'
import styles from './SettingsToggle.css'
import { LanguageValue } from '../../../../types'

type OptionType = {
  label: string
  value: LanguageValue
}

type SettingsToggleProps = {
  active: string
  options: OptionType[]
}

const SettingsToggle = ({ active, options }: SettingsToggleProps) => {
  const { dispatch, updateLanguage } = useContext(SettingsStoreContext)

  return (
    <ul className={styles.wrapper}>
      {options.map(option => {
        const isActive = active === option.value

        return (
          <li className={styles.option} key={option.value}>
            <button
              className={styles.button}
              data-e2e={`settings-toggle-${option.value}`}
              onClick={() => dispatch(updateLanguage(option.value))}
              style={{ color: isActive ? '#2cdbec' : '#fff' }}
              type="button"
            >
              {option.label}
              {!!isActive && <img alt="Dot" className={styles.dot} src={dot} />}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default SettingsToggle
