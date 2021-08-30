import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native';

function LoadingBar({color, activityName, activityDuration, dateToday, timer}) {
    return (
        <View style={styles.container}>

            <View style={{flexDirection: 'row', justifyContent: 'space-around',}}>
                <TouchableOpacity style={{
                    width: 60, 
                    height: 30, 
                    backgroundColor: color, 
                    alignSelf: 'center', 
                    alignItems: 'center', 
                    justifyContent: 'center',  
                    borderRadius: 80,}}> 
                    <Text style={styles.buttonText}>End</Text>
                </TouchableOpacity>
                <View style={{width: 20, height: 20, borderRadius: 80, backgroundColor: color, alignSelf: 'center'}} />

                <View>
                    <Text style={styles.titleText}>{activityName} - {activityDuration}</Text>
                    <Text style={styles.timeText}>{dateToday} - {timer}</Text>
                </View>
            </View>
            <View style={styles.loadingBarContainer}> 
                <View style={{
                    height: 20, 
                    width: '80%', 
                    backgroundColor: color,
                    borderRadius: 50,
                    borderRadius: 10,
                    shadowRadius: 5,
                    shadowOpacity: 0.6,
                    shadowColor: color,
    
                }}>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: '95%', 
    },
    loadingBarContainer:{
        width: '100%', 
        borderRadius: 50,
        borderColor: '#DBDBDB',
        borderWidth: 1,
        marginTop: 5
    },
    titleText: {
        fontSize: 17,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },
    timeText: {
        fontSize: 15,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    }, 
    buttonText: {
        fontSize: 17,
        color: 'white',
        fontFamily: 'Avenir-Medium'
    }, 
    
  
  
});
export default LoadingBar;