import * as types from './actionTypes'
import persistToStore from '../utils/persistToStore'

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_SETTINGS_FROM_STORAGE:
      return { ...action.payload }

    case types.UPDATE_LANGUAGE:
      persistToStore('language', action.payload)
      return { ...state, language: action.payload }

    case types.UPDATE_BREAK_DURATION:
      persistToStore('breakDuration', action.payload)
      return { ...state, breakDuration: action.payload }

    case types.UPDATE_BREAK_FREQUENCY:
      persistToStore('breakFrequency', action.payload)
      return { ...state, breakFrequency: action.payload }

    case types.UPDATE_DURATION:
      persistToStore('duration', action.payload)
      return { ...state, duration: action.payload }

    default:
      return state
  }
}

export default reducer
