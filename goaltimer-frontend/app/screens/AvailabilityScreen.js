import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch, Dimensions, Picker} from 'react-native';
// import {Picker} from 'react-native-community/picker'
import Screen from '../components/Screen';
import Modal from 'react-native-modal';

function AvailabilityScreen(props) {
  const [isEnabled0, setIsEnabled0] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [isEnabled4, setIsEnabled4] = useState(false);
  const [isEnabled5, setIsEnabled5] = useState(false);
  const [isEnabled6, setIsEnabled6] = useState(false);

  const Monday = () => setIsEnabled0(previousState => !previousState);
  const Tuesday = () => setIsEnabled1(previousState => !previousState);
  const Wednesday = () => setIsEnabled2(previousState => !previousState);
  const Thursday = () => setIsEnabled3(previousState => !previousState);
  const Friday = () => setIsEnabled4(previousState => !previousState);
  const Saturday = () => setIsEnabled5(previousState => !previousState);
  const Sunday = () => setIsEnabled6(previousState => !previousState);

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

  return ( 
<Screen>
<Text style= {styles.titleContainer}>Availability</Text>
<Text style= {styles.introLabel}>Manage Your Availability</Text>
<View style={styles.container}>
<Text style= {styles.text}>Monday</Text>
<View style={styles.container}>
<Switch
  trackColor={{ false: "black", true: "green" }}
  ios_backgroundColor="#3e3e3e"
  onValueChange={Monday}
  value={isEnabled0} 
/>
<Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>

</View>
</View>

<View style={styles.container}>
<Text style= {styles.text}>Tuesday</Text>
<View style={styles.container}>
  <Switch
    trackColor={{ false: "#black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Tuesday}
    value={isEnabled1}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
  </View>

  <View style={styles.container}>
<Text style= {styles.text}>Wednesday</Text>
<View style={styles.container}>
  <Switch
    trackColor={{ false: "black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Wednesday}
    value={isEnabled2}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
  </View>

  <View style={styles.container}>
<Text style= {styles.text}>Thursday</Text>
<View style={styles.container}> 
  <Switch
    trackColor={{ false: "black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Thursday}
    value={isEnabled3}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
  </View>

<View style={styles.container}>
<Text style= {styles.text}>Friday</Text>
<View style={styles.container}>
  <Switch
    trackColor={{ false: "black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Friday}
    value={isEnabled4}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
  </View>

  <View style={styles.container}>
  <Text style= {styles.text}>Saturday</Text>
  <View style={styles.container}>
  <Switch
    trackColor={{ false: "black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Saturday}
    value={isEnabled5}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
  </View>

  <View style={styles.container}>
  <Text style= {styles.text}>Sunday</Text>
  <View style={styles.container}>
  <Switch
    trackColor={{ false: "black", true: "green" }}
    ios_backgroundColor="#3e3e3e"
    onValueChange={Sunday}
    value={isEnabled6}
  />
  <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' onPress={toggleModal}/>
  </View>
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
        alignItems: 'center',
        padding : 15
    }}>
        <View style={{ alignSelf: 'center', alignContent: 'center'}}>
            <Text style={styles.text}>Set Availability Time </Text>
        </View>
<View/>
      <View style={styles.container2}>
        <Text style= {styles.text2}>From:</Text>
        <Text style= {styles.text2}>To:</Text>
      </View>
        <View style={styles.container3}>
      <Picker
        selectedValue={selectedValue1}
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => setFromHour(itemValue)}
      >
        <Picker.Item label="1" value = "1" />
        <Picker.Item label="2" value ="2" />
        <Picker.Item label="3" value = "3" />
        <Picker.Item label="4" value ="4" />
        <Picker.Item label="5" value = "5" />
        <Picker.Item label="6" value ="6" />
        <Picker.Item label="7" value = "7" />
        <Picker.Item label="8" value ="8" />
        <Picker.Item label="9" value = "9" />
        <Picker.Item label="10" value ="10" />
        <Picker.Item label="11" value = "11" />
        <Picker.Item label="12" value ="12" />
        
      </Picker>
      <Text style= {styles.text1}>:</Text>
      <Picker
        selectedValue={selectedValue2}
        style={{ height: 50, width: 50}}
        onValueChange={(itemValue, itemIndex) => setFromMin(itemValue)}
      >
        {/* <Picker.Item label="00" value ="00" />
        <Picker.Item label="01" value = "01" />
        <Picker.Item label="02" value ="02" />
        <Picker.Item label="03" value = "03" />
        <Picker.Item label="04" value ="04" />
        <Picker.Item label="05" value = "05" />
        <Picker.Item label="06" value ="06" />
        <Picker.Item label="07" value = "07" />
        <Picker.Item label="08" value ="08" />
        <Picker.Item label="09 " value = "09" />
        <Picker.Item label="10" value ="10" />
        <Picker.Item label="11" value = "11" />
        <Picker.Item label="12" value ="12" />
        <Picker.Item label="13" value = "13" />
        <Picker.Item label="14" value ="14" />
        <Picker.Item label="15" value = "15" />
        <Picker.Item label="16" value ="16" />
        <Picker.Item label="17" value = "17" />
        <Picker.Item label="18" value ="18" />
        <Picker.Item label="19" value = "19" />
        <Picker.Item label="20" value ="20" />
        <Picker.Item label="21" value = "21" />
        <Picker.Item label="22" value ="22" />
        <Picker.Item label="23" value = "23" />
        <Picker.Item label="24" value ="24" />
        <Picker.Item label="25" value = "25" />
        <Picker.Item label="26" value ="26" />
        <Picker.Item label="27" value = "27" />
        <Picker.Item label="28" value ="28" />
        <Picker.Item label="29" value = "29" />
        <Picker.Item label="30" value ="30" />
        <Picker.Item label="31" value = "31" />
        <Picker.Item label="32" value ="32" />
        <Picker.Item label="33" value = "33" />
        <Picker.Item label="34" value ="34" />
        <Picker.Item label="35" value = "35" />
        <Picker.Item label="36" value ="36" />
        <Picker.Item label="37" value = "37" />
        <Picker.Item label="38" value ="38" />
        <Picker.Item label="39" value = "39" />
        <Picker.Item label="40" value ="40" />
        <Picker.Item label="41" value = "41" />
        <Picker.Item label="42" value ="42" />
        <Picker.Item label="43" value = "43" />
        <Picker.Item label="44" value ="44" />
        <Picker.Item label="45" value = "45" />
        <Picker.Item label="46" value ="46" />
        <Picker.Item label="47" value = "47" />
        <Picker.Item label="48" value ="48" />
        <Picker.Item label="49" value = "49" />
        <Picker.Item label="50" value ="50" />
        <Picker.Item label="51" value = "51" />
        <Picker.Item label="52" value ="52" />
        <Picker.Item label="53" value = "53" />
        <Picker.Item label="54" value ="54" />
        <Picker.Item label="55" value = "55" />
        <Picker.Item label="56" value ="56" />
        <Picker.Item label="57" value = "57" />
        <Picker.Item label="58" value ="58" />
        <Picker.Item label="59" value = "59" /> */}
        <Picker.Item label="00" value ="00" />
        <Picker.Item label="05" value = "05" />
        <Picker.Item label="10" value ="10" />
        <Picker.Item label="20" value ="20" />
        <Picker.Item label="25" value = "25" />
        <Picker.Item label="30" value ="30" />
        <Picker.Item label="35" value = "35" />
        <Picker.Item label="40" value ="40" />
        <Picker.Item label="45" value = "45" />
        <Picker.Item label="50" value ="50" />
        <Picker.Item label="55" value = "55" />
      </Picker>
      <Picker
        selectedValue={selectedValue3}
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => setFromAmPm(itemValue)}
      >
        <Picker.Item label="am" value ="am" />
        <Picker.Item label="pm" value = "pm" />
      </Picker>

<Text>            </Text>
      <Picker
        selectedValue={selectedValue4}
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => setToHour(itemValue)}
      >
        <Picker.Item label="1" value = "1" />
        <Picker.Item label="2" value ="2" />
        <Picker.Item label="3" value = "3" />
        <Picker.Item label="4" value ="4" />
        <Picker.Item label="5" value = "5" />
        <Picker.Item label="6" value ="6" />
        <Picker.Item label="7" value = "7" />
        <Picker.Item label="8" value ="8" />
        <Picker.Item label="9" value = "9" />
        <Picker.Item label="10" value ="10" />
        <Picker.Item label="11" value = "11" />
        <Picker.Item label="12" value ="12" />
      </Picker>
      <Text style= {styles.text1}>:</Text>
      <Picker
        selectedValue={selectedValue5}
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => setToMin(itemValue)}
      >
        <Picker.Item label="00" value ="00" />
        <Picker.Item label="05" value = "05" />
        <Picker.Item label="10" value ="10" />
        <Picker.Item label="20" value ="20" />
        <Picker.Item label="25" value = "25" />
        <Picker.Item label="30" value ="30" />
        <Picker.Item label="35" value = "35" />
        <Picker.Item label="40" value ="40" />
        <Picker.Item label="45" value = "45" />
        <Picker.Item label="50" value ="50" />
        <Picker.Item label="55" value = "55" />
      </Picker>
      <Picker
        selectedValue={selectedValue6}
        style={{ height: 50, width: 50 }}
        onValueChange={(itemValue, itemIndex) => setToAmPm(itemValue)}
      >
        <Picker.Item label="am" value ="am" />
        <Picker.Item label="pm" value = "pm" />
      </Picker>
    </View>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around', padding:20}}>
            <Button title="Cancel" onPress={toggleModal}/>
            <Button title="Save" />
        </View>
    </View>
  </Modal>

</Screen>
    );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row', 
    paddingBottom:15,
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: "space-between",
  },
  container1: {
    flexDirection:'row', 
    paddingBottom:20,
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'space-between'
  },
  container3: {
    flexDirection:'row', 
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'space-around'
  },
  container2: {
    flexDirection:'row', 
    fontSize: 35,
    marginLeft: 12,
    marginRight: 12,
    color: "#775E5E",
    justifyContent: 'space-between'
  },
  titleContainer: {
    paddingBottom:3,
    fontSize: 35,
    marginLeft: 12,
    color: "black"
    
  },
  introLabel: {
    fontSize: 13,
    color: 'gray',
    marginLeft: 12,
    paddingBottom:10
},
 text:{
  flexDirection:'row', 
  paddingBottom:15,
  fontSize: 35,
  marginLeft: 12,
  color: "#775E5E",
  justifyContent: 'flex-start'
 },
 text1:{
  flexDirection:'row', 
  paddingTop:90,
  fontSize: 25,
  color: "#775E5E",
  justifyContent: 'center'
 },
 text2:{
  flexDirection:'row', 
  fontSize: 25,
  color: "#775E5E",
  justifyContent: 'space-around',
  paddingHorizontal:70
 }

});

export default AvailabilityScreen;