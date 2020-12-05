import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ContactsView from '../views/contactsView'
import ContactDetailsView from '../views/ContactDetails'

const StackNavigator = createStackNavigator(
  {
    Contacts: ContactsView,
    ContactDetails: ContactDetailsView
  }
)

export default createAppContainer(StackNavigator)
