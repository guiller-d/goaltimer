import React, { useState } from 'react';

import { StyleSheet, Text, View, Button, Image} from 'react-native';
import Screen from '../components/Screen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const fetchFont = () => {
    return Font.loadAsync({
         'Avenir-Book': require('../assets/fonts/AvenirLTStd-Book.otf'),
         'Avenir-Medium': require('../assets/fonts/AvenirLTStd-Medium.otf'),
         'Avenir-Roman': require('../assets/fonts/AvenirLTStd-Roman.otf'),
     });
 };
function WelcomeScreen({navigation}) {
    const [fontLoaded, setFontLoaded] = useState(false);
    //fect fonts
    if (!fontLoaded) {
        <AppLoading startAsync={fetchFont} onError={()=> console.log('Error Font')} onFinish={() => {setFontLoaded(true)}} />
    }
    return (
        <Screen>
            <View style={{ height: '100%', backgroundColor: '#E7ECF4', alignItems: 'center'}}>
                <View style={{alignItems: 'center', marginTop: '20%'}}>
                    <Image style={{width: 35, height: 35, tintColor: 'brown'}} source={require('../assets/images/clock.png')}/>
                    <Text style = {styles.titleLabel}>Smart <Text style = {{color:'white'}}>Tracker</Text> </Text>
                    <Text style = {styles.introLabel}>Own Your Time </Text>
                </View>
                <View style = {styles.buttonSection}>
                    <View style = {styles.buttonContainer1}>
                        <Button title="Sign in" onPress={() => navigation.navigate('LoginScreen')} color = '#775E5E' borderColor = '#0062FF'/>
                    </View>
                    <View style = {styles.buttonContainer2}>
                        <Button 
                        title={"Sign up \n Don't have an account yet?"} 
                        onPress={() => navigation.navigate('SignUpScreen')} 
                        color = '#FFFFFF'
                        />
                    </View>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    buttonSection: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer1: {
        margin: 10,
        backgroundColor: '#FFFFFF',
        color: '#775E5E',
        padding: 20,
        borderRadius: 20,
        borderColor: '#B8DEDB',
        borderWidth: 1,
        shadowColor: '#0062FF',
        shadowRadius: 1,
        shadowOpacity: 3,
        shadowOffset:{width: 0, height: 3}
    },
    buttonContainer2: {
        margin: 10,
        backgroundColor: '#85AAE6',
        color: '#FFFFFF',
        padding: 10,
        borderRadius: 20,
        borderColor: '#0062FF',
        borderWidth: 1,
        shadowColor: '#0062FF',
        shadowRadius: 1,
        shadowOpacity: 3,
        shadowOffset:{width: 0, height: 2},
    },
    introLabel: {
        fontSize: 24,
        color: 'gray'
    },
    titleLabel: {
        textAlign: "left",
        margin: 10,
        fontSize: 35,
        color: '#4D4F5C'
    },
});

export default WelcomeScreen;