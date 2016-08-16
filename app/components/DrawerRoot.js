import React, { Component } from 'react'
import { DrawerLayoutAndroid, View, Text, ListView, TouchableHighlight, StyleSheet } from 'react-native'

import Recipes from '../components/Recipes'
import Samples from '../components/Samples'
import Home from '../containers/navRootContainer'

class Drawer extends Component {
    
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


_renderDrawerContent(onNavigate) {
    console.log('in render drawer Content');
    const navigationView = this.props.tabs.tabs.map((tab, i) => {
        console.log('DrawerContent : ' + tab.title);
      return (
        <View style={{flex: 1, alignItems: 'left'}}>
        <TouchableHighlight onPress={this._changeTab(i)}>
          <View style={styles.row}>
            <Text style={styles.rowTitleText}>
              {tab.title + ' - ROW TITLE'}
            </Text>
            <Text style={styles.rowDetailText}>
              {tab.title + ' - ROW DESC'}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
        </View>          
      )
    })

    return navigationView;
}

  render () {
    return (
       <DrawerLayoutAndroid
      drawerWidth={300}
      drawerBackgroundColor="rgba(0,0,0,0.5)"
      drawerPosition={DrawerLayoutAndroid.positions.Left}
      renderNavigationView={() => this._renderDrawerContent.bind(this)}>
        <View style={{flex: 1, alignItems: 'center'}}>
            <Samples />
        </View>
    </DrawerLayoutAndroid>


    )
  }
}

var styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    backgroundColor: '#eeeeee',
  },
  sectionHeader: {
    padding: 5,
    fontWeight: '500',
    fontSize: 11,
  },
  group: {
    backgroundColor: 'white',
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowTitleText: {
    fontSize: 17,
    fontWeight: '500',
  },
  rowDetailText: {
    fontSize: 15,
    color: '#888888',
    lineHeight: 20,
  },
  searchRow: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  searchTextInput: {
    backgroundColor: 'white',
    borderColor: '#cccccc',
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
    height: 35,
  },
});

export default Drawer  