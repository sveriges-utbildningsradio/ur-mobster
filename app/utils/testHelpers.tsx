import React from 'react'
import { render } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import translations from '../translations'

const renderWithReactIntl = component => {
  return render(
    <IntlProvider locale="sv" messages={translations['sv']}>
      {component}
    </IntlProvider>
  )
}

export default renderWithReactIntl
