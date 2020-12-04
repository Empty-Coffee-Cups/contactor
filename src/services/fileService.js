import * as FileSystem from 'expo-file-system'

const contactsDirectory = FileSystem.documentDirectory + '/contacts'

const onException = (cb, errorHandler) => {
  try {
    return cb()
  } catch (err) {
    /* eslint-disable */
    console.error(err);
    /* eslint-enable */
    return errorHandler(err)
  }
}

const setupContactDirectory = async () => {
  const dir = await onException(() => FileSystem.getInfoAsync(contactsDirectory))
  if (!dir.exists) await onException(() => FileSystem.makeDirectoryAsync(contactsDirectory))
}

export const loadContact = async (id) => {
  const fileName = `${contactsDirectory}/${id}.json`
  const str = await onException(() => FileSystem.readAsStringAsync(fileName))
  return JSON.parse(str)
}

export const saveContact = async (contact) => {
  await setupContactDirectory()
  const contactString = JSON.stringify(contact)
  const fileName = `${contactsDirectory}/${contact.id}.json`
  await onException(() => FileSystem.writeAsStringAsync(fileName, contactString))
}

export const deleteContact = async (id) => {
  const fileName = `${contactsDirectory}/${id}.json`
  await onException(() => FileSystem.deleteAsync(fileName))
}

export const getAllContacts = async () => {
  await setupContactDirectory()

  console.log('setup done')

  const contactFileNames = await onException(() => FileSystem.readDirectoryAsync(contactsDirectory))

  console.log('contactFileNames', contactFileNames)

  const contacts = contactFileNames.map(async (fileName) => {
    const str = await onException(() => FileSystem.readAsStringAsync(fileName))
    return JSON.parse(str)
  })

  console.log('contacts', contacts)
  return contacts
}
