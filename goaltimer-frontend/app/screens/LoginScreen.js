import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Screen from '../components/Screen';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthContext from '../auth/context';
import api from '../api/api';
import endpoints from '../api/endpoints';
import * as yup from 'yup'

function LoginScreen({ navigation }) {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState();
    {/* To validate */ }
    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Please enter valid email")
            .required('Email Address is Required'),
        password: yup
            .string()
            .min(5, ({ min }) => `Password must be at least ${min} characters`)
            .required('Password is required'),
    })
    const handleSubmit = async (values) => {
        //let apiStr = endpoints.login + "{" + values.email + "}/{" + values.password +"}"
        let apiStr = endpoints.login
        api.baseURL.post(apiStr, { email: values.email, password: values.password }).then(response => {
            if (response.data != null) {
                console.log("Data: " + response.data);
                setUser(response.data);
            }
            else {
                Alert.alert(
                    "Login Failed",
                    "Invalid email or password",
                    [
                        {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                        },
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        });
    }
    useEffect(() => {
        console.log("==========Context====================");
        authContext.setUser(user);
        console.log(authContext.user);
    });
    return (
        <Screen>
            <View style={{ height: '100%', backgroundColor: '#E7ECF4' }}>
            <View style={{alignItems: 'center', marginTop: '5%'}}>
                    <Image style={{width: 35, height: 35, tintColor: 'brown'}} source={require('../assets/images/clock.png')}/>
                    <Text style = {styles.titleLabel}>Smart <Text style = {{color:'white'}}>Tracker</Text> </Text>
                    <Text style = {styles.introLabel}>Own Your Time </Text>
                </View>
                <View style={styles.loginBlock}>
                    <Formik
                        validationSchema={loginValidationSchema}
                        initialValues={{ email: '', password: '' }}
                        onSubmit={values => handleSubmit(values)}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, isValid, touched }) => (
                            <View style={{ marginTop: 10 }}>
                                {/* For email */}
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Email'
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />
                                {(errors.email && touched.email) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>}
                                {/* For password */}
                                <TextInput
                                    style={styles.textInput}
                                    placeholder='Password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry
                                />
                                {(errors.password && touched.password) && <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>}

                                <View style={styles.buttonContainer1}>
                                    <Button onPress={handleSubmit} title="Sign in" color='#775E5E' disabled={!isValid} />
                                </View>
                                <Button title="Don't have account yet?" onPress={() => navigation.navigate('SignUpScreen')} color='#85AAE6' />

                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </Screen>
    );
}
const styles = StyleSheet.create({
    buttonSection: {
        flex: 2,
        justifyContent: 'center',
        padding: 20,
        width: '80%',
    },
    buttonContainer1: {
        margin: 20,
        backgroundColor: '#FFFFFF',
        color: '#775E5E',
        padding: 10,
        marginTop: 35,
        borderRadius: 20,
        borderColor: '#B8DEDB',
        borderWidth: 1,
        shadowColor: '#0062FF',
        shadowRadius: 1,
        shadowOpacity: 3,
        shadowOffset: { width: 0, height: 2 }
    },
    buttonContainer2: {
        margin: 20,
        backgroundColor: '#85AAE6',
        color: '#FFFFFF',
        padding: 12,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderColor: '#0062FF',
        borderWidth: 1,
        shadowColor: '#0062FF',
        shadowRadius: 5,
        shadowOpacity: 5,
        shadowOffset: { width: 0, height: 2 }
    },
    introLabel: {
        fontSize: 24,
        color: 'gray'
    },
    titleLabel: {
        textAlign: "left",
        margin: 10,
        fontSize: 25,
        color: '#4D4F5C'
    },
    quote: {
        textAlign: "center",
        fontSize: 25,
        fontStyle: 'italic',
        color: '#8C9198'
    },
    miniInstruction: {
        textAlign: "left",
        marginLeft: 25,
        marginBottom: 10,
        fontSize: 14,
        color: '#6E7079'
    },
    textInput: {
        height: 60,
        margin: 7,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        borderColor: '#A7A7A7',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 3 },
        fontSize: 15
    },
    loginBlock: {
        margin: 10,
        height: 400,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderColor: '#A7A7A7',
        borderWidth: 1,
        shadowOffset: { width: 0, height: 2 }
    },
});

export default LoginScreen;