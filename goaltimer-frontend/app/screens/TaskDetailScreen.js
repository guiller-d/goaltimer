import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LoadingBar from '../components/LoadingBar';
import Screen from '../components/Screen';
import WaterIntakeDetail from '../components/WaterIntakeDetail';
import waterstatistics from '../database/waterstatistics.json';
import CountDown from 'react-native-countdown-component';
import Button from '../components/Button';
import StartButton from '../components/StartButton';
import api from '../api/api';
import endpoints from '../api/endpoints';
import AuthContext from '../auth/context';

function TaskDetailScreen({ route }) {

    const authContext = useContext(AuthContext);
    var user_hash_id = authContext.user.hashID;
    const { activityName, activityDuration, activitySchedule  } = route.params;
    const [timer, setTimer] = useState(false);
    const [hmsFormatTime, setHmsFormatTime] = useState("");
    const [time, setTime] = useState(0);

    const [activityTimes, setActivityTimes] = useState([]);
   
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
    const getAllActivities = async () => {
        let apiStr = endpoints.getAllActivityTime;
        api.baseURL.post(apiStr, { email : authContext.user.email }).then(response => {
            if (response.data != null) {
               
            }
            else{
                console.log("testing");
                console.log(response.data);
            }
        });
    }
    const handleTimerSubmit = async () => {
        let apiStr = endpoints.addTime;
        api.baseURL.post(apiStr, { activityName: activityName, userHashID: authContext.user.hashID, time: hmsFormatTime, date: new Date().toDateString(),  }).then(response => {
            if (response.data != null) {
               
            }
        });
    }
    //seconds to hms
    function secondsToHms(d) {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);
        var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        setHmsFormatTime(hDisplay + mDisplay + sDisplay);
        console.log(hmsFormatTime);
        return hDisplay + mDisplay + sDisplay; 
    }
    //minute to seconds
    function convert(value) {
        return Math.floor(value / 60) + ":" + (value % 60 ? value % 60 : '00')
    }

    const startStopTimer = () => {
        setTimer(!timer);
        if (timer){
            Alert.alert(
                "Activity Time:" + setTime(secondsToHms(time)),
                "Activity Time" + new Date().toDateString(),
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

            <View style={{ alignItems: 'center', margin: 20 }}>
                <StartButton title="Start Timer" onPress={startStopTimer} isPressed={timer} />
            </View>

            <CountDown
                size={30}
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
            >
            </CountDown>
        
            <View style={styles.dataContainer}>
            <FlatList data={activityTimes} keyExtractor={activityTimes => activityTimes.id.toString()} renderItem ={({item}) => 
                <Activity activityName={item.activityName} activityDuration={item.time} activitySchedule={item.date} color='red'/> } />
            </View>   

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