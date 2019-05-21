// @flow

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Mobsters from './Mobsters'
import storage from 'electron-json-storage'
import generateMobsterName from '../../utils/generateMobsterName'
import { move, reorder } from '../../utils/listHelpers'

const MobstersContainer = ({ reachedEnd }) => {
  const [username, setUsername] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [inactiveUsers, setInactiveUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const users = { activeUsers, inactiveUsers }

  useEffect(() => {
    storage.getAll(function(error, data) {
      if (error) throw error

      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return
      }

      if (data.activeUsers && !data.activeUsers.length) {
        return
      }

      setActiveUsers(data.activeUsers)

      if (data.inactiveUsers && !data.inactiveUsers.length) {
        return
      }
      setInactiveUsers(data.inactiveUsers)
    })
  }, [])

  // Saves activeUsers to disk everytime it updates, apart from when starting the app
  useEffect(
    () => {
      if (!activeUsers.length) {
        return
      }
      storage.set('activeUsers', activeUsers, function(error) {
        if (error) throw error
      })
    },
    [activeUsers]
  )

  // Save inactiveUsers to disk everytime it updates, apart from when starting the app
  useEffect(
    () => {
      if (!inactiveUsers.length) {
        return
      }
      storage.set('inactiveUsers', inactiveUsers, function(error) {
        if (error) throw error
      })
    },
    [inactiveUsers]
  )

  useEffect(
    () => {
      if (reachedEnd === true) {
        const newMobsterOrder = activeUsers.concat(activeUsers.splice(0, 1))
        setActiveUsers(newMobsterOrder)
      }
    },
    [reachedEnd]
  )

  const getGitHubInfo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      )

      setActiveUsers([
        ...activeUsers,
        {
          avatar: data.avatar_url,
          githubName: data.login,
          name: data.name ? data.name : generateMobsterName()
        }
      ])
    } catch (error) {
      console.error(error)
    }
  }

  const clickGitHubButton = () => {
    if (
      activeUsers.some(
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
      activeUsers.some(
        user => user.name && user.name.toLowerCase() === username.toLowerCase()
      )
    ) {
      return
    }

    setActiveUsers([
      ...activeUsers,
      {
        avatar: null,
        githubName: null,
        name: username
      }
    ])
    setUsername('')
  }

  const clickEditButton = () => {
    setIsEditing(!isEditing)
  }

  const clickRemoveUser = (userToRemove, list) => {
    const remainingUsers = users[list].filter(
      user => user.name !== userToRemove
    )

    if (list === 'activeUsers') {
      setActiveUsers(remainingUsers)
    } else {
      setInactiveUsers(remainingUsers)
    }

    if (!remainingUsers.length) {
      setIsEditing(false)
      persistEmptyList(list)
    }
  }

  const persistEmptyList = list => {
    storage.set(list, [], function(error) {
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
        users[source.droppableId],
        source.index,
        destination.index
      )

      if (source.droppableId === 'inactiveUsers') {
        setInactiveUsers(items)
      } else {
        setActiveUsers(items)
      }
    } else {
      const sorted = move(
        users[source.droppableId],
        users[destination.droppableId],
        source,
        destination
      )

      setActiveUsers(sorted.activeUsers)
      setInactiveUsers(sorted.inactiveUsers)
    }
  }

  return (
    <Mobsters
      activeUsers={activeUsers}
      clickEditButton={clickEditButton}
      clickGitHubButton={clickGitHubButton}
      clickGuestButton={clickGuestButton}
      clickRemoveUser={clickRemoveUser}
      inactiveUsers={inactiveUsers}
      isEditing={isEditing}
      onDragEnd={onDragEnd}
      setUsername={setUsername}
      username={username}
    />
  )
}

export default MobstersContainer
