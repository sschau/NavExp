import React, { PropTypes, Component } from 'react'
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


import NavContainer from '../containers/navRootContainer'
import MovieContainer from '../containers/movieContainer'



// This component define all tabs and way to render them.  
// Provide an handler to call the pass in changeTab function
// use the tab property to render all tab. (? outside tab array only give key.  
// Inside _renderTabContent know how to do the actual renderer based on key) 

class Tabs extends Component {

  // interface to call the changeTab funtion pass by parent as property
  _changeTabHandler(obj) {
    let tabIndex = obj.i;

    const { changeTab } = this.props;  // extract the changeTab function from property
    //console.log('changeTab defined? ' + changeTab);

    // ** concept: reducer define/handle when changeTab happen what needs to be done. 
    console.log('tabsRoots call external changeTab function with index ' + tabIndex);
    changeTab(tabIndex);   // call the pass in function with tab index
  }


  _renderTabContent(key) {
    switch (key) {
      case 'ios-paper':
        return (<ScrollView style={styles.tabView}>
          <View style={styles.card}>
            <NavContainer />
          </View>
        </ScrollView>)


      case 'md-card':
        // ??  direct call not working when using tab reducer?
        return (<View style={styles.card}>
          <NavContainer />
        </View>)


      case 'md-car':
        return <Location />
      case 'md-cloud-upload':
        return <Storage />

      case 'md-camera':
        return <PicForm />

      case 'md-code-working':
        //return <CallWS />
        return <MovieContainer />

      case 'md-globe':

        return (
          <View style={styles.card}>
            <OPWebView />
          </View>)

      case 'md-clipboard':
        return <TForm />

      case 'md-contact':
        return <GoogleAcct />

      case 'md-wifi':
        return (<ScrollView style={styles.tabView}>
          <View style={styles.card}>
            <DevConnectionInfo />
          </View>
        </ScrollView>)
    }
  }

  render() {

    //const tabs = this.props.tabR.tabs.map((tab, i) => {
    const tabs = this.props.tabs.map((tab, i) => {
      return (
        <View tabLabel={tab.key} key={tab.key} >
          {this._renderTabContent(tab.key) }
        </View>
      )
    });

    return (
      <ScrollableTabView
        style={styles.container}
        onChangeTab = {this._changeTabHandler.bind(this) }
        renderTabBar={
          // render the tab bar based on all tabs tabLabel property
          () => <TabBar/>
          // ()=><DefaultTabBar backgroundColor='rgba(255, 255, 255, 0.7)' /> 
        }
        >
        {tabs}

      </ScrollableTabView>


    )






    /* without redux 
    
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
    */


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



Tabs.propTypes = {
  tabR : PropTypes.object.isRequired,
  changeTab : PropTypes.func.isRequired,    
}

export default Tabs  