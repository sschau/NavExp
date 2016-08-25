import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore() {
  const logger = createLogger();
  const store = createStore(
    rootReducer, 
    applyMiddleware(
      thunk, 
      logger  // must be the last one
      )
    )

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('../reducers/index').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}