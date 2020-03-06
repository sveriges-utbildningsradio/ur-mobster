import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'
import Settings from '../Settings'

describe('components/Settings', () => {
  afterEach(cleanup)

  it('renders just the button when closed', () => {
    const { container } = renderWithReactIntl(<Settings />)

    expect(container).toMatchSnapshot()
  })

  it('renders when open', () => {
    const { container, getByAltText } = renderWithReactIntl(<Settings />)

    fireEvent.click(getByAltText('Settings page'))
    expect(container).toMatchSnapshot()
  })

  it('closes when clicking the Done button', () => {
    const { container, getByAltText, getByText } = renderWithReactIntl(
      <Settings />
    )

    fireEvent.click(getByAltText('Settings page'))

    fireEvent.click(getByText('Klar!'))

    expect(container).toMatchSnapshot()
  })
})
