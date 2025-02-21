
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
interface TitleItemProps {
    title: string;
  }
export default function Header({ title }: TitleItemProps) {


  return (
    <View style={styles.headerContainer}>
            <Text style={styles.headerText}>{title}</Text>
          </View>
  );
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 16,
       
      },
      headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
      },
});