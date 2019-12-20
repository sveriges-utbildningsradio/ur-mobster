import { ClientFunction, Selector } from 'testcafe'
import { ReactSelector, waitForReact } from 'testcafe-react-selectors'
import { getPageUrl } from './helpers'

// TODO: Remove. Using for reference until more tests have been added
const getPageTitle = ClientFunction(() => document.title)
const counterSelector = Selector('[data-tid="counter"]')
const buttonsSelector = Selector('[data-tclass="btn"]')
const clickToCounterLink = t =>
  t.click(Selector('a').withExactText('to Counter'))
const incrementButton = buttonsSelector.nth(0)
const decrementButton = buttonsSelector.nth(1)
const oddButton = buttonsSelector.nth(2)
const asyncButton = buttonsSelector.nth(3)
const getCounterText = () => counterSelector().innerText
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages()
  await t.expect(error).eql([])
}

const mobsterInput = Selector('[data-e2e="mobsters-add-input"]')
const mobsterSelector = Selector('[data-e2e="mobsterslist-name-0"]')
const getMobsterName = () => mobsterSelector().innerText

const mobsterGitHubSelector = Selector('[data-e2e="mobsterslist-githubName-0"]')
const getMobsterGitHub = () => mobsterGitHubSelector().innerText

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

  const mobstersList = Selector('[data-e2e="mobsters-list-draggable-wrapper"]')

  await t.expect(mobstersList().innerText).eql('Listan är tom')
}

const resetTimer = async (t, timer) => {
  await t.click(Selector('[data-e2e="settings-toggle-button"]'))

  await t.click(Selector(`[data-e2e="decrease-${timer}"]`))
}

fixture`Home Page`
  .page('../../app/app.html')
  .beforeEach(removeAllUsers)
  .afterEach(assertNoConsoleErrors)

test('should open window and set correct page title', async t => {
  await t.expect(getPageTitle()).eql('UR Mobster')
})

test("should haven't any logs in console of main window", assertNoConsoleErrors)

test('should be able to add new user by name', async t => {
  const MOBSTER_NAME = 'Vito Corleone'

  await t.typeText(mobsterInput, MOBSTER_NAME)

  await t.click(Selector('[data-e2e="mobsters-add-by-name"]'))

  await t.expect(getMobsterName()).eql(MOBSTER_NAME)
})

test('should be able to add new user by GitHub username', async t => {
  const GITHUB_USERNAME = 'AElmoznino'
  const GITHUB_FULLNAME = 'André Elmoznino Laufer'

  await t.typeText(mobsterInput, GITHUB_USERNAME)

  await t.click(Selector('[data-e2e="mobsters-add-by-github-username"]'))

  await t.expect(getMobsterName()).eql(GITHUB_FULLNAME)
  await t.expect(getMobsterGitHub()).eql(GITHUB_USERNAME)
})

test('should be able to access settings panel and toggle language', async t => {
  await t.click(Selector('[data-e2e="settings-toggle-button"]'))

  const settingsHeader = Selector('[data-e2e="settings-header"]')

  await t.expect(settingsHeader().innerText).eql('Mobster-inställningar')

  await t.click(Selector('[data-e2e="settings-toggle-en"]'))

  await t.expect(settingsHeader().innerText).eql('Mobster Settings')

  await t.click(Selector('[data-e2e="settings-toggle-sv"]'))
})

test('should be able to update duration', async t => {
  const durationTimeLeft = Selector('[data-e2e="duration-time-left"]')
  await t.expect(durationTimeLeft().innerText).eql('Tid kvar: 05:00')

  await t.click(Selector('[data-e2e="settings-toggle-button"]'))

  await t.click(Selector('[data-e2e="increase-duration"]'))

  await t.click(Selector('[data-e2e="settings-toggle-button"]'))

  await t.expect(durationTimeLeft().innerText).eql('Tid kvar: 10:00')

  await resetTimer(t, 'duration')
})
