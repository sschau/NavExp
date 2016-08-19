import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Button from './Button'

// define next page where is going, also the corresponding action 
// for the reducer to handle (push)
const nextRoute = {
  type: 'push',
  route: {
    key: 'page3',
    title: 'Page 3'
  }
}


// goBack and goForward are 2 functions reference to call when btn click,
// goBack will pop, goForward required a route which will go next 
// For those calling <Page1> must provide the _goBack and _navTo functions
const Page1 = ({_goBack, _navTo}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Page 1</Text>
    <Button onPress={_goBack} label='Go Back' />
    <Button onPress={() => _navTo(nextRoute)} label='Nav To next route' />    
  </View>
)

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 22,
    textAlign: 'center'
  },
  container: {
    paddingTop: 60
  }
})

export default Page1