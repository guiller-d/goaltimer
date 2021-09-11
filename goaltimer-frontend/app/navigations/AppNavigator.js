import React from 'react';
import {Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedNavigator from './FeedNavigator';
import ProgressScreen from '../screens/ProgressScreen';
import ChallengeScreen from '../screens/ChallengeScreen';
import TimeVGraph from '../screens/TimeVGraph';
import AvailabilityScreen from '../screens/AvailabilityScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();
const tabBarListeners = ({ navigation, route }) => ({
    tabPress: () => navigation.navigate(route.name),
});
const AppNavigator = () => (
    <Tab.Navigator tabBarOptions={{
       activeBackgroundColor:'white',
       activeTintColor: '#3B97ED',
       inactiveBackgroundColor: 'white',
       inactiveTintColor:'gray',
       style: { height: 73 }
     }
    }
    >
        <Tab.Screen name="Feed" component= {FeedNavigator}   listeners={tabBarListeners}
            options={{ tabBarLabel: '',  tabBarIcon: ({color}) => <Image  style={{ width: 25, height: 25, alignSelf: 'center',top: '20%', tintColor: color, }} source={require('../assets/images/home.png')}/> }}/>
         <Tab.Screen name="Challenge" component= {ChallengeScreen} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/star.png')}/> }}/>
          <Tab.Screen name="TimeVGraph" component= {TimeVGraph} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/graph-bar.png')}/> }}/>
          <Tab.Screen name="Availability" component= {AvailabilityScreen} 
            options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/clock.png')}/> }}/>
        <Tab.Screen name="Setting" component= {SettingScreen} 
              options={{ tabBarLabel: '', tabBarIcon: ({color}) => <Image style={{ width: 25, height: 25, alignSelf: 'center', top: '20%', tintColor: color,}} source={require('../assets/images/gear.png')}/> }}/>

    </Tab.Navigator>
)
export default AppNavigator;