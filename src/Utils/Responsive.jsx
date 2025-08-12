import { Dimensions, PixelRatio, Platform } from 'react-native';
import React from 'react';

// Obter as dimensões da tela
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Tamanho base de design (pode ser ajustado conforme necessário)
const widthBaseScale = SCREEN_WIDTH / 375;
const heightBaseScale = SCREEN_HEIGHT / 812;

// Função para calcular o tamanho normalizado com base na largura da tela
export function normalize(size, based = 'width') {
  const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Para uso em margens, paddings, altura, largura, etc.
export const widthPixel = (size) => normalize(size, 'width');
export const heightPixel = (size) => normalize(size, 'height');
export const fontPixel = (size) => normalize(size);

// Para uso em espaçamentos
export const spacing = {
  xs: widthPixel(4),
  sm: widthPixel(8),
  md: widthPixel(16),
  lg: widthPixel(24),
  xl: widthPixel(32),
  xxl: widthPixel(40),
};

// Hook para detectar mudanças na orientação da tela
export function useOrientation() {
  const [orientation, setOrientation] = React.useState(
    SCREEN_WIDTH < SCREEN_HEIGHT ? 'portrait' : 'landscape'
  );

  React.useEffect(() => {
    const onChange = ({ window }) => {
      setOrientation(window.width < window.height ? 'portrait' : 'landscape');
    };
    
    const subscription = Dimensions.addEventListener('change', onChange);
    
    return () => {
      // Para versões mais recentes do React Native
      if (typeof subscription?.remove === 'function') {
        subscription.remove();
      } else {
        // Para versões mais antigas do React Native
        Dimensions.removeEventListener('change', onChange);
      }
    };
  }, []);

  return orientation;
}

// Verificar se é um dispositivo com tela pequena
export const isSmallDevice = SCREEN_WIDTH < 375;