
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { COLORS, SIZES } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';

import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

function DailySalesScreen({ navigation }) {

    const { authUser, user, TokenIDN, logOut, api, url } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }


    const [dailySales, setDailySales] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);
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
        filldata()

    }, [])

    function filldata() {
        let data = { TokenID: user.TokenId }
        axios.post(api + url.DailySales, data)
            .then((res) => {
                if (res.data[0].Status == 'Success') {
                    setErrorMessage(null);
                    setDailySales(res.data[0].Sales);
                }
                else if (res.data[0].Status === 'Failure') {
                    if (res.data[0].Response === "Server is busy, please try again later") {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        setErrorMessage(res.data[0].Response);
                    }
                  
                }

            })
            .catch((err) => { setErrorMessage(err.message) })
    }

    const onpagerefresh = () => {
        setPagerefreshing(true);
        filldata();
        setPagerefreshing(false);
    }
    if (dailySales) {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }} >
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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah </Text>
                        </View>
                    </View>
                </LinearGradient>
                {/*================End Of Header  ================= */}

                {/* =============  Body  ================ */}
                <ScrollView refreshControl={<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                    <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30, paddingBottom: 30 }} >
                        <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }} >Daily Sales</Text>
                        <View style={{ width: '100%', elevation: 10, backgroundColor: '#fff', borderRadius: 10, marginTop: 20 }} >
                            <View key={0} style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Date</Text>
                                <Text style={{ flex: 1, alignSelf: 'flex-start' }} >A - Team</Text>
                                <Text style={{ flex: 1, alignSelf: 'flex-start' }} >B - Team</Text>
                            </View>
                            {
                                dailySales.map((item, index) => {
                                    return (
                                        <View key={index + 1} style={{ width: '100%', padding: 10, paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.Date}</Text>
                                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.ATeam}</Text>
                                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.BTeam}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </View>
                </ScrollView>
                {/* =============  End of Body  ================= */}
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading....</Text>
            </View>
        )
    }
}

export default DailySalesScreen










