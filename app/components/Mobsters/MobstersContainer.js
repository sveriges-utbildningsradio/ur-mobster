// @flow

import React, { useEffect, useReducer, useState } from 'react'
import axios from 'axios'
import storage from 'electron-json-storage'
import Mobsters from './Mobsters'
import generateMobsterName from '../../utils/generateMobsterName'
import { move, reorder } from '../../utils/listHelpers'

const setToStore = (list, users) => {
  storage.set(list, users, error => {
    if (error) throw error
  })
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ACTIVEUSER':
      setToStore('activeUsers', [...state.activeUsers, action.payload])
      return { ...state, activeUsers: [...state.activeUsers, action.payload] }
    case 'UPDATE_ACTIVEUSERS':
      setToStore('activeUsers', action.payload)
      return { ...state, activeUsers: action.payload }
    case 'UPDATE_INACTIVEUSERS':
      setToStore('inactiveUsers', action.payload)
      return { ...state, inactiveUsers: action.payload }
    case 'SET_FROM_STORAGE':
      return { ...action.payload }
    default:
      throw new Error()
  }
}

const initialState = {
  activeUsers: [],
  inactiveUsers: []
}

const MobstersContainer = ({ reachedEnd }: boolean) => {
  const init = ({ activeUsers, inactiveUsers }) => {
    storage.getAll((_, data) => {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return { activeUsers, inactiveUsers }
      }

      dispatch({
        type: 'SET_FROM_STORAGE',
        payload: {
          activeUsers: data.activeUsers ? data.activeUsers : [],
          inactiveUsers: data.inactiveUsers ? data.inactiveUsers : []
        }
      })
    })

    return { activeUsers, inactiveUsers }
  }

  const [state, dispatch] = useReducer(reducer, initialState, init)
  const [username, setUsername] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  useEffect(
    () => {
      if (reachedEnd === true) {
        const { activeUsers } = state
        const newMobsterOrder = activeUsers.concat(activeUsers.splice(0, 1))

        dispatch({ type: 'UPDATE_ACTIVEUSERS', payload: newMobsterOrder })
      }
    },
    [reachedEnd]
  )

  const getGitHubInfo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      )

      const payload = {
        avatar: data.avatar_url,
        githubName: data.login,
        name: data.name ? data.name : generateMobsterName()
      }

      dispatch({
        type: 'ADD_ACTIVEUSER',
        payload
      })
    } catch (error) {
      console.error(error)
    }
  }

  const clickGitHubButton = () => {
    if (
      state.activeUsers.some(
        user =>
          user.githubName &&
          user.githubName.toLowerCase() === username.toLowerCase()
      )
    ) {
      return
    }
    getGitHubInfo()
    setUsername('')
  }

  const clickGuestButton = () => {
    if (
      state.activeUsers.some(
        user => user.name && user.name.toLowerCase() === username.toLowerCase()
      )
    ) {
      return
    }

    const payload = { avatar: null, githubName: null, name: username }

    dispatch({ type: 'ADD_ACTIVEUSER', payload })

    setUsername('')
  }

  const clickEditButton = () => {
    setIsEditing(!isEditing)
  }

  const clickRemoveUser = (userToRemove, list) => {
    const remainingUsers = state[list].filter(
      user => user.name !== userToRemove
    )

    if (list === 'activeUsers') {
      dispatch({
        type: 'UPDATE_ACTIVEUSERS',
        payload: remainingUsers
      })
    } else {
      dispatch({
        type: 'UPDATE_INACTIVEUSERS',
        payload: remainingUsers
      })
    }

    if (!remainingUsers.length) {
      setIsEditing(false)
      persistEmptyList(list)
    }
  }

  const persistEmptyList = list => {
    storage.set(list, [], error => {
      if (error) throw error
    })
  }

  const onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!result.destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      )

      if (source.droppableId === 'inactiveUsers') {
        dispatch({
          type: 'UPDATE_INACTIVEUSERS',
          payload: items
        })
      } else {
        dispatch({
          type: 'UPDATE_ACTIVEUSERS',
          payload: items
        })
      }
    } else {
      const sorted = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      )

      dispatch({
        type: 'UPDATE_ACTIVEUSERS',
        payload: sorted.activeUsers
      })
      dispatch({
        type: 'UPDATE_INACTIVEUSERS',
        payload: sorted.inactiveUsers
      })
    }
  }

  return (
    <Mobsters
      activeUsers={state.activeUsers}
      clickEditButton={clickEditButton}
      clickGitHubButton={clickGitHubButton}
      clickGuestButton={clickGuestButton}
      clickRemoveUser={clickRemoveUser}
      inactiveUsers={state.inactiveUsers}
      isEditing={isEditing}
      onDragEnd={onDragEnd}
      setUsername={setUsername}
      username={username}
    />
  )
}

export default MobstersContainer
