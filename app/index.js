import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import HomeContainer from './containers/HomeContainer'
import './app.global.css'

render(
  <AppContainer>
    <HomeContainer />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./containers/HomeContainer', () => {
    // eslint-disable-next-line global-require
    const NextHome = require('./containers/HomeContainer').default
    render(
      <AppContainer>
        <NextHome />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
