import React, { PropTypes, Component } from 'react'


// import all components in this card stack
import Home from './Home'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import About from './About'

import {
  BackAndroid,
  NavigationExperimental
} from 'react-native'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental

class NavRoot extends Component {
  constructor (props) {
    super(props)
    this._renderScene = this._renderScene.bind(this)
    this._handleBackAction = this._handleBackAction.bind(this)
  }

    
  componentDidMount () {
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackAction)
  }
  componentWillUnmount () {
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackAction)
  }

  // based on the route.key, return/load the corresponding components
  // also pass the actual navigation funtions to the components.

  // this define all scenes how it should be called under this navigation card stack
  _renderScene (props) {
    const { route } = props.scene
    if (route.key === 'home') {
     return <Home
              _handleNavigate={this._handleNavigate.bind(this)} />
    }
    if (route.key === 'page1')    {
      return <Page1
              _goBack={this._handleBackAction.bind(this)} 
              _navTo={this._handleNavigate.bind(this)}/>
    }
    if (route.key === 'page2')    {
      return <Page2
              _goBack={this._handleBackAction.bind(this)} 
              _navTo={this._handleNavigate.bind(this)}/>
    }
    // use single handle function.
    if (route.key === 'page3')    {
      return <Page3               
              _navHandle={this._handleNavigate.bind(this)}/>
    }
    
    if (route.key === 'about') {
     return <About _goBack={this._handleBackAction.bind(this)} />
    }
  }





  _handleBackAction () {
    if (this.props.navigation.index === 0) {
      return false
    }
    this.props.popRoute()
    return true
  }

// this action is actually the route object which defined the flow
  _handleNavigate (action) {
    switch (action && action.type) {
      case 'push':
        this.props.pushRoute(action.route)
        return true
      case 'back':
      case 'pop':
        return this._handleBackAction()
      default:
        return false
    }
  }





  render () {
    return (
      <NavigationCardStack
        direction='vertical'
        navigationState={this.props.navigation}
        onNavigate={this._handleNavigate.bind(this)}
        renderScene={this._renderScene} />
      )
   }
}

NavRoot.propTypes = {
  navigation : PropTypes.object.isRequired,
  pushRoute : PropTypes.func.isRequired,
  popRoute : PropTypes.func.isRequired  
}

export default NavRoot