import React from 'react';
import { StyleSheet, TouchableOpacity, Image} from 'react-native';
function AddButton({onPress}) {
    return (
        <TouchableOpacity style={styles.addContainer} onPress={onPress}>
            <Image style={styles.addSize} source={require('../assets/images/plus.png')} />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    addContainer:{
        height: 35,
        width: 35,
        borderRadius: 100,
        backgroundColor: '#A4C9BE',
        position: 'absolute',
        bottom: 50,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addSize: {
        height: 40,
        width: 40,
        tintColor: 'white'
    }
  
});
export default AddButton;