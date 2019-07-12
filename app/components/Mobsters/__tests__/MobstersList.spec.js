import React from 'react'
import { fireEvent, cleanup } from '@testing-library/react'
import 'jest-dom/extend-expect'
import renderWithReactIntl from '../../../utils/testHelpers'
import { DragDropContext } from 'react-beautiful-dnd'
import MobstersList from '../MobstersList'
import { activeUsers } from '../__fixtures__/UsersFixture'

describe('components/Mobsters/MobstersList', () => {
  let clickRemoveUser
  let users

  beforeEach(() => {
    clickRemoveUser = jest.fn()
  })

  afterEach(cleanup)

  it('should display a list of Mobsters', () => {
    const { getByTestId, container } = renderWithReactIntl(
      <DragDropContext onDragEnd={jest.fn()}>
        <MobstersList
          clickRemoveUser={clickRemoveUser}
          droppableId="testDroppable"
          isEditing={false}
          users={activeUsers}
        />
      </DragDropContext>
    )

    expect(getByTestId('mobsterslist-name-0')).toHaveTextContent(
      'Active 1 Name'
    )
    expect(getByTestId('mobsterslist-githubName-0')).toHaveTextContent(
      'Active 1 Githubname'
    )

    expect(getByTestId('mobsterslist-name-1')).toHaveTextContent(
      'Active 2 Name'
    )
    expect(getByTestId('mobsterslist-githubName-1')).toHaveTextContent('')

    expect(container.firstChild).toMatchSnapshot()
  })
})
