import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingBar from '../components/LoadingBar';
import Screen from '../components/Screen';
import WaterIntakeDetail from '../components/WaterIntakeDetail';
import waterstatistics from '../database/waterstatistics.json';
function TaskDetailScreen({ route }) {

    const { activityName } = route.params;
    var weekly_intake = [];
    var water_count = 0;
    var points = [];
    var days = [];
    var sum = 0;
    var average = 0;
    if (waterstatistics != undefined) {
        waterstatistics.map((stats, index) => {
            stats.weekly_percentage.map((data, key) => {
                water_count += 1;
                weekly_intake.push({
                    id: water_count,
                    date: data.date,
                    day_percentage: data.day_percentage,
                    day: data.day,
                    oz: data.oz,
                }
                );

                days.push(data.date.toString().substring(0, 5));
                points.push(data.day_percentage);
                sum += data.day_percentage;
            })
        })
    }
    return (
        <Screen>
            <View style={styles.loadingBarContainer}>
                <LoadingBar color='orange' activityName={activityName} activityDuration="30 minutes" dateToday={new Date().toDateString()} timer="00:35:34" />
            </View>

            <ScrollView>
                <View style={styles.dataContainer}>
                    <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.text}> Time Data </Text>
                            <Text style={styles.text4}> See your water intake in details </Text>
                        </View>
                    </View>
                    {
                        weekly_intake.map((data, key) => {
                            return < WaterIntakeDetail key={key} date={data.date} percentage={data.day_percentage} />
                        })
                    }
                </View>

            </ScrollView>

        </Screen>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        height: '100%',
        width: '100%',
    },
    loadingBarContainer: {
        width: '100%',
        alignItems: 'center',
    },
    dataContainer: {
        marginTop: 10,
        width: '95%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text2: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'Avenir-Medium'
    },
    text4: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Book'
    },
    exportText: {
        fontSize: 20,
        color: 'blue',
        fontFamily: 'Avenir-Medium'
    },
    exportText1: {
        fontSize: 14,
        color: 'blue',
        fontFamily: 'Avenir-Medium'
    },
    text5: {
        fontSize: 20,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    }
});

export default TaskDetailScreen;