import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const AdicionarPetScreen = ({ navigation }) => {
  const [petData, setPetData] = useState({
    name: '',
    age: '',
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.petImage}
            source={petData.image}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome"
                value={petData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Idade"
                value={petData.age}
                onChangeText={(text) => handleInputChange('age', text)}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Porte</Text>
              <TextInput
                style={styles.input}
                placeholder="Porte"
                value={petData.size}
                onChangeText={(text) => handleInputChange('size', text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raça</Text>
              <TextInput
                style={styles.input}
                placeholder="Raça"
                value={petData.breed}
                onChangeText={(text) => handleInputChange('breed', text)}
              />
            </View>
          </View>
          <View style={styles.fullWidthInputGroup}>
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
              style={[styles.input, styles.detailsInput]}
              placeholder="Detalhes"
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
    fontSize: 20,
    color: '#000000', // Cor alterada para preto para melhor visibilidade
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
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
  addButton: {
    backgroundColor: '#6A0DAD', // Cor para o botão Adicionar
  },
  cancelButton: {
    backgroundColor: '#8A2BE2', // Cor para o botão Cancelar
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdicionarPetScreen;