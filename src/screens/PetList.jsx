// src/screens/PetList.jsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PetList() {
  const navigation = useNavigation();

  const handleAddPet = () => {
    navigation.navigate('AddPet');
  };

  const handlePetPress = (pet) => {
    const petData = {
      name: pet.nome,
      age: pet.idade || 'Não informado',
      size: pet.porte,
      breed: pet.raca,
      details: pet.detalhes,
      image: pet.image,
    };
    navigation.navigate('PetDetails', { petData });
  };

  const pets = [
    { id: 1, nome: 'Cachorro', idade: '2 anos', servico: 'Consulta urgente', horario: 'O mais antes possível', image: require('../assets/dog1.png'), porte: 'Médio', raca: 'Vira-lata', detalhes: 'Um cachorro muito animado.' },
    { id: 2, nome: 'Cachorro', idade: '3 anos', servico: 'Vacinação', horario: 'Manhã', image: require('../assets/dog2.png'), porte: 'Pequeno', raca: 'Poodle', detalhes: 'Um poodle dócil e tranquilo.' },
    { id: 3, nome: 'Gato', idade: '1 ano', servico: 'Consulta urgente', horario: 'Tarde', image: require('../assets/cat1.png'), porte: 'Pequeno', raca: 'Siamese', detalhes: 'Um gato curioso e brincalhão.' },
  ];

  return (
    <View style={styles.container}>

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
              <Text style={styles.petInfoValueSecondary}>{pet.servico}</Text>
            </View>
            <View style={styles.petInfoRow}>
              <Text style={styles.petInfoLabel}>Horário:</Text>
              <Text style={styles.petInfoValueSecondary}>{pet.horario}</Text>
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
  container: { flex: 1, padding: 20, backgroundColor: '#EBE4F4' },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A367F0',
  },
  petCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBE4F4',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderColor: '#C79DFD',
    borderWidth: 1,
    shadowColor: 'rgba(199, 157, 253, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  petImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  petInfo: { flex: 1 },
  petInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EBE4F4',
  },
  petInfoLabel: { fontWeight: 'bold', marginRight: 5, color: '#A367F0' },
  petInfoValue: { color: '#A367F0' },
  petInfoValueSecondary: { color: 'rgba(141, 126, 251, 0.8)' },
  arrowContainer: {
    width: 30,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    right: 0,
  },
  arrow: { color: '#C49DF6', fontSize: 20, fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#A367F0', // Para gradiente, uma biblioteca como react-native-linear-gradient seria necessária
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
});