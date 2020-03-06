import React from 'react'
import { cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'

import MobstersContainer from '../MobstersContainer'

describe('components/MobstersContainer', () => {
  afterEach(cleanup)

  it('renders given no activeUsers nor inactiveUsers', () => {
    const { container } = renderWithReactIntl(<MobstersContainer />)

    expect(container.firstChild).toMatchSnapshot()
  })
})
