import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { shell } from 'electron'
import Store from './store'
import LanguageProvider from './LanguageProvider'
import './app.global.css'

// Opens up any links (<a> tags) in the user's default browser
document.addEventListener('click', event => {
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault()
    shell.openExternal(event.target.href)
  }
})

render(
  <AppContainer>
    <Store>
      <LanguageProvider />
    </Store>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./LanguageProvider', () => {
    // eslint-disable-next-line global-require
    const NextRoot = require('./LanguageProvider').default
    render(
      <AppContainer>
        <Store>
          <NextRoot />
        </Store>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
