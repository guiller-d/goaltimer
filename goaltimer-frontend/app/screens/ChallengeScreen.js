import React, { useEffect, useState, useContext} from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import Challenge from '../components/Challenge';
import api from '../api/api';
import endpoints from '../api/endpoints';
import AuthContext from '../auth/context';

function ChallengeScreen(props) {
    const quote = "“Own your Time”"
    const author = " — Goal Timer"
    const [challenge, setChallenge] = useState(false);
    const [array, setArray] = useState([]);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        if (authContext.user != null) {
            let apiStr = endpoints.challenges;
            api.baseURL.get(apiStr).then(response => {
                if (response.data != null) {
                    setArray(response.data);
                }
            });
        }
        else {
            return;
        }

    }, [array]);
    const updateChallenge = (id, active) => {
        if (authContext.user != null) {
            let apiStr = endpoints.updateChallenge;
            api.baseURL.post(apiStr, { isActive: !active, userHashID: authContext.user.hashID, id: id }).then(response => {
                if (response.data != null) {

                }
            });
        }
        else {
            return;
        }

    }
    return (
        <Screen>
            <View style={{ width: '94%', backgroundColor: 'white', alignSelf: 'center', borderRadius: 15, marginTop: 20, }}>
                <View style={{ width: '90%', left: 10, marginBottom: 10, }}>
                    <Text style={styles.text1}>Qoute of the Day </Text>
                    <Text style={styles.text4}>Words of Motivation to go up against the challenges in front of you </Text>
                </View>
                <View style={{ width: '90%', alignItems: 'center', alignSelf: 'center' }}>
                    <Text style={styles.qoute}> {quote}</Text>
                    <Text style={styles.author}> {author} </Text>
                </View>
                <View style={{ height: 10 }}>

                </View>
            </View>
            <View style={{
                width: '94%',
                backgroundColor: 'white',
                alignSelf: 'center',
                marginTop: 10,
                borderRadius: 15,
            }}>

                <View>
                    <View style={{ width: '80%', marginBottom: 10, justifyContent: 'center', marginTop: 10, }}>
                        <Text style={styles.text1}>   Start Challenge </Text>
                    </View>
                    <View>
                        <FlatList key={'listView'} style={{ alignSelf: 'center' }} data={array} showsVerticalScrollIndicator={false} keyExtractor={array => array.name.toString()}
                            renderItem={({ item }) =>
                                <Challenge challengeName={item.name} active={item.active} challengeDescription={item.description} onPress={() => updateChallenge(item.id, item.active)} />
                            }
                        />
                    </View>
                </View>
            </View>

        </Screen>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    qoute: {
        fontStyle: 'italic',
        fontSize: 22,
        color: '#494D53',
        fontFamily: 'Avenir-Book'
    },
    author: {
        fontStyle: 'italic',
        fontSize: 24,
        color: '#494D53',
        fontFamily: 'Avenir-Book'
    },
    text1: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'Avenir-Medium'
    },
    text2: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Medium'
    },
    text3: {
        fontSize: 16,
        color: '#85AAE6',
        fontFamily: 'Avenir-Medium'
    },
    text4: {
        fontSize: 14,
        color: 'gray',
        fontFamily: 'Avenir-Book'
    },
    iconSize: {
        height: 40,
        width: 40,
        tintColor: 'gray'
    }
});

export default ChallengeScreen;