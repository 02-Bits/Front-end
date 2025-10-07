import React, { useState, useLayoutEffect, useContext, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { ChatContext } from '../context/ChatContext';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const vet = route.params?.vet;
  const vetName = vet?.name || 'Veterinário';

// Chat context
const { chats, sendMessage, markChatRead } = useContext(ChatContext);
const chat = chats[vet?.id] || { messages: [] };
const messages = chat.messages;

useEffect(() => {
    markChatRead(vet?.id);
    // Envia mensagem de boas-vindas caso não existam mensagens ainda
    if (messages.length === 0 && vet) {
      sendMessage(vet, `Olá! Sou ${vetName}. Como posso ajudar seu pet hoje?`, 'vet');
    }
  }, [vet?.id, messages.length, vet]);

  useLayoutEffect(() => {
    navigation.setOptions({ title: vetName });
  }, [navigation, vetName]);


  const flatListRef = React.useRef();

  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    sendMessage(vet, input, 'user');
    setInput('');
  };

  const roleColors = {
    user: {
      primary: '#1976D2',
      background: '#E3F2FD',
    },
    vet: {
      primary: '#2E7D32',
      background: '#E8F5E9',
    },
    admin: {
      primary: '#7B1FA2',
      background: '#F3E5F5',
    },
    services: {
      primary: '#F57C00',
      background: '#FFF3E0',
    },
    pharmacy: {
      primary: '#C2185B',
      background: '#FCE4EC',
    },
  };

  const renderItem = ({ item }) => {
    const isUser = item.role === 'user';
    const colors = roleColors[item.role] || roleColors.user;
    return (
      <View style={[styles.messageWrapper, isUser ? styles.alignEnd : styles.alignStart]}>
        {!isUser && (
          <Text style={[styles.sender, { color: colors.primary }]}>{item.sender}</Text>
        )}
        <View
          style={[
            styles.messageContainer,
            {
              backgroundColor: colors.background,
              alignSelf: isUser ? 'flex-end' : 'flex-start',
              borderTopRightRadius: isUser ? 0 : 18,
              borderTopLeftRadius: isUser ? 18 : 0,
            },
          ]}
        >
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        {isUser && (
          <Text style={[styles.senderRight, { color: colors.primary }]}>{item.sender}</Text>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        ref={flatListRef}
        data={messages}
        extraData={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  listContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 100 },
  messageWrapper: { marginBottom: 16, maxWidth: '70%' },
  alignStart: { alignSelf: 'flex-start' },
  alignEnd: { alignSelf: 'flex-end' },
  sender: { fontWeight: '600', fontSize: 14, marginBottom: 4 },
  senderRight: { fontWeight: '600', fontSize: 14, marginTop: 4, textAlign: 'right' },
  messageContainer: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otherMessage: {
    backgroundColor: '#F0EBFF',
  },
  userMessage: {
    backgroundColor: '#8D7EFB',
  },
  messageText: { fontSize: 16, lineHeight: 22, color: '#333' },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  textInput: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 24,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  sendButton: {
    backgroundColor: '#1976D2',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  sendButtonText: { color: '#FFFFFF', fontWeight: '600', fontSize: 16 },
});

export default ChatScreen;