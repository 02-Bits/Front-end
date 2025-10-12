import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import DashboardUsuario from '../screens/DashboardUsuario';
import AgendaScreen from '../screens/AgendaScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import ChatScreen from '../screens/ChatScreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import SecurityScreen from '../screens/SecurityScreen';
import UserConsultasScreen from '../screens/UserConsultasScreen';

import VeterinarioScreen from '../screens/VeterinarioScreen';

// Ícones personalizados
import iconeAgenda from '../assets/Calendario.png.png';
import iconeChat from '../assets/Chat.png.png';
import iconeMao from '../assets/mao.png';
import iconePet from '../assets/pet.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';

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
    fontFamily: 'Geologica_700Bold',
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
};

const slideTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
      },
    },
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

function HomeUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Dashboard" component={DashboardUsuario} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

function ConsultasUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="MinhasConsultas" component={UserConsultasScreen} options={{ title: 'Minhas Consultas' }} />
    </Stack.Navigator>
  );
}

function ChatUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params?.vet?.name || 'Chat' })} />
    </Stack.Navigator>
  );
}



function ConfigurationUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

function AgendaUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
    </Stack.Navigator>
  );
}

const UserTabNavigator = () => {
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
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Agenda"
        component={AgendaUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeAgenda}
              style={{
                width: size * 2.0,
                height: size * 2.0,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Minhas Consultas"
        component={ConsultasUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeVeterinario}
              style={{
                width: size * 1.2,
                height: size * 1.2,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={HomeUserTabStack}
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
        name="Chat"
        component={ChatUserTabStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Image
              source={iconeChat}
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
        name="Configurações"
        component={ConfigurationUserTabStack}
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
    </Tab.Navigator>
  );
};

export default UserTabNavigator;