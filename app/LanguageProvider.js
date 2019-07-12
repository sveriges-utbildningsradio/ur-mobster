import React, { useContext } from 'react'
import { IntlProvider } from 'react-intl'
import { SettingsStoreContext } from './store/store'
import HomeContainer from './routes/Home'
import translations from './translations'

const LanguageProvider = () => {
  const { language } = useContext(SettingsStoreContext)
  const messages = translations[language]

  return (
    <IntlProvider locale={language} messages={messages}>
      <HomeContainer />
    </IntlProvider>
  )
}

export default LanguageProvider
