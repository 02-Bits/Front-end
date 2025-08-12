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
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFF3B0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  petCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  petInfo: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  petName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  petDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#5B51EF',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#DDD',
    height: 100,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#5B51EF',
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
    backgroundColor: '#FF6B6B',
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