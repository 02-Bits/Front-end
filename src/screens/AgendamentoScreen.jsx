import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TimeOptionCard } from '../components/TimeOptionCard';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Configuração de localização para português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ],
  monthNamesShort: [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ],
  dayNames: [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

export default function AgendamentoScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTimeOption, setSelectedTimeOption] = useState(null);
  const [showTimeSelection, setShowTimeSelection] = useState(false);

  // Horários disponíveis para agendamento
  const timeOptions = useMemo(() => [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
  ], []);

  // Handler para mudança de data
  const handleDateChange = useCallback((day) => {
    setSelectedDate(day.dateString);
    // Mostra a seleção de horário após selecionar a data
    setShowTimeSelection(true);
    // Limpa a seleção de horário anterior ao mudar a data
    setSelectedTimeOption(null);
    setSelectedTime(null);
  }, []);

  // Handler para mudança de horário via DateTimePicker
  const handleTimeChange = useCallback((event, newTime) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (newTime) {
      setSelectedTime(newTime);
      const formattedTime = formatTime(newTime);
      setSelectedTimeOption(formattedTime);
    }
  }, []);

  // Handler para seleção de horário via cards
  const handleTimeOptionSelect = useCallback((time) => {
    setSelectedTimeOption(time);
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date();
    newDate.setHours(hours, minutes, 0, 0);
    setSelectedTime(newDate);
  }, []);

  // Formatar tempo para exibição
  const formatTime = useCallback((date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }, []);

  // Mostrar picker de tempo
  const showPicker = useCallback(() => {
    setShowTimePicker(true);
  }, []);

  // Validar e confirmar agendamento
  const handleConfirmSchedule = useCallback(() => {
    // Validação detalhada
    if (!selectedDate) {
      Alert.alert(
        'Data não selecionada',
        'Por favor, selecione uma data no calendário antes de continuar.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (!selectedTimeOption || !selectedTime) {
      Alert.alert(
        'Horário não selecionado',
        'Por favor, selecione um horário disponível antes de continuar.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validar se a data não está no passado
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const scheduledDate = new Date(selectedDate + 'T00:00:00');
    
    if (scheduledDate < today) {
      Alert.alert(
        'Data inválida',
        'Não é possível agendar em datas passadas. Por favor, selecione uma data futura.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Se hoje, validar se o horário não passou
    if (scheduledDate.toDateString() === today.toDateString()) {
      const now = new Date();
      const [hours, minutes] = selectedTimeOption.split(':').map(Number);
      const scheduledTime = new Date();
      scheduledTime.setHours(hours, minutes, 0, 0);
      
      if (scheduledTime <= now) {
        Alert.alert(
          'Horário inválido',
          'O horário selecionado já passou. Por favor, escolha um horário futuro.',
          [{ text: 'OK' }]
        );
        return;
      }
    }

    // Se todas as validações passaram, navegar para o formulário
    navigation.navigate('ScheduleFormScreen', {
      date: selectedDate,
      time: selectedTimeOption,
      fullDateTime: `${selectedDate} ${selectedTimeOption}`,
    });
  }, [selectedDate, selectedTimeOption, selectedTime, navigation]);

  // Configuração do tema do calendário
  const calendarTheme = useMemo(() => ({
    backgroundColor: '#EBE4F4',
    calendarBackground: '#FFFFFF',
    textSectionTitleColor: '#A367F0',
    selectedDayBackgroundColor: '#A367F0',
    selectedDayTextColor: '#FFFFFF',
    todayTextColor: '#A367F0',
    dayTextColor: '#333333',
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
    textDayHeaderFontSize: 14,
  }), []);

  // Datas marcadas no calendário
  const markedDates = useMemo(() => ({
    [selectedDate]: { 
      selected: true, 
      selectedColor: '#A367F0',
      selectedTextColor: '#FFFFFF',
    },
  }), [selectedDate]);

  // Obter data mínima (hoje)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Obter data máxima (3 meses no futuro)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Agendamento de Consulta</Text>
        
        {/* Instruções */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsText}>
            📅 Selecione primeiro a data desejada
          </Text>
          {selectedDate && (
            <Text style={styles.instructionsText}>
              ⏰ Agora escolha um horário disponível
            </Text>
          )}
        </View>

        {/* Seção de Seleção de Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Selecione a Data</Text>
          <Calendar
            onDayPress={handleDateChange}
            markedDates={markedDates}
            theme={calendarTheme}
            style={styles.calendar}
            minDate={getMinDate()}
            maxDate={getMaxDate()}
            enableSwipeMonths
            firstDay={1}
            showWeekNumbers={false}
            hideExtraDays={true}
            disableAllTouchEventsForDisabledDays={true}
          />
        </View>

        {/* Seção de Seleção de Horário - Só aparece após selecionar data */}
        {showTimeSelection && selectedDate && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>2. Selecione o Horário</Text>
            
            <View style={styles.timeOptionsContainer}>
              {timeOptions.map((time) => (
                <TimeOptionCard
                  key={time}
                  time={time}
                  isSelected={selectedTimeOption === time}
                  onSelect={handleTimeOptionSelect}
                />
              ))}
            </View>

            {/* Opção adicional para iOS com DateTimePicker nativo */}
            {Platform.OS === 'ios' && (
              <TouchableOpacity 
                onPress={showPicker} 
                style={styles.iosTimeButton}
                activeOpacity={0.7}
              >
                <Text style={styles.iosTimeButtonText}>
                  Usar seletor de hora nativo (iOS)
                </Text>
              </TouchableOpacity>
            )}

            {/* DateTimePicker nativo */}
            {showTimePicker && (
              <DateTimePicker
                value={selectedTime || new Date()}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={handleTimeChange}
                is24Hour={true}
              />
            )}
          </View>
        )}

        {/* Resumo da seleção */}
        {(selectedDate || selectedTimeOption) && (
          <View style={styles.summarySection}>
            <Text style={styles.summaryTitle}>Resumo do Agendamento:</Text>
            {selectedDate && (
              <Text style={styles.summaryText}>
                📅 Data: {new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
            )}
            {selectedTimeOption && (
              <Text style={styles.summaryText}>
                ⏰ Horário: {selectedTimeOption}
              </Text>
            )}
            {!selectedDate && (
              <Text style={styles.warningText}>
                ⚠️ Selecione uma data
              </Text>
            )}
            {selectedDate && !selectedTimeOption && (
              <Text style={styles.warningText}>
                ⚠️ Selecione um horário
              </Text>
            )}
          </View>
        )}

        {/* Botão de Confirmação - Sempre visível mas com estados diferentes */}
        <TouchableOpacity
          style={[
            styles.confirmButton,
            (!selectedDate || !selectedTimeOption) && styles.disabledButton
          ]}
          onPress={handleConfirmSchedule}
          activeOpacity={0.8}
          disabled={!selectedDate || !selectedTimeOption}
        >
          <LinearGradient
            colors={
              selectedDate && selectedTimeOption 
                ? ['#A367F0', '#8D7EFB'] 
                : ['#D3D3D3', '#B0B0B0']
            }
            style={styles.buttonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={[
              styles.confirmButtonText,
              (!selectedDate || !selectedTimeOption) && styles.disabledButtonText
            ]}>
              {!selectedDate 
                ? 'Selecione uma Data' 
                : !selectedTimeOption 
                ? 'Selecione um Horário' 
                : 'Confirmar Agendamento'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A367F0',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  instructionsContainer: {
    backgroundColor: '#F8F4FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#A367F0',
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2,
  },
  section: {
    marginBottom: 25,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8D7EFB',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  iosTimeButton: {
    backgroundColor: '#F0E6FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#A367F0',
  },
  iosTimeButtonText: {
    color: '#A367F0',
    fontWeight: '600',
    fontSize: 14,
  },
  summarySection: {
    backgroundColor: '#F8F4FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#A367F0',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 15,
    color: '#333',
    marginVertical: 5,
    paddingLeft: 10,
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B6B',
    marginVertical: 5,
    paddingLeft: 10,
    fontStyle: 'italic',
  },
  confirmButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonGradient: {
    padding: 18,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  disabledButtonText: {
    color: '#F5F5F5',
  },
  calendar: {
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C79DFD',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});