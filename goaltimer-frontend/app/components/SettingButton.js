import React from 'react';

import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
function SettingButton({ title, color, onPress, isPressed, type }) {

    return (
        <TouchableOpacity style={{
            width: '90%',
            height: 60,
            alignSelf: 'center',
            borderColor: '#A7A7A7',
            borderWidth: 1,
            margin: 10,
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