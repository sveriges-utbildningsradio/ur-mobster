// @flow
import React, { useContext, useEffect, useState } from 'react'
import Home from './Home'
import useInterval from '../../utils/useInterval'
import { SettingsStoreContext } from '../../store/store'

const {
  setReminderTimerIsActive,
  setWindowActive,
  setWindowHidden
} = require('electron').remote.getGlobal('windowUtils')

const HomeContainer = () => {
  const {
    breakDuration,
    breakFrequency,
    breakTimeLeft,
    dispatch,
    duration,
    updateBreakTimeLeft
  } = useContext(SettingsStoreContext)

  const [count, setCount] = useState(duration)
  const [isRunning, setIsRunning] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)

  // Break state
  const [timeSinceBreak, setTimeSinceBreak] = useState(0)
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

  useEffect(() => {
    setCount(duration)
  }, [duration])

  const resetBreak = () => {
    dispatch(updateBreakTimeLeft(breakDuration))
    setIsOnBreak(false)
    setTimeSinceBreak(0)
    setWindowActive()
  }

  // Break logic
  useInterval(
    () => {
      dispatch(updateBreakTimeLeft(breakTimeLeft - 1))

      if (breakTimeLeft === 1) {
        resetBreak()
      }
    },
    isOnBreak ? 1000 : null
  )

  useEffect(() => {
    if (timeSinceBreak >= breakFrequency) {
      setReminderTimerIsActive(true)
      setIsOnBreak(true)
    }
  }, [timeSinceBreak])

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
      isOnBreak={isOnBreak}
      isRunning={isRunning}
      handleIsRunningClick={handleIsRunningClick}
      handleResetClick={handleResetClick}
      reachedEnd={reachedEnd}
      resetBreak={resetBreak}
    />
  )
}

export default HomeContainer
