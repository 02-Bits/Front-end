import React, { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState({}); // { vetId: { messages: [...], unread: bool } }

  // Carregar chats do storage na inicialização
  React.useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem('chats');
        if (stored) setChats(JSON.parse(stored));
      } catch (e) {
        console.log('Erro ao carregar chats', e);
      }
    })();
  }, []);

  // Salvar chats sempre que alterarem
  React.useEffect(() => {
    AsyncStorage.setItem('chats', JSON.stringify(chats)).catch((e) =>
      console.log('Erro ao salvar chats', e)
    );
  }, [chats]);

  const sendMessage = (vet, text, sender = 'user') => {
    setChats((prev) => {
      const existing = prev[vet.id] || { messages: [] };
      const newMessage = {
        id: Date.now().toString(),
        text,
        sender: sender === 'user' ? 'Você' : vet.name,
        role: sender,
        timestamp: Date.now(),
      };
      const updated = {
        ...prev,
        [vet.id]: {
          messages: [...existing.messages, newMessage],
          unread: sender === 'vet',
        },
      };
      return updated;
    });

    // Auto-resposta simples do vet após uma curta demora
    if (sender === 'user') {
      setTimeout(() => {
        setChats((prev) => {
          const existing = prev[vet.id] || { messages: [] };
          const replyMessage = {
            id: (Date.now() + 1).toString(),
            text: 'Obrigado pela mensagem! Já vou verificar e retorno em breve.',
            sender: vet.name,
            role: 'vet',
            timestamp: Date.now(),
          };
          return {
            ...prev,
            [vet.id]: {
              messages: [...existing.messages, replyMessage],
              unread: false,
            },
          };
        });
      }, 1500);
    }
  };

  const markChatRead = (vetId) => {
    setChats((prev) => {
      const existing = prev[vetId];
      if (!existing) return prev;
      return {
        ...prev,
        [vetId]: {
          ...existing,
          unread: false,
        },
      };
    });
  };

  return (
    <ChatContext.Provider value={{ chats, sendMessage, markChatRead }}>
      {children}
    </ChatContext.Provider>
  );
};