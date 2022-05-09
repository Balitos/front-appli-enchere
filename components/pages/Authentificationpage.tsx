import React, { useEffect, useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, TouchableHighlight, Image, Keyboard, TouchableWithoutFeedback, SafeAreaView } from 'react-native';
import useAuth from '../../store/auth.store';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import useProduct from '../../store/prodcut.store';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../Card/Card';



const Authentificationpage: React.FC = ({ }) => {

    const navigation = useNavigation();

    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const { login, loginResponse, logout } = useAuth();
    const { getuserProducts, getProduct, productResponse, getuserProductsResponse } = useProduct();

    const DismissKeyboardHOC = (Comp) => {
        return ({ children, ...props }) => (
            <TouchableWithoutFeedback onPress={getProduct} accessible={false}>
                <Comp {...props}>
                    {children}
                </Comp>
            </TouchableWithoutFeedback>
        );
    };
    const DismissKeyboardView = DismissKeyboardHOC(View)




    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         getProduct();
    //     }, 2000);

    //     return () => clearInterval(interval);
    // }, [])

    useEffect(() => {
        if (loginResponse?.access_token != null) {
            const userId = loginResponse.user.id;
            const interval = setInterval(() => {
                getuserProducts(userId);
            }, 2000);

            return () => clearInterval(interval);
        } else {
            
        }


        
    }, [])

    useEffect(() => {
        if (loginResponse === null) {

        } else {
            if (loginResponse?.access_token != null) {
                
            } else {
                Object.keys(loginResponse).slice(0, 1).map(key => {
                    // alert(loginResponse[key]);
                    Toast.show({
                        type: 'info',
                        position: 'bottom',
                        text1: loginResponse[key]
                    });
    
                });
            }
            
        }

    }, [loginResponse])



    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            marginVertical: 12,
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',

        },

        container2: {
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            display: 'flex',
            backgroundColor: 'white',
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
            color: 'black',
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
            width: 220,
            height: 200,
            marginTop: 150,
            marginBottom: 20,
        },

        registerText: {
            marginTop: 20,

        },

        buttonsContainer: {
            display: 'flex',
            position: 'absolute',
            bottom: 10,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'center',
            marginLeft: 20,
        },

        username: {
            fontSize: 40,
            marginTop: 100,
            alignSelf: 'center',

        },

        email: {
            fontSize: 15,
            textAlign: 'left',
            marginTop: 50,
            marginLeft: 20,

        },

        profileButtons: {
            margin: 10,
            paddingLeft: 25,
            paddingRight: 25,
            paddingTop: 10,
            paddingBottom: 10,
            borderWidth: 1,
            textAlign: 'center',
            borderRadius: 20,
            backgroundColor: '#2159c8',
            borderColor: '#fff',
        },
        cardsContainer: {
            display: 'flex',
            flexDirection: 'column',
        },
        userProductContainer: {
            width: '100%',
            height: '55%',
            marginVertical: 12,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
        },
        myProducts: {
            fontSize: 15,
            textAlign: 'left',
            marginTop: 10,
            marginLeft: 20,
        }

    })



    // const productItems = getProductResponse.map((item, index) => {
    //     return <Text style={styles.email}>
    //         <Text style={{ fontWeight: "bold" }}> Product name :</Text> <Text key={index}>{item.title}{item.description}{item.price}</Text>
    //     </Text>
    // });

    // const userProductItems = getuserProductsResponse.map((item, index) => {
    //     return <Text style={styles.email}>
    //         <Text style={{ fontWeight: "bold" }}> Product name :</Text> <Text key={index}>{item.title}{item.description}{item.price}</Text>
    //     </Text>
    // });



    return (

        <>

            {
                loginResponse?.access_token != null
                    ?

                    <View style={styles.container2}>
                        <Text style={styles.username}>
                            Welcome {loginResponse.user.name} !
                        </Text>
                        <Text style={styles.email}>
                            <Text style={{ fontWeight: "bold" }}> Email :</Text> {loginResponse.user.email}
                        </Text>

                        <Text style={styles.myProducts}>
                            <Text style={{ fontWeight: "bold" }}> My products :</Text>
                        </Text>

                        <SafeAreaView
                            style={styles.userProductContainer}>
                            <FlatList
                                columnWrapperStyle={{ justifyContent: 'space-between' }}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{
                                    marginTop: 10,
                                    paddingBottom: 50,
                                }}
                                numColumns={2}
                                data={getuserProductsResponse}
                                renderItem={({ item }) => {
                                    return <Card product={item} isMine={true} />;
                                }}
                            />
                        </SafeAreaView>


                        <View style={styles.buttonsContainer}>
                            <TouchableHighlight
                                onPress={logout}
                                style={styles.profileButtons}
                            >
                                <Text style={styles.submitText}>Logout</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.profileButtons}
                                onPress={() => navigation.navigate('Edit User')}>
                                <Text style={styles.submitText}>Edit user</Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                style={styles.profileButtons}
                                onPress={() => navigation.navigate('Add Product')}>
                                <Text style={styles.submitText}>Add a product</Text>
                            </TouchableHighlight>

                        </View>

                    </View>

                    :

                    <View style={styles.container}>

                        <Image
                            style={styles.appLogo}
                            source={require('../../assets/app_logo.png')}
                        />

                        <TextInput
                            style={styles.input}
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

                        <TouchableHighlight
                            style={styles.submit}
                            onPress={() => login(state.email, state.password)}
                            underlayColor='#fff'>
                            <Text style={styles.submitText}>Login</Text>
                        </TouchableHighlight>

                        <Text
                            style={styles.registerText}
                            onPress={() => navigation.navigate('Register')}>
                            Don't have an account yet ? Register Here

                        </Text>

                    </View>
            }

        </>
    )



};


export default Authentificationpage;