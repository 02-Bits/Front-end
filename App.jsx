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
import PetsScreen from './src/screens/Petscreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ConsultasScreen from './src/screens/VeterinarioScreen';
import DetalhesConsultaScreen from './src/screens/DetalhesConsultaScreen';

// Telas de chat
import ChatListScreen from './src/screens/ChatListScreen';
import ConversationScreen from './src/screens/ConversationScreen';

// Ícones personalizados
import iconeHome from './src/assets/icone.png';
import iconePet from './src/assets/pet.png';
import iconeMao from './src/assets/mao.png';
import iconePessoa from './src/assets/pessoa.png';
import iconeVeterinario from './src/assets/veterinario.png';
import iconeChat from './src/assets/iconeChat.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const defaultStackOptions = {
    headerStyle: { backgroundColor: '#FFF3B0' },
    headerTintColor: '#5B51EF',
    headerTitleAlign: 'center',
    headerTitleStyle: { fontWeight: 'bold' },
};

// Stack para a aba de Pets (lista, adicionar, detalhes)
function PetsStack() {
  return (
    <Stack.Navigator screenOptions={defaultStackOptions}>
      <Stack.Screen name="PetList" component={PetList} options={{ title: 'Meus Pets' }} />
      <Stack.Screen name="AddPet" component={AddPetScreen} options={{ title: 'Adicionar Pet' }} />
      <Stack.Screen name="PetDetails" component={PetsScreen} options={{ title: 'Detalhes do Pet', headerShown: false }} />
    </Stack.Navigator>
  );
}

// Stack para o Chat
function ChatStack() {
    return (
        <Stack.Navigator screenOptions={defaultStackOptions}>
            <Stack.Screen
                name="ChatList"
                component={ChatListScreen}
                options={{ title: 'Conversas' }}
            />
            <Stack.Screen
                name="Conversation"
                component={ConversationScreen}
                options={({ route }) => ({ title: route.params.contactName })}
            />
        </Stack.Navigator>
    )
}

// Stack para Veterinário/Consultas
function VeterinarioStack() {
    return (
        <Stack.Navigator screenOptions={defaultStackOptions}>
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
    )
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
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
        {/* 1. Ícone "Pata/Casa" -> Tela Principal */}
        <Tab.Screen
            name="HomeTab"
            component={HomeScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={iconeHome}
                        style={{ width: 24, height: 24, tintColor: focused ? '#5B51EF' : '#333' }}
                        resizeMode="contain"
                    />
                ),
            }}
        />
        
        {/* 2. Ícone "Gato" -> Seção de Pets */}
        <Tab.Screen
            name="PetsTab"
            component={PetsStack} 
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={iconePet}
                        style={{ width: 24, height: 24, tintColor: focused ? '#5B51EF' : '#333' }}
                        resizeMode="contain"
                    />
                ),
            }}
        />
        
        {/* 3. Ícone "Chat" -> No Meio */}
        <Tab.Screen
            name="ChatTab"
            component={ChatStack}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={iconeChat}
                        style={{ width: 24, height: 24, tintColor: focused ? '#5B51EF' : '#333' }}
                        resizeMode="contain"
                    />
                ),
            }}
        />
        
        {/* 4. Ícone "Estetoscópio" -> Veterinário */}
        <Tab.Screen
            name="VeterinarioTab"
            component={VeterinarioStack}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={iconeVeterinario}
                        style={{ width: 24, height: 24, tintColor: focused ? '#5B51EF' : '#333' }}
                        resizeMode="contain"
                    />
                ),
            }}
        />
        
        {/* 5. Ícone "Usuário" -> Favoritos/Perfil */}
        <Tab.Screen
            name="FavoritesTab"
            component={FavoritesScreen}
            options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={iconePessoa}
                        style={{ width: 24, height: 24, tintColor: focused ? '#5B51EF' : '#333' }}
                        resizeMode="contain"
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
      <MainTabs />
    </NavigationContainer>
  );
}