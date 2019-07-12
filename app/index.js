import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Store from './store'
import LanguageProvider from './LanguageProvider'
import './app.global.css'

render(
  <AppContainer>
    <Store>
      <LanguageProvider />
    </Store>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./routes/Home', () => {
    // eslint-disable-next-line global-require
    const NextHome = require('./routes/Home').default
    render(
      <AppContainer>
        <Store>
          <LanguageProvider />
        </Store>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
