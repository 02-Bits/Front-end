import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const TimeOptionCard = ({ time, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onSelect(time)}
    >
      <Text style={[styles.timeText, isSelected && styles.selectedTimeText]}>{time}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EBE4F4',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C79DFD',
    shadowColor: 'rgba(199, 157, 253, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 5,
  },
  selectedCard: {
    backgroundColor: '#A367F0',
    borderColor: '#A367F0',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A367F0',
  },
  selectedTimeText: {
    color: '#FFFFFF',
  },
});