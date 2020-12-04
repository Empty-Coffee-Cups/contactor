import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import ContactsView from '../views/contactsView'

const StackNavigator = createStackNavigator(
  {
    Contacts: ContactsView
  }
)

export default createAppContainer(StackNavigator)
