// src/screens/ChatListScreen.jsx

import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Imagens de avatar (adicione-as em src/assets)
import veterinarioAvatar from '../assets/veterinario.png';
import adminAvatar from '../assets/pessoa.png'; // Reutilizando um ícone existente como exemplo

const conversations = [
  {
    id: '1',
    name: 'Dr. Ricardo (Veterinário)',
    lastMessage: 'Olá! Como posso ajudar seu pet hoje?',
    avatar: veterinarioAvatar,
    unread: 1,
  },
  {
    id: '2',
    name: 'Suporte Administrativo',
    lastMessage: 'Sua consulta foi agendada com sucesso.',
    avatar: adminAvatar,
    unread: 0,
  },
];

export default function ChatListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Conversation', { contactName: item.name })}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      {item.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unread}</Text>
        </View>
      )}
       <Text style={styles.arrow}>{'>'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
    paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  unreadBadge: {
    backgroundColor: '#00C851',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  unreadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  arrow: {
    fontSize: 24,
    color: '#5B51EF',
    paddingHorizontal: 8,
    marginLeft: 5,
  },
});