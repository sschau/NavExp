import { POP_ROUTE, PUSH_ROUTE, CHANGE_TAB, REQUEST_MOVIE, RECEIVE_MOVIE  } from '../constants/ActionTypes'

export function push (route) {
  return {
    type: PUSH_ROUTE,
    route : route
  }
}

export function pop () {
  return {
    type: POP_ROUTE
  }
}

export function changeTab (index) {
  //console.log('in navAction change tab, set type to Change_Tab and index ' + index);
  return {
    type: CHANGE_TAB,
    index : index
  }
}

export function request_movie() { 
  return {
    type : REQUEST_MOVIE,
    movies: []    
  }

}

export function receive_movie(movies) {
  return {
    type : RECEIVE_MOVIE,
    movies,
    receivedAt: Date.now()
  }
}

// use trunk
export function fetch_movie() {
  return function (dispatch) {
    // First dispatch the request action
    dispatch(request_movie())

    return fetch('http://facebook.github.io/react-native/movies.json')
      .then (response => response.json())
      .then (json => 
        // dispatch the receive action
        dispatch(receive_movie(json.movies))
      )
      // handle error

  }
}