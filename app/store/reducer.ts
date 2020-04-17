import * as types from './actionTypes'
import persistToStore from '../utils/persistToStore'
// eslint-disable-next-line import/no-cycle
import {
  handleSettings,
  toggleConnected
} from '../utils/multiMobberMode/multiMobberMode'

const reducer = (state, { payload, type }) => {
  switch (type) {
    case types.SET_SETTINGS_FROM_STORAGE:
      return { ...state, ...payload }

    case types.UPDATE_LANGUAGE:
      persistToStore('language', payload)
      return { ...state, language: payload }

    case types.UPDATE_BREAK_DURATION:
      handleSettings(type, payload)
      persistToStore('breakDuration', payload)
      return { ...state, breakDuration: payload }

    case types.UPDATE_BREAK_FREQUENCY:
      handleSettings(type, payload)
      persistToStore('breakFrequency', payload)
      return { ...state, breakFrequency: payload }

    case types.UPDATE_DURATION:
      handleSettings(type, payload)
      persistToStore('duration', payload)
      return { ...state, duration: payload }

    case types.UPDATE_BREAK_TIME_LEFT:
      return { ...state, breakTimeLeft: payload }

    case types.UPDATE_TIME_LEFT:
      return { ...state, timeLeft: payload }

    case types.UPDATE_TIME_SINCE_BREAK:
      return { ...state, timeSinceBreak: payload }

    case types.UPDATE_IS_RUNNING:
      handleSettings(type, payload)
      return { ...state, isRunning: payload }

    case types.UPDATE_REACHED_END:
      handleSettings(type, payload)
      return { ...state, reachedEnd: payload }

    case types.UPDATE_IS_ON_BREAK:
      handleSettings(type, payload)
      return { ...state, isOnBreak: payload }

    case types.CONNECT_MOBSTER_PARTY:
      toggleConnected()
      return { ...state, isConnected: true }

    case types.DISCONNECT_MOBSTER_PARTY:
      toggleConnected()
      return { ...state, isConnected: false }

    // FROM REMOTE, not triggering a socket.emit
    case types.UPDATE_BREAK_DURATION_FROM_REMOTE:
      persistToStore('breakDuration', payload)
      return { ...state, breakDuration: payload }

    case types.UPDATE_BREAK_FREQUENCY_FROM_REMOTE:
      persistToStore('breakFrequency', payload)
      return { ...state, breakFrequency: payload }

    case types.UPDATE_DURATION_FROM_REMOTE:
      persistToStore('duration', payload)
      return { ...state, duration: payload }

    case types.UPDATE_IS_RUNNING_FROM_REMOTE:
      return { ...state, isRunning: payload }

    case types.UPDATE_REACHED_END_FROM_REMOTE:
      return { ...state, reachedEnd: payload }

    case types.UPDATE_IS_ON_BREAK_FROM_REMOTE:
      return { ...state, isOnBreak: payload }

    case types.SET_TIME_IS_UP: {
      handleSettings(type)
      return {
        ...state,
        isRunning: false,
        reachedEnd: true,
        timeLeft: state.duration
      }
    }

    case types.SET_TIME_IS_UP_FROM_REMOTE: {
      return {
        ...state,
        isRunning: false,
        reachedEnd: true,
        timeLeft: state.duration
      }
    }

    case types.RESET_BREAK: {
      handleSettings(type)
      return {
        ...state,
        breakTimeLeft: state.breakDuration,
        isOnBreak: false,
        timeLeft: state.duration,
        timeSinceBreak: 0
      }
    }

    case types.RESET_BREAK_FROM_REMOTE: {
      return {
        ...state,
        breakTimeLeft: state.breakDuration,
        isOnBreak: false,
        timeLeft: state.duration,
        timeSinceBreak: 0
      }
    }

    default:
      return state
  }
}

export default reducer
