import { initialState, reducer } from '../reducer'
import * as types from '../actionTypes'
import persistToStore from '../../../../utils/persistToStore'

jest.mock('../../../../utils/persistToStore')

describe('reducer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const firstUser = {
    avatar: null,
    githubName: null,
    id: '123',
    name: 'Test name'
  }

  const secondUser = {
    avatar: 'Test avatar',
    githubName: 'Test GitHubName',
    id: '567',
    name: 'Test Github user'
  }

  const stateWithActiveUser = {
    activeUsers: [firstUser],
    inactiveUsers: []
  }

  const stateWithInactiveUser = {
    activeUsers: [],
    inactiveUsers: [firstUser]
  }

  it('ADD_ACTIVEUSER adds user to end of activeUsers', () => {
    const action = {
      type: types.ADD_ACTIVEUSER,
      payload: secondUser
    }

    const reduced = reducer(stateWithActiveUser, action)

    expect(reduced).toEqual({
      activeUsers: [firstUser, secondUser],
      inactiveUsers: []
    })
    expect(persistToStore).toHaveBeenCalledWith('activeUsers', [
      firstUser,
      secondUser
    ])
  })

  it('UPDATE_ACTIVEUSERS overwrites activeUsers', () => {
    const action = {
      type: types.UPDATE_ACTIVEUSERS,
      payload: [secondUser]
    }

    const reduced = reducer(stateWithActiveUser, action)

    expect(reduced).toEqual({
      activeUsers: [secondUser],
      inactiveUsers: []
    })
    expect(persistToStore).toHaveBeenCalledWith('activeUsers', [secondUser])
  })

  it('UPDATE_INACTIVEUSERS overwrites inactiveUsers', () => {
    const action = {
      type: types.UPDATE_INACTIVEUSERS,
      payload: [secondUser]
    }

    const reduced = reducer(stateWithInactiveUser, action)

    expect(reduced).toEqual({
      activeUsers: [],
      inactiveUsers: [secondUser]
    })
    expect(persistToStore).toHaveBeenCalledWith('inactiveUsers', [secondUser])
  })

  it('SET_FROM_STORAGE sets activeUsers and inactiveUsers from storage', () => {
    const action = {
      type: types.SET_FROM_STORAGE,
      payload: {
        activeUsers: [firstUser],
        inactiveUsers: [secondUser]
      }
    }

    const reduced = reducer(initialState, action)

    expect(reduced).toEqual({
      activeUsers: [firstUser],
      inactiveUsers: [secondUser]
    })
    expect(persistToStore).not.toHaveBeenCalled()
  })

  it('returns initialState for type that does not exist', () => {
    const action = {
      type: 'just-a-test-type',
      payload: 'test-payload'
    }

    const reduced = reducer(initialState, action)

    expect(reduced).toEqual(initialState)
    expect(persistToStore).not.toHaveBeenCalled()
  })
})
