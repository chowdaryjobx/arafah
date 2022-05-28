
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, } from 'react-native';
import { COLORS, SIZES } from '../../constants';

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

function PaymentInformationLogScreen({ navigation }) {


    const { authUser, user, userData, TokenIDN, api, url } = React.useContext(DataContext);
    if (!user) {
        navigation.navigate('Login');
    }

    const [payoutsData, setPayoutsData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errMessage, setErrMessage] = useState(null);
    const [isNetworkConnected, setIsNetworkConnected] = useState(null);

    useEffect(() => {
        axios.post(api + url.AndroidAppVersion, { TokenIDN: TokenIDN })
        .then((res) => {
          if (res.data[0].Status === 'Success') {
            if (res.data[0].VersionCode > currentAppVersion) {
  
              navigation.navigate('AppVersionError');
            }
          }
  
        })
    }, [])
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (state.isConnected && state.isInternetReachable) {
                if (state.isConnected) {
                    setIsNetworkConnected(state.isConnected);
                }
            } else {
                setIsNetworkConnected(false);
            }
        });
        if (isNetworkConnected) {

        } else {
            unsubscribe();
        }
    });

    if (isNetworkConnected === false) {
        navigation.navigate('NetworkError')
    }

    useEffect(() => {
        axios.post(api + url.PaymentInfoLog, { TokenID: user.TokenId })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrMessage(null);
                    setIsLoading(false);
                    setPayoutsData(res.data[0].PaymentInfoLog);
                }
                else if (res.data[0].Status === 'Failure') {
                    if (res.data[0].Response === "Server is busy, please try again later") {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        setErrMessage(res.data[0].Response);
                        setIsLoading(false);
                    }

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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Payment Info Log</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}


                {/* ==================  Body  ======================= */}

                <View style={{ flex: 1, paddingHorizontal: 20 }} >
                    <ScrollView contentContainerStyle={{}} showsVerticalScrollIndicator={false} >
                        {payoutsData ? payoutsData.length > 0 ? payoutsData.map((item, index) => {
                            return (
                                <View key={index} style={{ marginHorizontal: 10, marginTop: 20, elevation: 10, borderRadius: 10, backgroundColor: '#fff' }} >
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Request No</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.RequestNo}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Deposited By</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >: {item.DepositedBy}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Deposited Bank</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.DepositedBank}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Deposited Amount </Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.DepositedAmount}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Deposited Date</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.DepositedDate}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Request Added on</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.RequestAddedOn}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Status</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.Status}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Reason</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.Reason}</Text>
                                        </View>
                                    </View>
                                    <View style={{ padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                                        <View style={{ flex: 0.4 }} >
                                            <Text style={{ fontWeight: '300' }} >Issued / Rejected Date</Text>
                                        </View>
                                        <View style={{ flex: 0.6 }} >
                                            <Text style={{}} >:  {item.IssuedorRejectedDate}</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 18, color: 'red' }} >No records found</Text>
                        </View> : null}
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
                <Text style={{ color: 'red' }} >{errMessage}</Text>
            </View>
        )
    }
}

export default PaymentInformationLogScreen



