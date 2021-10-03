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
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: '#4298ec',
        position: 'absolute',
        bottom: 70,
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