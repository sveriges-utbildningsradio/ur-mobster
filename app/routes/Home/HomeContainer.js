// @flow
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home'
import useInterval from '../../utils/useInterval'
import { SettingsStoreContext } from '../../store/store'

const {
  setWindowActive,
  setWindowHidden
} = require('electron').remote.getGlobal('windowUtils')

export const HomeContainer = () => {
  const { breakDuration, breakFrequency, duration } = useContext(
    SettingsStoreContext
  )

  const [count, setCount] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)

  // Break state
  const [timeSinceBreak, setTimeSinceBreak] = useState(0)
  const [breakCount, setBreakCount] = useState(breakDuration)
  const [isOnBreak, setIsOnBreak] = useState(false)

  useInterval(
    () => {
      setCount(count - 1)

      if (count === 0) {
        setIsRunning(false)
        setCount(duration)
        setWindowActive()
        setReachedEnd(true)

        setTimeSinceBreak(prevTime => prevTime + duration)
      }
    },
    isRunning ? 1000 : null
  )

  useEffect(
    () => {
      setCount(duration)
    },
    [duration]
  )

  // Break logic
  useInterval(
    () => {
      console.log('inside useInterval: ', breakCount)
      setBreakCount(breakCount - 1)

      if (breakCount === 0) {
        setIsOnBreak(false)
        setTimeSinceBreak(0)
      }
    },
    isOnBreak ? 1000 : null
  )

  useEffect(
    () => {
      if (timeSinceBreak >= breakFrequency) {
        setIsOnBreak(true)
      }
    },
    [timeSinceBreak]
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
      breakCount={breakCount}
      count={count}
      isOnBreak={isOnBreak}
      isRunning={isRunning}
      handleIsRunningClick={handleIsRunningClick}
      handleResetClick={handleResetClick}
      reachedEnd={reachedEnd}
    />
  )
}

export default HomeContainer
