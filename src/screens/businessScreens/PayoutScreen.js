
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import DataContext from '../../context/DataContext';
import axios from 'axios';

function PayoutScreen({ navigation }) {


    const { authUser, user, userData, logOut, api, url } = React.useContext(DataContext);
    if (!user) {
        navigation.navigate('Login');
    }

    const [payoutsData, setPayoutsData] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

    const [errMessage, setErrMessage] = useState(null);



    useEffect(() => {
        axios.post(api + url.WithdrawPayouts, { PageIndex: 1, TokenID: user.TokenId })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrMessage(null);
                    setIsLoading(false);
                    setPayoutsData(res.data[0].Payouts);
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrMessage(res.data[0].Response);
                    setIsLoading(false);
                }
            })
            .catch((err) => { setErrMessage(err.message) })
    }, [])


    if (!isLoading) {
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
                    }} >
                    <View style={{
                        paddingVertical: 13,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}  >
                        <View>
                            <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Payouts</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}


                {/* ==================  Body  ======================= */}

                <View style={{ flex: 1, paddingHorizontal: 20 }} >


                    <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false} >
                        {payoutsData ? payoutsData.map((item, index) => {

                            return (
                                <View key={index} style={{ marginHorizontal: 10, marginVertical: 5, elevation: 10, borderRadius: 10, backgroundColor: '#fff' }} >
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Serial No</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.SerialNo}</Text>
                                        </View>

                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Description</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >: {item.Description}</Text>
                                        </View>

                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Amount</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.Amount}</Text>
                                        </View>

                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Reference No</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.ReferenceNo}</Text>
                                        </View>

                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Issued Date</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.RequestDate}</Text>
                                        </View>

                                    </View>


                                </View>
                            )
                        }) : null}




                    </ScrollView>

                </View>
                {/* ====================  End Of Body ===================== */}
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading ...</Text>
                <Text style={{color:'red'}} >{errMessage}</Text>
            </View>
        )
    }
}

export default PayoutScreen





