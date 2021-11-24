import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


function Availability({ day, fromHour, fromMin, fromAmPm, toHour, toMin, toAmPm}) {
    return (
        <View style={{width: '95%', alignSelf: 'center'}}>
            <View style={{
                    height: 70, 
                    borderWidth: 1,
                    borderColor: 'black',
                    marginTop: 10, 
                    borderRadius: 5, 
                    backgroundColor: 'white', 
                    flexDirection: 'row', 
                    borderTopWidth: 2,
                    }}>

                <View style={styles.text2}>
                <Text style={styles.text3}>{day}</Text>
                <Text style={styles.text2}>From: {fromHour}:{fromMin} {fromAmPm}</Text>
                <Text style={styles.text2}>To: {toHour}:{toMin} {toAmPm}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    text2: {
        fontSize: 12,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text3: {
        fontSize: 24,
        color: 'green',
        fontFamily: 'Avenir-Medium'
    },
});
export default Availability;