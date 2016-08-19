import { connect } from 'react-redux'
import NavRoot from '../components/NavRoot'
import { push, pop } from '../actions/navActions'

function mapStateToProps (state) {
  return {
    navigation: state.navReducer
   }
}

export default connect(
  mapStateToProps,

   {
     pushRoute: (route) => push(route),
     popRoute: () => pop()
   }
)(NavRoot)