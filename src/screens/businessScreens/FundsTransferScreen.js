import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';
import NetInfo from "@react-native-community/netinfo";

function FundsTransferScreen({ navigation }) {

    const { authUser, user, userData, logOut, api, url } = React.useContext(DataContext);

    const [isNetworkConnected, setIsNetworkConnected] = useState(null);


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
    if (!user) {
        navigation.navigate('Login');
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
                    paddingVertical: 13,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}  >
                    <View>
                        <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Funds Transfer</Text>
                    </View>
                </View>
            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ flex: 1, paddingHorizontal: 20, alignItems: 'center' }} >
                <TouchableOpacity onPress={() => { navigation.navigate('BankToBankTransfer') }} style={{ height: '8%', width: '90%', backgroundColor: '#fff', elevation: 5, marginTop: 20, borderRadius: 10, flexDirection: 'row' }} >


                    <View style={{ height: '100%', width: '20%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialCommunityIcons name="bank-transfer" size={25} color="black" />
                    </View>
                    <View style={{ height: '100%', width: '60%', justifyContent: 'center', }} >
                        <Text style={{ fontSize: 15 }}>My Bank to My Bank</Text>
                    </View>
                    <View style={{ height: '100%', width: '20%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <EvilIcons name="chevron-right" size={30} />
                    </View>

                </TouchableOpacity>


            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default FundsTransferScreen


