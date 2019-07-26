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

export const initialState = {
  breakTimeLeft: 60 * 5,
  breakDuration: 60 * 5,
  breakFrequency: 60 * 50,
  duration: 10,
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
          breakTimeLeft: data.breakDuration ? data.breakDuration : 60 * 5,
          breakDuration: data.breakDuration ? data.breakDuration : 60 * 5,
          breakFrequency: data.breakFrequency ? data.breakFrequency : 60 * 50,
          duration: data.duration ? data.duration : 60 * 10,
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
