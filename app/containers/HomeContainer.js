// @flow
import React, { useState } from 'react'
import Home from '../components/Home'
import useInterval from '../utils/useInterval'

const {
  setWindowActive,
  setWindowHidden
} = require('electron').remote.getGlobal('windowUtils')

export const HomeContainer = () => {
  const duration = 60 * 10 // 10 minutes

  const [count, setCount] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)

  useInterval(
    () => {
      setCount(count - 1)

      if (count === 0) {
        setIsRunning(false)
        setCount(duration)
        setWindowActive()

        return
      }
    },
    isRunning ? 1000 : null
  )

  const handleIsRunningClick = timerIsRunning => {
    if (timerIsRunning) {
      setWindowHidden()
    }

    setIsRunning(timerIsRunning)
  }

  const handleResetClick = () => {
    setIsRunning(false)
    setCount(duration)
  }

  return (
    <Home
      count={count}
      isRunning={isRunning}
      handleIsRunningClick={handleIsRunningClick}
      handleResetClick={handleResetClick}
    />
  )
}

export default HomeContainer
