import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import HomeContainer from './routes/Home'
import './app.global.css'

render(
  <AppContainer>
    <HomeContainer />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./routes/Home', () => {
    // eslint-disable-next-line global-require
    const NextHome = require('./routes/Home').default
    render(
      <AppContainer>
        <NextHome />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
