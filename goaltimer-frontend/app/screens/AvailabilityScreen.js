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
  const [selectedValue, setSelectedValue] = useState("12:00 am");
  const [selectedValue1, setSelectedValue1] = useState("12:00 am");

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
        height: 400,
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
        <View style={{ alignSelf: 'center', alignContent: 'flex-start'}}>
            <Text style={styles.text}>Set Availability Time </Text>
        </View>
<View/>

        <View style={styles.container1}>
        <Text style= {styles.text1}>From:</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 120 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="12:00 am" value ="12:00 am" />
        <Picker.Item label="1:00 am" value = "1:00 am" />
        <Picker.Item label="2:00 am" value ="2:00 am" />
        <Picker.Item label="3:00 am" value = "3:00 am" />
        <Picker.Item label="4:00 am" value ="4:00 am" />
        <Picker.Item label="5:00 am" value = "5:00 am" />
        <Picker.Item label="6:00 am" value ="6:00 am" />
        <Picker.Item label="7:00 am" value = "7:00 am" />
        <Picker.Item label="8:00 am" value ="8:00 am" />
        <Picker.Item label="9:00 am" value = "9:00 am" />
        <Picker.Item label="10:00 am" value ="10:00 am" />
        <Picker.Item label="11:00 am" value = "11:00 am" />
        <Picker.Item label="12:00 pm" value ="12:00 pm" />
        <Picker.Item label="1:00 pm" value = "1:00 pm" />
        <Picker.Item label="2:00 pm" value ="2:00 pm" />
        <Picker.Item label="3:00 pm" value = "3:00 pm" />
        <Picker.Item label="4:00 pm" value ="4:00 pm" />
        <Picker.Item label="5:00 pm" value = "5:00 pm" />
        <Picker.Item label="6:00 pm" value ="6:00 pm" />
        <Picker.Item label="7:00 pm" value = "7:00 pm" />
        <Picker.Item label="8:00 pm" value ="8:00 pm" />
        <Picker.Item label="9:00 pm" value = "9:00 pm" />
        <Picker.Item label="10:00 pm" value ="10:00 pm" />
        <Picker.Item label="11:00 pm" value = "11:00 pm" />
      </Picker>

      <Text style= {styles.text1}>To:</Text>
      <Picker
        selectedValue={selectedValue1}
        style={{ height: 50, width: 120 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue1(itemValue)}
      >
        <Picker.Item label="12:00 am" value ="12:00 am" />
        <Picker.Item label="1:00 am" value = "1:00 am" />
        <Picker.Item label="2:00 am" value ="2:00 am" />
        <Picker.Item label="3:00 am" value = "3:00 am" />
        <Picker.Item label="4:00 am" value ="4:00 am" />
        <Picker.Item label="5:00 am" value = "5:00 am" />
        <Picker.Item label="6:00 am" value ="6:00 am" />
        <Picker.Item label="7:00 am" value = "7:00 am" />
        <Picker.Item label="8:00 am" value ="8:00 am" />
        <Picker.Item label="9:00 am" value = "9:00 am" />
        <Picker.Item label="10:00 am" value ="10:00 am" />
        <Picker.Item label="11:00 am" value = "11:00 am" />
        <Picker.Item label="12:00 pm" value ="12:00 pm" />
        <Picker.Item label="1:00 pm" value = "1:00 pm" />
        <Picker.Item label="2:00 pm" value ="2:00 pm" />
        <Picker.Item label="3:00 pm" value = "3:00 pm" />
        <Picker.Item label="4:00 pm" value ="4:00 pm" />
        <Picker.Item label="5:00 pm" value = "5:00 pm" />
        <Picker.Item label="6:00 pm" value ="6:00 pm" />
        <Picker.Item label="7:00 pm" value = "7:00 pm" />
        <Picker.Item label="8:00 pm" value ="8:00 pm" />
        <Picker.Item label="9:00 pm" value = "9:00 pm" />
        <Picker.Item label="10:00 pm" value ="10:00 pm" />
        <Picker.Item label="11:00 pm" value = "11:00 pm" />
      </Picker>
    </View>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
<Text/>
        <View style={{ flexDirection: 'row', width: '80%', justifyContent: 'space-around' }}>
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
    color: "#775E5E",
    justifyContent: "space-between",
  },
  container1: {
    flexDirection:'row', 
    paddingBottom:15,
    fontSize: 35,
    marginLeft: 12,
    color: "#775E5E",
    justifyContent: 'space-between'
  },
  container2: {
    flexDirection:'row', 
    padding:15,
    fontSize: 35,
    marginLeft: 12,
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
  marginLeft: 12,
  color: "#775E5E",
  justifyContent: 'flex-start'
 }

});

export default AvailabilityScreen;