import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import axiosMock from 'axios'
import storageMock from 'electron-json-storage'
import { activeUsers, inactiveUsers } from '../__fixtures__/UsersFixture'

import MobstersContainer from '../MobstersContainer'

describe('components/MobstersContainer', () => {
  afterEach(cleanup)

  it('renders given no activeUsers nor inactiveUsers', () => {
    const { getByTestId, container } = render(<MobstersContainer />)

    expect(container.firstChild).toMatchSnapshot()
  })

  it.skip('renders given activeUsers and inactiveUsers from store', () => {
    // TODO: Read data from store
    // storageMock.getAll.mockResolvedValue({
    //   null: null,
    //   data: { activeUsers, inactiveUsers }
    // })

    const { getByTestId, container, getByPlaceholderText } = render(
      <MobstersContainer />
    )

    const input = getByPlaceholderText('Lägg till mobster')
    fireEvent.change(input, { target: { value: 'test user' } })
    expect(container.firstChild).toMatchSnapshot()
  })

  it.skip('handles adding user by GitHub name', () => {})
})
