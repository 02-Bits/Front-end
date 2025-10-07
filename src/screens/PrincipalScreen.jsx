import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Ícones personalizados
import iconeHome from '../assets/icone.png';
import iconeMao from '../assets/mao.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';

// Simulação do hook useTheme para o código ser executável
const useTheme = () => ({
  colors: {
    background: '#FFFAD9',
    textPrimary: '#3C3633',
    textSecondary: '#7D7C7C',
    primary: '#7F57F1',
    cardBackground: '#FFF7F1',
    cardShadow: 'rgba(0, 0, 0, 0.05)',
    navBackground: '#FEEEEE', // alterado de #FFFFFF para #FEEEEE
  }
});

const PrincipalScreen = () => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const navigation = useNavigation();

  return (
    <div style={styles.container}>
      {/* Cabeçalho */}
      <header style={styles.header}>
        <h1 style={styles.title}>Olá Usuário!</h1>
        <p style={styles.subtitle}>Bom Dia!</p>
      </header>

      {/* Card Principal */}
      <div style={styles.promoCard}>
        <div style={styles.promoTextContainer}>
          <h2 style={styles.promoTitle}>Visite nosso Website</h2>
          <button type="button" style={styles.promoButton}>Clique Aqui</button>
        </div>
        {/* Placeholder para a imagem do card */}
        <TouchableOpacity activeOpacity={0.6} onPress={() => console.log('DogCat clicked')}>
          <Image source={require('../assets/DogCat.png')} style={styles.promoImage} />
        </TouchableOpacity>
      </div>

      {/* Seção de Categorias */}
      <section style={styles.categorySection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Category</h3>
        </div>
        <div style={styles.categoryGrid}>
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
        </div>
      </section>

      {/* Seção de Notificações */}
      <section style={styles.notificacoesSection}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>Notificações</h3>
          <a href="#" style={styles.seeAllLink}>Ver Todas</a>
        </div>
        {/* Conteúdo removido para deixar a seção em branco */}
      </section>


      {/* O rodapé será removido e a navegação será gerenciada pelo Tab.Navigator em App.jsx */}
    </div>
  );
};

// Função para gerar os estilos
const getStyles = (colors) => ({
  container: {
    fontFamily: 'Poppins_700Bold',
    backgroundColor: '#FFFFFF',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    boxSizing: 'border-box',
    position: 'relative',
    paddingBottom: '100px',
    paddingTop: 'calc(24px + env(safe-area-inset-top, 0px))',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: 0,
  },
  subtitle: {
    fontSize: '18px',
    color: colors.textSecondary,
    margin: 0,
  },
  promoCard: {
    backgroundImage: 'linear-gradient(rgb(163, 103, 240), rgb(141, 126, 251))',
    borderRadius: '24px',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#FFFFFF',
    marginBottom: '32px',
  },
  promoTextContainer: {
    maxWidth: '50%',
  },
  promoTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 16px 0',
  },
  // Botão real (sem Rectangle.png)
  promoButton: {
    backgroundColor: '#FFFFFF',
    color: colors.primary,
    border: 'none',
    borderRadius: '16px',
    width: '150px',
    height: '44px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  promoImage: {
    width: '150px',
    height: '120px',
    borderRadius: '16px',
    resizeMode: 'contain',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: 0,
  },
  seeAllLink: {
    fontSize: '14px',
    color: colors.primary,
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '32px',
  },
  categoryButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  // Quadrado roxo atrás do ícone de categoria (voltando ao que era antes)
  categoryIconContainer: {
    backgroundColor: colors.primary,
    borderRadius: '20px',
    width: '64px',
    height: '64px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8px',
  },
  // Ícone sem fundo branco
  categoryIcon: {
    width: '32px',
    height: '32px',
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  // Ícone maior apenas para "Cuidados"
  categoryIconCare: {
    width: '40px',
    height: '40px',
    resizeMode: 'contain',
    tintColor: '#FFFFFF',
  },
  categoryLabel: {
    fontSize: '14px',
    color: colors.textSecondary,
    fontWeight: '500',
    margin: 0,
  },
  notificacoesSection: {
      marginBottom: '32px',
  },
  consultaCard: {
    backgroundColor: colors.cardBackground,
    borderRadius: '24px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: `0 4px 12px ${colors.cardShadow}`,
  },
  doctorImagePlaceholder: {
    width: '60px',
    height: '60px',
    borderRadius: '16px',
    backgroundImage: 'linear-gradient(rgb(163, 103, 240), rgb(141, 126, 251))',
    marginRight: '16px',
  },
  doctorInfo: {
    flexGrow: 1,
  },
  doctorName: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: colors.textPrimary,
    margin: '0 0 4px 0',
  },
  doctorSpec: {
    fontSize: '14px',
    color: colors.textSecondary,
    margin: 0,
  },
  arrowIcon: {
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '20px',
    fontWeight: 'bold',
  },
});

export default PrincipalScreen;

  // Componente CategoryButton
  const CategoryButton = ({ icon, label, styles, onPress }) => (
    <TouchableOpacity style={styles.categoryButton} activeOpacity={0.6} onPress={onPress}>
      <div style={styles.categoryIconContainer}>
        <Image source={icon} style={label === 'Cuidados' ? styles.categoryIconCare : styles.categoryIcon} />
      </div>
      <p style={styles.categoryLabel}>{label}</p>
    </TouchableOpacity>
  );
