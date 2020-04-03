import reducer from '../reducer'
import * as types from '../actionTypes'
import persistToStore from '../../utils/persistToStore'
import { handleSettings } from '../../utils/multiMobberMode/multiMobberMode'
import { TEN_MINUTES } from '../../constants'
import { INITIAL_STATE } from '../store'

jest.mock('../../utils/persistToStore')
jest.mock('../../utils/multiMobberMode/multiMobberMode')

describe('store/reducer', () => {
  const initialState = INITIAL_STATE

  it('handles SET_FROM_STORAGE', () => {
    const payload = {
      breakTimeLeft: TEN_MINUTES,
      breakDuration: TEN_MINUTES,
      breakFrequency: TEN_MINUTES,
      duration: TEN_MINUTES,
      language: 'en'
    }

    const action = {
      type: types.SET_SETTINGS_FROM_STORAGE,
      payload
    }

    const reduced = reducer(null, action)

    expect(reduced).toEqual(payload)
  })

  it('handles UPDATE_LANGUAGE', () => {
    const action = {
      type: types.UPDATE_LANGUAGE,
      payload: 'en'
    }

    const reduced = reducer(initialState, action)

    expect(reduced.language).toEqual('en')
    expect(persistToStore).toHaveBeenCalledWith('language', 'en')
  })

  it('handles UPDATE_BREAK_DURATION', () => {
    const action = {
      type: types.UPDATE_BREAK_DURATION,
      payload: 100
    }

    const reduced = reducer(initialState, action)

    expect(reduced.breakDuration).toEqual(100)
    expect(persistToStore).toHaveBeenCalledWith('breakDuration', 100)
    expect(handleSettings).toHaveBeenCalledWith(
      types.UPDATE_BREAK_DURATION,
      100
    )
  })

  it('handles UPDATE_BREAK_FREQUENCY', () => {
    const action = {
      type: types.UPDATE_BREAK_FREQUENCY,
      payload: 100
    }

    const reduced = reducer(initialState, action)

    expect(reduced.breakFrequency).toEqual(100)
    expect(persistToStore).toHaveBeenCalledWith('breakFrequency', 100)
    expect(handleSettings).toHaveBeenCalledWith(
      types.UPDATE_BREAK_FREQUENCY,
      100
    )
  })

  it('handles UPDATE_DURATION', () => {
    const action = {
      type: types.UPDATE_DURATION,
      payload: 100
    }

    const reduced = reducer(initialState, action)

    expect(reduced.duration).toEqual(100)
    expect(persistToStore).toHaveBeenCalledWith('duration', 100)
    expect(handleSettings).toHaveBeenCalledWith(types.UPDATE_DURATION, 100)
  })

  it('handles UPDATE_BREAK_TIME_LEFT', () => {
    const action = { type: types.UPDATE_BREAK_TIME_LEFT, payload: 100 }

    const reduced = reducer(initialState, action)

    expect(reduced.breakTimeLeft).toEqual(100)
  })

  it('handles UPDATE_TIME_LEFT', () => {
    const action = { type: types.UPDATE_TIME_LEFT, payload: 100 }

    const reduced = reducer(initialState, action)

    expect(reduced.timeLeft).toEqual(100)
  })

  it('handles UPDATE_IS_RUNNING', () => {
    const action = { type: types.UPDATE_IS_RUNNING, payload: true }

    const reduced = reducer(initialState, action)

    expect(reduced.isRunning).toEqual(true)

    expect(handleSettings).toHaveBeenCalledWith(types.UPDATE_IS_RUNNING, true)
  })

  it('handles UPDATE_REACHED_END', () => {
    const action = { type: types.UPDATE_REACHED_END, payload: true }

    const reduced = reducer(initialState, action)

    expect(reduced.reachedEnd).toEqual(true)

    expect(handleSettings).toHaveBeenCalledWith(types.UPDATE_REACHED_END, true)
  })

  it('handles UPDATE_TIME_SINCE_BREAK', () => {
    const action = { type: types.UPDATE_TIME_SINCE_BREAK, payload: 100 }

    const reduced = reducer(initialState, action)

    expect(reduced.timeSinceBreak).toEqual(100)
  })

  it('handles UPDATE_IS_ON_BREAK', () => {
    const action = { type: types.UPDATE_IS_ON_BREAK, payload: true }

    const reduced = reducer(initialState, action)

    expect(reduced.isOnBreak).toEqual(true)

    expect(handleSettings).toHaveBeenCalledWith(types.UPDATE_IS_ON_BREAK, true)
  })

  it('returns initialState for type that does not exist', () => {
    const action = {
      type: 'just-a-test-type',
      payload: 'test-payload'
    }

    const reduced = reducer(initialState, action)

    expect(reduced).toEqual(initialState)
  })
})
