import React from 'react';
import { NavigationContainer, TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { Homepage } from '../pages';
import Authentificationpage from '../pages/Authentificationpage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faHome, faUser } from '@fortawesome/free-solid-svg-icons';
import { createStackNavigator } from '@react-navigation/stack';
import ProductPage from '../pages/product/ProductPage';


const MainComponent = () => {

    const homeName = 'Home';
    const authName = 'Profile';
    const cardDetails = 'ProductPage';
    const runningName = 'Running';

    const Tab = createBottomTabNavigator();

    return(
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName}
            screenOptions={({route}: any) => ({
                tabBarIcon: () => {
                    let routeName = route.name;
                    let iconName: string;

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
                <Tab.Screen name={homeName} component={Homepage} />
                <Tab.Screen name={authName} component={Authentificationpage} />
                <Tab.Screen name={cardDetails} component={ProductPage} />
            </Tab.Navigator>
        </NavigationContainer>

    )
}

export default MainComponent;