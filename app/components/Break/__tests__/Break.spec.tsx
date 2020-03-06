import React from 'react'
import { cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'
import Break from '../Break'

describe('components/Break', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { container } = renderWithReactIntl(<Break />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
