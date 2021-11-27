import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Screen from '../components/Screen';
import Button from '../components/Button';
import { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import WaterIntakeDetail from '../components/WaterIntakeDetail';
import BarGraph from '../components/BarGraph';
import waterstatistics from '../database/waterstatistics.json';
import Modal from 'react-native-modal';

import { LinearGradient } from 'expo-linear-gradient';
function TimeVGraph(props) {

    // Filter Buttons
    const [isDaily, setIsDaily] = useState(false);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
    const filterHandlerDaily = () => {
        console.log("Daily is pressed");
        setIsDaily(true);
        setIsWeekly(false);
        setIsMonthly(false);
    };
    const filterHandlerWeekly = () => {
        console.log("Weekly is pressed");
        setIsDaily(false);
        setIsWeekly(true);
        setIsMonthly(false);
    };
    const filterHandlerMonthly = () => {
        console.log("Monthly is pressed");
        setIsDaily(false);
        setIsWeekly(false);
        setIsMonthly(true);
    };
    //modal toggle
    const [isModalVisible, setModalVisible] = useState(false);
    //modal toggle
    const [exportModal, setExportModal] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleExportModal = () => {
        setExportModal(!exportModal);
    };

    //weekly water statistics
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
    //stats data
    const data = {
        labels: days,
        datasets: [
            {
                data: points
            }
        ]
    };
    average = sum / water_count;
    average = average.toFixed(1);
    console.log(average);
    return (
        <Screen>
            <ScrollView>
                <View style={{ marginLeft: 5, }}>
                    <Text style={styles.text}>Your Progress </Text>
                    <Text style={styles.text4}>Filter your spent time by weekly, month, or quarterly to see if you are managing your time.   </Text>
                </View>
                <View style={styles.barGraph}>
                    <View style={styles.filterButtonContainer}>
                        <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                        <Button title="Weekly" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                        <Button title="Quarterly" onPress={filterHandlerMonthly} isPressed={isMonthly} />
                    </View>
                    <View>
                        <BarGraph data={data} dataCount={water_count} daily={isDaily} weekly={isWeekly} monthly={isMonthly} />
                    </View>
                    <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 5, }}>
                        <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 70, borderRadius: 20, }} colors={['white', 'white']}>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.text2}>Total</Text>
                                <Text style={styles.text5}> {water_count}</Text>
                            </View>

                        </LinearGradient>
                        <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 70, borderRadius: 20, }} colors={['white', 'white']}>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.text2}>Average</Text>
                                <Text style={styles.text5}> {average} min </Text>
                            </View>
                        </LinearGradient>

                    </View>

                </View>
                <View style={styles.dataContainer}>
                    <View style={{ marginLeft: 5, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.text}> Time Data </Text>
                            <Text style={styles.text4}> See your water intake in details </Text>
                        </View>
                        <View style={{ position: 'absolute', right: 10, }}>
                            <TouchableOpacity onPress={toggleExportModal}>
                                <Text style={styles.exportText}> Export </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        weekly_intake.map((data, key) => {
                            return < WaterIntakeDetail key={key} date={data.date} percentage={data.day_percentage} onPress={toggleModal} />
                        })
                    }
                </View>
            </ScrollView>

            <Modal isVisible={isModalVisible} animationIn="bounceIn" animationOut="bounceOut" backdropOpacity={0} onBackdropPress={() => setModalVisible(false)}>
                <View style={{
                    height: 150,
                    width: Dimensions.get('window').width - 100,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#DBDBDB"
                }}>




                </View>
            </Modal>
            <Modal isVisible={exportModal} animationIn="bounceIn" animationOut="bounceOut" backdropOpacity={0} onBackdropPress={() => setExportModal(false)}>
                <View style={{
                    height: 150,
                    width: Dimensions.get('window').width - 100,
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: "#DBDBDB",
                    justifyContent: 'space-evenly',
                    alignItems: 'center'
                }}>
                    <View style={{ alignSelf: 'center', }}>
                        <Text style={styles.text}>Export All Data </Text>
                        <Text style={styles.exportText1}>Exporting in pdf </Text>
                    </View>
                    <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around' }}>
                        <Button title="Export" />
                        <Button title="Cancel" />
                    </View>
                </View>
            </Modal>

        </Screen>
    );
}
const styles = StyleSheet.create({
    filterButtonContainer: {
        backgroundColor: 'white',
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    barGraph: {
        width: '95%',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 20,
        marginTop: 10,
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
        fontSize: 18,
        color: 'black',
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
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    }

});

export default TimeVGraph;