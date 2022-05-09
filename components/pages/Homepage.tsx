import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, Image, StyleSheet } from 'react-native';
import useAuth from '../../store/auth.store';
import useProduct from '../../store/prodcut.store';
// import logout from '../services/Logout';
// import { logoutFunction } from '../services/Logout';
import Card from '../Card/Card';


const Homepage: React.FC = () => {

    const styles = StyleSheet.create({
        homeContainer: {
            height: '100%',
            width: '100%',

        },
        appLogo: {
            width: 115,
            height: 105,
            marginTop: 50,
            marginBottom: 20,
            alignSelf: 'center',
        },
        pageTitle: {
            fontSize: 26,
            fontWeight: 'bold',
            marginTop: 20,
    
        }


    })


    const { login, loginResponse, logout } = useAuth();
    const { getuserProducts, getProduct, getProductResponse, getuserProductsResponse } = useProduct();

    useEffect(() => {
        if (loginResponse?.access_token != null) {
            const interval = setInterval(() => {
                getProduct();
            }, 2000);

            return () => clearInterval(interval);
        } else {

        }

    }, [])


    return (
        <View style={styles.homeContainer}>
            <SafeAreaView
                style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
                <Image
                    style={styles.appLogo}
                    source={require('../../assets/app_logo.png')}
                />

                <Text style={styles.pageTitle}>Products :</Text>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: 10,
                        paddingBottom: 50,
                    }}
                    numColumns={2}
                    data={getProductResponse}
                    renderItem={({ item }) => {
                        return <Card product={item} isMine={false} />;
                    }}
                />
            </SafeAreaView>
        </View>

    )




};

export default Homepage;