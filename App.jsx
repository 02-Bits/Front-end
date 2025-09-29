// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LoginScreen from './src/screens/LoginScreen';
import CadastroScreen from './src/screens/CadastroScreen';
import ProfileScreen from './src/screens/ProfileScreen';

// Suas telas originais
import HomeScreen from './src/screens/HomeScreen';
import InicialScreen from './src/screens/InicialScreen';
import PetList from './src/screens/PetList';
import AgendamentoScreen from './src/screens/AgendamentoScreen.jsx';
import PetsScreen from './src/screens/Petscreen';  // Tela de detalhes do pet
import ConfigurationScreen from './src/screens/ConfigurationScreen';
import ConsultasScreen from './src/screens/VeterinarioScreen';
import DetalhesConsultaScreen from './src/screens/DetalhesConsultaScreen';
import AdicionarPetScreen from './src/screens/AdicionarPetScreen'; // Nova tela de adicionar pet
import PrincipalScreen from './src/screens/PrincipalScreen'; // Importando PrincipalScreen

// Novas telas do fluxo de agendamento
import ScheduleFormScreen from './src/screens/ScheduleFormScreen';
import SelectVetScreen from './src/screens/SelectVetScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import SuccessScreen from './src/screens/SuccessScreen';

// Ícones personalizados
import iconeHome from './src/assets/icone.png';
import iconePet from './src/assets/pet.png';
import iconeMao from './src/assets/mao.png';
import iconePessoa from './src/assets/pessoa.png';
import iconeVeterinario from './src/assets/veterinario.png';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

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
        component={AdicionarPetScreen}
        options={{ title: 'Adicionar Pet' }}
      />
      {/* Removido AgendamentoScreen daqui */}
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet' }}
      />
    </Stack.Navigator>
  );
}

const HomeTabStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PrincipalScreen" component={PrincipalScreen} />
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

function HomeScreenStack() {
  return (
    <Stack.Navigator screenOptions={newHeaderOptions}>
      <Stack.Screen name="HomeScreenTab" component={HomeScreen} options={{ title: 'Meus Pets' }} />
    </Stack.Navigator>
  );
}

function AddPetTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AddPetTab" component={AdicionarPetScreen} options={{ title: 'Agendar Consulta' }} />
    </Stack.Navigator>
  );
}

function InicialTabStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InicialScreenTab" component={InicialScreen} options={{ title: 'Inicial' }} />
    </Stack.Navigator>
  );
}

function ConfigurationTabStack() {
  return (
    <Stack.Navigator screenOptions={newHeaderOptions}>
      <Stack.Screen name="ConfigurationTab" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Perfil' }} />
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
        component={PetsStack} // Continua usando PetsStack para PetList
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
        name="AddPet"
        component={HomeTabStack}
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
        name="Meus Pets" // Renomeado para "Meus Pets"
        component={HomeTabStack} // Agora usa HomeTabStack para PrincipalScreen
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
            initialRouteName="Consultas" // Explicitly set initial route
          >
            <Stack.Screen
              name="Consultas"
              component={ConsultasScreen}
              options={{ title: 'Minhas Consultas' }}
            />
            <Stack.Screen
              name="Agendamento"
              component={AgendamentoScreen}
              options={{ title: 'Agendar Consulta' }}
            />
            <Stack.Screen
              name="ScheduleFormScreen"
              component={ScheduleFormScreen}
              options={{ title: 'Detalhes do Agendamento' }}
            />
            <Stack.Screen
              name="SelectVetScreen"
              component={SelectVetScreen}
              options={{ title: 'Selecionar Veterinário' }}
            />
            <Stack.Screen
              name="ReviewScreen"
              component={ReviewScreen}
              options={{ title: 'Revisar Agendamento' }}
            />
            <Stack.Screen
              name="SuccessScreen"
              component={SuccessScreen}
              options={{ title: 'Agendamento Concluído' }}
            />
            <Stack.Screen
              name="DetalhesConsulta"
              component={DetalhesConsultaScreen}
              options={{ title: 'Detalhes da Consulta' }}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Configurações"
        component={ConfigurationTabStack}
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
}

export default function App() {
  return (
    <NavigationContainer>
      {/* Root stack para exibir a tela Inicial primeiro e depois as tabs */}
      <RootStack.Navigator initialRouteName="Inicial" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="Inicial" component={InicialScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="CadastroScreen" component={CadastroScreen} />
        {/* <RootStack.Screen name="Principal" component={PrincipalScreen} /> */}
        <RootStack.Screen name="Main" component={MainTabs} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
