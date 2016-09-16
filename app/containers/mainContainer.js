import React, { Component } from 'react'

import { BackAndroid,
    DrawerLayoutAndroid,
    ToolbarAndroid, ToastAndroid,
    View, Text, ListView, TouchableHighlight, StyleSheet } from 'react-native'


import configureStore from '../store/configureStore'
const store = configureStore()

import NavContainer from './navRootContainer'
import TabsRootContainer from './tabsRootContainer'

import { Provider } from 'react-redux'


import Recipes from '../components/Recipes'
import Samples from '../components/Samples'



class Drawer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainView: <Samples />
        }
        this._drawer = null;
        this.lastBackPressed = Date.now();
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
    }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButtonPress.bind(this));
    }
  }

  
    _handleBackButtonPress() {
        if (this._overrideBackPressForDrawerLayout) {
            // This hack is necessary because drawer layout provides an imperative API
            // with open and close methods. This code would be cleaner if the drawer
            // layout provided an `isOpen` prop and allowed us to pass a `onDrawerClose` handler.
            this._drawer && this._drawer.closeDrawer();
            return true;
        } else if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //press in 2 secs
            return false;
        }
            this.lastBackPressed = Date.now();
            ToastAndroid.showWithGravity('Press one more to exit', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            // BackAndroid.exitApp();
            return true; 
    }


    _onViewSelected(index) {
        console.log('drawer selected ' + index);

        if (index === '0') {
            this.setState({ mainView: <Samples /> });
        }
        if (index === '1') {
            this.setState({ mainView: <Recipes /> });
        }
        if (index === '2') {
            this.setState({ mainView: <NavContainer /> });
        }
        if (index === '3') {
            // use tab as the init route
            this.setState({ mainView:  <TabsRootContainer /> });
        }

        this._drawer.closeDrawer(0);
    }

    _renderDrawerContent() {
        console.log('main container. Render drawer Content');

        var navigationView = (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <TouchableHighlight onPress={() => { this._onViewSelected('0') } }>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {'Samples'}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {'Samples page'}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />



                <TouchableHighlight onPress={() => { this._onViewSelected('1') } }>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {'Recipes'}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {'Recipes page'}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />


                <TouchableHighlight onPress={() => { this._onViewSelected('2') } }>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {'NavExp'}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {'Nav stack: Home, P1, P3, P2, About'}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />


                <TouchableHighlight onPress={() => { this._onViewSelected('3') } }>
                    <View style={styles.row}>
                        <Text style={styles.rowTitleText}>
                            {'Tab control'}
                        </Text>
                        <Text style={styles.rowDetailText}>
                            {'Using Tab Control'}
                        </Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />

            </View>


        );

        return navigationView;
    }

    render() {
        return (

            <Provider store={store}>
                <DrawerLayoutAndroid
                    ref={(drawer) => { this._drawer = drawer; } }
                    drawerWidth={300}
                    drawerBackgroundColor="rgba(0,0,0,0.9)"
                    keyboardDismissMode="on-drag"
                    onDrawerOpen={() => {
                        this._overrideBackPressForDrawerLayout = true;
                    } }
                    onDrawerClose={() => {
                        this._overrideBackPressForDrawerLayout = false;
                    } }

                    drawerPosition={DrawerLayoutAndroid.positions.Left}
                    renderNavigationView={this._renderDrawerContent.bind(this) }>

                    <ToolbarAndroid
                        navIcon={require('./ic_menu_black_24dp.png') }
                        onIconClicked={() => this._drawer.openDrawer() }
                        style={styles.toolbar}
                        title='My Title'
                        subtitle='details'
                        />


                    <View style={styles.container}>
                        {this.state.mainView}
                    </View>

                </DrawerLayoutAndroid>

            </Provider>

        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 0,
        padding: 0,
    },
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
    toolbar: {
        backgroundColor: '#E9EAED',
        height: 56,
    },
});

export default Drawer  