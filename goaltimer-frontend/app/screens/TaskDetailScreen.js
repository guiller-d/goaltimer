
import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, FlatList } from 'react-native';
import Screen from '../components/Screen';
import CountDown from 'react-native-countdown-component';
import Button from '../components/Button';
import StartButton from '../components/StartButton';
import api from '../api/api';
import endpoints from '../api/endpoints';
import AuthContext from '../auth/context';
import ActivityTime from '../components/ActivityTime';
import BarGraph from '../components/BarGraph';
import 'moment-duration-format';
import { LinearGradient } from 'expo-linear-gradient';

function TaskDetailScreen({ route }) {

    const authContext = useContext(AuthContext);
    var user_hash_id = authContext.user.hashID;
    const { activityName, activityDuration, activitySchedule } = route.params;
    const [timer, setTimer] = useState(false);
    const [hmsFormatTime, setHmsFormatTime] = useState("");
    const [time, setTime] = useState(0);
    const [activityTimes, setActivityTimes] = useState([]);
    const [isDaily, setIsDaily] = useState(false);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
    var moment = require("moment");


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

    const getAllActivities = async () => {
        const yourDate = new Date()
        const NewDate = moment(yourDate).format('L');

    }

    const refresh = () => {
        console.log("here");
        // note mutable flag
        let apiStr = endpoints.getAllActivityTime;
            api.baseURL.post(apiStr, { email: authContext.user.email, activityName: activityName }).then(response => {
                if (response.data != null) {
                    setActivityTimes(response.data);
             }
        });
    };
  

    var weekly_time = [];
    var time_count = 0;
    var points = [];
    var days = [];
    var sum = 0;
    var average = 0;

    if (activityTimes != undefined) {
        activityTimes.map((data, index) => {
            time_count += 1;
            weekly_time.push({
                activityName: data.activityName,
                time: data.time,
                date: data.date,
            }
            );
            days.push(data.date.toString().substring(0, 5));
            points.push(data.time);
            sum += parseInt(data.time);
        })
      
        average = sum / time_count;
        average = average.toFixed(1);
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

 
    const handleTimerSubmit = async () => {
        let apiStr = endpoints.addTime;
        api.baseURL.post(apiStr, { activityName: activityName, userHashID: authContext.user.hashID, time: moment.duration((activityDuration * 60) - time, 'seconds').format("hh:mm:ss"), date: moment(new Date()).format('L'), }).then(response => {
            if (response.data != null) {

            }
        });
    }
    const startStopTimer = () => {
        setTimer(!timer);
        if (timer) {
            Alert.alert(
                setHmsFormatTime(),
                "Activity Time " + new Date().toDateString() + " " + hmsFormatTime,
                [
                    {
                        text: "Save",
                        onPress: handleTimerSubmit,
                        style: "cancel"
                    },
                    { text: "Delete", onPress: getAllActivities }
                ]
            );
        }

    }

    return (
        <Screen>
               <Button title="Refresh" onPress={refresh}  />
                <View style={{ alignItems: 'center', marginTop:5,  flexDirection: 'row', alignSelf: 'center', justifyContent: 'space-between'}}>
                    <StartButton title="Start Timer" onPress={startStopTimer} isPressed={timer} />
                    <CountDown
                    size={25}
                    until={activityDuration * 60}
                    onFinish={() => alert('Finished')}
                    digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#3B97ED' }}
                    digitTxtStyle={{ color: '#1CC625' }}
                    timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                    separatorStyle={{ color: '#1CC625' }}
                    timeToShow={['H', 'M', 'S']}
                    timeLabels={{ m: null, s: null }}
                    showSeparator
                    running={timer}
                    onChange={(time) => {
                        setTime(time);
                    }}
                />
     
                </View>
                <View style={{ width: '95%', marginLeft: 5, alignSelf: 'center' }}>
                    <View></View>
                    <Text style={styles.text}>Your Time </Text>
                    <Text style={styles.text4}>See your how much time you spend on {activityName}  </Text>
                </View>
                <View style={styles.dataContainer}>
                  
                        <FlatList refreshing={refresh} data={activityTimes} keyExtractor={activityTimes => activityTimes.id.toString()} renderItem={({ item }) =>
                        <ActivityTime activityName={item.activityName} activityDuration={item.time} activitySchedule={item.date} color='#3B97ED' />
                    } />
                   
                </View>
                <View style={{ width: '95%', marginLeft: 5, alignSelf: 'center' }}>
                    <Text style={styles.text}>Your Progress </Text>
                    <Text style={styles.text4}>Filter your spent time by weekly, month, or quarterly to see if you are managing your time.   </Text>
                </View>
                <View style={styles.barGraph}>
                    <View style={styles.filterButtonContainer}>
                        <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                        <Button title="Weekly" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                    </View>
                    <View>
                        <BarGraph data={data} dataCount={time_count} daily={isDaily} weekly={isWeekly} monthly={isMonthly} />
                    </View>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 5, }}>
                        <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 70, borderRadius: 20, }} colors={['white', 'white']}>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.text2}>Total</Text>
                                <Text style={styles.text5}> {time_count}</Text>
                            </View>
                        </LinearGradient>
                        <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 70, borderRadius: 20, }} colors={['white', 'white']}>
                            <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={styles.text2}>Average</Text>
                                <Text style={styles.text5}> {average} </Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
          

        </Screen>
    );
}
const styles = StyleSheet.create({
    homeContainer: {
        height: '100%',
        width: '100%',
    },
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
    loadingBarContainer: {
        width: '100%',
        alignItems: 'center',
    },
    dataContainer: {
        height: 150,
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
    text2: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text5: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    }
});

export default TaskDetailScreen;


