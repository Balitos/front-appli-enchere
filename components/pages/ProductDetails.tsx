import React, { useEffect, useState } from 'react';
import useAuth from '../../store/auth.store';
import useProduct from '../../store/prodcut.store';
import useEnchere from '../../store/encheres.store';
import { View, SafeAreaView, Image, Text, TextInput, TouchableWithoutFeedback, Keyboard, StyleSheet, TouchableOpacity, TouchableHighlight, FlatList } from 'react-native';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';



const ProductDetails = ({ route }) => {

  const navigation = useNavigation();
  const product = route.params.product;

  const { login, loginResponse, logout } = useAuth();
  const { deleteProduct, winningBid } = useProduct();
  const { enchereResponse, addEnchere, getEnchere, getEnchereResponse, getHighestBid, getHighestBidResponse } = useEnchere();

  const isMine = route.params.isMine;

  useEffect(() => {
    if (loginResponse?.access_token != null) {
      const productId = product.id;

      const interval = setInterval(() => {
        getEnchere(productId);
      }, 4000);

      return () => clearInterval(interval);
    } else {

    }

  }, [])

  useEffect(() => {
    if (loginResponse?.access_token != null) {
      const productId = product.id;

      const interval = setInterval(() => {
        getHighestBid(productId);
      }, 4000);

      return () => clearInterval(interval);
    } else {

    }

  }, [])


  useEffect(() => {
    if (enchereResponse === null) {

    } else {
      Object.keys(enchereResponse).slice(0, 1).map(key => {
        // alert(loginResponse[key]);
        Toast.show({
          type: 'info',
          position: 'bottom',
          text1: enchereResponse[key],
        });

      });
    }

  }, [enchereResponse])

  const [state, setState] = useState({
    user_id: loginResponse.user.id,
    winningUserId: getHighestBidResponse[0]?.user_id,
    product_id: product.id,
    value: '',
  });

  const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
        }}>

        <View style={style.imageContainer}>
          <Image
            style={style.image}
            source={{
              uri: product.image,
            }}
          />
        </View>
        <View style={style.detailsContainer}>
          <View
            style={{
              marginLeft: 20,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
          </View>
          <View
            style={{
              marginLeft: 20,
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{product.title}</Text>
            <View style={style.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>

                {/* {product.price}€ */}
                {getHighestBidResponse[0]?.value > product.price ? getHighestBidResponse[0]?.value : product.price}€
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Description</Text>
            <Text
              style={{
                color: 'grey',
                fontSize: 16,
                lineHeight: 22,
                marginTop: 10,
              }}>
              {product.description}

            </Text>


            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TextInput
                  style={style.textInputStyle}
                  placeholder="50 €"
                  placeholderTextColor="#60605e"
                  onChangeText={(text) => setState({ ...state, value: text })}

                />
              </View>
              <TouchableOpacity onPress={() => addEnchere(state.user_id, state.product_id, state.value)}>


                <View style={style.buyBtn}

                >
                  <Text
                    style={{ color: "white", fontSize: 16, fontWeight: 'bold' }}>
                    Renchérire
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            {
              isMine === true ?
                <View style={style.buttonsContainer}>
                  <TouchableHighlight
                    onPress={() => navigation.navigate('Product Edit', product)}
                    style={style.profileButtons}
                  >
                    <Text style={style.submitText}>Edit Product</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => deleteProduct(state.product_id)}
                    style={style.profileButtons}
                    >
                    <Text style={style.submitText}>Delete</Text>
                  </TouchableHighlight>

                  <TouchableHighlight
                    onPress={() => winningBid(state.product_id, state.winningUserId)}
                    style={style.profileButtons}
                    >
                    <Text style={style.submitText}>Accept bid</Text>
                  </TouchableHighlight>
                </View>

                :
                <></>
            }



            <View style={style.bidsMainContainer}>
              <Text
                style={{ color: "black", fontSize: 16, fontWeight: 'bold' }}>
                Biddings :
              </Text>
              <SafeAreaView
                style={style.bidsContainer}>
                <FlatList

                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    marginTop: 10,
                    paddingBottom: 50,
                  }}
                  numColumns={1}
                  data={getEnchereResponse}
                  renderItem={({ item }) => {
                    return <Text style={style.bidsValue} >User {item.id} : {item.value}€</Text>;
                  }}
                />
              </SafeAreaView>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  submitText: {
    color: '#fff',
    textAlign: 'center',
},
  imageContainer: {
    flex: 0.30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    flex: 0.55,
    backgroundColor: '#F1F1F1',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 30,
    paddingTop: 30,
  },
  textInputStyle: {
    width: 250,
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  buyBtn: {
    width: 100,
    height: 50,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
  },
  priceTag: {
    backgroundColor: 'green',
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  image: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  bidsMainContainer: {
    marginTop: 25,
    marginLeft: 10,
  },
  bidsContainer: {
    width: '100%',
    height: '100%',
    marginVertical: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  bidsValue: {
    marginTop: 10,
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
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ProductDetails;