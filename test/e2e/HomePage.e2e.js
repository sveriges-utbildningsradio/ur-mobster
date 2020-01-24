import { ClientFunction, Selector } from 'testcafe'
import { waitForReact } from 'testcafe-react-selectors'
import { en, sv } from '../../app/translations.json'

/**
 * CONSTANTS
 */
const EMPTY_LIST = sv.noMobstersListItem
const MOBSTER_NAME = 'Vito Corleone'
const GITHUB_USERNAME = 'AElmoznino'
const GITHUB_FULLNAME = 'André Elmoznino Laufer'

/**
 * SELECTORS
 */
const mobsterInput = Selector('[data-e2e="mobsters-add-input"]')
const mobsterSelector = Selector('[data-e2e="mobsterslist-name-0"]')
const getMobsterName = () => mobsterSelector().innerText

const mobsterGitHubSelector = Selector('[data-e2e="mobsterslist-githubName-0"]')
const getMobsterGitHub = () => mobsterGitHubSelector().innerText

const mobstersList = Selector(
  '[data-e2e="mobsters-list-draggable-wrapper-activeUsers"]'
)

const inactiveMobstersList = Selector(
  '[data-e2e="mobsters-list-draggable-wrapper-inactiveUsers"]'
)

const startButton = Selector('[data-e2e="startButton"]')
const pauseButton = Selector('[data-e2e="pauseButton"]')
const resetButton = Selector('[data-e2e="resetButton"]')
const timeLeft = Selector('[data-e2e="duration-time-left"]')
const getTimeLeft = () => timeLeft().innerText

const settingsToggle = Selector('[data-e2e="settings-toggle-button"]')

/**
 * HELPERS
 */
const getPageTitle = ClientFunction(() => document.title)

const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages()
  await t.expect(error).eql([])
}

const removeAllUsers = async t => {
  const editButton = Selector('[data-e2e="mobsters-edit-button"]')
  if (!editButton) return

  await t.click(editButton)

  await waitForReact()

  const removeUserButtons = Selector('[data-e2e="mobsterslist-remove-user"]')
  const count = await removeUserButtons.count

  if (count) {
    for (var i = 0; i < count; i++) {
      await t.click(removeUserButtons.nth(i))
    }
  }

  await t.expect(mobstersList().innerText).eql(EMPTY_LIST)
  await t.expect(inactiveMobstersList().innerText).eql(EMPTY_LIST)
}

const resetTimer = async (t, timer) => {
  await t.click(settingsToggle)

  await t.click(Selector(`[data-e2e="decrease-${timer}"]`))
}

/**
 * TESTS
 */

fixture`Home Page`
  .page('../../app/app.html')
  .beforeEach(removeAllUsers)
  .afterEach(assertNoConsoleErrors)

test('should open window and set correct page title', async t => {
  await t.expect(getPageTitle()).eql('UR Mobster')
})

test("should haven't any logs in console of main window", assertNoConsoleErrors)

test('should be able to add new user by name and drag user to inactive list', async t => {
  await t.typeText(mobsterInput, MOBSTER_NAME)

  await t.click(Selector('[data-e2e="mobsters-add-by-name"]'))

  await t.expect(getMobsterName()).eql(MOBSTER_NAME)

  await t.expect(inactiveMobstersList().innerText).eql(EMPTY_LIST)

  await t.dragToElement(mobsterSelector, inactiveMobstersList)

  await t.expect(mobstersList().innerText).eql(EMPTY_LIST)
  await t.expect(inactiveMobstersList().innerText).eql(MOBSTER_NAME)
})

test('should be able to add new user by GitHub username', async t => {
  await t.typeText(mobsterInput, GITHUB_USERNAME)

  await t.click(Selector('[data-e2e="mobsters-add-by-github-username"]'))

  await t.expect(getMobsterName()).eql(GITHUB_FULLNAME)
  await t.expect(getMobsterGitHub()).eql(GITHUB_USERNAME)
})

test('should be able to access settings panel and toggle language', async t => {
  await t.click(settingsToggle)

  const settingsHeader = Selector('[data-e2e="settings-header"]')

  await t.expect(settingsHeader().innerText).eql(sv.settingsHeader)

  await t.click(Selector('[data-e2e="settings-toggle-en"]'))

  await t.expect(settingsHeader().innerText).eql(en.settingsHeader)

  await t.click(Selector('[data-e2e="settings-toggle-sv"]'))
})

test('should be able to update duration', async t => {
  await t.expect(getTimeLeft()).eql(`${sv.timeLeft}: 05:00`)

  await t.click(settingsToggle)

  await t.click(Selector('[data-e2e="increase-duration"]'))

  await t.click(settingsToggle)

  await t.expect(getTimeLeft()).eql(`${sv.timeLeft}: 10:00`)

  await resetTimer(t, 'duration')
})

test('should handle starting, pausing and resetting the timer', async t => {
  await t.click(startButton)

  await t.expect(getTimeLeft()).eql(`${sv.timeLeft}: 04:59`)

  await t.click(pauseButton)

  await t.click(resetButton)

  await t.expect(getTimeLeft()).eql(`${sv.timeLeft}: 05:00`)
})
