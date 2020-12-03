
export const ADD_CONTACT = 'ADD_CONTACT'
export const DELETE_CONTACT = 'DELETE_CONTACT'

export const addContact = (contact) => (
  {
    type: ADD_CONTACT,
    contact: contact
  }
)

export const deleteContact = (key) => (
  {
    type: DELETE_CONTACT,
    key: key
  }
)
