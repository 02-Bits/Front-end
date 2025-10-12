import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const AdicionarPetScreen = ({ navigation }) => {
  const [petData, setPetData] = useState({
    name: '',
    age: '',
    size: '',
    breed: '',
    species: '',
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
        {/* Título Nome acima da imagem - Agora editável */}
        <View style={styles.nameTitleContainer}>
          <TextInput
            style={styles.nameTitleInput}
            placeholder="Nome do Pet"
            value={petData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            textAlign="center"
            clearButtonMode="while-editing"
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
                placeholder="2 anos, 6 meses"
                value={petData.age}
                onChangeText={(text) => handleInputChange('age', text)}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Porte</Text>
              <TextInput
                style={styles.input}
                placeholder="Pequeno, Médio"
                value={petData.size}
                onChangeText={(text) => handleInputChange('size', text)}
              />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raça</Text>
              <TextInput
                style={styles.input}
                placeholder="Vira-lata, Poodle"
                value={petData.breed}
                onChangeText={(text) => handleInputChange('breed', text)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Espécie</Text>
              <TextInput
                style={styles.input}
                placeholder="Cachorro, Gato"
                value={petData.species}
                onChangeText={(text) => handleInputChange('species', text)}
              />
            </View>
          </View>
          <View style={styles.fullWidthInputGroup}>
            <Text style={styles.label}>Detalhes</Text>
            <TextInput
              style={[styles.input, styles.detailsInput]}
              placeholder="Gosta de brincar, medroso com barulhos"
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
  nameTitleContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  nameTitleInput: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A0DAD',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    borderBottomWidth: 1, // Linha menos grossa
    borderBottomColor: '#8A2BE2', // Mesma cor do botão de cancelar
    minWidth: 200,
    placeholderTextColor: '#9CA3AF', // Cinza mais suave para o placeholder
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#6A0DAD', // Purple color for better visibility on white background
  },
  input: {
    backgroundColor: '#F8F9FA', // Grayish background for inputs as requested
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF', // Light border color
    fontSize: 16,
    color: '#212529', // Dark text color for better readability
    placeholderTextColor: '#6B7280', // Cinza mais escuro para os placeholders
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
    backgroundColor: '#6A0DAD', // Darker purple for save button
  },
  cancelButton: {
    backgroundColor: '#8A2BE2', // Medium purple for cancel button
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AdicionarPetScreen;