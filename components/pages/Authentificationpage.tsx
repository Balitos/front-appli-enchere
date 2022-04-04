import { View, Text, TextInput, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import ShowProfile from '../services/ShowProfile';

const Authentificationpage: React.FC = () => {


    const [state, setState] = useState({
        email: '',
        password: '',
    })

    return (
        <View>
            <TextInput
                style={{ height: 40 }}
                placeholder="Email"
                onChangeText={(text) => setState({...state, email: text })}
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="Password"
                onChangeText={(text) => setState({...state, password: text })}
            />

            <Button
                title="Login"
                onPress={() => ShowProfile.signIn(state.email, state.password)}
            />
        </View>
    );

    ;

};

export default Authentificationpage;