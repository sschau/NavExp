import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'
import Button from './Button'

/*
const route = {
  type: 'push',
  route: {
    key: 'about',
    title: 'About'
  }
}
*/
const route = {
  type: 'push',
  route: {
    key: 'page1',
    title: 'Page 1'
  }
}


const Home = ({_handleNavigate}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Home world</Text>
    <Button onPress={() => _handleNavigate(route)} label='Go To Page1' />
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

export default Home