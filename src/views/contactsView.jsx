import React, { Component } from 'react'
import { Text, FlatList, ActivityIndicator } from 'react-native'
import { View, Right, Body, List, ListItem, Left, Thumbnail, Icon, Separator, Input } from 'native-base'
import { connect } from 'react-redux'

class ContactsView extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: false,
      contactsDisplayed: [],
      contacts: []
    }
  }

  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#845cc3'
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    this.loadContacts()
  }

  loadContacts = async () => {
    const { contacts } = this.props
    this.setState({ contacts: contacts, contactsDisplayed: contacts, isLoading: false })
  }

  searchContacts = filter => {
    const filteredContacts = this.state.contacts.filter(
      contact => (contact.name.toLowerCase()).indexOf(filter.toLowerCase()) > -1)
    this.setState({ contactsDisplayed: filteredContacts })
  }

  renderItem = ({ item }) => {
    const { id, name, photo } = item
    const { navigation: { navigate } } = this.props

    return (
      <ListItem thumbnail onPress={() => navigate('ContactDetails', { item })}>
        <Left>
          <Thumbnail source={{ uri: photo }} />
        </Left>
        <Body>
          <Text>{id} {name}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    )
  }

  listEmptyComponent = () => (
    <ListItem>
      <Body>
        <Text>No contacts found</Text>
      </Body>
    </ListItem>
  )

  render () {
    console.log(this.state)
    console.log(this.props)
    const { navigation: { navigate } } = this.props
    const { contactsDisplayed } = this.state

    return (
      <List>
        <ListItem icon>
          <Left>
            <Icon name="search" />
          </Left>
          <Body>
            <Input
              placeholder="Search"
              onChangeText={value => this.searchContacts(value)}
            />
          </Body>
        </ListItem>
        <ListItem icon onPress={() => navigate('AddContact')}>
          <Left>
            <Icon name="person-add" />
          </Left>
          <Body>
            <Text>Add contact</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <Separator bordered />
        {
          this.state.isLoading
            ? (
                <View>
                  <ActivityIndicator size="large" color="#bad555" />
                </View>
              )
            : (
                <FlatList
                  data={contactsDisplayed}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  ListEmptyComponent={this.listEmptyComponent}
                />
              )
        }
      </List>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactReducer.contactList
  }
}

export default connect(mapStateToProps)(ContactsView)
