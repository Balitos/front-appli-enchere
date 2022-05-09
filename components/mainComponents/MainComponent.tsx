import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import useAuth from '../../store/auth.store';
import { Homepage, Register, EditUser, AddProduct, EditProduct } from '../pages';

import Authentificationpage from '../pages/Authentificationpage';
import { Button, TextInput, View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import ProductDetails from '../pages/ProductDetails';
console.disableYellowBox = true;
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginRegister() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Your Profile" component={Authentificationpage} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Edit User" component={EditUser} />
            <Stack.Screen name="Add Product" component={AddProduct} />


        </Stack.Navigator>

    );
}




function HomePageProduct() {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home Page" component={Homepage} options={{
                headerShown: false,
            }} />
            <Stack.Screen name="Product Details" component={ProductDetails} />
            <Stack.Screen name="Product Edit" component={EditProduct} />

        </Stack.Navigator>

    );
}


const MainComponent = () => {

    const homeName = 'Home';
    const authName = 'Profile';

    const { loginResponse } = useAuth()

    return (
        <>

            {
                loginResponse?.access_token != null
                    ?
                    <NavigationContainer>
                        <Tab.Navigator
                            initialRouteName={homeName}
                            screenOptions={({ route }: any) => ({
                                tabBarIcon: () => {
                                    let routeName = route.name;
        

                                    if (routeName === homeName) {
                                        return (
                                            <View>
                                                <FontAwesomeIcon icon={faHome} />
                                            </View>
                                        )
                                    } else if (routeName === authName) {
                                        return (
                                            <View>
                                                <FontAwesomeIcon icon={faUser} />
                                            </View>
                                        )
                                    }
                                },
                            })}

                        >
                            <Tab.Screen

                                name={homeName}
                                component={HomePageProduct}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <Tab.Screen

                                name="Profile"
                                component={LoginRegister}
                                options={{
                                    headerShown: false,
                                }}
                            />
                        </Tab.Navigator>

                    </NavigationContainer>


                    :

                    <NavigationContainer>
                        <Stack.Navigator>
                            <Tab.Screen
                                name="Profile"
                                component={LoginRegister}
                                options={{
                                    tabBarShowLabel: false,
                                    headerShown: false,
                                    tabBarButton: () => null,
                                
                                }}
                            />

                        </Stack.Navigator>

                    </NavigationContainer>
            }

        </>
    )
}


export default MainComponent;