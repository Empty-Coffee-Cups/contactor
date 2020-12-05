import React, { Component } from 'react'
import { StyleSheet, Linking } from 'react-native'
import { Input, Container, Header, Content, Thumbnail, Button, Text, View, Icon } from 'native-base'
import { connect } from 'react-redux'
import { selectFromCameraRoll, takePhoto } from '../services/ImagePickerService'
import * as FileServices from '../services/fileService'

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
  }

  async gallery () {
    const photo = await selectFromCameraRoll()
    this.setState({ image:photo })
  }

  async takePhoto () {
    const photo = await takePhoto()
    this.setState({ image:photo })
  }

  render () {
    const { navigation: { getParam } } = this.props
    const { id, name, photo, phoneNumber } = getParam('contact')

    return (
      <Container>
        <Header/>
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
              <Input regular placeholder={getParam('name')} style={styles.input} onChangeText={text => this.changeValue('name',text)} />
            </View>
            <View style={styles.item}>
                <Input placeholder={getParam('telephone')} style={styles.input} onChangeText={text => this.changeValue('phoneNumber',text)}/>
            </View>
            <View style={styles.item}>
              <Button success large onPress={() => Linking.openURL(`tel:${getParam('phoneNumber')}`)} >
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
              <Button large block onPress={() => this.gallery()}>
                <Text>
                    Grab image
                </Text>
              </Button>
              <Button large block success onPress={() => this.takePhoto()}>
                <Text>
                  Take photo
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
