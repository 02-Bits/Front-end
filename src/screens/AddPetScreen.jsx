// src/screens/AddPetScreen.jsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddPetScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [raca, setRaca] = useState('');
  const [detalhes, setDetalhes] = useState('');

  const handleSave = () => {
    // Aqui você pode adicionar a lógica para salvar o pet
    // Por exemplo, enviar para uma API, salvar em um banco de dados, etc.
    if (!nome || !idade || !porte || !raca) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newPet = {
      nome,
      idade,
      porte,
      raca,
      detalhes,
    };

    console.log('Novo pet salvo:', newPet);

    // Depois de salvar, você pode voltar para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adicionar Novo Pet</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do pet"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Idade</Text>
      <TextInput
        style={styles.input}
        placeholder="Idade do pet"
        keyboardType="numeric"
        value={idade}
        onChangeText={setIdade}
      />

      <Text style={styles.label}>Porte</Text>
      <TextInput
        style={styles.input}
        placeholder="Porte (ex: Pequeno, Médio, Grande)"
        value={porte}
        onChangeText={setPorte}
      />

      <Text style={styles.label}>Raça</Text>
      <TextInput
        style={styles.input}
        placeholder="Raça do pet"
        value={raca}
        onChangeText={setRaca}
      />

      <Text style={styles.label}>Detalhes</Text>
      <TextInput
        style={styles.detailsInput}
        placeholder="Detalhes adicionais"
        multiline
        value={detalhes}
        onChangeText={setDetalhes}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Pet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  detailsInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#5B51EF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});