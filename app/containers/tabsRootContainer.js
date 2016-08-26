import { connect } from 'react-redux'
import TabsRoot from '../components/TabsRoot'

// get the changeTab nav action fuction.
import { changeTab } from '../actions/navActions'

// rootReducer have 2 reducer. 1 tabReduver, 1 navReducer.  We use tab here.
// state.tabReducer have {index :, tabs :, }


const tabs = [
  { key: 'ios-paper', title: 'Main' },
  { key: 'md-card', title: 'Recipes' },
  { key: 'md-car', title: 'Samples' },
  { key: 'md-cloud-upload', title: 'Main' },
  { key: 'md-camera', title: 'Main' },
  { key: 'md-code-working', title: 'Main' },
  { key: 'md-globe', title: 'Main' },
  { key: 'md-clipboard', title: 'Main' },
{ key: 'md-contact', title: 'Main' },
{ key: 'md-wifi', title: 'Main' },  
]

function mapStateToProps (state) {
  return {
    tabR: state.tabReducer,
    tabs      // take this out from reducer

  }
}


// both tabs and changeTab become properties of TabsRoot
// mapStateToProps = {tabs : <state>.tabReducer} = {tabs : }
// set changeTab nav action function as a properties of TabsRoot
// connecting the state, and the changeTab function to tabsRoot

// Connect is to connect the components to the store, passing propertes and and dispatch function when action happne to components
export default connect(
  mapStateToProps,   
  {  changeTab: (route) => changeTab(route)  }
)(TabsRoot)