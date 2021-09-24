
import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import SettingButton from '../components/SettingButton';
;

function SettingScreen(props) {
    return (
        <View style={styles.setting}>
            <Text style={styles.titleContainer}>Account</Text>
            <Text style={styles.introLabel}>Manage Your Account</Text>
            <View style={styles.profile}>
                <Image style={styles.profile_picture} source={require('../assets/images/user.png')} />
                <View style={styles.userInfo}>
                    <Text style={styles.usernameText}> John Smith</Text>
                </View>
            </View>
            <SettingButton title="Export all my Data" />
            <SettingButton title="Delete all my Data" />
            <SettingButton title="Dark Mode" />
            <SettingButton title="Delete Account" />
            <SettingButton title="Logout" />
        </View>
    )
}
const styles = StyleSheet.create({

    setting: {
        width: '98%',
        height: '90%',
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 20,
        margin: 50,
        flexDirection: 'column',

    },
    profile: {
        width: '90%',
        height: '20%',
        alignSelf: 'center',
        borderColor: '#A7A7A7',
        justifyContent: 'center',
        borderRadius: 20,
    },
    profile_picture: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderColor: '#A7A7A7',
        borderColor: '#3B97ED',
        borderWidth: 3,
        borderRadius: 70,
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
        fontSize: 35,
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