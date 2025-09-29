import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'react-native';

const { width } = Dimensions.get('window');

const ICONS = {
  Home: 'home',
  Veterinario: 'local-hospital',
  Agendamento: 'event',
  Pets: 'pets',
  Favoritos: 'favorite',
};

const ICON_IMAGES = {
  Home: require('../assets/icone.png'),
  Mao: require('../assets/mao.png'),
  Pet: require('../assets/pet.png'),
  Veterinario: require('../assets/veterinario.png'),
  Pessoa: require('../assets/pessoa.png'),
};

const TAB_ORDER = [
  { name: 'Home', image: ICON_IMAGES.Home },
  { name: 'Mao', image: ICON_IMAGES.Mao },
  { name: 'Pet', image: ICON_IMAGES.Pet },
  { name: 'Veterinario', image: ICON_IMAGES.Veterinario },
  { name: 'Pessoa', image: ICON_IMAGES.Pessoa },
];

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.container}>
      {TAB_ORDER.map((tab, index) => {
        const route = state.routes.find(r => r.name === tab.name);
        if (!route) return null;
        const { options } = descriptors[route.key];
        const isFocused = state.index === state.routes.findIndex(r => r.name === tab.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tabItem}
          >
            <Image source={tab.image} style={{ width: 28, height: 28, tintColor: isFocused ? '#A367F0' : '#C49DF6' }} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});