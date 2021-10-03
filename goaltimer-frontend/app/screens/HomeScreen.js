import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TextInput, ScrollView } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import Screen from '../components/Screen';
import Activity from '../components/Activity';
import AddButton from '../components/AddButton';
import Button from '../components/Button';
import Modal from 'react-native-modal';
import Duration from '../components/Duration';
import ColorButton from '../components/ColorButton';
import { VictoryPie, VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel, VictoryCursorContainer,VictoryScatter  } from "victory-native";
import { LinearGradient } from 'expo-linear-gradient';

const fetchFont = () => {
    return Font.loadAsync({
        'Avenir-Book': require('../assets/fonts/AvenirLTStd-Book.otf'),
        'Avenir-Medium': require('../assets/fonts/AvenirLTStd-Medium.otf'),
        'Avenir-Roman': require('../assets/fonts/AvenirLTStd-Roman.otf'),
    });
};
function HomeScreen({ navigation }) {
    const [fontLoaded, setFontLoaded] = useState(false);
    //fect fonts
    if (!fontLoaded) {
        <AppLoading startAsync={fetchFont} onError={() => console.log('Error Font')} onFinish={() => { setFontLoaded(true) }} />
    }
    // Filter Buttons
    const [isDaily, setIsDaily] = useState(false);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);

    //Create an Activity
    const [isModalVisible, setModalVisible] = useState(false);
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

    const pieData = [
        { y: 5, x: '5%' },
        { y: 90, x: '90%' },
        { y: 50, x: '50%' },
        { y: 20, x: '20%' },
        { y: 70, x: '70%' },
    ]
    const barData = [
        { x: 5, y: 20, color: 'orange' },
        { x: 17, y: 30, color: 'red' },
        { x: 2, y: 20, color: 'blue' },
        { x: 31, y: 20, color: 'pink' },
        { x: 25, y: 40, color: 'brown' }
    ]
    const graphicColor = ['orange', 'red', 'blue', 'pink', 'brown',]
    const scrollView = useRef();
    var color_index = 0;

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
                    <ScrollView ref={scrollView} horizontal={true} decelerationRate={0} snapToInterval={Dimensions.get('window').width} snapToAlignment={"center"} showsHorizontalScrollIndicator={false} bounces={false} style={{ alignSelf: 'center', }}>
                        
                        <VictoryChart
                     
                            theme={VictoryTheme.material}
                            domainPadding={{ x: 15 }}
                            height={Dimensions.get('window').height / 3}
                           
                        >
                            <VictoryBar   
                                style={{
                                    data: {
                                        fill: ({ datum }) => datum.color,
                                        
                                    }
                                }}
                                data={barData}
                                cornerRadius={5}
                              
                            />
                          
                            <VictoryAxis
                                axisLabelComponent={<VictoryLabel dy={20} />}
                                label={"Dependent axis"}
                            />
                            <VictoryAxis
                                dependentAxis
                                label="Time (min)"
                                axisLabelComponent={<VictoryLabel dy={-21} />}
                            />

                        </VictoryChart>
                        <VictoryPie
                            data={barData}
                            innerRadius={60}
                            radius={({ datum }) => 50 + datum.y * 1}
                            innerRadius={50}
                            labels={({ datum }) => `${datum.y} min `}
                            colorScale={graphicColor}
                            width={Dimensions.get('window').width}
                            height={Dimensions.get('window').height / 3}
                        >
                        </VictoryPie>
                    </ScrollView>
                </View>
                <View style={styles.statsContainer}>
                    <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 55, borderRadius: 10, }} colors={['white', 'white']}>
                        <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                            <Text style={styles.text2}>Total</Text>
                            <Text style={styles.text5}> 5 </Text>
                        </View>

                    </LinearGradient>
                    <LinearGradient style={{ width: Dimensions.get('window').width / 3 - 30, height: 55, borderRadius: 10, }} colors={['white', 'white']}>
                        <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                            <Text style={styles.text2}>Average</Text>
                            <Text style={styles.text5}> 23 min </Text>
                        </View>
                    </LinearGradient>
                </View>

                {/*activity box container */}
                {/*activity intro and label */}
                <View style={{ justifyContent: 'center', alignSelf: 'flex-start' }}>
                    <Text style={styles.titleLabel}> Your Activities </Text>
                    <Text style={styles.introLabel}> See how much time you spent on each activity. </Text>
                </View>

                <View style={styles.activityBox}>
                    {/*all activity container */}
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'baseliine', alignItems: 'center' }}>
                        <View style={styles.activityContainer}>
                            {/*<ScrollView bouncesZoom={true} contentContainerStyle={{flexGrow: 1, justifyContent: 'center', alignItems: 'center'}}> */}
                            <Activity activityName="Aerobic Exercise" activityDuration="30 minutes" activitySchedule="Daily Task" color='orange'
                                onPress={() => navigation.navigate('TaskDetailScreen', {
                                    activityName: 'Aerobic Exercise',
                                    activityDuration: "30 minutes",
                                    activitySchedule: "Daily Task",
                                    color: 'orange'
                                })} />
                            <Activity activityName="Sleep" activityDuration="30 minutes" activitySchedule="Daily Task" color='red' />
                            <Activity activityName="Studying" activityDuration="30 minutes" activitySchedule="Daily Task" color='blue' />
                            <Activity activityName="Meditation" activityDuration="30 minutes" activitySchedule="Daily Task" color='pink' />
                            <Activity activityName="Aerobic Exercise" activityDuration="30 minutes" activitySchedule="Daily Task" color='brown' />
                            {/*</ScrollView>*/}
                        </View>
                    </ScrollView>
                </View>

            </View>


            <AddButton onPress={toggleModal} />
            <Modal coverScreen={false} backdropColor='black' backdropOpacity={0.2} hideModalContentWhileAnimating={true} animationIn='slideInDown' animationOut='slideOutUp' isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onSwipeComplete={() => setModalVisible(false)} swipeDirection="left">
                <View style={{
                    width: Dimensions.get('window').width - 15,
                    height: 380,
                    alignSelf: 'center',
                    borderColor: 'gray',
                    borderRadius: 30,
                    borderWidth: 1,
                    backgroundColor: 'white'
                }}>

                    <View style={{ paddingTop: 15, }}>
                        <Text style={styles.welcomeText}> Create an Activity </Text>
                        <Text style={styles.labelText}>  {new Date().toDateString()} </Text>
                    </View>
                    <View style={{ width: '100%', height: '70%', alignItems: 'flex-start', paddingTop: 15, }}>
                        <View style={{ width: '90%', flexDirection: 'row' }}>
                            <Text style={styles.inputLabelText}> Name: </Text>
                            <View style={{ width: '90%', borderRadius: 5, borderWidth: 1, paddingLeft: 5, borderColor: '#DBDBDB' }}>
                                <TextInput
                                    style={styles.inputText}
                                    placeholder="Meditate"
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 15, alignItems: 'center' }}>
                            <Text style={styles.inputLabelText}> Schedule:</Text>
                            <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <Button title="Weekly" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                            <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 260, paddingTop: 15, alignItems: 'center' }}>
                            <Text style={styles.inputLabelText}> Duration:</Text>
                            <Duration title="15" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <Duration title="30" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                            <Duration title="45" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <Duration title="+" onPress={filterHandlerDaily} isPressed={isDaily} />
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 190, paddingTop: 15, alignItems: 'center' }}>
                            <Text style={styles.inputLabelText}> Color:</Text>
                            <ColorButton color="red" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <ColorButton color="blue" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                            <ColorButton color="orange" onPress={filterHandlerDaily} isPressed={isDaily} />
                            <ColorButton color='#8CBAF0' title="+" onPress={filterHandlerDaily} isPressed={isDaily} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <Button title="Create" onPress={filterHandlerDaily} isPressed={isDaily} />
                        <Button title="Cancel" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                    </View>
                </View>
            </Modal>

        </Screen>

    );
}
const styles = StyleSheet.create({
    homeContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',

    },
    graphContainer: {
        height: '35%',
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
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
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
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        margin: 5,
        backgroundColor: 'white'
    },
    activityContainer: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
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

/*

<View style={styles.filterButtonContainer}>
                        <Button title="Daily" onPress={filterHandlerDaily} isPressed={isDaily} />
                        <Button title="Weekly" onPress={filterHandlerWeekly} isPressed={isWeekly} />
                        <Button title="Monthly" onPress={filterHandlerMonthly} isPressed={isMonthly} />
                    </View>
                    <View style={styles.searchContainer}>
                        <View>
                            <Text style={styles.welcomeText}> 5 Results</Text>
                            <Text style={styles.labelText}> Activities</Text>
                        </View>
                        <View style={{
                            height: 45,
                            width: 250,
                            borderWidth: 1,
                            borderColor: '#DBDBDB',
                            borderRadius: 80,
                            justifyContent: 'space-around',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image style={styles.searchIconSize} source={require('../assets/images/search.png')} />
                            <View style={{ width: '80%', justifyContent: 'center' }}>
                                <TextInput
                                    style={styles.searchText}
                                    placeholder="Search"
                                />
                            </View>
                        </View>
                    </View>
                    */