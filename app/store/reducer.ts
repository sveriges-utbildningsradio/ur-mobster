import * as types from './actionTypes'
import persistToStore from '../utils/persistToStore'
// eslint-disable-next-line import/no-cycle
import { handleSettings } from '../utils/multiMobberMode/multiMobberMode'

const reducer = (state, { payload, type }) => {
  switch (type) {
    case types.SET_SETTINGS_FROM_STORAGE:
      return { ...payload }

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
      handleSettings(type, payload)
      return { ...state, breakTimeLeft: payload }

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

    case types.UPDATE_BREAK_TIME_LEFT_FROM_REMOTE:
      return { ...state, breakTimeLeft: payload }

    default:
      return state
  }
}

export default reducer
