import React from 'react'
import { cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'
import Mobsters from '../Mobsters'
import { activeUsers, inactiveUsers } from '../__fixtures__/UsersFixture'

describe('components/Mobsters', () => {
  afterEach(cleanup)

  it('renders', () => {
    const { container } = renderWithReactIntl(
      <Mobsters
        activeUsers={activeUsers}
        clickEditButton={jest.fn()}
        clickGitHubButton={jest.fn()}
        clickGuestButton={jest.fn()}
        clickRemoveUser={jest.fn()}
        inactiveUsers={inactiveUsers}
        isEditing={false}
        onDragEnd={jest.fn()}
        setUsername={jest.fn()}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
