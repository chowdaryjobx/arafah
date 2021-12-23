import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LinearGradient from 'react-native-linear-gradient';
import NetInfo from "@react-native-community/netinfo";
import DataContext from '../../context/DataContext';
import axios from 'axios';

function MenuScreen({ navigation }) {
   
    const [isNetworkConnected, setIsNetworkConnected] = useState(null);
    const { user, api, url, TokenIDN, currentAppVersion } = React.useContext(DataContext);
    // version check 
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
                }}>
                <View style={{
                    paddingVertical: 13
                }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                    </View>
                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('RewardPoints') }}>
                </TouchableOpacity>
            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ flex: 1, backgroundColor: '#fff' }} >
                <View style={{ height: '30%', width: '100%', justifyContent: 'center', alignItems: 'center' }} >
                    <Image source={require('../../assests/extras/arafahlogo.png')} style={{ height: 60, width: 60 }} />
                    <Text style={{ fontSize: 25, fontFamily: 'Gabriela Bold', color: '#008E46' }} >Arafah</Text>
                </View>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Login') }}
                    style={{ height: '13%', width: '100%', alignItems: 'center', justifyContent: 'center' }} >
                    <View style={{ height: '80%', width: '85%', elevation: 2, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row' }} >
                        <View style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="login" size={25} />
                        </View>
                        <View style={{ height: '100%', width: '60%', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 18, }} >Login</Text>
                            <Text style={{ fontSize: 14, color: '#9c9c9c' }} >Login to your account</Text>
                        </View>
                        <View style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }} >
                            <EvilIcons name="chevron-right" size={25} />
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('SignUp') }}
                    style={{ height: '13%', width: '100%', alignItems: 'center', backgroundColor: '#fff', justifyContent: 'center' }} >
                    <View style={{ height: '80%', width: '85%', elevation: 2, backgroundColor: '#fff', borderRadius: 10, borderWidth: 1, borderColor: '#ccc', flexDirection: 'row' }} >
                        <View style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }} >
                            <MaterialCommunityIcons name="account-plus" size={25} />
                        </View>
                        <View style={{ height: '100%', width: '60%', justifyContent: 'center' }} >
                            <Text style={{ fontSize: 18 }} >Register</Text>
                            <Text style={{ fontSize: 14, color: '#9c9c9c' }} >Register for a new account</Text>
                        </View>
                        <View style={{ height: '100%', width: '20%', justifyContent: 'center', alignItems: 'center' }} >
                            <EvilIcons name="chevron-right" size={25} />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default MenuScreen;
