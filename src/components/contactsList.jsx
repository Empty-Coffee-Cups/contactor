import React, { Component } from 'react'
import { List, ListItem, Left, Thumbnail, Body } from 'native-base'
import { Text, FlatList } from 'react-native'
import { connect } from 'react-redux'

class ContactsList extends Component {
  renderItem ({ item }) {
    const { id, name, thumbnailPhoto } = item
    const { navigation: { navigate } } = this.props

    return (
      <ListItem thumbnail onPress={onPress}>
        <Left>
          <Thumbnail square source={{ uri: thumbnailPhoto }} />
        </Left>
        <Body>
          <Text>{name}</Text>
        </Body>
      </ListItem>
    )
  }

  render () {
    return (
      <List>
          <FlatList
            data={boards}
            renderItem={this.renderItem}
          />
      </List>
    )
  }
}

function mapStateToProps (state) {
  return {
    contacts: state.contactReducer.contactList
  }
}

/*function mapDispatchToProps (dispatch) {
  return {
    increaseCounter: () => dispatch({ type: 'INCREASE_COUNTER' }),
    decreaseCounter: () => dispatch({ type: 'DECREASE_COUNTER' })
  }
}*/

export default connect(mapStateToProps)(ContactsList)
