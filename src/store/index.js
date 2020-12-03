import { createStore, combineReducers } from 'redux'

import contactReducer from './reducers/contactReducer'

const rootReducer = combineReducers({
  contactReducer: contactReducer
})

const configureStore = () => createStore(rootReducer)

export default configureStore
