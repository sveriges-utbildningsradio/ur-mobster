// @flow

import React, { createContext, useReducer } from 'react'
import storage from 'electron-json-storage'
import reducer from './reducer'
import {
  updateLanguage,
  updateDuration,
  updateBreakDuration,
  updateBreakFrequency,
  updateBreakTimeLeft
} from './actions'
import { FIFTY_MINUTES, FIVE_MINUTES, TEN_MINUTES } from '../constants'

export const initialState = {
  breakTimeLeft: FIVE_MINUTES,
  breakDuration: FIVE_MINUTES,
  breakFrequency: FIFTY_MINUTES,
  duration: TEN_MINUTES,
  language: 'sv'
}

export const SettingsStoreContext = createContext(initialState)

export const handleLanguage = () => {
  const browserLanguage = navigator.language.substring(0, 2)
  const availableLanguages = new Set(['en', 'sv'])

  if (!availableLanguages.has(browserLanguage)) return 'sv'

  return browserLanguage
}

const Store = ({ initialState, children }) => {
  const init = ({
    breakDuration,
    breakFrequency,
    breakTimeLeft,
    duration,
    language
  }) => {
    storage.getAll((_, data) => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return { breakDuration, breakFrequency, duration, language }
      }

      const defaultLanguage = handleLanguage()

      dispatch({
        type: 'SET_SETTINGS_FROM_STORAGE',
        payload: {
          breakTimeLeft: data.breakDuration ? data.breakDuration : FIVE_MINUTES,
          breakDuration: data.breakDuration ? data.breakDuration : FIVE_MINUTES,
          breakFrequency: data.breakFrequency
            ? data.breakFrequency
            : FIFTY_MINUTES,
          duration: data.duration ? data.duration : TEN_MINUTES,
          language: data.language ? data.language : defaultLanguage
        }
      })
    })

    return { breakDuration, breakFrequency, breakTimeLeft, duration, language }
  }

  const [state, dispatch] = useReducer(reducer, initialState, init)

  return (
    <SettingsStoreContext.Provider
      value={{
        ...state,
        dispatch,
        updateLanguage,
        updateDuration,
        updateBreakDuration,
        updateBreakFrequency,
        updateBreakTimeLeft
      }}
    >
      {children}
    </SettingsStoreContext.Provider>
  )
}

Store.defaultProps = {
  initialState
}

export default Store
