import React, { useState, useEffect } from 'react'
import { View,  Image, Text, TouchableOpacity, StatusBar,  } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DataContext from '../../context/DataContext';

function ProductScreen({ navigation, route }) {

    let item = route.params;


    const { addToCart, increaseProducts, decreaseProducts, removeProduct, cartItems } = React.useContext(DataContext);

    function productToCart(item) {
        addToCart(item);
        navigation.navigate('Cart');
    }

    let vegIcon = <View style={{ borderRadius: 2, height: 20, width: 20, borderWidth: 2, borderColor: '#00923F', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ height: 12, width: 12, backgroundColor: '#00923F', borderRadius: 15 / 2 }} >

        </View>
    </View>;

    let nonVegIcon = <View style={{ borderRadius: 2, height: 20, width: 20, borderWidth: 2, borderColor: '#DA251E', justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ height: 12, width: 12, backgroundColor: '#DA251E', borderRadius: 15 / 2 }} >

        </View>
    </View>;
    return (
        <View style={{ flex: 1, }} >
            <StatusBar backgroundColor={'#fff'} barStyle="dark-content" animated={true} />
            <View style={{ flex: 0.07, paddingLeft: 10, flexDirection: 'row', marginTop: 0, justifyContent: 'flex-start', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                <Text style={{ paddingLeft: 10, fontSize: 16, }} >{item.title}</Text>
            </View>
            <View style={{ flex: 0.25, padding: 10, }} >
                <View
                    style={{
                        top: 10,
                        padding: 10,
                        elevation: 3,
                        borderBottomWidth: 1,
                        borderColor: '#ccc',
                        flexDirection: 'row',
                        paddingVertical: 10,
                        backgroundColor: '#fff',
                        borderRadius: 5
                    }} >
                    <View style={{ flex: 0.7 }} >
                        <View style={{ height: '14%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }} >
                            {item.type == 'veg' ? vegIcon : nonVegIcon}
                            <Image source={require('../../assests/extras/Star.png')} style={{ left: 10 }} />
                            <Text style={{ fontSize: 14, fontWeight: '500', color: '#FE7A00', left: 5 }} >  BESTSELLER</Text>
                        </View>
                        <View style={{ height: '16%', top: 5 }} >
                            <Text style={{ fontSize: 16, fontWeight: '800' }} >{item.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: '22%', alignItems: 'center', top: 5 }} >
                            <FontAwesome name="rupee" size={16} />
                            <Text style={{ fontSize: 16,fontWeight:'bold' }} > {item.price}</Text>
                        </View>
                        <View style={{ height: '55%', paddingVertical: 10 }} >
                            <Text style={{fontSize: 14,color:'gray'}} >{item.description}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 0.3,
                        height: '70%',
                        width: '30%',
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5
                    }} >
                        <Image style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'stretch',
                            borderRadius: 1,
                        }}
                            source={item.path}
                        />
                        {false > 0 ? <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 15, alignSelf: 'center', height: 30, width: 80, elevation: 2, backgroundColor: '#fff', borderRadius: 5, flexDirection: 'row', justifyContent: 'space-around' }} >
                            <AntDesign name="minus" size={20} onPress={() => {
                                if (item.quantity > 1) {
                                    decreaseProducts(ind)
                                }
                                else {
                                    removeProduct(ind);
                                    setSearch('');
                                    setSearchedProduct([]);
                                }
                            }} />
                            <Text style={{ color: '#2E9E07', fontSize: 18, fontWeight: 'bold' }} >{item.quantity}</Text>
                            <AntDesign name="plus" size={20} onPress={() => increaseProducts(ind)} />
                        </View> :
                            <TouchableOpacity onPress={() => { productToCart(item) }} style={{ justifyContent: 'center', alignItems: 'center', bottom: 15, alignSelf: 'center', height: 30, width: 80, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                <Text style={{ color: '#2E9E07', fontSize: 18, fontWeight: 'bold' }} >Add</Text>
                            </TouchableOpacity>
                        }

                    </View>
                </View>


                <View style={{ paddingVertical: 20 }} >
                    <Text style={{ fontSize: 22, fontWeight: 'bold', fontStyle: 'italic', color: 'gray' }} >Arafah</Text>
                    <Text style={{ fontSize: 14, fontStyle: 'italic', color: 'gray' }} >Made to feel the food Aroma</Text>
                </View>


            </View>


        </View>
    )
}

export default ProductScreen
