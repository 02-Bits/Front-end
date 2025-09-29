import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SuccessScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background com imagem desfocada */}
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1560809453-57b495cce980?w=400&h=800&fit=crop' }}
        style={styles.backgroundImage}
        blurRadius={10}
      >
        {/* Overlay escuro */}
        <View style={styles.overlay} />
        
        {/* Card central */}
        <View style={styles.successCard}>
          {/* Ícone de check */}
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#9C4DFF" />
          </View>
          
          {/* Mensagem de sucesso */}
          <Text style={styles.successTitle}>Consulta agendada</Text>
          <Text style={styles.successMessage}>
            Sua consulta foi agendada com sucesso! 
            Você receberá uma confirmação por e-mail.
          </Text>
          
          {/* Informações adicionais */}
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar" size={20} color="#6B7280" />
              <Text style={styles.infoText}>18 de Setembro de 2025</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time" size={20} color="#6B7280" />
              <Text style={styles.infoText}>11:30</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#6B7280" />
              <Text style={styles.infoText}>Dra. Ana Silva</Text>
            </View>
          </View>
        </View>
        
        {/* Instrução de navegação */}
        <View style={styles.navigationHint}>
          <Text style={styles.hintText}>
            Use a barra de navegação abaixo para continuar
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    maxWidth: 350,
  },
  iconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
    fontWeight: '500',
  },
  navigationHint: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 12,
    borderRadius: 8,
  },
  hintText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default SuccessScreen;