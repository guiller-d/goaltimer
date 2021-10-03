
import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import SettingButton from '../components/SettingButton';
import Screen from '../components/Screen';

function SettingScreen(props) {
    return (
        <Screen>
            <View style={styles.setting}>
                <Text style={styles.titleContainer}>Account</Text>
                <Text style={styles.introLabel}>Manage Your Account</Text>
                <View style={styles.profile}>
                    <Image style={styles.profile_picture} source={require('../assets/images/user.png')} />
                    <View style={styles.userInfo}>
                        <Text style={styles.usernameText}> John Smith</Text>
                    </View>

                    <View style={{height: '60%', marginTop: 30,justifyContent: 'flex-end'}}>
                        <SettingButton title="Export all my Data" />
                        <SettingButton title="Delete all my Data" />
                        <SettingButton title="Dark Mode" />
                        <SettingButton title="Delete Account" />
                        <SettingButton title="Logout" />
                    </View>
                   
                </View>

            </View>
        </Screen>

    )
}
const styles = StyleSheet.create({

    setting: {
        width: '98%',
        height: '100%',
        alignSelf: 'center',
  
    },
    profile: {
        width: '99%',
        alignSelf: 'center',
        borderColor: '#A7A7A7',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 0.5,
        borderRadius: 20,
        flexDirection: 'column',
        backgroundColor: 'white'
    },
    profile_picture: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderColor: '#A7A7A7',
        borderWidth: 2,
        borderRadius: 20,
        margin: 5
    },
    usernameText: {
        fontSize: 18,
        color: 'gray',
        fontWeight: 'bold'
    },
    userInfo: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    preview_stats: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        paddingBottom: 3,
        fontSize: 20,
        marginLeft: 12,
        color: "black"

    },
    introLabel: {
        fontSize: 13,
        color: 'gray',
        marginLeft: 12,
        paddingBottom: 10
    }


});


export default SettingScreen;