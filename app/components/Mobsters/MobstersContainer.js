// @flow

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Mobsters from './Mobsters'
import storage from 'electron-json-storage'
import generateMobsterName from '../../utils/generateMobsterName'

const MobstersContainer = ({ reachedEnd }) => {
  const [username, setUsername] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    storage.getAll(function(error, data) {
      if (error) throw error

      if (Object.keys(data).length === 0 && data.constructor === Object) {
        return
      }

      if (data.users && !data.users.length) {
        return
      }

      setActiveUsers(data.users)
    })
  }, [])

  // Saves activeUsers to disk everytime it updates, apart from when starting the app
  useEffect(
    () => {
      if (!activeUsers.length) {
        return
      }
      storage.set('users', activeUsers, function(error) {
        if (error) throw error
      })
    },
    [activeUsers]
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

  const clickRemoveUser = userToRemove => {
    const remainingUsers = activeUsers.filter(
      user => user.name !== userToRemove
    )
    setActiveUsers(remainingUsers)

    if (!remainingUsers.length) {
      setIsEditing(false)
    }
  }

  return (
    <Mobsters
      activeUsers={activeUsers}
      clickEditButton={clickEditButton}
      clickGitHubButton={clickGitHubButton}
      clickGuestButton={clickGuestButton}
      clickRemoveUser={clickRemoveUser}
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      setUsername={setUsername}
      username={username}
    />
  )
}

export default MobstersContainer
