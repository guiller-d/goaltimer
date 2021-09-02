import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigations/AuthNavigator';
import AppNavigator from './app/navigations/AppNavigator';
import AuthContext from './app/auth/context';

export default function App() {
  const [user, setUser] = useState();
  //   {user ? <AppNavigator /> : <AuthNavigator />}
  return (
    <AuthContext.Provider value = {{user, setUser} }>
    <NavigationContainer>
    {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
    </AuthContext.Provider>
  );
}
