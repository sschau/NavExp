import React from 'react'
import { AppRegistry } from 'react-native'


import MainContainer from './app/containers/mainContainer'



const App = () => (  
    <MainContainer />        
)

AppRegistry.registerComponent('NavExp', () => App);
