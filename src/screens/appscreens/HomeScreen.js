import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import NetInfo from "@react-native-community/netinfo";
import notifee, { AndroidColor } from '@notifee/react-native';
import { Rating, RatingProps } from 'react-native-elements';
import { OffersData, dishesData, toppicksforyou, dishes } from '../../data/data';
import { FlatList } from 'react-native-gesture-handler';
import DataContext from '../../context/DataContext';

function HomeScreen({ navigation }) {

    const [network, setNetwork] = useState(false);



    const [isLoading, setIsLoading] = useState(true);
    const { user, cartItems, userData, productStatus } = React.useContext(DataContext);

    // console.log(productStatus);

    let total = 0;
    cartItems.map((item) => {
        total += item.quantity * item.price
    })

    async function onDisplayNotification() {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: '123',
            name: 'arafah',
            sound: 'arafah_notification',
            vibration: true,
            vibrationPattern: [300, 500],
        });

        await notifee.displayNotification({
            title: 'Awwwww! You made it',
            body: 'Now your in Arafah, oder your craving bite.',
            android: {
                channelId: '123',
                smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.

            },
        });
    }



    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (state.isConnected) {
                setNetwork(true)
            }
            else {
                setNetwork(false)
            }
        });

        unsubscribe();
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

                    {/* {user ? <Text style={{ bottom: 5, fontSize: 14, paddingLeft: 20, color: '#fff' }} >{userData.address}</Text>
                        : null} */}

                </View>
                {/* <TouchableOpacity onPress={() => { navigation.navigate('RewardPoints') }}>
                    <Text>Mlm</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => {
                    user ? navigation.navigate('Profile') : navigation.navigate('MenuScreen')
                }} >
                    {user ?
                        <View style={{
                            height: 0.065 * SIZES.height,
                            width: 0.065 * SIZES.height,
                            borderRadius: 0.065 * SIZES.height / 2,
                            backgroundColor: COLORS.white,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <Image source={{ uri: userData.profilePic }} style={{ height: 0.065 * SIZES.height, width: 0.065 * SIZES.height, borderRadius: 0.065 * SIZES.height }} />
                        </View>
                        :
                        <MaterialCommunityIcons name="menu" size={30} color="white" />}
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
                                        <TouchableOpacity onPress={() => { }} key={i} style={{
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
                                                <View style={{ justifyContent: 'flex-start', }} >
                                                    <Rating
                                                        startingValue={item.rating}
                                                        type='star'
                                                        ratingCount={5}
                                                        imageSize={15}
                                                        readonly={true}
                                                        style={{ alignSelf: 'flex-start' }}
                                                    />
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
            {network ? null : <TouchableOpacity onPress={() => { navigation.navigate('Cart') }} style={{

                width: SIZES.width,
                backgroundColor: 'red',
                elevation: 5,
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
            }}>
                <View>
                    <Text style={{ color: '#fff' }} >Network unavailable</Text>
                </View>

            </TouchableOpacity>}

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
            {
                productStatus != null ? <TouchableOpacity onPress={() => { navigation.navigate('OrderSummary') }} style={{
                    height: 0.055 * SIZES.height,
                    width: SIZES.width,
                    backgroundColor: 'orange',
                    elevation: 5,
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                    justifyContent: 'space-between',
                }}>

                    <View style={{

                        flexDirection: 'row',
                        alignItems: 'center'

                    }} >
                        <Text style={{ fontSize: 14, color: '#fff', fontStyle: 'italic' }} >Order Status  :  {productStatus}</Text>


                    </View>
                </TouchableOpacity>

                    :
                    null
            }


        </View>
    )
}

export default HomeScreen
