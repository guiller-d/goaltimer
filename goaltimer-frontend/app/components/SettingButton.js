import React from 'react';

import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
function SettingButton({ title, color, onPress, isPressed, type }) {

    return (
        <TouchableOpacity style={{
            width: '95%',
            height: 55,
            alignSelf: 'center',
            borderColor: '#A7A7A7',
            borderWidth: 0.5,
            margin: 3,
            borderRadius: 10,
            alignItems: 'flex-start',
            justifyContent: 'center',

        }} onPress={onPress}>
            <Text style={{
                fontSize: 18,
                color: isPressed ? 'white' : '#3A413F',
                fontFamily: 'Avenir-Medium'
            }}> {title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {

    },

    titleText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Avenir-Medium'
    },

});
export default SettingButton;