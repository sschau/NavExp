import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView, 
 } from 'react-native'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'


import Recipes from '../components/Recipes'
import Samples from '../components/Samples'

import Location from '../components/Location'
import Storage from '../components/Storage'
import PicForm from '../components/PicForm'
import CallWS from '../components/CallWS'
import OPWebView from '../components/OPWebView'
import GoogleAcct from '../components/GoogleAcct'

import DevConnectionInfo from '../components/DevConnectionInfo'


import Home from '../containers/navRootContainer'


class Tabs extends Component {
  _changeTab (i) {
    const { changeTab } = this.props
    changeTab(i)
  }
  _renderTabContent (key) {
    switch (key) {
      case 'home':
        return <Home />
      case 'recipes':
        return <Recipes />
      case 'samples':
        return <Samples />
    }
  }

  render () {
    return (
       <ScrollableTabView 
      style={styles.container}
      renderTabBar={()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' />}
      
      >
      <ScrollView tabLabel='Home' style={styles.tabView}>
        <View style={styles.card}>
            <Home />
        </View>
      </ScrollView>
      <ScrollView tabLabel='Location' style={styles.tabView}>
        <View style={styles.card}>
            <Location />
        </View>
      </ScrollView>
      <ScrollView tabLabel='Storage' style={styles.tabView}>
        <View style={styles.card}>
            <Storage />
        </View>
      </ScrollView>
      <ScrollView tabLabel='PicForm' style={styles.tabView}>
        <View style={styles.card}>
            <PicForm />
        </View>
      </ScrollView>
      <ScrollView tabLabel='CallWS' style={styles.tabView}>
        <View style={styles.card}>
            <CallWS />
        </View>
      </ScrollView>      
      <ScrollView tabLabel='OPWebView' style={styles.tabView}>
        <View style={styles.card}>
            <OPWebView />
        </View>
      </ScrollView>      
      <ScrollView tabLabel='SignIn' style={styles.tabView}>
        <View style={styles.card}>
            <GoogleAcct />
        </View>
      </ScrollView>      

      <ScrollView tabLabel='Online' style={styles.tabView}>
        <View style={styles.card}>
            <DevConnectionInfo />
        </View>
      </ScrollView>      


            
             </ScrollableTabView> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  icon: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    height: 450,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2, },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },  
});

export default Tabs  