// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

// Suas telas originais
import HomeScreen from './src/screens/HomeScreen';
import PetList from './src/screens/PetList';
import AddPetScreen from './src/screens/AddPetScreen';
import PetsScreen from './src/screens/Petscreen';  // Tela de detalhes do pet
import FavoritesScreen from './src/screens/FavoritesScreen';
import ConsultasScreen from './src/screens/VeterinarioScreen';
import DetalhesConsultaScreen from './src/screens/DetalhesConsultaScreen';

// Ícones personalizados
import iconeHome from './src/assets/icone.png';
import iconePet from './src/assets/pet.png';
import iconeMao from './src/assets/mao.png';
import iconePessoa from './src/assets/pessoa.png';
import iconeVeterinario from './src/assets/veterinario.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack interno para a aba Pets (lista, adicionar, detalhes)
function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFF3B0' },
        headerTintColor: '#5B51EF',
        headerTitleAlign: 'center',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen
        name="PetList"
        component={PetList}
        options={{ title: 'Meus Pets' }}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{ title: 'Adicionar Pet' }}
      />
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

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
        headerShown: false, // Cabeçalho está dentro das stacks quando necessário
        tabBarShowLabel: false, // Somente ícones
      }}
    >
      <Tab.Screen
        name="Home"
        component={PetsStack} // Stack com várias telas dentro da aba Pets
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconeHome}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#5B51EF' : '#333',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Pets"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconePet}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#5B51EF' : '#333',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />



      <Tab.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconeMao}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#5B51EF' : '#333',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconePessoa}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#5B51EF' : '#333',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Veterinario"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#5B51EF' : '#333',
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: '#FFF3B0' },
              headerTintColor: '#5B51EF',
              headerTitleAlign: 'center',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen
              name="Consultas"
              component={ConsultasScreen}
              options={{ title: 'Consultas Veterinárias' }}
            />
            <Stack.Screen
              name="DetalhesConsulta"
              component={DetalhesConsultaScreen}
              options={{ title: 'Detalhes da Consulta' }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      {/* Principal é só a Tab Navigator com a stack interna para Pets */}
      <MainTabs />
    </NavigationContainer>
  );
}
// App.jsx
// Este arquivo configura a navegação principal do aplicativo, incluindo as abas e stacks necessárias.
