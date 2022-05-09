import React from 'react';
import { Text, View, StyleSheet, Image, Button, Alert, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width / 2 - 30;


const Card = ({product, isMine}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
        
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Product Details', {product, isMine})}>
            <View style={cardStyles.card}>
                <View
                    style={{
                        height: 100,
                        alignItems: 'center',
                    }}>
                    <Image
                        style={cardStyles.image}
                        source={{
                            uri: product.image,
                        }}
                    />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 10 }}>
                        {product.title}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                        {product.price} €
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 5,
                        backgroundColor: '#2159c8',
                        borderRadius: 30
                    }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold', padding: 5,  color: 'white' }}>
                    {product.endDate}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const cardStyles = StyleSheet.create({
    card: {
        height: 225,
        backgroundColor: '#F1F1F1',
        width,
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
    },
})

export default Card;