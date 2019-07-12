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
  const { duration: DURATION_FROM_SETTINGS } = useContext(SettingsStoreContext)

  const [duration, setDuration] = useState(DURATION_FROM_SETTINGS)
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

  useEffect(
    () => {
      setCount(DURATION_FROM_SETTINGS)
    },
    [DURATION_FROM_SETTINGS]
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
