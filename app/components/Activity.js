import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View, Dimensions, Image} from 'react-native';

function Activity({activityName, activityDuration, activitySchedule, onPress, color}) {

    return (
        <View style={{width: '90%', alignSelf: 'center'}}>
            <View style={{
                    height: 65, 
                    borderWidth: 1,
                    borderColor: '#DBDBDB',
                    marginTop: 5, 
                    borderRadius: 15, 
                    backgroundColor: 'white', 
                    flexDirection: 'row', 
                    borderTopColor: color,
                    borderTopWidth: 3,
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
        fontSize: 20,
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