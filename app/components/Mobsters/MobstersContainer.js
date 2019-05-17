// @flow

import React, { useState } from 'react'
import axios from 'axios'
import Mobsters from './Mobsters'
import storage from 'electron-json-storage'
import generateMobsterName from '../../utils/generateMobsterName'

const MobstersContainer = () => {
  const [username, setUsername] = useState('')
  const [activeUsers, setActiveUsers] = useState([])
  const [isEditing, setIsEditing] = useState(false)

  const getGitHubInfo = async () => {
    console.log('username : ', username)
    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}`
      )
      console.log(data)
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
      console.log('user already exists!', username)
      return
    }
    getGitHubInfo()
  }

  const clickGuestButton = () => {
    if (
      activeUsers.some(
        user => user.name && user.name.toLowerCase() === username.toLowerCase()
      )
    ) {
      console.log('user already exists!', username)
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
  }

  const clickEditButton = () => {
    setIsEditing(!isEditing)
  }

  const clickRemoveUser = userToRemove => {
    const remainingUsers = activeUsers.filter(
      user => user.name !== userToRemove
    )
    setActiveUsers(remainingUsers)
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
