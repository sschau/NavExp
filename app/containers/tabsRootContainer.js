import { connect } from 'react-redux'
import TabsRoot from '../components/TabsRoot'

// get the changeTab nav action fuction.
import { changeTab } from '../actions/navActions'

// rootReducer have 2 reducer. 1 tabReduver, 1 navReducer.  We use tab here.
// state.tabReducer have {index :, tabs :, }

function mapStateToProps (state) {
  return {
    tabs: state.tabReducer
  }
}


// both tabs and changeTab become properties of TabsRoot
// mapStateToProps = {tabs : <state>.tabReducer} = {tabs : }
// set changeTab nav action function as a properties of TabsRoot
// connecting the state, and the changeTab function to tabsRoot
export default connect(
  mapStateToProps,   
  {  changeTab: (route) => changeTab(route)  }
)(TabsRoot)