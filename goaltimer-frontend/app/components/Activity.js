import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image} from 'react-native';

function Activity({activityName, activityDuration, activitySchedule, onPress, color}) {

    return (
        <View style={{width: '95%', alignSelf: 'center'}}>
            <View style={{
                    height: 60, 
                    borderWidth: 0.5,
                    borderColor: '#A7A7A7',
                    marginTop: 5, 
                    borderRadius: 10, 
                    backgroundColor: 'white', 
                    flexDirection: 'row', 
                    borderTopColor: color,
                    borderTopWidth: 2,
                    }}>
            
                <View style={styles.detailsContainer}>
                    <Text style={styles.activityNameText}>{activityName}</Text>
                    <Text style={styles.durationText}>{activityDuration} {activitySchedule}</Text>
                </View>
                <TouchableOpacity style={styles.showButtonContainer} onPress={onPress}>
                    <Image style={styles.chevronRight} source={require('../assets/images/chevron-right.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    activityContainer: {

    },
    detailsContainer:{
        justifyContent: 'center',
        left: 20,
    },
    showButtonContainer:{
        height: 55,
        width: 55,
        alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
        position:'absolute', 
        right: 2
    },
    activityNameText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    showText: {
        fontSize: 18,
        color: '#775E5E',
        fontFamily: 'Avenir-Medium'
    },
    durationText:{
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Book'
    },
    chevronRight: {
        width: 30,
        height: 30,
        tintColor: '#DBDBDB'
    }
  
  });
export default Activity;