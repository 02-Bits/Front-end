import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const AdicionarPetScreen = ({ navigation }) => {
  const [petData, setPetData] = useState({
    name: '',
    age: '',
    species: '',
    size: '',
    breed: '',
    details: '',
    image: require('../assets/pet.png') // Imagem padrão
  });

  const handleInputChange = (field, value) => {
    setPetData(prevData => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleAddPet = () => {
    // Lógica para adicionar o pet aqui
    console.log('Pet adicionado:', petData);
    // Navegar de volta ou mostrar mensagem de sucesso
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="Nome do Pet"
            placeholderTextColor="#888"
            value={petData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.imageContainer}>
          <Image
            style={styles.petImage}
            source={petData.image}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Idade do Pet"
                placeholderTextColor="#888"
                value={petData.age}
                onChangeText={(text) => handleInputChange('age', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Espécie</Text>
              <TextInput
                style={styles.input}
                placeholder="Espécie do Pet"
                placeholderTextColor="#888"
                value={petData.species}
                onChangeText={(text) => handleInputChange('species', text)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Porte</Text>
              <TextInput
                style={styles.input}
                placeholder="Porte do Pet"
                placeholderTextColor="#888"
                value={petData.size}
                onChangeText={(text) => handleInputChange('size', text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raça</Text>
              <TextInput
                style={styles.input}
                placeholder="Raça do Pet"
                placeholderTextColor="#888"
                value={petData.breed}
                onChangeText={(text) => handleInputChange('breed', text)}
              />
            </View>
          </View>
          <View style={styles.fullWidthInputGroup}>
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
              style={[styles.input, styles.detailsInput]}
              placeholder="Detalhes do Pet"
              placeholderTextColor="#888"
              multiline
              value={petData.details}
              onChangeText={(text) => handleInputChange('details', text)}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.addButton]}
            onPress={handleAddPet}
          >
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#A367F0',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  nameInputContainer: {
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 20,
  },
  nameInput: {
      fontSize: 30,
       fontWeight: 'bold',
       color: '#333333',
      textAlign: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#F0F0F0',
      minWidth: 75,
       borderWidth: 0,
       underlineColorAndroid: 'transparent',
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputGroup: {
    width: '48%',
  },
  fullWidthInputGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333', // Alterado para uma cor escura para ser visível
  },
  input: {
    backgroundColor: '#F0F0F0', // Um cinza claro para o fundo do input
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0', // Lighter border for inputs
  },
  detailsInput: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    backgroundColor: '#A367F0', // Cor para o botão Adicionar (igual ao Salvar de PetScreen)
  },
  cancelButton: {
    backgroundColor: '#8D7EFB', // Cor para o botão Cancelar (igual ao Cancelar de PetScreen)
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdicionarPetScreen;