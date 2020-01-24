import generateMobsterName from '../generateMobsterName'

describe('utils/generateMobsterName', () => {
  it('should call Math.random and return a random mobster name', () => {
    const mockMath = Object.create(global.Math)
    mockMath.random = () => 0.5
    global.Math = mockMath

    const MathSpy = jest.spyOn(Math, 'random')

    const actual = generateMobsterName()

    expect(actual).toBe('Henry Hill')
    expect(MathSpy).toHaveBeenCalledTimes(1)
  })
})
