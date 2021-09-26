import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput} from 'react-native';
import LoadingBar from '../components/LoadingBar';
import Screen from '../components/Screen';

function ProgressScreen(props) {
    return (
        <Screen>
            <View style={styles.loadingBarContainer}>
                <LoadingBar color='orange' activityName={props.activityName} activityDuration={props.activityName} dateToday={new Date().toDateString()} timer="00:35:34"/>
                <LoadingBar color='red' activityName="Aerobic " activityDuration="30 minutes" dateToday={new Date().toDateString()} timer="00:35:34"/>
                <LoadingBar color='blue' activityName="Aerobic Exercise" activityDuration="30 minutes" dateToday={new Date().toDateString()} timer="00:35:34"/>
                <LoadingBar color='pink' activityName="Aerobic Exercise" activityDuration="30 minutes" dateToday={new Date().toDateString()} timer="00:35:34"/>
          </View>
        </Screen>
      
    );
}
const styles = StyleSheet.create({
    homeContainer: {
       height: '100%',
       width: '100%',
    },
    welcomeContainer: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
     },
    filterButtonContainer: {
        width: '100%',
        height: 50,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadingBarContainer: {
        width: '100%',
     
        alignItems: 'center',
    },
    searchContainer: {
        width: '100%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'

    },
    searchIconSize: {
        width: 30,
        height: 30,
        tintColor: 'gray'
    },
    activityContainer: {
      width: '100%',
      justifyContent: 'center',

    },
    welcomeText: {
        fontSize: 20,
        color: '#3A413F',
        fontFamily: 'Avenir-Medium'
    }, 
    searchText: {
        fontSize: 20,
        color: 'gray',
        fontFamily: 'Avenir-Book'
    },
    labelText: {
        fontSize: 16,
        color: 'gray',
        fontFamily: 'Avenir-Book'
    }
  });

export default ProgressScreen;