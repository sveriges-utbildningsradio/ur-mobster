import * as React from 'react'
import { hot } from 'react-hot-loader/root'

type AppProps = {
  children: React.Node
}

export const App = ({ children }: AppProps) => <>{children}</>

export default hot(App)
