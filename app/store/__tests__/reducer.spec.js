import reducer from '../reducer'
import * as types from '../actionTypes'
import persistToStore from '../../utils/persistToStore'
import { FIVE_MINUTES, TEN_MINUTES } from '../../constants'

jest.mock('../../utils/persistToStore')

describe('store/reducer', () => {
  const initialState = {
    breakTimeLeft: FIVE_MINUTES,
    breakDuration: FIVE_MINUTES,
    breakFrequency: FIVE_MINUTES,
    duration: FIVE_MINUTES,
    language: 'sv'
  }
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
  })

  it('handles UPDATE_BREAK_FREQUENCY', () => {
    const action = {
      type: types.UPDATE_BREAK_FREQUENCY,
      payload: 100
    }

    const reduced = reducer(initialState, action)

    expect(reduced.breakFrequency).toEqual(100)
    expect(persistToStore).toHaveBeenCalledWith('breakFrequency', 100)
  })

  it('handles UPDATE_DURATION', () => {
    const action = {
      type: types.UPDATE_DURATION,
      payload: 100
    }

    const reduced = reducer(initialState, action)

    expect(reduced.duration).toEqual(100)
    expect(persistToStore).toHaveBeenCalledWith('duration', 100)
  })

  it('handles UPDATE_BREAK_TIME_LEFT', () => {
    const action = { type: types.UPDATE_BREAK_TIME_LEFT, payload: 100 }

    const reduced = reducer(initialState, action)

    expect(reduced.breakTimeLeft).toEqual(100)
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
