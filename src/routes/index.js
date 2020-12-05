import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ContactsView from '../views/contactsView'
import AddContactView from '../views/Add_view'

const StackNavigator = createStackNavigator(
  {
    Contacts: ContactsView,
    AddContact: AddContactView
  }
)

export default createAppContainer(StackNavigator)
