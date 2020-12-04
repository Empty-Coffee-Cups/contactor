import * as FileSystem from 'expo-file-system'

const contactsDirectory = FileSystem.documentDirectory + 'resources/contacts'

const setupContactDirectory = async () => {
  const dir = await FileSystem.getInfoAsync(contactsDirectory)
  if (!dir.exists) await FileSystem.makeDirectoryAsync(contactsDirectory)
}

export const loadContact = async (id) => {
  const fileName = `${contactsDirectory}/${id}.json`
  const str = await FileSystem.readAsStringAsync(fileName)
  return JSON.parse(str)
}

export const saveContact = async (contact) => {
  await setupContactDirectory()
  const contactString = JSON.stringify(contact)
  const fileName = `${contactsDirectory}/${contact.id}.json`
  await FileSystem.writeAsStringAsync(fileName, contactString)
}

export const deleteContact = async (id) => {
  const fileName = `${contactsDirectory}/${id}.json`
  await FileSystem.deleteAsync(fileName)
}

export const getAllContacts = async () => {
  const contactFileNames = await FileSystem.readDirectoryAsync(contactsDirectory)

  const contacts = contactFileNames.map(async (fileName) => {
    const str = await FileSystem.readAsStringAsync(fileName)
    return JSON.parse(str)
  })

  return contacts
}
