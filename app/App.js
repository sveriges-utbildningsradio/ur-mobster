// @flow
import * as React from 'react'

type AppProps = {
  children: React.Node
}

export default class App extends React.Component<AppProps> {
  render() {
    const { children } = this.props
    return <>{children}</>
  }
}
