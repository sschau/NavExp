import React from 'react'
import { AppRegistry } from 'react-native'

import configureStore from './app/store/configureStore'
const store = configureStore()

//import NavigationRootContainer from './app/containers/navRootContainer'
//import TabsRootContainer from './app/containers/tabsRootContainer'
import MainContainer from './app/containers/mainContainer'
import { Provider } from 'react-redux'


const App = () => (
  

  <Provider store={store}>
    <MainContainer />    
    
  </Provider>
)

AppRegistry.registerComponent('NavExp', () => App);
