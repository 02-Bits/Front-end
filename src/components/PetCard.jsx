// src/components/PetCard.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const PetCard = ({ image, tipo, servico, horario }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>Mascote:</Text>
        <Text style={styles.value}>{tipo}</Text>

        <Text style={styles.label}>Serviço:</Text>
        <Text style={styles.value}>{servico}</Text>

        <Text style={styles.label}>Horário:</Text>
        <Text style={styles.value}>{horario}</Text>
      </View>
      <Text style={styles.arrow}>{'>'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  label: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 24,
    color: '#5B51EF',
    paddingHorizontal: 8,
  },
});