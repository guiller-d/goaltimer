
import React, { Component, useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SettingButton from '../components/SettingButton';
;

function SettingScreen(props) {
    return (
        <View style={styles.setting}>
            <View style={styles.profile}>

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
        width: '95%',
        height: '90%',
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 20,
        margin: 50,
        flexDirection: 'column',

    },
    profile: {
        width: '90%',
        height: '30%',
        alignSelf: 'center',
        borderColor: '#A7A7A7',
        borderWidth: 1,
        margin: 20,
        borderRadius: 20,
    },


});


export default SettingScreen;