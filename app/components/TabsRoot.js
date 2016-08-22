import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    ScrollView, 
 } from 'react-native'
import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import TabBar from './TabBar'


import Location from '../components/Location'
import Storage from '../components/Storage'
import PicForm from '../components/PicForm'
import CallWS from '../components/CallWS'
import OPWebView from '../components/OPWebView'
import GoogleAcct from '../components/GoogleAcct'
import DevConnectionInfo from '../components/DevConnectionInfo'
import TForm from '../components/TForm'


import Home from '../containers/navRootContainer'



class Tabs extends Component {


  render () {
    return (
       <ScrollableTabView 
          style={styles.container}
          renderTabBar={
            () => <TabBar/>            
           // ()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' /> 
          }      
        >
          <Home tabLabel="ios-paper"/>
          
          <ScrollView tabLabel='md-card' style={styles.tabView}>          
            <View style={styles.card}>          
                <Home />
            </View>
          </ScrollView>

          <Location tabLabel='md-car'/>

          <Storage tabLabel='md-cloud-upload'/>

          <PicForm tabLabel='md-camera'/>

          <CallWS tabLabel='md-code-working' />


          <OPWebView tabLabel='md-globe' />

          <TForm tabLabel='md-clipboard' />
          
          <GoogleAcct  tabLabel='md-contact' />

          <ScrollView tabLabel='md-wifi' style={styles.tabView}>
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