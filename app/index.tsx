import React from 'react'
import { render } from 'react-dom'
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader'
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

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer

document.addEventListener('DOMContentLoaded', () =>
  render(
    <AppContainer>
      <Store>
        <LanguageProvider />
      </Store>
    </AppContainer>,
    document.getElementById('root')
  )
)
