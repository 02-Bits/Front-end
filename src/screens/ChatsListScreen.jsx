import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockVets = [
  {
    id: '1',
    name: 'Dr. Ana Paula',
    avatar: require('../assets/pessoa.png'),
    lastMessage: 'Tudo bem por aí?',
    time: '14:32',
  },
  {
    id: '2',
    name: 'Dr. Carlos Silva',
    avatar: require('../assets/pessoa.png'),
    lastMessage: 'Envie os exames quando puder.',
    time: 'Ontem',
  },
  {
    id: '3',
    name: 'Drª. Fernanda Lima',
    avatar: require('../assets/pessoa.png'),
    lastMessage: 'Como está o seu pet hoje?',
    time: 'Seg',
    unread: true,
  },
];

const ChatsListScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Chat', { vet: item })}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.rowBetween}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.rowBetween}>
            {item.unread && <View style={styles.unreadDot} />}
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </View>
        <Text
          style={[styles.subtitle, item.unread && styles.unreadSubtitle]}
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockVets}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFEFF4', paddingTop: 8 },
  itemContainer: {
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D5D5D5',
    marginHorizontal: 16,
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    // Android shadow
    elevation: 4,
  },
  avatar: { width: 66, height: 66, borderRadius: 33, marginRight: 18 },
  textContainer: { flex: 1 },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: { fontSize: 17, fontWeight: 'bold', color: '#2D2D2D' },
  time: { fontSize: 12, color: '#A0A0A0' },
  subtitle: { fontSize: 14, color: '#555', marginTop: 6 },
  unreadSubtitle: { color: '#000', fontWeight: '600' },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#8D7EFB',
    marginRight: 6,
  },
  separator: { height: 1, backgroundColor: 'transparent' },
});

export default ChatsListScreen;