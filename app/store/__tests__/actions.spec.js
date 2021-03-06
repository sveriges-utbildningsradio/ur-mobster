import * as actions from '../actions'

describe('store/actions', () => {
  it('updateLanguage', () => {
    const action = actions.updateLanguage('en')

    expect(action).toMatchSnapshot()
  })

  it('updateDuration', () => {
    const action = actions.updateDuration(300)

    expect(action).toMatchSnapshot()
  })

  it('updateBreakDuration', () => {
    const action = actions.updateBreakDuration(300)

    expect(action).toMatchSnapshot()
  })

  it('updateBreakFrequency', () => {
    const action = actions.updateBreakFrequency(300)

    expect(action).toMatchSnapshot()
  })

  it('updateBreakTimeLeft', () => {
    const action = actions.updateBreakTimeLeft(300)

    expect(action).toMatchSnapshot()
  })
})
