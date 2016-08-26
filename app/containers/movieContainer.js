import { connect } from 'react-redux'
import MovieRoot from '../components/MovieRoot'
import { fetch_movie } from '../actions/navActions'

// Provider take store, store have 2 reducer.  
// state... where is it come from.  navigation is define as propties of NavRoot, which allow
// NavRoot have access to the reducer which use to keep track of the navigation.

// navReducer.navigationState take the current state and action, then return what is the next state to render.
function mapStateToProps (state) {
  return {
    movieR: state.movieReducer
   }
}

// This is more for connecting the reducer and custom functions to the NavRoot. Not much "container" work

// Translate the state from reducer to a prop to pass to component to use
export default connect(
  mapStateToProps,
   {
     // eq to mapDispatchToProps
     fetchMovie: () => fetch_movie()     
   }
)(MovieRoot)