import * as types from './actionTypes'

const reducer = (state, action) => {
  switch (action.type) {
    case types.SET_SETTINGS_FROM_STORAGE:
      return { ...action.payload }
    case types.UPDATE_LANGUAGE:
      return { ...state, language: action.payload }
    case types.UPDATE_BREAK_DURATION:
      return { ...state, breakDuration: action.payload }
    case types.UPDATE_BREAK_FREQUENCY:
      return { ...state, breakFrequency: action.payload }
    case types.UPDATE_DURATION:
      return { ...state, duration: action.payload }

    default:
      return state
  }
}

export default reducer
