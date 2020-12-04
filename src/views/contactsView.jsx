import React, { Component } from 'react'
import { Text, FlatList, ActivityIndicator } from 'react-native'
import { View, Right, Body, List, ListItem, Left, Thumbnail, Icon, Separator, Input } from 'native-base'
import { connect } from 'react-redux'

import { loadContacts } from "../store/actions/contactActions";

class ContactsView extends Component {
  static navigationOptions = {
    title: 'Home',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#845cc3'
    }
  }

  async componentDidMount () {
    const { dispatch } = this.props

    await dispatch(loadContacts())
  }

  searchContacts = filter => {
    const { dispatch } = this.props

    const filteredContacts = this.state.contacts.filter(
      contact => (contact.name.toLowerCase()).indexOf(filter.toLowerCase()) > -1)
    this.setState({ contactsDisplayed: filteredContacts })

    dispatch(filterList({ filter }))
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
          <Text>{name}</Text>
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
    const { navigation: { navigate }, filterdContacts } = this.props

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
        <ListItem icon onPress={() => null}>
          <Left>
            <Icon name="document" />
          </Left>
          <Body>
            <Text>Import contacts</Text>
          </Body>
          <Right>
            <Icon name="arrow-forward" />
          </Right>
        </ListItem>
        <Separator bordered />
        {
          this.props.isLoading
            ? (
                <View>
                  <ActivityIndicator size="large" color="#bad555" />
                </View>
              )
            : (
                <FlatList
                  data={filterdContacts}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => item.id}
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
    contacts: state.contactReducer.contactList,
    filterdContacts: state.contactReducer.contactListFiltered,
    isLoading: state.contactReducer.isLoading
  }
}

export default connect(mapStateToProps)(ContactsView)
