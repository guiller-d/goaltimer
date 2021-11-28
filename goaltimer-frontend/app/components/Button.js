import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
function Button({ title, color, onPress, isPressed, type }) {

    return (
        <TouchableOpacity style={{
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: '#85AAE6',
          

        }} onPress={onPress}>
            {
                isPressed ?
                    <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
                        <Text style={{
                            fontSize: 20 ,
                            color: type == 'delete' ? 'red' : '#85AAE6',
                            fontFamily: 'Avenir-Medium'
                        }}>{title}</Text>
                        <View style={{width: '100%', height: 5, backgroundColor: '#85AAE6', borderRadius: 20}} />
                        <View style={{width: 10, height: 10, backgroundColor: '#85AAE6', borderRadius: 50}} />
                    </View> :
                    <View>
                        <Text style={{
                            fontSize: 18,
                            color: type == 'delete' ? 'red' : '#85AAE6',
                            fontFamily: 'Avenir-Medium'
                        }}>{title}</Text>
                    </View>
            }

        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    buttonContainer: {
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
export default Button;