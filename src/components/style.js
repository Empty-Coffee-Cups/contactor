import { View, StyleSheet } from 'react-native';
//import { withOrientation } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },

  search: {
    margin: 10,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    paddingLeft: 10,
  },

  add_contact_form: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    margin: 10,
    padding: 10,
    height: 230
  },

  flat_list: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
