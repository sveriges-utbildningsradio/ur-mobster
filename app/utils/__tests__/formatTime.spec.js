import { formatTime } from '../formatTime'

describe('utils/formatTime', () => {
  it('should format seconds as MM:SS given whole minutes', () => {
    const expected = '10:00'
    const TEN_MINUTES = 600

    const actual = formatTime(TEN_MINUTES)

    expect(actual).toBe(expected)
  })

  it('should format seconds with padding 0s as MM:SS when not whole minutes', () => {
    const expected = '01:05'
    const ONE_MINUTE_FIVE_SECONDS = 65

    const actual = formatTime(ONE_MINUTE_FIVE_SECONDS)

    expect(actual).toBe(expected)
  })
})
