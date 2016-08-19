import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Button from './Button'

const route = {
  type: 'push',
  route: {
    key: 'about',
    title: 'About'
  }
}


const Page2 = ({_goBack, _navTo}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Page 2</Text>
        <Image
      style={styles.image}
      source={{ uri: 'https://i.imgur.com/PK9PmOn.png' }}/>
    <Button onPress={_goBack} label='< goBack' />
    <Button onPress={() => _navTo(route)} label='Nav to next route' />    
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff53f5',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginTop: 100,
    fontSize: 24,
    textAlign: 'center'
  },
  image: {
    width: 250,
    height: 250
  }
})

export default Page2