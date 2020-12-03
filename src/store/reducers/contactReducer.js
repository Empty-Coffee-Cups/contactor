import { v4 as uuidv4 } from 'uuid'

import { ADD_CONTACT, DELELTE_CONTACT } from '../actions/contactActions'

const initialState = {
  contactList: []
}

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contactList: state.contactList.concat({
          key: uuidv4(),
          name: action.contact.name,
          phoneNumber: action.contact.phoneNumber
        })
      }
    case DELELTE_CONTACT:
      return {
        ...state,
        contactList: state.contactList.filter((c) => c.key !== action.key)
      }
    default:
      return state
  }
}

export default contactReducer
