import { move, reorder } from '../listHelpers'

describe('utils/listHelpers', () => {
  describe('#reorder', () => {
    it('should reorder the given list', () => {
      const list = ['first', 'second']
      const expected = ['second', 'first']
      const positionBefore = 0
      const positionAfter = 1

      const actual = reorder(list, positionBefore, positionAfter)

      expect(actual).toEqual(expected)
    })

    it('should reorder the given list (given a longer list) and from first to last position', () => {
      const list = ['first', 'second', 'third', 'fourth', 'fifth']
      const expected = ['fifth', 'first', 'second', 'third', 'fourth']
      const positionBefore = 4
      const positionAfter = 0

      const actual = reorder(list, positionBefore, positionAfter)

      expect(actual).toEqual(expected)
    })
  })

  describe('#move', () => {
    it('should move the given element from the first list to the other', () => {
      const expected = {
        activeUsers: [],
        inactiveUsers: [{ name: 'Test one' }]
      }

      const sourceList = [{ name: 'Test one' }]
      const destinationList = []
      const droppableSource = { index: 0, droppableId: 'activeUsers' }
      const droppableDestination = { index: 0, droppableId: 'inactiveUsers' }

      const actual = move(
        sourceList,
        destinationList,
        droppableSource,
        droppableDestination
      )

      expect(actual).toEqual(expected)
    })

    it('should move the given element to the correct position in a destination list with multiple items', () => {
      const expected = {
        activeUsers: [{ name: 'One' }],
        inactiveUsers: [{ name: 'Three' }, { name: 'Four' }, { name: 'Two' }]
      }

      const sourceList = [{ name: 'One' }, { name: 'Two' }]
      const destinationList = [{ name: 'Three' }, { name: 'Four' }]

      const droppableSource = { index: 1, droppableId: 'activeUsers' }
      const droppableDestination = {
        index: 2,
        droppableId: 'inactiveUsers'
      }

      const actual = move(
        sourceList,
        destinationList,
        droppableSource,
        droppableDestination
      )

      expect(actual).toEqual(expected)
    })
  })
})
