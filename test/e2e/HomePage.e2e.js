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

const removeAllUsers = async t => {
  const editButton = Selector('[data-e2e="mobsters-edit-button"]')
  if (!editButton) return

  await t.click(editButton)

  await waitForReact()

  const removeUserButtons = Selector('[data-e2e="mobsterslist-remove-user"]')
  const count = await removeUserButtons.count

  if (count) {
    for (var i = 0; i <= count; i++) {
      await t.click(removeUserButtons.nth(i))
    }
  }
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
  const mobsterInput = Selector('[data-e2e="mobsters-add-input"]')
  const MOBSTER_NAME = 'Vito Corleone'

  await t.typeText(mobsterInput, MOBSTER_NAME)

  await t.click(Selector('[data-e2e="mobsters-add-by-name"]'))

  const mobsterSelector = Selector('[data-e2e="mobsterslist-name-0"]')
  const getMobsterName = () => mobsterSelector().innerText

  await t.expect(getMobsterName()).eql(MOBSTER_NAME)
})

// TODO: Remove. Using for reference until more tests have been added

// test('should to Counter with click "to Counter" link', async t => {
//   await t
//     .click('[data-tid=container] > a')
//     .expect(getCounterText())
//     .eql('0')
// })

// test('should navgiate to /counter', async t => {
//   await waitForReact()
//   await t
//     .click(
//       ReactSelector('Link').withProps({
//         to: '/counter'
//       })
//     )
//     .expect(getPageUrl())
//     .contains('/counter')
// })

// fixture`Counter Tests`
//   .page('../../app/app.html')
//   .beforeEach(clickToCounterLink)
//   .afterEach(assertNoConsoleErrors)

// test('should display updated count after increment button click', async t => {
//   await t
//     .click(incrementButton)
//     .expect(getCounterText())
//     .eql('1')
// })

// test('should display updated count after descrement button click', async t => {
//   await t
//     .click(decrementButton)
//     .expect(getCounterText())
//     .eql('-1')
// })

// test('should not change if even and if odd button clicked', async t => {
//   await t
//     .click(oddButton)
//     .expect(getCounterText())
//     .eql('0')
// })

// test('should change if odd and if odd button clicked', async t => {
//   await t
//     .click(incrementButton)
//     .click(oddButton)
//     .expect(getCounterText())
//     .eql('2')
// })

// test('should change if async button clicked and a second later', async t => {
//   await t
//     .click(asyncButton)
//     .expect(getCounterText())
//     .eql('0')
//     .expect(getCounterText())
//     .eql('1')
// })

// test('should back to home if back button clicked', async t => {
//   await t
//     .click('[data-tid="backButton"] > a')
//     .expect(Selector('[data-tid="container"]').visible)
//     .ok()
// })
