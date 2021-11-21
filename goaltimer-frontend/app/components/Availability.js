import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Availability({ day, fromHour, fromMin, fromAmPm, toHour, toMin, toAmPm}) {
    return (
        <View>

            <View style={{ width: '50%', left: 15 }}>
                <Text style={styles.text3}>{day}</Text>
                <Text style={styles.text2}>{fromHour}</Text>
                <Text style={styles.text3}>{fromMin}</Text>
                <Text style={styles.text2}>{fromAmPm}</Text>
                <Text style={styles.text3}>{toHour}</Text>
                <Text style={styles.text2}>{toMin}</Text>
                <Text style={styles.text3}>{toAmPm}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    text2: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },
    text3: {
        fontSize: 16,
        color: '#85AAE6',
        fontFamily: 'Avenir-Medium'
    },
});
export default Availability;