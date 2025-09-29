import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Alert
} from 'react-native';
const SelectVetScreen = ({ navigation, route }) => {
  const [selectedVetId, setSelectedVetId] = useState(null);

  // Dados mockados de veterinários - serão substituídos pela API posteriormente
  const veterinarians = [
    {
      id: '1',
      name: 'Dra. Ana Silva',
      specialty: 'Clínica Geral',
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Dr. Carlos Santos',
      specialty: 'Cirurgia',
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Dra. Maria Oliveira',
      specialty: 'Dermatologia',
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150&h=150&fit=crop&crop=face',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Dr. João Pereira',
      specialty: 'Oftalmologia',
      photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face',
      rating: 4.6
    },
    {
      id: '5',
      name: 'Dra. Paula Costa',
      specialty: 'Cardiologia',
      photo: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=150&h=150&fit=crop&crop=face',
      rating: 4.8
    },
    {
      id: '6',
      name: 'Dr. Ricardo Almeida',
      specialty: 'Neurologia',
      photo: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&h=150&fit=crop&crop=face',
      rating: 4.9
    }
  ];

  const handleVetSelection = (vetId) => {
    setSelectedVetId(vetId);
  };

  const handleNext = () => {
    if (!selectedVetId) {
      Alert.alert('Atenção', 'Selecione um veterinário para continuar');
      return;
    }

    // Salvar selectedVetId no estado global (será implementado com Redux/Context)
    const formData = route?.params?.appointmentData || {};
    const selectedVet = veterinarians.find(v => v.id === selectedVetId);
    console.log('Veterinário selecionado:', selectedVetId);
    navigation.navigate('ReviewScreen', { ...formData, vet: selectedVet });
  };

  const renderVetCard = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.vetCard,
        selectedVetId === item.id && styles.selectedVetCard
      ]}
      onPress={() => handleVetSelection(item.id)}
    >
      <Image
        source={{ uri: item.photo }}
        style={styles.vetImage}
        resizeMode="cover"
      />
      <View style={styles.vetInfo}>
        <Text style={styles.vetName}>{item.name}</Text>
        <Text style={styles.vetSpecialty}>{item.specialty}</Text>
        <Text style={styles.vetRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Consultas</Text>
        </View>

        {/* Instrução */}
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionText}>
            Selecione o veterinário para a consulta
          </Text>
        </View>

        {/* Grid de Veterinários */}
        <FlatList
          data={veterinarians}
          renderItem={renderVetCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.vetList}
          scrollEnabled={false}
        />

        {/* Botão Próximo */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !selectedVetId && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedVetId}
        >
          <Text style={styles.nextButtonText}>Próximo</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6E59D9',
  },
  instructionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  instructionText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  vetList: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  vetCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedVetCard: {
    borderColor: '#9C4DFF',
    backgroundColor: '#F5F3FF',
  },
  vetImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  vetInfo: {
    alignItems: 'center',
  },
  vetName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  vetSpecialty: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 4,
  },
  vetRating: {
    fontSize: 12,
    color: '#F59E0B',
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#A367F0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SelectVetScreen;