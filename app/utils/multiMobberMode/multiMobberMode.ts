import io from 'socket.io-client'
// eslint-disable-next-line import/no-cycle
import { exportedDispatch as dispatch } from '../../components/Mobsters/MobstersContainer'
import {
  UPDATE_ACTIVE_FROM_REMOTE,
  UPDATE_INACTIVE_FROM_REMOTE
} from '../../components/Mobsters/store/actionTypes'
import { SOCKET_SERVER_URL } from '../../constants'
import { User, UserList } from '../../types'
import { UPDATE_USERS } from './constants'

const socket = io.connect(SOCKET_SERVER_URL)

/* LISTENERS */
socket.on(UPDATE_USERS, ({ list, users }) => {
  console.log('USERS UPDATED FROM SERVER: ', list, users)

  if (list === UserList.ACTIVE) {
    dispatch({
      type: UPDATE_ACTIVE_FROM_REMOTE,
      payload: users
    })
  } else if (list === UserList.INACTIVE) {
    dispatch({
      type: UPDATE_INACTIVE_FROM_REMOTE,
      payload: users
    })
  }
})

/* DISPATCHERS */
export const handleUsers = (userListName: UserList, users: User[]) => {
  console.log('DISPATCHING, ', users, userListName)
  socket.emit(UPDATE_USERS, {
    list: userListName,
    users
  })
}

export default handleUsers
