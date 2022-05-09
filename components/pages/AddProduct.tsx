import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableHighlight, Image, KeyboardAvoidingView } from 'react-native';
import Toast from 'react-native-toast-message';
import useAuth from '../../store/auth.store';
import useProduct from '../../store/prodcut.store';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const AddProduct: React.FC = () => {

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
            marginTop: 0,
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

        },

        inputLabel: {
            alignSelf: 'flex-start',
            marginLeft: 50,
            marginTop: 10,
            fontWeight: 'bold',
        }

    })

    const { editUser, loginResponse } = useAuth();

    const { addProduct, productResponse } = useProduct();

    useEffect(() => {
        if (productResponse === null) {

        } else {
            Object.keys(productResponse).slice(0, 1).map(key => {
                // alert(loginResponse[key]);
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: productResponse[key],
                });

            });
        }

    }, [productResponse])

    const [state, setState] = useState({
        title: '',
        description: '',
        price: '',
        image: '',
        user_id: loginResponse.user.id,
        endDate: '',
    });




    return (
        <>

            {
                <View style={styles.container}>

                    <Image
                        style={styles.appLogo}
                        source={require('../../assets/app_logo.png')}
                    />

                    <Text style={styles.inputLabel}>
                        Product name :
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setState({ ...state, title: text })}
                    />

                    <Text style={styles.inputLabel}>
                        Product description :
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor="gray"

                        onChangeText={(text) => setState({ ...state, description: text })}
                    />

                    <Text style={styles.inputLabel}>
                        Product Price :
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        placeholderTextColor="gray"

                        keyboardType="numeric"
                        onChangeText={(text) => setState({ ...state, price: text })}
                    />

                    <Text style={styles.inputLabel}>
                        Product image :
                    </Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Image"
                        placeholderTextColor="gray"

                        onChangeText={(text) => setState({ ...state, image: text })}
                    />

                    <Text style={styles.inputLabel}>
                        Biding end date :
                    </Text>

                    

                    <TextInput
                        style={styles.input}
                        placeholder="yyyy-mm-dd"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setState({ ...state, endDate: text })}
                    />


                    <TouchableHighlight
                        style={styles.submit}
                        onPress={() => addProduct(state.title, state.description, state.price, state.image, state.user_id, state.endDate)}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>Add</Text>
                    </TouchableHighlight>



                </View>
            }

        </>
    )
};

export default AddProduct;