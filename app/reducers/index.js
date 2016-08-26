import { combineReducers } from 'redux'
import navReducer from './navReducer'
import tabReducer from './tabReducer'
import movieReducer from './movieReducer'

const rootReducer = combineReducers({
    tabReducer,
    movieReducer,
    navReducer
})

export default rootReducer