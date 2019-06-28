// @flow
import React, { useState } from 'react'
import Home from './Home'
import useInterval from '../../utils/useInterval'

const {
  setWindowActive,
  setWindowHidden
} = require('electron').remote.getGlobal('windowUtils')

export const HomeContainer = () => {
  const DEFAULT_DURATION = 60 * 10 // 10 minutes

  const [duration, setDuration] = useState(DEFAULT_DURATION)
  const [count, setCount] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)

  useInterval(
    () => {
      setCount(count - 1)

      if (count === 0) {
        setIsRunning(false)
        setCount(duration)
        setWindowActive()
        setReachedEnd(true)
      }
    },
    isRunning ? 1000 : null
  )

  const handleIsRunningClick = timerIsRunning => {
    if (timerIsRunning) {
      setReachedEnd(false)
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
      reachedEnd={reachedEnd}
    />
  )
}

export default HomeContainer
