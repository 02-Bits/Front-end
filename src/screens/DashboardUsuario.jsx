import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Ícones personalizados
import iconeHome from '../assets/icone.png';
import iconeMao from '../assets/mao.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';
import DogCat from '../assets/DogCat.png';

// Simulação do hook useTheme para o código ser executável
const useTheme = () => ({
  colors: {
    background: '#FFFAD9',
    textPrimary: '#3C3633',
    textSecondary: '#7D7C7C',
    primary: '#7F57F1',
    cardBackground: '#FFF7F1',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    navBackground: '#FEEEEE',
  }
});

const DashboardUsuario = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>Olá Usuário!</Text>
        <Text style={styles.subtitle}>Bom Dia!</Text>
      </View>

      {/* Card Principal */}
      <LinearGradient
        colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.promoCard}
      >
        <View style={styles.promoTextContainer}>
          <Text style={styles.promoTitle}>Visite nosso Website</Text>
          <TouchableOpacity style={styles.promoButton}>
            <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Clique Aqui</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log('DogCat clicked')}>
          <Image source={DogCat} style={styles.promoImage} />
        </TouchableOpacity>
      </LinearGradient>

      {/* Seção de Categorias */}
      <View style={styles.categorySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Category</Text>
        </View>
        <View style={styles.categoryGrid}>
          {/* Category buttons now navigate to different tabs */}
          <CategoryButton
            icon={iconeHome}
            label="Home"
            styles={styles}
            onPress={() => navigation.navigate('Home')}
          />
          <CategoryButton
            icon={iconeMao}
            label="Cuidados"
            styles={styles}
            onPress={() => navigation.navigate('AddPet')}
          />
          <CategoryButton
            icon={iconeVeterinario}
            label="Veterinário"
            styles={styles}
            onPress={() => navigation.navigate('Veterinario')}
          />
          <CategoryButton
            icon={iconePessoa}
            label="Perfil"
            styles={styles}
            onPress={() => navigation.navigate('Configurações')}
          />
        </View>
      </View>

      {/* Seção de Notificações */}
      <View style={styles.notificacoesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Notificações</Text>
          <TouchableOpacity onPress={() => console.log('Ver Todas clicked')}>
            <Text style={styles.seeAllLink}>Ver Todas</Text>
          </TouchableOpacity>
        </View>
        {/* Conteúdo removido para deixar a seção em branco */}
      </View>
    </ScrollView>
  );
};

// Função para gerar os estilos
const getStyles = (colors) => StyleSheet.create({
  container: {
    fontFamily: 'Poppins_700Bold',
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'column',
    padding: 24,
    position: 'relative',
    paddingBottom: 100,
    paddingTop: Platform.OS === 'ios' ? 24 + (Platform.currentHeight || 0) : 24,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: 0,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textSecondary,
    margin: 0,
  },
  promoCard: {
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  promoTextContainer: {
    maxWidth: '50%',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  promoButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderRadius: 16,
    width: 150,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promoImage: {
    width: 150,
    height: 120,
    borderRadius: 16,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: 0,
  },
  seeAllLink: {
    fontSize: 14,
    color: colors.primary,
    textDecorationLine: 'none',
    fontWeight: 'bold',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '23%',
    marginBottom: 16,
  },
  categoryIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  categoryIconCare: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  categoryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    margin: 0,
  },
  notificacoesSection: {
      marginBottom: 32,
  },
});

export default DashboardUsuario;

// Componente CategoryButton
const CategoryButton = ({ icon, label, styles, onPress }) => (
  <TouchableOpacity style={styles.categoryButton} activeOpacity={0.6} onPress={onPress}>
    <View style={styles.categoryIconContainer}>
      <Image source={icon} style={label === 'Cuidados' ? styles.categoryIconCare : styles.categoryIcon} />
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);