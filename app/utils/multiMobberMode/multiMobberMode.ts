import io from 'socket.io-client'
// eslint-disable-next-line import/no-cycle
import { exportedDispatch as mobstersDispatch } from '../../components/Mobsters/MobstersContainer'
import {
  UPDATE_ACTIVE_FROM_REMOTE,
  UPDATE_INACTIVE_FROM_REMOTE
} from '../../components/Mobsters/store/actionTypes'
import { SOCKET_SERVER_URL } from '../../constants'
// eslint-disable-next-line import/no-cycle
import { exportedDispatch as settingsDispatch } from '../../store/store'
import { LanguageValue, User, UserList } from '../../types'
import { UPDATE_SETTING, UPDATE_USERS } from './constants'

const socket = io.connect(SOCKET_SERVER_URL)

/* LISTENERS */
socket.on(UPDATE_USERS, ({ list, users }) => {
  console.log('USERS UPDATED FROM SERVER: ', list, users)

  if (list === UserList.ACTIVE) {
    mobstersDispatch({
      type: UPDATE_ACTIVE_FROM_REMOTE,
      payload: users
    })
  } else if (list === UserList.INACTIVE) {
    mobstersDispatch({
      type: UPDATE_INACTIVE_FROM_REMOTE,
      payload: users
    })
  }
})

socket.on(UPDATE_SETTING, ({ type, value }) => {
  settingsDispatch({
    payload: value,
    type: `${type}_FROM_REMOTE`
  })
})

/* DISPATCHERS */
export const handleUsers = (userListName: UserList, users: User[]) => {
  socket.emit(UPDATE_USERS, {
    list: userListName,
    users
  })
}

export const handleSettings = (type: string, value: number | LanguageValue) => {
  socket.emit(UPDATE_SETTING, {
    type,
    value
  })
}

export default handleUsers
