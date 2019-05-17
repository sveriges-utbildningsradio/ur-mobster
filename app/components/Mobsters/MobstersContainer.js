// @flow

import React, { useState } from 'react'
import axios from 'axios'
import Mobsters from './Mobsters'

/* TODO:
[X] make sure same user can't be twice
[X] push to end of array, if res is succesful
- ability to remove mobster
- mark who is driver/navigator
- save users!
*/

const MobstersContainer = () => {
  const [username, setUsername] = useState('')
  const [activeUsers, setActiveUsers] = useState([])

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
          name: data.name
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
        user => user.name.toLowerCase() === username.toLowerCase()
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

  return (
    <Mobsters
      activeUsers={activeUsers}
      clickGitHubButton={clickGitHubButton}
      clickGuestButton={clickGuestButton}
      setUsername={setUsername}
      username={username}
    />
  )
}

export default MobstersContainer
