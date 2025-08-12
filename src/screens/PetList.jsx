// src/screens/PetList.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PetList() {
  const navigation = useNavigation();

  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  const handlePetPress = (petData) => {
    navigation.navigate('PetDetails', { petData });
  };

  const pets = [
    { id: 1, nome: 'Cachorro', servico: 'Consulta urgente', horario: 'O mais antes possível', image: require('../assets/dog1.png'), porte: 'Médio', raca: 'Vira-lata', detalhes: 'Um cachorro muito animado.' },
    { id: 2, nome: 'Cachorro', servico: 'Vacinação', horario: 'Manhã', image: require('../assets/dog2.png'), porte: 'Pequeno', raca: 'Poodle', detalhes: 'Um poodle dócil e tranquilo.' },
    { id: 3, nome: 'Gato', servico: 'Consulta urgente', horario: 'Tarde', image: require('../assets/cat1.png'), porte: 'Pequeno', raca: 'Siamese', detalhes: 'Um gato curioso e brincalhão.' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pets</Text>
      {pets.map((pet) => (
        <TouchableOpacity key={pet.id} style={styles.petCard} onPress={() => handlePetPress(pet)}>
          <Image source={pet.image} style={styles.petImage} />
          <View style={styles.petInfo}>
            <View style={styles.petInfoRow}>
              <Text style={styles.petInfoLabel}>Mascote:</Text>
              <Text style={styles.petInfoValue}>{pet.nome}</Text>
            </View>
            <View style={styles.petInfoRow}>
              <Text style={styles.petInfoLabel}>Serviço:</Text>
              <Text style={styles.petInfoValue}>{pet.servico}</Text>
            </View>
            <View style={styles.petInfoRow}>
              <Text style={styles.petInfoLabel}>Horário:</Text>
              <Text style={styles.petInfoValue}>{pet.horario}</Text>
            </View>
          </View>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>❯</Text>
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
        <Text style={styles.addButtonText}>Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  petCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, padding: 15, marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3.84, elevation: 5 },
  petImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  petInfo: { flex: 1 },
  petInfoRow: { flexDirection: 'row', marginBottom: 2 },
  petInfoLabel: { fontWeight: 'bold', marginRight: 5, color: '#555' },
  petInfoValue: { color: '#333' },
  arrowContainer: { backgroundColor: '#8B5CF6', width: 30, height: '100%', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 15, borderBottomRightRadius: 15, position: 'absolute', right: 0 },
  arrow: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  addButton: { backgroundColor: '#8B5CF6', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});