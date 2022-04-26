import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Card  from '../Card/Card';


const Homepage: React.FC = () => {
    const [product, setProduct] = useState([
        {name: 'Chaussure', price: '23', key: '1'},
        {name: 'Voiture', price: '23', key: '2'},
        {name: 'Tee-shirt', price: '23', key: '3'},
        {name: 'Helicoptere', price: '23', key: '4'},
        {name: 'Blousson',  price: '23', key: '5'},
    ])
  return (
      <View>
          <ScrollView>
              {
                  product.map(item => (
                          <Card title={item.name} price={item.price} key={item.key}/>
                  ))
              }
          </ScrollView>
      </View>
  );
};

export default Homepage;