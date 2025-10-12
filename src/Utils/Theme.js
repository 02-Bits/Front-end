export const Colors = {
  primary: '#6200EE',
  secondary: '#03DAC6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  error: '#B00020',
  onPrimary: '#FFFFFF',
  onSecondary: '#000000',
  onBackground: '#000000',
  onSurface: '#000000',
  onError: '#FFFFFF',
  lightGray: '#F5F5F5',
  mediumGray: '#CCCCCC',
  darkGray: '#333333',
  black: '#000000',
  white: '#FFFFFF',
  purple: '#6A0DAD',
  lightPurple: '#E0BBE4',
  veryLightPurple: '#F3E5F5',
  softLilac: '#E8E3F3', // Roxo muito claro para o container do calendário
  mediumPurple: '#9B7FC9', // Roxo médio para números dos dias
  lightHeaderPurple: '#B8A5D6', // Roxo claro para cabeçalho dos dias
  highlightCoral: '#FFB8A8', // Coral/salmão para destaque do dia
  darkHighlightPurple: '#7B4FA3',
  gray: '#A9A9A9', // Cor para marcações de consultas concluídas // Roxo escuro para texto do dia destacado
  darkPurple: '#8A2BE2', // Roxo mais escuro para destaque
  coral: '#FF7F50', // Coral/salmão para destaque
  blue: '#4285F4',
  lightBlue: '#E8F0FE',
  lightGreen: '#E6F4EA',
  green: '#4CAF50',
  red: '#F44336',
  lightRed: '#FAD2CF',
  orange: '#FBBC04',
  lightOrange: '#FFF7DA',

  warningOrange: '#FF9800',
  infoBlue: '#2196F3',
  lightInfoBackgroundPurple: '#EDE7F6',
  lightGrayBorder: '#E0E0E0',
  pink: '#FF6B9D',
  lightPurpleBackground: '#F5F3FF',
  veryLightPurpleBackground: '#E9D5FF',
  bluePurple: '#8A2BE2',
  lightBluePurple: '#D8BFD8',
  lightOrangeBackground: '#FFE0B2',
};


export const CommonStyles = {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: Colors.purple,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    backgroundColor: Colors.purple,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
};