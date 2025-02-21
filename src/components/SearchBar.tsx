import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/taskSlice';
import { RootState } from '../store';

export default function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.tasks.searchQuery);

  return (
    <TextInput
      style={styles.input}
      placeholder="Search tasks..."
      value={searchQuery}
      onChangeText={(text) => dispatch(setSearchQuery(text))}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
  },
});