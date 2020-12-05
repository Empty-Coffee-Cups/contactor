import React from 'react'
import {
  Veiw, TextInput, Button, Text, TouchableHighlight,
  withNavigation, NavigationActions
} from 'react-native'
import { Icon } from 'react-native-elements'
import { View } from 'native-base'

import Styles from './style'

const _state = {
  name: '',
  number: '',
  image: ''
}

class Addcontact extends React.Component {
  constructor (props) {
    super()
    this.state = _state
  }

  async componentWillMount () {
    this.setState(_state)
    if (!(this.props.contact_name === undefined)) {
      const obj = await get_contact(this.props.contact_name + '.json')

      if (obj.imageAvalible) {
        this.setState({ name: obj.name, number: obj.phoneNumbers[0].number, image: obj.image.uri })
      } else {
        this.setState({ name: obj.name, number: obj.phoneNumbers[0].number, image: '' })
      }
    }
  }

  async _pressed_submit () {
    if (this.props.contact_name === undefined) {
      const obj = {}
      obj.name = this.state.name
      obj.imageAvalible = false
      obj.phoneNumbers = [{}]
      if (this.state.image.length > 0) {
        if (!obj.imageAvalible) { obj.imageAvalible = true }
        obj.image = {}
        obj.image.uri = this.state.image
      }
      this.props._function_submit(obj)
    }
  }

  async image_set (select) {
    let uri = ''
    if (select) {
      uri = await select_pic_from_phone()
    } else {
      uri = await take_photo()
    }
    if (uri.length > 0) {
      this.setState({ image: uri })
    }
  }

  render () {
    const { name, number, image } = this.state
    const { navigate } = this.props.navigation
    return (
      <View style={Styles.container}>

        <View style={Styles.contact_list_header}>
          <Text style={{ fiontSize: 30, fontWeight: 'bold'}}>CREATE CONTACT</Text>
        </View>

        <View style={Styles.add_contact_form}>
          <Text>Name:</Text>
          <View style={Styles.search}>
            <TextInput
            onChangeText={text => this.setState({ number: text })}
            value={number}
            />
          </View>

          <Text>Phone Number:</Text>
          <Veiw style={Styles.search}>
            <TextInput
            onChangeText={text => this.setState({ number: text })}
            value={number}
            />
          </Veiw>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableHighlight>
              <Icon raised name='md-image' type='ionicon' onPress={() => this.image_set(true)} />
            </TouchableHighlight>
            <TouchableHighlight>
              <Icon raised name='md-camera' type='ionicon' onPress={() => this.image_set(false)} />
            </TouchableHighlight>
          </View>
        </View>

        <View style={Styles.contact_byttons}>
          <Button
            title={'Submit'}
            onPress={() => {
              this._pressed_submit()
              navigate('Contact_detail', { name: this.state.name })
            }}
          />
        </View>

      </View>
    )
  }
}

export default withNavigation(Addcontact)
