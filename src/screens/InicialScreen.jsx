import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const InicialScreen = () => {
  const navigation = useNavigation();
  // Função para lidar com o clique no botão "Entrar".
  const handleLoginPress = () => {
    // Navega para a tela de Login
    navigation.navigate('Login');
  };

  const handleRegisterPress = () => {

    navigation.navigate('CadastroScreen');
  };

  return (
    // Container principal com fundo e layout flexível.
    <View style={styles.container}>
      {/* Imagem de fundo referenciada pela variável `gatogrande`. */}
      <Image
        source={require('../assets/Vector.png')}
        style={styles.backgroundImage}
        accessibilityLabel="Desenho de uma pessoa com um gato"
      />

      {/* O texto do logo principal "Pet" e "Vita" */}
      <View style={styles.logoContainer}>

        <Text style={styles.petText}>
          Pet
          <Text style={styles.vitaText}>
            Vita
          </Text>
        </Text>
      </View>

      {/* O contêiner principal com o efeito "frosted glass" */}
      <View style={styles.cardContainer}>
        {/* O conteúdo do card */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>
            Cuide de seu Pet
          </Text>
          {/* Botão de "Entrar" */}
          <TouchableOpacity
            onPress={handleLoginPress}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Entrar</Text>
          </TouchableOpacity>
          {/* Link para "Cadastre-se" */}
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <Text style={styles.registerText}>
              Não tem uma Conta?
            </Text>
            <TouchableOpacity onPress={handleRegisterPress}>
              <Text style={styles.registerLink}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 1,
    zIndex: 1,
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: 32,
    zIndex: 10,
  },
  petText: {
    fontSize: 120,
    fontWeight: '800',
    color: '#A367F0', // Cor roxa que combina com o tema
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    lineHeight: 120,
  },
  vitaText: {
    fontSize: 36,
    fontWeight: '500',
    color: '#8D7EFB', // Cor roxa mais clara
    marginLeft: 8,
    alignSelf: 'flex-end',
  },
  cardContainer: {
    position: 'relative',
    zIndex: 20,
    width: '100%',
    maxWidth: 384,
    marginHorizontal: 'auto',
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#374151', // Cor cinza escuro
    marginBottom: 24,
  },
  loginButton: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    backgroundColor: '#8D7EFB', // Cor roxa do botão
    borderRadius: 9999,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // Cor branca para o texto do botão
  },
  registerText: {
    fontSize: 14,
    color: '#6B7280', // Cor cinza para o texto de registro
  },
  registerLink: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#8D7EFB', // Cor roxa para o link de registro
  },

});

export default InicialScreen;
