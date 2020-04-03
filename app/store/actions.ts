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
