import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {TouchableOpacity, View, Image, Button,StyleSheet} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import SaveActivityScreen from '../screens/SaveActivityScreen';
import CreateActivityScreen from '../screens/CreateActivityScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Stack = createStackNavigator();
const DrawerButton = (props) => {
	return (
    <View>
        <TouchableOpacity onPress={() => props.navigation.dispatch(DrawerActions.openDrawer())}>
        <View style={{ top: '1%', borderRadius: 80}} >
           <Image style={styles.image} source={require('../assets/images/menu.png')}/> 
        </View>
        </TouchableOpacity> 
    </View>
  );
};

const FeedNavigator = ({navigation}) => (
    <Stack.Navigator >
        <Stack.Screen name="HomeScreen"         
            options={{title: '',  headerStyle: {backgroundColor: 'white'}, headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Progress" 
            options={{ headerLeft: ()=> <DrawerButton navigation={navigation}  />, title: '', headerStyle: {backgroundColor: 'red'},headerShown: true }} component={ProgressScreen} />
        <Stack.Screen name="TaskDetailScreen" 
            options={{title: 'a', headerStyle: {backgroundColor: '#3B97ED'}}}  component={TaskDetailScreen} options={{headerShown: false}} />
        <Stack.Screen name="SaveActivityScreen" 
            options={{  headerLeft:null, title: '', headerStyle: {backgroundColor: '#e7305b'}}}  component={SaveActivityScreen} options={{headerShown: false}} />
        <Stack.Screen name="CreateActivityScreen" component={CreateActivityScreen} options= { {title: 'Availability',  headerTintColor: 'white', headerStyle: { backgroundColor: '#3B97ED'}, headerTitleStyle: {fontFamily: 'Avenir-Medium', },  headerLeft: null }}/>
    </Stack.Navigator>
)
const styles = StyleSheet.create({
    image: {
        width: 28, 
        height: 28, 
        left: '70%',
        tintColor: 'white'
    },
   
})

export default FeedNavigator;