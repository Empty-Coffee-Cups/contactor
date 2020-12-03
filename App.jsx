import React from 'react'
import { Provider } from 'react-redux'
import { Container } from 'native-base'

import configureStore from './src/store'
import Routes from './src/routes'

const store = configureStore()

const App = () => (
  <Provider store={store}>
    <Container>
      <Routes />
    </Container>
  </Provider>
)

export default App
