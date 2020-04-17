import * as React from 'react'
import storage from 'electron-json-storage'
// eslint-disable-next-line import/no-cycle
import reducer from './reducer'
import {
  resetBreak,
  setTimeIsUp,
  updateBreakDuration,
  updateBreakFrequency,
  updateBreakTimeLeft,
  updateDuration,
  updateIsOnBreak,
  updateIsRunning,
  updateLanguage,
  updateReachedEnd,
  updateTimeLeft,
  updateTimeSinceBreak
} from './actions'
import { FIFTY_MINUTES, FIVE_MINUTES, TEN_MINUTES } from '../constants'
import { LanguageValue } from '../types'

// eslint-disable-next-line import/no-mutable-exports
export let exportedDispatch: React.Dispatch<>

export const INITIAL_STATE = {
  breakDuration: FIVE_MINUTES,
  breakFrequency: FIFTY_MINUTES,
  breakTimeLeft: FIVE_MINUTES,
  duration: TEN_MINUTES,
  isConnected: false,
  isOnBreak: false,
  isRunning: false,
  language: LanguageValue.SV,
  reachedEnd: false,
  timeLeft: TEN_MINUTES,
  timeSinceBreak: 0
}

export const SettingsStoreContext = React.createContext(INITIAL_STATE)

export const handleLanguage = () => {
  const browserLanguage = navigator.language.substring(0, 2)
  const availableLanguages = new Set([LanguageValue.EN, LanguageValue.SV])

  if (!availableLanguages.has(browserLanguage)) return LanguageValue.SV

  return browserLanguage
}

type initialStateProps = {
  breakDuration: number
  breakFrequency: number
  breakTimeLeft: number
  duration: number
  isConnected: boolean
  isOnBreak: boolean
  isRunning: boolean
  language: string
  reachedEnd: boolean
  timeLeft: number
  timeSinceBreak: number
}

type StoreProps = {
  initialState?: initialStateProps
  children: React.Node
}

const Store = ({ initialState, children }: StoreProps) => {
  const init = ({
    breakDuration,
    breakFrequency,
    breakTimeLeft,
    duration,
    language,
    isConnected,
    isOnBreak,
    isRunning,
    reachedEnd,
    timeLeft,
    timeSinceBreak
  }) => {
    storage.getAll((_, data) => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return {
          breakDuration,
          breakFrequency,
          breakTimeLeft,
          duration,
          language,
          isConnected,
          isOnBreak,
          isRunning,
          reachedEnd,
          timeLeft,
          timeSinceBreak
        }
      }
      const defaultLanguage = handleLanguage()

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
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

      return null
    })

    return {
      breakDuration,
      breakFrequency,
      breakTimeLeft,
      duration,
      language,
      isConnected,
      isOnBreak,
      isRunning,
      reachedEnd,
      timeLeft,
      timeSinceBreak
    }
  }

  const [state, dispatch] = React.useReducer(reducer, initialState, init)

  exportedDispatch = dispatch

  return (
    <SettingsStoreContext.Provider
      value={{
        ...state,
        dispatch,
        resetBreak,
        setTimeIsUp,
        updateBreakDuration,
        updateBreakFrequency,
        updateBreakTimeLeft,
        updateDuration,
        updateIsOnBreak,
        updateIsRunning,
        updateLanguage,
        updateReachedEnd,
        updateTimeLeft,
        updateTimeSinceBreak
      }}
    >
      {children}
    </SettingsStoreContext.Provider>
  )
}

Store.defaultProps = {
  initialState: INITIAL_STATE
}

export default Store
