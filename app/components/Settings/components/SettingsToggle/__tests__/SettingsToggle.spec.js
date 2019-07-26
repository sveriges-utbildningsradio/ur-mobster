import React from 'react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../../../utils/testHelpers'
import SettingsToggle from '../SettingsToggle'
import { LANGUAGE_OPTIONS } from '../../../Settings'

describe('components/Settings/SettingsToggle', () => {
  it('renders', () => {
    const { container } = renderWithReactIntl(
      <SettingsToggle active="Svenska" options={LANGUAGE_OPTIONS} />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
