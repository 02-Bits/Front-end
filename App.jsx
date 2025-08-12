// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import PetList from './src/screens/PetList';
import AddPetScreen from './src/screens/AddPetScreen';
import PetsScreen from './src/screens/Petscreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import VeterinarioScreen from './src/screens/VeterinarioScreen';

// Importando os ícones personalizados
import iconeHome from './src/assets/icone.png';
import iconePet from './src/assets/pet.png';
import iconeMao from './src/assets/mao.png';
import iconePessoa from './src/assets/pessoa.png';
import iconeVeterinario from './src/assets/veterinario.png';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Componente para as telas principais com TabBar
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#FFF3B0',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: '#5B51EF',
        tabBarInactiveTintColor: '#333',
        headerStyle: { backgroundColor: '#FFF3B0' },
        tabBarShowLabel: false, // Remove os textos das abas
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={iconeHome} 
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#5B51EF' : '#333'
              }} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="PetList" 
        component={PetList} 
        options={{ 
          title: 'Meus Pets',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={iconePet} 
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#5B51EF' : '#333'
              }} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="AddPet" 
        component={AddPetScreen} 
        options={{ 
          title: 'Adicionar Pet',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={iconeMao} 
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#5B51EF' : '#333'
              }} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          title: 'Favoritos',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={iconePessoa} 
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#5B51EF' : '#333'
              }} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="Veterinario" 
        component={VeterinarioScreen} 
        options={{ 
          title: 'Veterinário',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={iconeVeterinario} 
              style={{ 
                width: 24, 
                height: 24, 
                tintColor: focused ? '#5B51EF' : '#333'
              }} 
            />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen 
          name="PetDetails" 
          component={PetsScreen}
          options={{ 
            title: 'Detalhes do Pet',
            headerShown: true,
            headerStyle: { backgroundColor: '#FFF3B0' }
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}