import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Button from './Button'



const nextAction = {
  type: 'push',
  route: {
    key: 'page2',
    title: 'Page 2'
  }
}


const backAction = {
  type: 'pop'
}

// This page use single function to handle navigation.  
// Use action type to define pop or push.
const Page3 = ({_navHandle}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Page 3</Text>
    <Button onPress={() => _navHandle(backAction)} label='< by nav' />
    <Button onPress={() => _navHandle(nextAction)} label='>' />
    
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

export default Page3