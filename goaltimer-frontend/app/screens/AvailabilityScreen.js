import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Switch, Dimensions, Image, TextInput} from 'react-native';
import Screen from '../components/Screen';
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
      <Button title="Edit" color = '#775E5E' borderColor = '#0062FF'/>
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF'/>
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF'/>
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF'/>
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF'/>
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' />
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
        <Button title="Edit" color = '#775E5E' borderColor = '#0062FF' />
        </View>
        </View>
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
    justifyContent: "space-between"
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
 }

});

export default AvailabilityScreen;