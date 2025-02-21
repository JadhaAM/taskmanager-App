
import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function FAB() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.fab}
      onPress={() => router.push('/task/new')}
      activeOpacity={0.8}
    >
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#2196F3',
    borderRadius: 28,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});