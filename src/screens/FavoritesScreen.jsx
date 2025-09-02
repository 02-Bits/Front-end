// src/screens/FavoritesScreen.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Você ainda não tem favoritos.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBE4F4',
  },
  text: {
    fontSize: 18,
    color: '#8D7EFB',
  },
});