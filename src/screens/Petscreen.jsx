import React from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function PetsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets</Text>

      <Image source={require('../assets/cat1.png')} style={styles.avatar} />

      <View style={styles.infoRow}>
        <Text style={styles.label}>Nome</Text>
        <Text style={styles.value}>Flinter</Text>
        <Text style={styles.label}>Idade</Text>
        <Text style={styles.value}>6</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Porte</Text>
        <Text style={styles.value}>Pequeno</Text>
        <Text style={styles.label}>Raça</Text>
        <Text style={styles.value}>464646</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.label}>Detalhes</Text>
        <TextInput placeholder="..." style={styles.detailsInput} multiline />
      </View>

      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFDF5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    width: '25%',
  },
  value: {
    width: '25%',
  },
  detailBox: {
    marginVertical: 12,
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    height: 60,
    padding: 8,
    marginTop: 4,
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  cancelText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});