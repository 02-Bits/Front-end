import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useOrientation } from '../Utils/Responsive';
import { Colors, CommonStyles } from '../Utils/Theme';

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

const AgendaScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { width, height } = useWindowDimensions();
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';

  const calendarTheme = useMemo(() => ({
    backgroundColor: Colors.softLilac, // Fundo roxo/lilás suave que envolve toda a área do calendário
    calendarBackground: Colors.softLilac, // Fundo roxo/lilás suave que envolve toda a área do calendário
    textSectionTitleColor: Colors.lightHeaderPurple, // Dias da Semana: Cor roxa clara
    selectedDayBackgroundColor: Colors.highlightCoral, // Dia 10 em roxo mais escuro
    selectedDayTextColor: Colors.darkHighlightPurple,
    todayTextColor: Colors.purple,
    dayTextColor: Colors.mediumPurple, // Números dos Dias: Cor roxa predominante
    textDisabledColor: Colors.lightPurple,
    dotColor: Colors.purple,
    selectedDotColor: Colors.white,
    arrowColor: Colors.mediumPurple,
    monthTextColor: Colors.mediumPurple,
    indicatorColor: 'blue',
    textDayFontWeight: '600',
    textMonthFontWeight: '700',
    textDayHeaderFontWeight: '500',
    textDayFontSize: 14,
    textMonthFontSize: 20,
    textDayHeaderFontSize: 12,
  }), []);

  const markedDates = useMemo(() => ({
    '2025-07-05': { marked: true, dotColor: Colors.gray, activeOpacity: 0, completed: true }, // Consulta concluída (acinzentada)
    '2025-12-10': { selected: true, selectedColor: Colors.highlightCoral, selectedTextColor: Colors.darkHighlightPurple }, // Exemplo de dia 10 com destaque
    '2025-10-15': { marked: true, dotColor: Colors.mediumPurple, activeOpacity: 0 }, // Consulta marcada (roxo)
    '2025-11-20': { marked: true, dotColor: '#FF0000', activeOpacity: 0 }, // Consulta urgente (vermelho)
  }), []);

  const renderDay = (day, marking) => {
    const dayStyle = [styles.dayContainer];
    const dayTextStyle = [styles.dayText];

    if (day.dateString === '2024-07-10') {
      dayStyle.push(styles.highlightedDay);
      dayTextStyle.push(styles.highlightedDayText);
    }

    return (
      <View style={dayStyle}>
        <Text style={dayTextStyle}>{day.day}</Text>
        {marking && marking.marked && (
          <View style={[styles.dot, { backgroundColor: marking.dotColor }]} />
        )}
      </View>
    );
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Agenda</Text>
      <View style={[CommonStyles.card, styles.calendarWrapper]}>
        <Calendar
          onDayPress={(day) => {
            // setSelectedDate(day.dateString); // Desabilitar seleção de dias
          }}
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
          dayComponent={({ date, marking }) => renderDay(date, marking)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  calendarWrapper: {
    marginHorizontal: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 20,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Colors.softLilac,
  },
  calendar: {
    borderRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    marginBottom: 20,
    marginTop: 0,
    textAlign: 'left',
    width: '100%',
  },
  dayContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white, // Células brancas
    marginHorizontal: 2,
    marginVertical: 2,
  },
  dayText: {
    color: Colors.mediumPurple, // Números roxos
    fontSize: 14,
    fontWeight: '500',
  },
  highlightedDay: {
    backgroundColor: Colors.highlightCoral, // Fundo coral/salmão para destaque
  },
  highlightedDayText: {
    color: Colors.darkHighlightPurple, // Roxo mais escuro para destaque
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
});

export default AgendaScreen;