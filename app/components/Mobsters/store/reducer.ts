import persistToStore from '../../../utils/persistToStore'
import * as types from './actionTypes'
// eslint-disable-next-line import/no-cycle
import { handleUsers } from '../../../utils/multiMobberMode/multiMobberMode'
import { UserList } from '../../../types'

export const reducer = (state, action) => {
  let newActiveUsers

  switch (action.type) {
    case types.ADD_ACTIVEUSER:
      newActiveUsers = [...state.activeUsers, action.payload]
      handleUsers(UserList.ACTIVE, newActiveUsers)
      persistToStore(UserList.ACTIVE, newActiveUsers)
      return { ...state, activeUsers: newActiveUsers }
    case types.UPDATE_ACTIVEUSERS:
      handleUsers(UserList.ACTIVE, action.payload)
      persistToStore(UserList.ACTIVE, action.payload)
      return { ...state, activeUsers: action.payload }
    case types.UPDATE_INACTIVEUSERS:
      handleUsers(UserList.INACTIVE, action.payload)
      persistToStore(UserList.INACTIVE, action.payload)
      return { ...state, inactiveUsers: action.payload }
    case types.UPDATE_ACTIVE_FROM_REMOTE:
      persistToStore(UserList.ACTIVE, action.payload)
      return { ...state, activeUsers: action.payload }
    case types.UPDATE_INACTIVE_FROM_REMOTE:
      persistToStore(UserList.INACTIVE, action.payload)
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
