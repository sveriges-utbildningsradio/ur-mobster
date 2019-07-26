import { handleLanguage } from '../store'

describe('store/store', () => {
  let languageGetter

  describe('#browserLanguage', () => {
    beforeEach(() => {
      beforeEach(() => {
        languageGetter = jest.spyOn(window.navigator, 'language', 'get')
      })
    })
    it("should return the user's language if English", () => {
      const userLanguage = handleLanguage()
      expect(userLanguage).toBe('en')
    })

    it("should return the user's language if Swedish", () => {
      languageGetter.mockReturnValue('sv')

      const userLanguage = handleLanguage()
      expect(userLanguage).toBe('sv')
    })

    it("should default to 'sv' if given any other language", () => {
      languageGetter.mockReturnValue('de')

      const userLanguage = handleLanguage()
      expect(userLanguage).toBe('sv')
    })
  })
})
