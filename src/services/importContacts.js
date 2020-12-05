import * as Contacts from 'expo-contacts'
import * as Permissions from 'expo-permissions'

async function _permission() {
  const status = await Permissions.askAsync(Permissions.CONTACTS)
  if (status.status != 'granted') {
    console.log("Error..", status)
    return false
  }
  return true
}

async function _import() {
  if (await _permission()) {
    const contacts = await Contacts.getContactsAsync()
    console.log(contacts)
  }
}
