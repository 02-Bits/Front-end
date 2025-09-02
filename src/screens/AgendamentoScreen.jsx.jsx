import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';

const pets = [
  { id: 1, nome: 'Rex', tipo: 'Cachorro', idade: '5 anos', foto: require('../assets/dog1.png') },
  { id: 2, nome: 'Miau', tipo: 'Gato', idade: '2 anos', foto: require('../assets/cat1.png') },
];

const servicos = [
  { id: 1, nome: 'Consulta', icone: 'healing' },
  { id: 2, nome: 'Vacina', icone: 'colorize' },
  { id: 3, nome: 'Banho & Tosa', icone: 'content-cut' },
  { id: 4, nome: 'Exames', icone: 'science' },
];

const horarios = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
const horariosOcupados = ['11:00', '15:00'];

export default function AgendamentoScreen() {
  const navigation = useNavigation();
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#A367F0', '#8D7EFB']}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Agendar Consulta</Text>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Seleção de Pet</Text>
        <View style={styles.petSelectionContainer}>
          {pets.map(pet => (
            <TouchableOpacity 
              key={pet.id} 
              style={[styles.petCard, selectedPet === pet.id && styles.petCardSelected]} 
              onPress={() => setSelectedPet(pet.id)}
            >
              <Image source={pet.foto} style={styles.petPhoto} />
              <View>
                <Text style={styles.petName}>{pet.nome}</Text>
                <Text style={styles.petDetails}>{pet.tipo} - {pet.idade}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        
        <Text style={styles.sectionTitle}>Seleção de Serviço</Text>
        <View style={styles.serviceSelectionContainer}>
          {servicos.map(servico => (
            <TouchableOpacity
              key={servico.id}
              style={[
                styles.serviceButton,
                selectedService === servico.id && styles.serviceButtonSelected,
              ]}
              onPress={() => setSelectedService(servico.id)}
            >
              <Icon name={servico.icone} size={24} color={selectedService === servico.id ? '#FFFFFF' : '#C49DF6'} />
              <Text style={[styles.serviceButtonText, selectedService === servico.id && styles.serviceButtonTextSelected]}>
                {servico.nome}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Calendário</Text>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: '#A367F0' },
          }}
          theme={{
            backgroundColor: '#EBE4F4',
            calendarBackground: '#FFFFFF',
            textSectionTitleColor: '#A367F0',
            selectedDayBackgroundColor: '#A367F0',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#A367F0',
            dayTextColor: '#A367F0',
            textDisabledColor: '#C49DF6',
            dotColor: '#A367F0',
            selectedDotColor: '#FFFFFF',
            arrowColor: '#A367F0',
            monthTextColor: '#A367F0',
            indicatorColor: 'blue',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          style={styles.calendar}
        />

        <Text style={styles.sectionTitle}>Horários</Text>
        <View style={styles.timeSelectionContainer}>
          {horarios.map(horario => {
            const isOcupado = horariosOcupados.includes(horario);
            return (
              <TouchableOpacity
                key={horario}
                style={[
                  styles.timeButton,
                  selectedTime === horario && styles.timeButtonSelected,
                  isOcupado && styles.timeButtonOccupied,
                ]}
                onPress={() => !isOcupado && setSelectedTime(horario)}
                disabled={isOcupado}
              >
                <Text
                  style={[
                    styles.timeButtonText,
                    selectedTime === horario && styles.timeButtonTextSelected,
                    isOcupado && styles.timeButtonTextOccupied,
                  ]}
                >
                  {horario}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Observações</Text>
        <TextInput
          style={styles.detailsInput}
          placeholder="Detalhes adicionais"
          placeholderTextColor="#C49DF6"
          multiline
        />

        {selectedPet && selectedService && selectedDate && selectedTime && (
          <>
            <Text style={styles.sectionTitle}>Resumo da consulta</Text>
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Pet:</Text>
                <Text style={styles.summaryInfo}>{pets.find(p => p.id === selectedPet)?.nome}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Serviço:</Text>
                <Text style={styles.summaryInfo}>{servicos.find(s => s.id === selectedService)?.nome}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Data:</Text>
                <Text style={styles.summaryInfo}>{selectedDate}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTitle}>Horário:</Text>
                <Text style={styles.summaryInfo}>{selectedTime}</Text>
              </View>
            </View>
          </>
        )}

        <TouchableOpacity style={styles.confirmButton}>
          <LinearGradient
            colors={['#A367F0', '#8D7EFB']}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Confirmar Agendamento</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBE4F4',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 52,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A367F0',
    marginTop: 20,
    marginBottom: 10,
  },
  petSelectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  petCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    width: '48%',
  },
  petCardSelected: {
    borderColor: '#A367F0',
  },
  petPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#C79DFD',
    marginBottom: 10,
  },
  petName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A367F0',
    textAlign: 'center',
  },
  petDetails: {
    fontSize: 14,
    color: '#8D7EFB',
    textAlign: 'center',
  },
  serviceSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  serviceButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    width: '48%',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  serviceButtonSelected: {
    backgroundColor: '#A367F0',
  },
  serviceButtonText: {
    color: '#8D7EFB',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  serviceButtonTextSelected: {
    color: '#FFFFFF',
  },
  calendar: {
    borderRadius: 8,
    marginBottom: 20,
  },
  timeSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C79DFD',
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '30%',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeButtonSelected: {
    backgroundColor: '#A367F0',
    borderColor: '#A367F0',
  },
  timeButtonOccupied: {
    backgroundColor: '#EBE4F4',
    borderColor: '#EBE4F4',
  },
  timeButtonText: {
    color: '#8D7EFB',
    fontWeight: 'bold',
  },
  timeButtonTextSelected: {
    color: '#FFFFFF',
  },
  timeButtonTextOccupied: {
    color: '#C49DF6',
  },
  detailsInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C79DFD',
    padding: 15,
    fontSize: 16,
    color: '#8D7EFB',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  summaryContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C79DFD',
    padding: 20,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A367F0',
  },
  summaryInfo: {
    fontSize: 16,
    color: '#8D7EFB',
  },
  confirmButton: {
    marginTop: 30,
    borderRadius: 8,
    shadowColor: 'rgba(163, 103, 240, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonGradient: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});