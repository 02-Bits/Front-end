// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Suas telas originais
import HomeScreen from './src/screens/HomeScreen';
import PetList from './src/screens/PetList';
import AddPetScreen from './src/screens/AgendamentoScreen.jsx';
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

const newHeaderOptions = {
  headerBackground: () => (
    <LinearGradient
      colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
      style={{ flex: 1 }}
    />
  ),
  headerTitleStyle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
};

// Stack interno para a aba Pets (lista, adicionar, detalhes)
function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={newHeaderOptions}
    >
      <Stack.Screen
        name="PetList"
        component={PetList}
        options={{ title: 'Meus Pets' }}
      />
      <Stack.Screen
        name="AddPet"
        component={AddPetScreen}
        options={{ title: 'Agendar Consulta' }}
      />
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet' }}
      />
    </Stack.Navigator>
  );
}

function HomeTabStack() {
  return (
    <Stack.Navigator screenOptions={newHeaderOptions}>
      <Stack.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function AddPetTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddPetTab" component={AddPetScreen} options={{ title: 'Agendar Consulta' }} />
    </Stack.Navigator>
  );
}

function FavoritesTabStack() {
  return (
    <Stack.Navigator screenOptions={newHeaderOptions}>
      <Stack.Screen name="FavoritesTab" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopWidth: 0,
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgb(163, 103, 240)', 'rgb(141, 126, 251)']}
            style={{ flex: 1 }}
          />
        ),
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
        headerShown: false, // Cabeçalho está dentro das stacks quando necessário
        tabBarShowLabel: false, // Somente ícones
      }}
    >
      <Tab.Screen
        name="Home"
        component={PetsStack} // Stack com várias telas dentro da aba Pets
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeHome}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Pets"
        component={HomeTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePet}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />



      <Tab.Screen
        name="AddPet"
        component={AddPetTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeMao}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Favorites"
        component={FavoritesTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconePessoa}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Veterinario"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: size,
                height: size,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      >
        {() => (
          <Stack.Navigator
            screenOptions={newHeaderOptions}
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
