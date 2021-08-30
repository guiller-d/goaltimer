import React from 'react';
import {Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const Stack = createStackNavigator();

const AuthNavigator = ({navigation}) => (
    <Stack.Navigator >
        <Stack.Screen name="WelcomeScreen" options={{headerTitleStyle: { alignSelf: 'center' }, title: ''  ,  headerStyle: {backgroundColor: '#E7ECF4'}, headerShown: true}} component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen"   options={{headerTitleStyle: { alignSelf: 'center' }, title:  '' ,  headerStyle: {backgroundColor: '#E7ECF4'}, headerShown: true}} component={LoginScreen} /> 
        <Stack.Screen name="SignUpScreen"  options={{headerTitleStyle: { alignSelf: 'center' }, title:  <Image style={{width: 30, height: 30}} source={require('../assets/images/vibrate.png')}/> ,  headerStyle: {backgroundColor: '#E7ECF4'}, headerShown: true}} component={SignUpScreen} /> 
    </Stack.Navigator>
)

export default AuthNavigator;