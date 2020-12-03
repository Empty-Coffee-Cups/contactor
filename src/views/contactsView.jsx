import React from 'react'
import { View, Linking, ScrollView, Platform } from 'react-native'
import { Container, Icon, Fab, List } from 'native-base'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector, useDispatch } from 'react-redux'
import { ListItem } from 'react-native-elements'

// Actions
import { disableLoadingScreenAction } from '../../actions/loadingScreenAction'

// Service
import * as service from '../../service'
// Components
import Search from '../../components/Search'
import Upsert from '../../components/Upsert'
import SettingsMenu from '../../components/SettingsMenu'

const Contacts = () => {
  const { navigate } = useNavigation()
  const dispatch = useDispatch()

  const contacts = useSelector((state) => state.contacts)
  const searchPara = useSelector((state) => state.searchPara)
  const contactListisEmpty = useSelector((state) => state.contactListEmpty)
  const loadingScreen = useSelector((state) => state.loadingScreen)

  // If our contact list is empty and our list is empty
  if (contactListisEmpty && loadingScreen) {
    dispatch(disableLoadingScreenAction())
  }

  const callHandler = (phoneNumber) => {
    // If not android we use telepromt else tel for every other phone
    if (Platform.OS !== 'android') {
      Linking.openURL(`telprompt:${phoneNumber}`)
    } else {
      Linking.openURL(`tel:${phoneNumber}`)
    }
  }

  return (
    <Container>
      {/*
      <View style={styles.searchAndSettings}>
        <Search />
        <SettingsMenu />
      </View>
      */}
      <ScrollView style={styles.container}>
        {
          contacts.filter((x) => x.name.toLowerCase().includes(
            searchPara.toLowerCase()
          )).map((item) => (
            <ListItem
              containerStyle={styles.contentContainer}
              titleStyle={styles.title}
              key={item.id}
              title={item.name}
              leftAvatar={!service.isEmpty(item.image)
                ? ({ source: { uri: `data:image/jpeg;base64,${item.image}` } })
                : ({ source: { uri: 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg' } }
                  )}
              onPress={() => navigate('ContactsDetailed', { id: item.id })}
              bottomDivider
              chevron={styles.title}
              rightIcon={{
                reverse: true, name: 'phone', type: 'antdesign', color: 'green', onPress: () => callHandler(item.phoneNumber),
              }}
            />
          ))
        }
      </ScrollView>
      <Upsert user={{}} title="Create a contact" buttonName="Add Contact" />
    </Container>
  )
}

export default Contacts
