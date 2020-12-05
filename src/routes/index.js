import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ContactsView from '../views/contactsView'
import ContactDetailsView from '../views/contactDetails'
import AddContactView from '../views/addContactView'

const StackNavigator = createStackNavigator(
  {
    Contacts: ContactsView,
    ContactDetails: ContactDetailsView,
    AddContact: AddContactView
  }
)

export default createAppContainer(StackNavigator)
