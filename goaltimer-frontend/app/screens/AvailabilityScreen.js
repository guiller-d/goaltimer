import React, { useEffect, useState, useContext, useRef } from "react";
import { StyleSheet, Text, View, Button, Alert, Dimensions, Picker, FlatList } from 'react-native';
import AppLoading from 'expo-app-loading';
import Screen from '../components/Screen';
import Modal from 'react-native-modal';
import AuthContext from '../auth/context';
import api from '../api/api';
import endpoints from '../api/endpoints';
import Availability from '../components/Availability';

function AvailabilityScreen(props) {

  const authContext = useContext(AuthContext);
  var email = authContext.user.email;

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  //for time picker to default pick time 
  const [selectedValue1, setFromHour] = useState("1");
  const [selectedValue2, setFromMin] = useState("00");
  const [selectedValue3, setFromAmPm] = useState("am");

  const [selectedValue4, setToHour] = useState("1");
  const [selectedValue5, setToMin] = useState("00");
  const [selectedValue6, setToAmPm] = useState("am");
  
  const [selectedValue7, setDay] = useState("Monday");

 const [array, setArray] = useState([]);

 const [fontLoaded, setFontLoaded] = useState(false);
 //fect fonts
 if (!fontLoaded) {
     <AppLoading startAsync={fetchFont} onError={() => console.log('Error Font')} onFinish={() => { setFontLoaded(true) }} />
 }

 const fetchFont = () => {
  return Font.loadAsync({
      'Avenir-Book': require('../assets/fonts/AvenirLTStd-Book.otf'),
      'Avenir-Medium': require('../assets/fonts/AvenirLTStd-Medium.otf'),
      'Avenir-Roman': require('../assets/fonts/AvenirLTStd-Roman.otf'),
  });
};

useEffect(() => {
  let apiStr = endpoints.getUserAvailability;
  api.baseURL.get(apiStr, { email:email}).then(response => {
      if (response.data != null) {
          setArray(response.data);
      }
  });
},[array]);

const handleSubmit = async (values) => {
  let apiStr = endpoints.addAvailability
  api.baseURL.post(apiStr, {fromHour: selectedValue1, fromMin: selectedValue2, fromAmPm: selectedValue3 ,toHour: selectedValue4, toMin: selectedValue5, toAmPm: selectedValue6 ,email: email, day: selectedValue7}).then(response => {
      console.log(response.data);
  }
  );
}

  return (
    <Screen>
      <Text style={styles.titleContainer}>Availability</Text>
      <Text style={styles.introLabel}>Manage Your Availability</Text>
      <View>
        <FlatList data={array} renderItem ={({item}) => 
          <Availability keyExtractor={array => array.id.toString()} day={item.day} fromHour={item.fromHour} fromMin={item.fromMin} fromAmPm={item.fromAmPm} toHour={item.toHour} toMin={item.toMin} toAmPm={item.toAmPm}
        /> } />
      </View>
      <View style={styles.container}>
          <Button title="Add Availability" color='green' borderColor='red' onPress={toggleModal} />
      </View>
      
      <Modal isVisible={isModalVisible} animationIn="bounceIn" animationOut="bounceOut" backdropOpacity={0} onBackdropPress={() => setModalVisible(false)}>
        <View style={{
          height: 420,
          width: Dimensions.get('window').width - 50,
          backgroundColor: 'white',
          alignSelf: 'center',
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#DBDBDB",
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: 15
        }}>
          <View style={{ alignSelf: 'center', alignContent: 'center' }}>
            <Text style={styles.text}>Set Availability Time </Text>


          <View style={styles.container3}>
          <Text style={styles.text2}>Day:</Text>
          <Picker
              selectedValue={selectedValue7}
              style={styles.picker1}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setDay(itemValue)}
            >
              <Picker.Item label="Monday" value="Monday" />
              <Picker.Item label="Tuesday" value="Tuesday" />
              <Picker.Item label="Wednesday" value="Wednesday" />
              <Picker.Item label="Thursday" value="Thursday" />
              <Picker.Item label="Friday" value="Friday" />
              <Picker.Item label="Saturday" value="Saturday" />
              <Picker.Item label="Sunday" value="Sunday" />
            </Picker>
          </View>


          <View />
          <View style={styles.container3}>
          <Text style={styles.text2}>From: </Text>
            <Picker
            selectedValue={selectedValue1}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setFromHour(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />

            </Picker>
            <Text style={styles.text1}>:</Text>
            <Picker
            selectedValue={selectedValue2}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setFromMin(itemValue)}
            >

              <Picker.Item label="00" value="00" />
              <Picker.Item label="05" value="05" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="35" value="35" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="45" value="45" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="55" value="55" />
            </Picker>
            <Picker
            selectedValue={selectedValue3}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setFromAmPm(itemValue)}
            >
              <Picker.Item label="am" value="am" />
              <Picker.Item label="pm" value="pm" />
            </Picker>
          </View>

          <View style={styles.container3}>
            <Text style={styles.text2}>To: </Text>
            <Picker
            selectedValue={selectedValue4}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setToHour(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
              <Picker.Item label="9" value="9" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="11" value="11" />
              <Picker.Item label="12" value="12" />
            </Picker>
            <Text style={styles.text1}>:</Text>
            <Picker
            selectedValue={selectedValue5}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setToMin(itemValue)}
            >
              <Picker.Item label="00" value="00" />
              <Picker.Item label="05" value="05" />
              <Picker.Item label="10" value="10" />
              <Picker.Item label="20" value="20" />
              <Picker.Item label="25" value="25" />
              <Picker.Item label="30" value="30" />
              <Picker.Item label="35" value="35" />
              <Picker.Item label="40" value="40" />
              <Picker.Item label="45" value="45" />
              <Picker.Item label="50" value="50" />
              <Picker.Item label="55" value="55" />
            </Picker>
            <Picker
            selectedValue={selectedValue6}
              style={styles.picker}
              mode="dropdown"
              itemStyle={styles.itemStyle}
              onValueChange={(itemValue, itemIndex) => setToAmPm(itemValue)}
            >
              <Picker.Item label="am" value="am" />
              <Picker.Item label="pm" value="pm" />
            </Picker>
          </View>

          <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around', padding: 20, alignSelf: 'center' }}>
            <Button title="Cancel" onPress={toggleModal} />
            <Button title="Save" onPress ={handleSubmit}/>
          </View>

          </View>
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    paddingBottom: 15,
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'center',
  },
  itemStyle: {
    fontSize: 15,
    height: 75,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  picker: {
    width: 50
  },
  picker1: {
    width: 100
  },
  container1: {
    flexDirection: 'row',
    paddingBottom: 20,
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'space-between'
  },
  container3: {
    flexDirection: 'row',
    fontSize: 35,
    marginLeft: 24,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'flex-start'
  },
  container2: {
    flexDirection: 'row',
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'space-between'
  },
  titleContainer: {
    paddingBottom: 3,
    fontSize: 35,
    marginLeft: 12,
    color: "black"

  },
  introLabel: {
    fontSize: 13,
    color: 'gray',
    marginLeft: 12,
    paddingBottom: 10
  },
  text: {
    flexDirection: 'row',
    paddingBottom: 15,
    fontSize: 35,
    marginLeft: 12,
    color: "#775E5E",
    justifyContent: 'flex-start'
  },
  text1: {
    flexDirection: 'row',
    paddingTop: 20,
    fontSize: 25,
    color: "#775E5E",
    justifyContent: 'center'
  },
  text2: {
    flexDirection: 'row',
    fontSize: 25,
    color: "#775E5E",
    justifyContent: 'flex-start',
    padding: 20
  }

});

export default AvailabilityScreen;