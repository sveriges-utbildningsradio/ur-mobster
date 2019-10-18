import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'

import MobstersContainer from '../MobstersContainer'

describe('components/MobstersContainer', () => {
  afterEach(cleanup)

  it('renders given no activeUsers nor inactiveUsers', () => {
    const { container } = renderWithReactIntl(<MobstersContainer />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it.skip('renders given activeUsers and inactiveUsers from store', () => {
    // TODO: Read data from store
    // storageMock.getAll.mockResolvedValue({
    //   null: null,
    //   data: { activeUsers, inactiveUsers }
    // })

    const { container, getByPlaceholderText } = renderWithReactIntl(
      <MobstersContainer />
    )

    const input = getByPlaceholderText('Lägg till mobster')
    fireEvent.change(input, { target: { value: 'test user' } })
    expect(container.firstChild).toMatchSnapshot()
  })

  it.skip('handles adding user by GitHub name', () => {})
})
