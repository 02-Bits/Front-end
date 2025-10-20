import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Telas
import PetList from '../screens/PetList';
import AgendamentoScreen from '../screens/AgendamentoScreen.jsx';
import PetsScreen from '../screens/Petscreen';
import ConfigurationScreen from '../screens/ConfigurationScreen';
import ConsultasScreen from '../screens/VeterinarioScreen';
import DetalhesConsultaSharedScreen from '../screens/DetalhesConsultaSharedScreen';
import AdicionarPetScreen from '../screens/AdicionarPetScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import UserConsultasScreen from '../screens/UserConsultasScreen';
import ChatScreen from '../screens/ChatScreen';
import ScheduleFormScreen from '../screens/ScheduleFormScreen';
import SelectVetScreen from '../screens/SelectVetScreen';
import ReviewScreen from '../screens/ReviewScreen';
import SuccessScreen from '../screens/SuccessScreen';
import ChatsListScreen from '../screens/ChatsListScreen';
import SecurityScreen from '../screens/SecurityScreen';
import AgendaScreen from '../screens/AgendaScreen';
import DetalhesConsultaScreen from '../screens/DetalhesConsultaScreen';

// Ícones personalizados
import iconeHome from '../assets/icone.png';
import iconePet from '../assets/pet.png';
import iconeMao from '../assets/Chat.png.png';
import iconePessoa from '../assets/pessoa.png';
import iconeVeterinario from '../assets/veterinario.png';
import iconeAgenda from '../assets/Calendario.png.png';
import iconeChat from '../assets/Chat.png.png';
import icone from '../assets/icone.png';

// Definições de tipos usando JSDoc
/**
 * @typedef {Object} Pet
 * @property {string} id
 * @property {string} nome
 * @property {string} servico
 * @property {string} horario
 * @property {any} imagem
 */

/**
 * @typedef {Object} RootStackParamList
 * @property {undefined} Home
 * @property {undefined} AddPet
 * @property {{petData: Pet}} PetDetails
 */

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Estilos e configurações compartilhadas
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
  headerBackVisible: false,
  headerLeft: () => null,
};

// Configurações de transição suave
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

// Stack para a aba Pets (lista, adicionar, detalhes)
function PetsStack() {
  return (
    <Stack.Navigator
      screenOptions={{ ...newHeaderOptions, ...slideTransition }}
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
      <Stack.Screen
        name="PetDetails"
        component={PetsScreen}
        options={{ title: 'Detalhes do Pet' }}
      />
    </Stack.Navigator>
  );
}

// Stack para a aba Home
function HomeTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="HomeTab" component={PrincipalScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Home do usuário
function HomeUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Principal" component={PrincipalScreen} options={{ title: 'Home' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Consultas do usuário
function ConsultasUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="MinhasConsultas" component={UserConsultasScreen} options={{ title: 'Minhas Consultas' }} />
      <Stack.Screen name="DetalhesConsulta" component={DetalhesConsultaScreen} options={{ title: 'Detalhes da Consulta', headerBackVisible: true, headerLeft: undefined }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Chat
function ChatTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="Chat" component={ChatScreen} options={({ route }) => ({ title: route.params?.vet?.name || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

// Stack para a aba Chat do usuário
function ChatUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ChatsList" component={ChatsListScreen} options={{ title: 'Conversas' }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={({ route }) => ({ title: route.params?.name || 'Chat', headerBackVisible: true, headerLeft: undefined })} />
    </Stack.Navigator>
  );
}

// Stack para a aba Configurações
function ConfigurationTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="ConfigurationTab" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Configurações do usuário
function ConfigurationUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Configuration" component={ConfigurationScreen} options={{ title: 'Configurações' }} />
      <Stack.Screen name="Security" component={SecurityScreen} options={{ title: 'Segurança' }} />
    </Stack.Navigator>
  );
}

// Stack para a aba Agenda do usuário
function AgendaUserTabStack() {
  return (
    <Stack.Navigator screenOptions={{ ...newHeaderOptions, ...slideTransition }}>
      <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda' }} />
      <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendar Consulta', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ScheduleFormScreen" component={ScheduleFormScreen} options={{ title: 'Detalhes do Agendamento', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="SelectVetScreen" component={SelectVetScreen} options={{ title: 'Selecionar Veterinário', headerBackVisible: true, headerLeft: undefined }} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ title: 'Revisar Agendamento' }} />
      <Stack.Screen name="SuccessScreen" component={SuccessScreen} options={{ title: 'Agendamento Concluído' }} />
    </Stack.Navigator>
  );
}

// Navegador principal para usuários
function MainTabs({ route }) {
  const { initialTab } = route.params || {};

  return (
    <Tab.Navigator
      initialRouteName={initialTab || "Home"}
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
        name="Home"
        component={PetsStack}
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
        name="Chat"
        component={ChatTabStack}
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
            initialRouteName="Consultas"
          >
            <Stack.Screen
              name="Consultas"
              component={ConsultasScreen}
              options={{ title: 'Minhas Consultas' }}
            />
            <Stack.Screen
              name="Agendamento"
              component={AgendamentoScreen}
              options={{ title: 'Agendar Consulta', headerBackVisible: true, headerLeft: undefined }}
            />
            <Stack.Screen
              name="ScheduleFormScreen"
              component={ScheduleFormScreen}
              options={{ title: 'Detalhes do Agendamento', headerBackVisible: true, headerLeft: undefined }}
            />
            <Stack.Screen
              name="SelectVetScreen"
              component={SelectVetScreen}
              options={{ title: 'Selecionar Veterinário', headerBackVisible: true, headerLeft: undefined }}
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
              component={DetalhesConsultaSharedScreen}
              options={{ title: 'Detalhes da Consulta', headerBackVisible: true, headerLeft: undefined }}
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

// Navegador de abas para usuários
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
              source={icone}
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

// Navegador para usuários
const UserNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Principal">
      <Stack.Screen
        name="Principal"
        component={PrincipalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetalhesConsulta"
        component={DetalhesConsultaScreen}
        options={{ title: 'Detalhes da Consulta' }}
      />
      <Stack.Screen
        name="UserConsultas"
        component={UserConsultasScreen}
        options={{ title: 'Minhas Consultas' }}
      />
      <Stack.Screen
        name="ChatsList"
        component={ChatsListScreen}
        options={{ title: 'Lista de Conversas' }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({ route }) => ({ title: route.params?.vet?.name || 'Chat' })}
      />
    </Stack.Navigator>
  );
};

// Componente principal para aplicativo de usuário
const UserMainApp = () => {
  return (
    <UserTabNavigator />
  );
};

// Componente principal para aplicativo de veterinário
const VeterinarianMainApp = ({ route }) => {
  return (
    <MainTabs route={route} />
  );
};

export {
  UserNavigator,
  UserTabNavigator,
  UserMainApp,
  VeterinarianMainApp
};

export default UserTabNavigator;