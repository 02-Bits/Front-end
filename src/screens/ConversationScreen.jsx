// src/screens/ConversationScreen.jsx

import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const mockMessages = [
  { id: '1', text: 'Olá! Como posso ajudar seu pet hoje?', sender: 'other' },
  { id: '2', text: 'Oi, Dr.! Meu cachorro Benjie está vomitando desde ontem.', sender: 'me' },
  { id: '3', text: 'Entendo. Além do vômito, ele apresenta algum outro sintoma como diarreia ou falta de apetite?', sender: 'other' },
  { id: '4', text: 'Ele não quis comer nada hoje de manhã.', sender: 'me' },
];

export default function ConversationScreen({ route }) {
  const { contactName } = route.params; // Recebe o nome do contato da tela anterior
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length === 0) return;

    const newMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'me',
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'me' ? styles.myMessageContainer : styles.otherMessageContainer
    ]}>
      <View style={[
        styles.messageBubble,
        item.sender === 'me' ? styles.myMessageBubble : styles.otherMessageBubble
      ]}>
        <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>
          {item.text}
        </Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        inverted // Mostra as mensagens mais recentes na parte inferior
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#7A7A7A"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Icon name="send" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFBEA',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 18,
  },
  myMessageBubble: {
    backgroundColor: '#5B51EF',
    borderBottomRightRadius: 4,
  },
  otherMessageBubble: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  myMessageText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  otherMessageText: {
    color: '#333',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFF3B0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#5B51EF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});