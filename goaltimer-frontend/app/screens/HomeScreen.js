
import React, { useEffect, useState, useRef, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView, FlatList } from 'react-native';  
import Screen from '../components/Screen';
import Activity from '../components/Activity';
import AddButton from '../components/AddButton';
import Button from '../components/Button';
import Modal from 'react-native-modal';
import Duration from '../components/Duration';
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from '../auth/context';
import api from '../api/api';
import endpoints from '../api/endpoints';
import { Formik } from 'formik';
import * as yup from 'yup';
import BarGraph from '../components/BarGraph';

function HomeScreen({ navigation }) {
   
    const authContext = useContext(AuthContext);
    var firstName = authContext.user.firstName;
    var lastName = authContext.user.lastName;
    var email = authContext.user.email;
    var user_hash_id = authContext.user.hashID;
    var user_id = authContext.user.id;

    const [isDaily, setIsDaily] = useState(false);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);

    const [isActivityDaily, setIsActivityDaily] = useState(false);
    const [isActivityWeekly, setIsActivityWeekly] = useState(false);
    const [isActivityMonthly, setIsActivityMonthly] = useState(false);
    const [isCancel, setCancel] = useState(false);

    const [activities, setActivities] = useState([]);
    const [activitiesTime, setActivitiesTime] = useState([]);

    const [is30, set30] = useState(false);
    const [is45, set45] = useState(false);
    const [is60, set60] = useState(false);
    //Create an Activity
    const [isModalVisible, setModalVisible] = useState(false);

    var time = '';
    var schedule = '';

    //Show create form
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
    const filterCancel = () => {
        console.log("Cancel is pressed");
        setCancel(!isCancel);
    };

    const activityDaily = async (setFieldValue, field) => {
        setIsActivityDaily(true);
        setIsActivityWeekly(false);
        setIsActivityMonthly(false);
        setFieldValue(field, "daily")
    };
    const activityWeekly = async (setFieldValue, field) => {
        setIsActivityDaily(false);
        setIsActivityWeekly(true);
        setIsActivityMonthly(false);
        setFieldValue(field, "weekly")

    };
    const activityMonthly = async (setFieldValue, field) => {
        setIsActivityDaily(false);
        setIsActivityWeekly(false);
        setIsActivityMonthly(true);
        setFieldValue(field, "montly")

    };
    const is30min = async (setFieldValue, field) => {
        set30(true);
        set45(false);
        set60(false);
        setFieldValue(field, "30")
   
    };
    const is45min = async (setFieldValue, field) => {
        set30(false);
        set45(true);
        set60(false);
        setFieldValue(field, "45")
    };
    const is60min = async (setFieldValue, field) => {
        set30(false);
        set45(false);
        set60(true);
        setFieldValue(field, "60")
    };
  
    const loginValidationSchema = yup.object().shape({
        activityName: yup
            .string()
            .required('Activity Name is Required'),
    })
    useEffect(() => {
        let apiStr = endpoints.getallactivities;
        api.baseURL.post(apiStr, { email: authContext.user.email}).then(response => {
            if (response.data != null) {
                setActivities(response.data);
                
            }
        });
    },[activities]);

    useEffect(() => {
        let apiStr = endpoints.getAllTime;
        api.baseURL.post(apiStr, { }).then(response => {
            if (response.data != null) {
                setActivitiesTime(response.data);
            }
        });
    },[activitiesTime]);

    const handleSubmit = async (values) => {

        let apiStr = endpoints.addActivity;
        api.baseURL.post(apiStr, { activityName: values.activityName + "," + authContext.user.hashID, schedule: values.schedule, status: false, time: values.time, hashID:authContext.user.hashID}).then(response => {
            if (response.data != null) {
                setModalVisible(!isModalVisible);
            }
        });
    }
   
    var weekly_time = [];
    var time_count = 0;
    var points = [];
    var days = [];
    var sum = 0;
    var average = 0;
    if (activitiesTime != undefined) {
        activitiesTime.map((data, index) => {
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

    return (
        <Screen>
            {/*intro and labels */}
            <View style={{ justifyContent: 'center' }}>
                <Text style={styles.titleLabel}>Overview of all of your time</Text>
                <Text style={styles.introLabel}>See how much time you spent on each activity.</Text>
            </View>
            {/*home containter */}
            <View style={styles.homeContainer}>
                <View style={styles.graphContainer}>
                    <View style={styles.barGraph}>
                        <View style={styles.filterButtonContainer}>
                            <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <Button title="Weekly" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                        </View>
                        <View>
                            {
                                data.labels.length != 0 ? 
                                <View style={styles.graphContainerStyle}>
                                    <BarGraph data={data} dataCount={time_count} daily={isDaily} weekly={isWeekly} monthly={isMonthly} />
                                </View>
                                :
                                <View style={styles.graphContainerStyle}>
                                    <Text style={styles.titleLabel}> No Data Available</Text>
                                </View>
                            }
                          
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
            </View>
                {/*activity intro and label */}
                <View style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
                    <Text style={styles.titleLabel}> Your Activities </Text>
                    <Text style={styles.introLabel}> See how much time you spent on each activity. </Text>
                </View>

            </View>
       
            <View style={styles.activityContainer}>
                {
                    activities.length > 0 ?
                    <FlatList data={activities} keyExtractor={activities => activities.id.toString()} renderItem ={({item}) => 
                    <Activity activityName={item.activityName} activityDuration={item.time} activitySchedule={item.schedule} color='#3B97ED' 
                    onPress={() => navigation.navigate('TaskDetailScreen', {
                        activityName: item.activityName,
                        activityDuration: item.time,
                        activitySchedule: item.schedule,
                        color: 'orange'
                    })} /> } />
                    : 
                    <View style={{width: '95%', alignItems: 'center'}}>
                        <Text style={styles.titleLabel}> No Data Available</Text>
                    </View>
                  
                }
               
            </View>       
           
            <AddButton onPress={toggleModal} />
            <Modal coverScreen={false} backdropColor='black' backdropOpacity={0.2} hideModalContentWhileAnimating={true} animationIn='slideInDown' animationOut='slideOutUp' isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onSwipeComplete={() => setModalVisible(false)} swipeDirection="left">
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{ activityName: '', schedule: '', time: '', user_hash_id: '' }}
                    onSubmit={values => handleSubmit(values)}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched, setFieldValue }) => (
                        <View style={{
                            width: Dimensions.get('window').width - 15,
                            height: 380,
                            alignSelf: 'center',
                            borderColor: 'gray',
                            borderRadius: 30,
                            borderWidth: 1,
                            backgroundColor: 'white'
                        }} >
                            <View style={{ paddingTop: 15, }}>
                                <Text style={styles.welcomeText}> Create an Activity </Text>
                                <Text style={styles.labelText}>  {new Date().toDateString()} </Text>
                            </View>
                            <View style={{ width: '100%', height: '70%', alignItems: 'flex-start', paddingTop: 15, }}>
                                <View style={{ width: '90%', flexDirection: 'row' }}>
                                    <Text style={styles.inputLabelText}> Name: </Text>
                                    <TextInput
                                    style={styles.inputText}
                                    placeholder='Activity Name'
                                    onChangeText={handleChange('activityName')}
                                    onBlur={handleBlur('activityName')}
                                    value={values.activityName}
                                 
                                />
                                {(errors.activityName && touched.activityName) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.activityName}</Text>}
                               
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 15, alignItems: 'center' }}>
                                    <Text style={styles.inputLabelText}> Schedule:</Text>
                                    <Button title="Daily"  onPress={() => activityDaily(setFieldValue, 'schedule')} isPressed={isActivityDaily}/>
                                    <Button title="Weekly" onPress={() => activityWeekly(setFieldValue, 'schedule')} isPressed={isActivityWeekly} />
                                    <Button title="Monthly" onPress={() => activityMonthly(setFieldValue, 'schedule')} isPressed={isActivityMonthly} />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 260, paddingTop: 15, alignItems: 'center' }}>
                                    <Text style={styles.inputLabelText}> Duration:</Text>
                                    <Duration title="30" onPress={() =>is30min(setFieldValue, 'time')} isPressed={is30} />
                                    <Duration title="45" onPress={() =>is45min(setFieldValue, 'time')} isPressed={is45} />
                                    <Duration title="60" onPress={() =>is60min(setFieldValue, 'time')} isPressed={is60} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button  onPress={handleSubmit} title="Add" color='#775E5E'/>
                                <Button title="Cancel" onPress={filterCancel} isPressed={isCancel} />
                            </View>
                        </View>

                    )}
                </Formik>

            </Modal>

        </Screen>

    );
}
const styles = StyleSheet.create({
    homeContainer: {
        alignItems: 'center',
    },
    graphContainer: {
        width: '97%',
        alignSelf: 'center',
        backgroundColor: 'white',
        borderTopWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderColor: '#A7A7A7',
    },
    filterButtonContainer: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        width: '97%',
        alignSelf: 'center',
        borderBottomWidth: 0.5,
        borderLeftWidth: 0.5,
        borderRightWidth: 0.5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#A7A7A7',
    },
    activityBox: {
        borderColor: '#A7A7A7',
        width: '97%',
        borderWidth: 0.5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 5,
        backgroundColor: 'white'
    },
    graphContainerStyle: {
        width: '99%', 
        height: 220, 
        alignItems: 'center',
        alignSelf: 'center', 
        justifyContent: 'center', 
        borderWidth: 0.5,
        borderRadius: 10,

    },
    activityContainer: {
        height:'35%',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0.5,
        borderColor: '#a7a7a7'
    },
    introLabel: {
        fontSize: 13,
        color: 'gray',
        marginLeft: 12,
    },
    titleLabel: {
        textAlign: "left",
        marginLeft: 10,
        marginTop: 10,
        fontSize: 20,
        color: '#4D4F5C'
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
    },
    inputText: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Avenir-Book'
    },
    inputLabelText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Avenir-Book'
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
export default HomeScreen;
