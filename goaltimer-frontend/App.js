import React, { useState } from 'react';
import {  NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigations/AuthNavigator';
import AppNavigator from './app/navigations/AppNavigator';
import AuthContext from './app/auth/context';

export default function App() {
  const [user, setUser] = useState()
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
