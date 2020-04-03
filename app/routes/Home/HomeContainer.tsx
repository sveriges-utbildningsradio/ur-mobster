import React, { useContext, useEffect } from 'react'
import Home from './Home'
import useInterval from '../../utils/useInterval'
import { SettingsStoreContext } from '../../store/store'

// TODO: Move setWindowActive and setWindowHidden to reducer to make it sync between remotes
const {
  setReminderTimerIsActive,
  setWindowActive,
  setWindowHidden
} = require('electron').remote.getGlobal('windowUtils')

const HomeContainer = () => {
  const {
    breakFrequency,
    breakTimeLeft,
    dispatch,
    duration,
    isOnBreak,
    isRunning,
    reachedEnd,
    resetBreak,
    setTimeIsUp,
    timeLeft,
    timeSinceBreak,
    updateBreakTimeLeft,
    updateIsOnBreak,
    updateIsRunning,
    updateReachedEnd,
    updateTimeLeft,
    updateTimeSinceBreak
  } = useContext(SettingsStoreContext)

  useInterval(
    () => {
      dispatch(updateTimeLeft(timeLeft - 1))
      if (timeLeft === 0) {
        dispatch(setTimeIsUp())
        setWindowActive()

        dispatch(updateTimeSinceBreak(prevTime => prevTime + duration))
      }
    },
    isRunning ? 1000 : null
  )

  useEffect(() => {
    dispatch(updateTimeLeft(duration))
  }, [duration])

  const handleResetBreak = () => {
    dispatch(resetBreak())
    setWindowActive()
  }

  // Break logic
  useInterval(
    () => {
      dispatch(updateBreakTimeLeft(breakTimeLeft - 1))

      if (breakTimeLeft === 1) {
        handleResetBreak()
      }
    },
    isOnBreak ? 1000 : null
  )

  useEffect(() => {
    if (timeSinceBreak >= breakFrequency) {
      setReminderTimerIsActive(true)
      dispatch(updateIsOnBreak(true))
    }
  }, [timeSinceBreak])

  const handleIsRunningClick = (timerIsRunning: boolean) => {
    if (timerIsRunning) {
      dispatch(updateReachedEnd(false))
      setWindowHidden()
    }

    dispatch(updateIsRunning(timerIsRunning))
  }

  const handleResetClick = () => {
    // TODO: Make it reset the remote's time too
    dispatch(updateIsRunning(false))
    dispatch(updateTimeLeft(duration))
  }

  return (
    <Home
      handleIsRunningClick={handleIsRunningClick}
      handleResetClick={handleResetClick}
      isOnBreak={isOnBreak}
      isRunning={isRunning}
      reachedEnd={reachedEnd}
      resetBreak={handleResetBreak}
      timeLeft={timeLeft}
    />
  )
}

export default HomeContainer
