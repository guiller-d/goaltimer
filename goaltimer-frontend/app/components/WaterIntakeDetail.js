import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function WaterIntakeDetail({ date, percentage, onPress }) {
    percentage = percentage + '%';

    return (
        <TouchableOpacity style={styles.waterIntakeContainer} onPress={onPress}>
            <Text style={styles.text}> {date} </Text>
            <View style={{ width: '55%', borderWidth: 1, borderRadius: 10, borderColor: '#DBDBDB', backgroundColor: '#DBDBDB' }}  >
                <View style={{
                    width: percentage,
                    height: 8,
                    backgroundColor: '#85AAE6',
                    borderRadius: 10,
                }} colors={['white', '#85AAE6',]}>
                </View>
            </View>
            <View style={{ alignSelf: 'center', }}>
                <Text style={styles.percentage}> {percentage} </Text>
            </View>


        </TouchableOpacity>


    );
}
const styles = StyleSheet.create({
    waterIntakeContainer: {
        height: 50,
        width: '99%',
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        borderTopWidth: 1,
        borderColor: '#DBDBDB',
        borderRadius: 10,

    },
    text: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },
    percentage: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },

});

export default WaterIntakeDetail;