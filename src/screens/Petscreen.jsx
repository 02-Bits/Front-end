import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import TabBar from '../components/TabBar';
 
const PetScreen = ({ route }) => {
  const { petData } = route.params;

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
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Idade</Text>
              <TextInput
                style={styles.input}
                placeholder="Idade"
                value={petData.age}
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
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Raça</Text>
              <TextInput
                style={styles.input}
                placeholder="Raça"
                value={petData.breed}
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
    color: '#FFFFFF', // Updated to user requested text color
  },
  input: {
    backgroundColor: '#FFFFFF', // White background for input fields
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
 
export default PetScreen;