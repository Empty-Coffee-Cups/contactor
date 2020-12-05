import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Input, Container, Header, Content, Thumbnail, Button, Text, View, Icon } from 'native-base'
import { connect } from 'react-redux'
import { selectFromCameraRoll, takePhoto } from '../services/imagePickerService'
import {removeContact, createContact} from '../store/actions/contactActions'

class ContactDetails extends Component {
  constructor () {
    super()
    this.state = {
      isLoading: false,
      contact: []
    }
  }

  static navigationOptions = {
    title: 'Contact',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#845cc3'
    }
  }

  componentDidMount () {
    this.setState({ isLoading: true })
    const { navigation: { getParam } } = this.props
    const { id, name, photo, phoneNumber } = getParam('contact')
    this.setState({id, name, photo, phoneNumber})
  }

  async gallery () {
    const photo = await selectFromCameraRoll()
    this.setState({ image:photo })
  }

  async takePhoto () {
    const photo = await takePhoto()
    this.setState({ image:photo })
  }

  async update () {
        const { id, name, phoneNumber, photo } = this.state;
        const { dispatch } = this.params
        await dispatch(removeContact(id))
        await dispatch(createContact({name,phoneNumber, photo }))
  }

  render () {
    const { navigation: { getParam } } = this.props
    const { id, name, photo, phoneNumber } = getParam('contact')

    return (
      <Container>

        <Content>
          <View style={styles.container}>
            <View style={styles.item}>
              <Thumbnail square source={{ uri: photo }} style={styles.thumbnail} />
              <Button small onPress={() => this.takePhoto()}>
                <Text>
                  Take photo
                </Text>
              </Button>
              <Button small onPress={() => this.gallery()}>
                <Text>
                  Get picture from gallery
                </Text>
              </Button>
            </View>
            <View style={styles.item}>
              <Input regular value={this.state.name} style={styles.input} onChangeText={text => this.setState('name',text)} />
            </View>
            <View style={styles.item}>
                <Input value={this.state.phoneNumber} style={styles.input} onChangeText={text => this.setState('phoneNumber',text)}/>
            </View>
            <View style={styles.item}>
              <Button success large onPress={()=> Linking.openURL(`tel:${phoneNumber}`) } >
                <Text>
                  Call
                </Text>
              </Button>
            </View>
            <View style={styles.item}>
              <Button success large onPress={() => this.update()}>
                <Text>
                  Save
                </Text>
              </Button>
            </View>
           </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'ghostwhite',
    borderColor: 'gainsboro',
    borderWidth: 1
  },
  thumbnail: {
    width: 250,
    height: 250,
    borderRadius: 30,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  item: {
    margin: 15
  }
})

const mapStateToProps = (state) => {
  return {
    contact: state.contactReducer.contact
  }
}

export default connect(mapStateToProps)(ContactDetails)
