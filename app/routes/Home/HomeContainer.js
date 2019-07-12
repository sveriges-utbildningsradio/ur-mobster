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
  const { duration } = useContext(SettingsStoreContext)

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
      setCount(duration)
    },
    [duration]
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
