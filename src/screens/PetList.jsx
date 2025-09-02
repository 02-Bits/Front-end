// src/screens/HomeScreen.jsx

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';

// Imagens exemplo de pets
import dog1 from '../assets/dog1.png';
import dog2 from '../assets/dog2.png';
import cat1 from '../assets/cat1.png';

export default function HomeScreen() {
  const [pets, setPets] = useState([
    {
      id: '1',
      nome: 'Cachorro',
      servico: 'Consulta urgente',
      horario: 'O mais antes possível',
      image: dog1,
      porte: 'Médio',
      raca: 'Vira-lata',
      detalhes: 'Um cachorro muito animado.',
    },
    {
      id: '2',
      nome: 'Cachorro',
      servico: 'Vacinação',
      horario: 'Manhã',
      image: dog2,
      porte: 'Pequeno',
      raca: 'Poodle',
      detalhes: 'Um poodle dócil e tranquilo.',
    },
    {
      id: '3',
      nome: 'Gato',
      servico: 'Consulta urgente',
      horario: 'Tarde',
      image: cat1,
      porte: 'Pequeno',
      raca: 'Siamese',
      detalhes: 'Um gato curioso e brincalhão.',
    },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Estados do formulário de adicionar pet
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');
  const [raca, setRaca] = useState('');
  const [detalhes, setDetalhes] = useState('');

  // Lógica para o botão de "Adicionar"
  const handleAddPet = () => {
    setShowAddForm(true);
  };

  // Lógica para salvar o pet
  const handleSavePet = () => {
    if (!nome || !idade || !porte || !raca) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const newPet = {
      id: Date.now().toString(), // ID único
      nome,
      idade,
      porte,
      raca,
      detalhes,
      servico: 'Novo serviço', // Exemplo de um novo valor
      horario: 'A definir',
      image: dog1, // Use uma imagem padrão por enquanto
    };

    setPets([...pets, newPet]);
    setShowAddForm(false);
    
    // Limpar o formulário
    setNome('');
    setIdade('');
    setPorte('');
    setRaca('');
    setDetalhes('');
  };

  // Lógica para cancelar a adição
  const handleCancelAdd = () => {
    setShowAddForm(false);
    
    // Limpar o formulário
    setNome('');
    setIdade('');
    setPorte('');
    setRaca('');
    setDetalhes('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Pets</Text>
      </View>

      {!showAddForm ? (
        <>
          <FlatList
            data={pets}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.petCard}>
                <Image source={item.image} style={styles.petImage} />
                <View style={styles.petInfo}>
                  <Text style={styles.petName}>{item.nome}</Text>
                  <Text style={styles.petDetail}>{item.servico}</Text>
                  <Text style={styles.petDetail}>{item.horario}</Text>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
            <Text style={styles.addButtonText}>Adicionar Pet</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Adicionar Novo Pet</Text>
          
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
            placeholder="Pequeno, Médio, Grande"
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
            style={styles.textArea}
            placeholder="Detalhes adicionais"
            multiline
            numberOfLines={4}
            value={detalhes}
            onChangeText={setDetalhes}
          />
          
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelAdd}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSavePet}>
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C79DFD',
  },
  header: {
    backgroundColor: '#C49DF6',
    padding: 25,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#8D7EFB',
  },
  title: {
    fontSize: 26, // Slightly larger font size for better readability
    fontWeight: 'bold',
    color: '#8D7EFB',
    textShadowColor: '#C49DF6',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#C79DFD',
    borderRadius: 15, // Increased border radius for a softer look
    padding: 20, // Increased padding for better spacing
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#A367F0',
    shadowOffset: { width: 0, height: 4 }, // Increased shadow for more depth
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  petImage: {
    width: 70, // Slightly larger image size
    height: 70,
    borderRadius: 35,
  },
  petName: {
    fontSize: 20, // Larger font size for better emphasis
    fontWeight: 'bold',
    color: '#A367F0',
  },
  petDetail: {
    fontSize: 16, // Slightly larger font size for better readability
    color: '#A367F0',
    marginTop: 4, // Increased margin for better spacing
  },
  addButton: {
    backgroundColor: '#8D7EFB',
    borderRadius: 10,
    padding: 15,
    margin: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#C79DFD',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C49DF6',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#C49DF6',
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#8D7EFB',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#C49DF6',
    borderRadius: 10,
    padding: 15,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});