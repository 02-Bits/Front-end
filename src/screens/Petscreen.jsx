import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import TabBar from '../components/TabBar';
 

const PetScreen = ({ route }) => {
  const { petData } = route.params;

const PetScreen = ({ route, navigation }) => {
  const { petData, onGoBack } = route.params;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [size, setSize] = useState('');
  const [breed, setBreed] = useState('');
  const [species, setSpecies] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    if (petData) {
      console.log('petData.nome:', petData.nome);
      // Removemos a inicialização dos estados aqui para que os campos comecem vazios
      // e o placeholder exiba os dados do pet.
    }
  }, [petData]);

  const handleSave = () => {
    const updatedPet = {
      id: petData.id,
      nome: name || petData.nome,
      idade: age || petData.idade,
      especie: species || petData.especie,
      porte: size || petData.porte,
      raca: breed || petData.raca,
      detalhes: details || petData.detalhes,
      image: petData.image,
      servico: petData.servico,
      horario: petData.horario,
    };
    onGoBack(updatedPet);
    navigation.goBack();
  };

  const handleCancel = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.nameInputContainer}>
          <TextInput
            style={styles.nameInput}
            onChangeText={setName}
            value={name}
            placeholder={petData?.nome || 'Nome do Pet'}
            placeholderTextColor="#888"
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
                onChangeText={setAge}
                value={age}
                placeholder={petData?.idade || 'Idade do Pet'}
                placeholderTextColor="#888"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Espécie</Text>
              <TextInput
                style={styles.input}
                onChangeText={setSpecies}
                value={species}
                placeholder={petData?.especie || 'Espécie do Pet'}
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Porte</Text>
              <TextInput
                style={styles.input}
                onChangeText={setSize}
                value={size}
                placeholder={petData?.porte || 'Porte do Pet'}
                placeholderTextColor="#888"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raça</Text>
              <TextInput
                style={styles.input}
                onChangeText={setBreed}
                value={breed}
                placeholder={petData?.raca || 'Raça do Pet'}
                placeholderTextColor="#888"
              />
            </View>
          </View>
          <View style={styles.fullWidthInputGroup}>
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
              style={[styles.input, styles.detailsInput]}
              onChangeText={setDetails}
              value={details}
              placeholder={petData?.detalhes || 'Detalhes do Pet'}
              placeholderTextColor="#888"
              multiline
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.saveButton]}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]}>
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
    backgroundColor: '#FFFFFF', // Updated to user requested background color
  },
  scrollContainer: {
    paddingBottom: 80, // Add padding to the bottom to avoid overlap with the TabBar
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  petImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFFFFF', // White background for image placeholder
    borderWidth: 2,
    borderColor: '#A367F0', // Border color matching primary purple
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
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '48%',
  },
  saveButton: {
    backgroundColor: '#A367F0', // Darker purple for save button
  },
 
  cancelButton: {
    backgroundColor: '#8D7EFB', // Medium purple for cancel button
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
}
export default PetScreen;