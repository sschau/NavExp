import { connect } from 'react-redux'
import TabsRoot from '../components/TabsRoot'
//import DrawerRoot from '../components/DrawerRoot'
import { changeTab } from '../actions/navActions'

function mapStateToProps (state) {
  return {
    tabs: state.tabReducer
  }
}

export default connect(
  mapStateToProps,
  {
    changeTab: (route) => changeTab(route)
  }
)(TabsRoot)