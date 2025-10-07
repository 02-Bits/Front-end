import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
// Recomenda-se usar uma biblioteca de ícones como react-native-vector-icons
import Icon from 'react-native-vector-icons/FontAwesome5'; // Ou similar
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';

// --- Definições de Cores ---
const COLORS = {
  background: '#FFFFFF', // BRANCO PURO
  text: '#333333',
  border: '#EEEEEE',
  delete: '#E64A19', // Vermelho/Laranja para "Excluir"
  iconSafe: '#4C2F8A', // Roxo/Azul escuro para ícones normais
  avatarBg: '#F4EFF2', // Branco-rosado claro do círculo superior
};
// --- Componente de Item de Menu ---
const MenuItem = ({ iconName, text, isDelete = false, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.menuItem,
      isDelete && styles.deleteItemContainer // Aplica estilos extras se for "Excluir"
    ]}
    onPress={onPress} // Agora usa a prop onPress
  >
    <Icon 
      name={iconName} 
      size={20} 
      style={[
        styles.icon,
        { color: isDelete ? COLORS.delete : COLORS.iconSafe }
      ]}
    />
    <Text 
      style={[
        styles.menuText,
        isDelete && styles.deleteText // Aplica cor de texto se for "Excluir"
      ]}
    >
      {text}
    </Text>

  </TouchableOpacity>
);

// --- Componente da Tela de Configuração Principal ---
import { useNavigation } from '@react-navigation/native';

const ConfigurationScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const handleDeleteAccount = () => {
    // Lógica para excluir a conta
    console.log('Conta excluída!');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <View style={styles.userAvatar} />
        <Text style={styles.username}>Usuario</Text>
      </View>

      {/* Menu de Opções */}
      <View style={styles.menuContainer}>
        <MenuItem iconName="fingerprint" text="Segurança" onPress={() => navigation.navigate('Security')} />
        <MenuItem iconName="paw" text="Pets" onPress={() => navigation.navigate('Home') } />
        <MenuItem iconName="calendar-alt" text="Consultas Agendadas" onPress={() => navigation.navigate('Veterinario', { screen: 'Consultas' })} />
        <MenuItem 
          iconName="trash-alt" 
          text="Excluir Conta" 
          isDelete={true} 
          onPress={() => setModalVisible(true)} // Abre o modal
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <DeleteConfirmationModal
          onCancel={() => setModalVisible(false)}
          onDelete={handleDeleteAccount}
        />
      </Modal>
    </View>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Espaço do topo da tela
    backgroundColor: COLORS.background, // Fundo BRANCO
  },

  // Cabeçalho e Avatar
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  userAvatar: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.avatarBg,
    borderRadius: 60,
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  // Menu
  menuContainer: {
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  // O último item não precisa de borda inferior, isso seria tratado com FlatList ou lógica de índice em um app real
  
  icon: {
    marginRight: 15,
    width: 24, // Garante que todos os ícones fiquem alinhados
    textAlign: 'center',
  },
  menuText: {
    flexGrow: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  
  // Estilos de Excluir Conta
  deleteItemContainer: {
    // Não é necessário um estilo extra para a borda aqui, mas poderia ser usado
  },
  deleteText: {
    color: COLORS.delete, // Cor vermelha para o texto
  },
});

export default ConfigurationScreen;