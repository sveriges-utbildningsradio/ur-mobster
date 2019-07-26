import React from 'react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../../../utils/testHelpers'
import SettingsDuration from '../SettingsDuration'

describe('components/Settings/SettingsDuration', () => {
  it('renders', () => {
    const { container } = renderWithReactIntl(<SettingsDuration time={300} />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
