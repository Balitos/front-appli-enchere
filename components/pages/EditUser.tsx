import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import useAuth from '../../store/auth.store';

const EditUser: React.FC = () => {

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            marginVertical: 12,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',

        },
        input: {
            height: 40,
            margin: 15,
            borderRadius: 100,
            padding: 10,
            marginBottom: 0,
            borderColor: 'gray',
            borderWidth: 1,
            width: '80%',
        },

        submit: {
            marginTop: 20,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 10,
            paddingBottom: 10,
            borderWidth: 1,
            width: '30%',
            textAlign: 'center',
            borderRadius: 20,
            backgroundColor: '#2159c8',
            borderColor: '#fff',
        },

        submitText: {
            color: '#fff',
            textAlign: 'center',
        },

        appLogo: {
            width: 115,
            height: 105,
            marginTop: 50,
            marginBottom: 20,
        },

        registerText: {
            marginTop: 20,

        }

    })

    const { editUser, loginResponse } = useAuth();

    const [state, setState] = useState({
        id: loginResponse.user.id,
        token: loginResponse.access_token,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    });

    return (
        <>

            {
                <View style={styles.container}>

                    <Image
                        style={styles.appLogo}
                        source={require('../../assets/app_logo.png')}
                    />


                    <TextInput
                        style={styles.input}
                        defaultValue={loginResponse.user.name}
                        placeholder="Name"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setState({ ...state, name: text })}
                    />

                    <TextInput
                        style={styles.input}
                        defaultValue={loginResponse.user.email}
                        placeholder="Email"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setState({ ...state, email: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onChangeText={(text) => setState({ ...state, password: text })}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="gray"
                        secureTextEntry={true}
                        onChangeText={(text) => setState({ ...state, passwordConfirmation: text })}
                    />

                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => editUser(state.id, state.name, state.email, state.password, state.passwordConfirmation, state.token)}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Edit</Text>
                    </TouchableHighlight>



                </View>
            }

        </>
    )
};

export default EditUser;