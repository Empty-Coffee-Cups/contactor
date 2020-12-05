import { v4 as uuidv4 } from 'uuid'

import { getAllContacts, saveContact, deleteContact } from '../../services/fileService'

export const loadContacts = () => {
  return dispatch => {
    dispatch(loadStart())
    return getAllContacts().then((contacts) => {
      console.log('loadContacts', contacts)
      dispatch(loadContactsDone(contacts))
    })
  }
}

export const createContact = (contact) => {
  return dispatch => {
    dispatch(loadStart())
    const id = `${contact.name.toLowerCase()}-${uuidv4()}`
    contact = { ...contact, id: id }
    return saveContact(contact).then(() => {
      dispatch(addContact(contact))
      dispatch(loadDone())
    })
  }
}

export const removeContact = (id) => {
  return dispatch => {
    dispatch(loadStart())
    return deleteContact(id).then(() => {
      dispatch(loadContacts())
    })
  }
}

export const ADD_CONTACT = 'ADD_CONTACT'
export const LOAD_START = 'LOAD_CONTACTS_START'
export const LOAD_CONTACTS_DONE = 'LOAD_CONTACTS_DONE'
export const LOAD_DONE = 'LOAD_CONTACTS_DONE'
export const UPDATE_FILTER = 'UPDATE_FILTER'

export const addContact = (contact) => (
  {
    type: ADD_CONTACT,
    payload: { contact }
  }
)

export const loadStart = () => (
  {
    type: LOAD_START
  }
)

export const loadContactsDone = (contacts) => (
  {
    type: LOAD_CONTACTS_DONE,
    payload: { contacts }
  }
)

export const loadDone = () => (
  {
    type: LOAD_DONE
  }
)

export const updateFilter = (filter) => (
  {
    type: UPDATE_FILTER,
    payload: filter
  }
)
