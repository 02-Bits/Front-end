import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardUsuario from '../screens/DashboardUsuario';

const UserStack = createNativeStackNavigator();

function UserNavigator() {
  return (
    <UserStack.Navigator screenOptions={{ headerShown: false }}>
      <UserStack.Screen name="DashboardUsuario" component={DashboardUsuario} />
    </UserStack.Navigator>
  );
}

export default UserNavigator;