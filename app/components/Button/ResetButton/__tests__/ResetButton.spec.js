import React from 'react'
import { cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../../utils/testHelpers'
import ResetButton from '../ResetButton'

describe('components/Button/ResetButton', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { container } = renderWithReactIntl(
      <ResetButton handleClick={jest.fn()} id="resetBreak" />
    )

    expect(container.firstChild).toMatchSnapshot()
  })
})
