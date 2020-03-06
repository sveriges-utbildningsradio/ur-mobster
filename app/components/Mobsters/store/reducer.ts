import persistToStore from '../../../utils/persistToStore'
import * as types from './actionTypes'

export const reducer = (state, action) => {
  switch (action.type) {
    case types.ADD_ACTIVEUSER:
      persistToStore('activeUsers', [...state.activeUsers, action.payload])
      return { ...state, activeUsers: [...state.activeUsers, action.payload] }
    case types.UPDATE_ACTIVEUSERS:
      persistToStore('activeUsers', action.payload)
      return { ...state, activeUsers: action.payload }
    case types.UPDATE_INACTIVEUSERS:
      persistToStore('inactiveUsers', action.payload)
      return { ...state, inactiveUsers: action.payload }
    case types.SET_FROM_STORAGE:
      return { ...action.payload }
    default:
      return state
  }
}

export const initialState = {
  activeUsers: [],
  inactiveUsers: []
}
