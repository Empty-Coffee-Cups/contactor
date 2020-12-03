import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { SearchBar } from 'react-native-elements';

// StyleSheet
import styles from './style';

// Actions
import { searchContactsAction } from '../../actions/searchActions';

const Search = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');

  // On search changed
  useEffect(() => {
    dispatch(searchContactsAction(search));
  }, [search]);

  return (
    <SearchBar
      containerStyle={styles.container}
      inputContainerStyle={styles.inputBox}
      placeholder="Type Here..."
      onChangeText={(value) => setSearch(value)}
      value={search}
      round
    />
  );
};

export default Search;
