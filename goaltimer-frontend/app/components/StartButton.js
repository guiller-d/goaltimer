import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
function StartButton({ title, onPress, isPressed }) {

    return (
        <TouchableOpacity style={{
            height:90,
            width: 90,
            borderRadius: 100,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: isPressed ? 'red' : '#1CC625',
            borderWidth: 3,
          
        }} onPress={onPress}>
            {
                isPressed ?
                    <View style={{alignItems: 'center', width: '100%', marginTop: 10}}>
                        <Text style={{
                            fontSize: 34 ,
                            color: '#85AAE6',
                            fontFamily: 'Avenir-Medium'
                        }}>Stop</Text>
                    </View> :
                    <View>
                        <Text style={{
                            fontSize: 34 ,
                            color: '#85AAE6',
                            fontFamily: 'Avenir-Medium'
                        }}>Start</Text>
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
export default StartButton;