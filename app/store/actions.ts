import * as types from './actionTypes'
import { LanguageValue } from '../types'

export const updateLanguage = (language: LanguageValue) => ({
  type: types.UPDATE_LANGUAGE,
  payload: language
})

export const updateDuration = (duration: number) => ({
  type: types.UPDATE_DURATION,
  payload: duration
})

export const updateBreakDuration = (duration: number) => ({
  type: types.UPDATE_BREAK_DURATION,
  payload: duration
})

export const updateBreakFrequency = (frequency: number) => ({
  type: types.UPDATE_BREAK_FREQUENCY,
  payload: frequency
})

export const updateBreakTimeLeft = (timeLeft: number) => ({
  type: types.UPDATE_BREAK_TIME_LEFT,
  payload: timeLeft
})

export const updateTimeLeft = (timeLeft: number) => ({
  type: types.UPDATE_TIME_LEFT,
  payload: timeLeft
})

export const updateIsRunning = (isRunning: boolean) => ({
  type: types.UPDATE_IS_RUNNING,
  payload: isRunning
})

export const updateReachedEnd = (reachedEnd: boolean) => ({
  type: types.UPDATE_REACHED_END,
  payload: reachedEnd
})

export const updateTimeSinceBreak = (timeSinceBreak: boolean) => ({
  type: types.UPDATE_TIME_SINCE_BREAK,
  payload: timeSinceBreak
})

export const updateIsOnBreak = (isOnBreak: boolean) => ({
  type: types.UPDATE_IS_ON_BREAK,
  payload: isOnBreak
})

export const setTimeIsUp = () => ({
  type: types.SET_TIME_IS_UP
})

export const resetBreak = () => ({
  type: types.RESET_BREAK
})
