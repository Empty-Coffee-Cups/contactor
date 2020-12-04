import React from 'react'
import { View } from 'react-native'
import Addcontact from '../components/Add_contact'
import * as importContacts from '../../services/importContacts'


class AddContact extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      action_type: '',
      contact_obj: {}
    }
  }


  async componentWillMount() {
  const _action_type = this.props.navigation.state.params.action_type
  const _ContactName = this.props.navigation.state.params.name
  let _contact_object = {};
  if (_ContactName != undefined){
    _contact_object = await sorceservicesfilename.get_contact(_ContactName + '.json');
  }
  this.setState({ action_type: _action_type, contact_obj: _contact_object})

  }

  submit_function = (object) => {
  const { action_type, contact_obj } = this.state
  if (action_type === 'Addcontact') {
    srcservicesfilename.editContact(contact_obj, object)
  }
  else {
    srcservicesfilename.save_contact(object)
  }

  }
  render() {
  const { name } = this.props.navigation.state.params
    return (
      <view>
        <AddContact _submit_function={this.submit_function} _ContactName={name} action_type={this.state.action_type} />
      </view>
    )
  }
}

export default AddContact;
