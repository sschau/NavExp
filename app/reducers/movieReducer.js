import { RECEIVE_MOVIE, REQUEST_MOVIE } from '../constants/ActionTypes'


const INITIALMOVIE_STATE = {
  isFetching : false,
  didInvalidate: false,
  movies: [],

}

function movieReducer(state = INITIALMOVIE_STATE, action) {
  switch (action.type) {

    case REQUEST_MOVIE:      
      return Object.assign({}, state, {
          isFetching : true,
          didInvalidate: false,
          movies: []
        } )

    case RECEIVE_MOVIE:      
      return Object.assign({}, state, { 
          isFetching : false,
          didInvalidate : false,          
          movies : action.movies,
          lastUpdated: action.receivedAt
        } )

    default:
      return state

  }
}

export default movieReducer