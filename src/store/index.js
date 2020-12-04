import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import contactReducer from './reducers/contactReducer'

const rootReducer = combineReducers({
  contactReducer: contactReducer
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk))

export default configureStore
