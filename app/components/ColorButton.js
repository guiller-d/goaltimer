import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
function ColorButton({title, color, onPress, isPressed, type}) {

    return (
        <TouchableOpacity style={{
            height: 30,
            width: 30,
            borderRadius: 10,
            backgroundColor: color,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#DBDBDB', 
            borderWidth: 1,
         
        }} onPress={onPress}>
            <Text style={{
                 fontSize: 18,
                 color:  isPressed ? 'white' : '#3A413F',
                 fontFamily: 'Avenir-Medium'
            }}>{title}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer:{
        height: 45,
        width: 90,
        borderRadius: 10,
        backgroundColor: '#8CBAF0',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#DBDBDB', 
        borderWidth: 1,
    },
    titleText: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Avenir-Medium'
    },
  
});
export default ColorButton;