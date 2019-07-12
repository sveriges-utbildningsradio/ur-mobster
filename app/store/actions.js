import * as types from './actionTypes'

export const updateLanguage = language => ({
  type: types.UPDATE_LANGUAGE,
  payload: language
})

export const updateDuration = duration => ({
  type: types.UPDATE_DURATION,
  payload: duration
})

export const updateBreakDuration = duration => ({
  type: types.UPDATE_BREAK_DURATION,
  payload: duration
})

export const updateBreakFrequency = frequency => ({
  type: types.UPDATE_BREAK_FREQUENCY,
  payload: frequency
})
