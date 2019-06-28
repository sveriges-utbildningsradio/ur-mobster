// @flow

import React, { createContext, useReducer, useState } from 'react'
import storage from 'electron-json-storage'
import reducer from './reducer'
import {
  updateLanguage,
  updateDuration,
  updateBreakDuration,
  updateBreakFrequency
} from './actions'

export const initialState = {
  breakDuration: 60 * 5,
  breakFrequency: 60 * 50,
  duration: 60 * 10,
  language: 'sv'
}

export const SettingsStoreContext = createContext(initialState)

const Store = ({ initialState, children }) => {
  const init = ({ breakDuration, breakFrequency, duration, language }) => {
    storage.getAll((_, data) => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return { breakDuration, breakFrequency, duration, language }
      }

      dispatch({
        type: 'SET_SETTINGS_FROM_STORAGE',
        payload: {
          breakDuration: data.breakDuration ? data.breakDuration : 60 * 5,
          breakFrequency: data.breakFrequency ? data.breakFrequency : 60 * 50,
          duration: data.duration ? data.duration : 60 * 10,
          language: data.language ? data.language : 'sv'
        }
      })
    })

    return { breakDuration, breakFrequency, duration, language }
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
        updateBreakFrequency
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
