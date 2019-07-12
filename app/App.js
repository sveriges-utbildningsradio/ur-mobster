// @flow
import * as React from 'react'

type AppProps = {
  children: React.Node
}

export default class App extends React.Component<AppProps> {
  props: AppProps

  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}
