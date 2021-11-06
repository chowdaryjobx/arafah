import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { OffersData, dishesData, toppicksforyou, dishes } from '../../data/data';
import { FlatList } from 'react-native-gesture-handler';
import DataContext from '../../context/DataContext';

function HomeScreen({ navigation }) {

    const [isLoading, setIsLoading] = useState(true);
    const { cartItems } = React.useContext(DataContext);


    let total = 0;
    cartItems.map((item) => {
        total += item.quantity * item.price
    })

    return (
        <View style={{ flex: 1, }} >
            {/*================ Header  ================= */}

            <LinearGradient
                colors={['#61B743', '#23A772']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                    // backgroundColor: COLORS.primary
                }} >
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 13

                }}  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                        <MaterialCommunityIcons name="map-marker-outline" size={20} color="#fff" />
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                    </View>

                    <Text style={{ bottom: 5, fontSize: 14, paddingLeft: 20, color: '#fff' }} >2-115, jobxrobot, sainikpuri</Text>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('Profile') }} >
                    <View style={{
                        height: 0.065 * SIZES.height,
                        width: 0.065 * SIZES.height,
                        borderRadius: 0.065 * SIZES.height / 2,
                        backgroundColor: COLORS.white,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }} >
                        <MaterialIcons name="person" size={30} />
                    </View>
                </TouchableOpacity>

            </LinearGradient>
            {/*================End Of Header  ================= */}

                <ScrollView showsVerticalScrollIndicator={false} >

                    <View style={{ height: 0.01 * SIZES.height, width: SIZES.width, backgroundColor: '#fff' }} >

                    </View>
                    <View style={{ elevation: 5, height: 0.31 * SIZES.height, width: SIZES.width, backgroundColor: '#D7FFB7' }} >
                        <View >
                            <Text style={{ top: 10, paddingLeft: 20, fontSize: 16, fontWeight: '500' }} >Offers for you</Text>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ height: 0.35 * SIZES.height, top: 15 }} >

                                {
                                    OffersData.map((item, i) => {

                                        return (
                                            <TouchableOpacity onPress={() => { alert(i) }} key={i} style={{
                                                height: 0.22 * SIZES.height,
                                                width: 0.17 * SIZES.height,
                                                backgroundColor: '#D7FFB7',
                                                top: 10,
                                                borderRadius: 3,
                                                marginLeft: 30,
                                                elevation: 10
                                            }}>
                                                <Image

                                                    style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        resizeMode: 'stretch',
                                                        borderRadius: 1,
                                                    }}
                                                    source={item.path}
                                                    onLoadEnd={() => { setIsLoading(false) }}

                                                />
                                                {isLoading ? <ActivityIndicator /> : null}
                                            </TouchableOpacity>
                                        )
                                    })
                                }



                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderColor: '#ccc', width: SIZES.width, backgroundColor: '#fff', paddingVertical: 10 }} >
                        <View >
                            <Text style={{ top: 10, paddingLeft: 20, fontSize: 16, fontWeight: '500' }} >Order again</Text>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ top: 15 }} >

                                {
                                    dishesData.map((item, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => { navigation.navigate('Product', item) }} key={i} style={{
                                                height: 0.18 * SIZES.height,
                                                width: 0.15 * SIZES.height,
                                                backgroundColor: '#fff',
                                                top: 10,
                                                borderRadius: 3,
                                                marginLeft: 30,
                                                marginBottom: 30,
                                                elevation: 5
                                            }} >
                                                <View style={{ flex: 0.7 }} >
                                                    <Image style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        resizeMode: 'stretch',
                                                        borderRadius: 1,
                                                    }}
                                                        source={item.path}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.3, padding: 5, justifyContent: 'space-around' }} >

                                                    <View style={{ flexDirection: 'row' }} >
                                                        <Text style={{ fontSize: 11 }} >{item.title}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: 'row' }} >
                                                        <Image source={require('../../assests/rating/star.png')} />
                                                        <Image source={require('../../assests/rating/star.png')} />
                                                        <Image source={require('../../assests/rating/star.png')} />
                                                        <Image source={require('../../assests/rating/star.png')} />
                                                        <Image source={require('../../assests/rating/star.png')} />
                                                    </View>

                                                </View>


                                            </TouchableOpacity>
                                        )
                                    })
                                }



                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ height: 0.25 * SIZES.height, width: SIZES.width, backgroundColor: '#fff' }} >
                        <View style={{}} >
                            <Text style={{ top: 10, paddingLeft: 20, fontSize: 16, fontWeight: '500' }} >Top Picks for you</Text>

                            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ height: 0.35 * SIZES.height, top: 5 }} >

                                {
                                    toppicksforyou.map((item, i) => {
                                        return (
                                            <TouchableOpacity onPress={() => { navigation.navigate('Product', item) }} key={i} style={{
                                                height: 0.18 * SIZES.height,
                                                width: 0.15 * SIZES.height,
                                                backgroundColor: '#fff',
                                                top: 15,
                                                borderRadius: 3,
                                                marginLeft: 20,


                                            }} >
                                                <View style={{ flex: 0.7 }} >
                                                    <Image style={{
                                                        height: '100%',
                                                        width: '100%',
                                                        resizeMode: 'stretch',
                                                        borderRadius: 1,
                                                    }}
                                                        source={item.path}
                                                    />
                                                </View>
                                                <View style={{ flex: 0.3, alignItems: 'center' }} >
                                                    <Text style={{ fontSize: 14 }} >{item.title}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    })
                                }



                            </ScrollView>
                        </View>
                    </View>
                    <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', elevation: 15, width: SIZES.width, backgroundColor: '#ECFBE1' }} >
                        <View >
                            <Text style={{ top: 10, paddingLeft: 20, fontSize: 16, fontWeight: '500' }} >Eat What makes you happy</Text>

                            <FlatList data={dishes}
                                numColumns={3}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View style={{
                                            height: 0.18 * SIZES.height,
                                            width: 0.14 * SIZES.height,
                                            backgroundColor: 'transparent',
                                            top: 20,
                                            borderRadius: 3,
                                            marginLeft: 20,
                                        }} >
                                            <TouchableOpacity onPress={() => { navigation.navigate('Product', item) }} style={{ flex: 0.7 }} >
                                                <Image style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    resizeMode: 'stretch',
                                                    borderRadius: 1,
                                                }}
                                                    source={item.path}
                                                    onLoadEnd={() => {


                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ flex: 0.3, alignItems: 'center' }} >
                                                <Text>{item.title}</Text>
                                            </View>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
         
            {
                cartItems.length > 0 ? <TouchableOpacity onPress={() => { navigation.navigate('Cart') }} style={{
                    height: 0.055 * SIZES.height,
                    width: SIZES.width,
                    backgroundColor: '#2E9E07',
                    elevation: 5,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'

                    }} >
                        <Text style={{ fontSize: 14, color: '#fff' }} >{cartItems.length} items    |   </Text>

                        <FontAwesome name="rupee" size={14} color="#fff" >
                            <Text style={{ fontSize: 14 }} >  {total}</Text>
                        </FontAwesome>

                    </View>
                    <View style={{

                        flexDirection: 'row',
                        alignItems: 'center'

                    }} >
                        <Text style={{ fontSize: 14, color: '#fff' }} >View Cart  </Text>

                        <EvilIcons name="cart" size={18} color="#fff" />
                    </View>
                </TouchableOpacity>

                    :
                    null
            }


        </View>
    )
}

export default HomeScreen
