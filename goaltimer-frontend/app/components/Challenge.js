import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Challenge({ challengeName, challengeDescription, onPress }) {
    console.log(challengeName);
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderColor: '#DBDBDB', marginBottom: 10, }}>
            <LinearGradient style={{ backgroundColor: 'red', height: 60, width: 60, marginTop: 10, borderRadius: 45, alignItems: 'center', justifyContent: 'center' }} colors={['white', '#C5D7F4']}>
                <Image style={styles.iconSize} source={require('../assets/images/star.png')} />
            </LinearGradient>
            <View style={{ width: '50%', left: 15 }}>
            
                <Text style={styles.text3}>{challengeName}</Text>
                <Text style={styles.text2}>{challengeDescription}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <LinearGradient style={{
                    width: 110,
                    height: 40,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    alignItems: 'center',
                    borderRadius: 20
                }} colors={['white', '#8CE2CB',]}>
                    <Text style={styles.text4}>Star Challenge</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text1: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text2: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },
    text3: {
        fontSize: 16,
        color: '#85AAE6',
        fontFamily: 'Avenir-Medium'
    },
    text4: {
        fontSize: 15,
        color: '#6B7673',
        fontFamily: 'Avenir-Medium'
    },
    iconSize: {
        height: 40,
        width: 40,
        tintColor: 'gray'
    }
});
export default Challenge;