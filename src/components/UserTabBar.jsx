import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image, useWindowDimensions, Text } from 'react-native';
import { widthPixel, heightPixel, fontPixel, spacing, useOrientation } from '../Utils/Responsive';
import { Colors } from '../Utils/Theme';
import { Ionicons } from '@expo/vector-icons';

const ICON_IMAGES = {
  Home: require('../assets/Calendario.png.png'),
  Agenda: require('../assets/pet.png'),
  Chat: require('../assets/Chat.png.png'),
};

const TAB_ORDER = [
  { name: 'Home', image: ICON_IMAGES.Home },
  { name: 'Agenda', image: ICON_IMAGES.Agenda },
  { name: 'Chat', image: ICON_IMAGES.Chat },
];

export default function UserTabBar({ state, descriptors, navigation }) {
  const { width, height } = useWindowDimensions();
  const orientation = useOrientation();
  const isLandscape = orientation === 'landscape';

  return (
    <View style={[styles.container, isLandscape && styles.containerLandscape]}>
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
            style={[styles.tabItem, isFocused && styles.activeTab]}
          >
            <Image source={tab.image} style={{ width: widthPixel(24), height: heightPixel(24), tintColor: isFocused ? Colors.purple : Colors.mediumGray }} />
            <Text style={[styles.tabText, { color: isFocused ? Colors.purple : Colors.mediumGray }]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: heightPixel(60),
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  containerLandscape: {
    height: heightPixel(80),
    paddingHorizontal: spacing.xl,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 0,
  },
  tabText: {
    fontSize: fontPixel(11),
    fontWeight: '400',
    marginTop: spacing.xxs,
  },
});