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
        onDragEnd={jest.fn()}
        setUsername={jest.fn()}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders when the user is editing the list', () => {
    const { container } = renderWithReactIntl(
      <Mobsters
        activeUsers={activeUsers}
        clickEditButton={jest.fn()}
        clickGitHubButton={jest.fn()}
        clickGuestButton={jest.fn()}
        clickRemoveUser={jest.fn()}
        inactiveUsers={inactiveUsers}
        isEditing={true}
        onDragEnd={jest.fn()}
        setUsername={jest.fn()}
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders when there is a username', () => {
    const { container } = renderWithReactIntl(
      <Mobsters
        activeUsers={activeUsers}
        clickEditButton={jest.fn()}
        clickGitHubButton={jest.fn()}
        clickGuestButton={jest.fn()}
        clickRemoveUser={jest.fn()}
        inactiveUsers={inactiveUsers}
        isEditing={true}
        onDragEnd={jest.fn()}
        setUsername={jest.fn()}
        username="Some user"
      />
    )
    expect(container.firstChild).toMatchSnapshot()
  })
})
