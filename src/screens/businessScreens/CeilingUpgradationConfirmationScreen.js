import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';



import DataContext from '../../context/DataContext';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

import { COLORS, SIZES } from '../../constants'

function CeilingUpgradationConfirmationScreen({ navigation, route }) {

    let data = route.params.data;

    const { user, api, url, TokenIDN, currentAppVersion } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }

    const [transcationPassword, setTranscationPassword] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [showPwd, setShowPwd] = useState(false);


    const [isNetworkConnected, setIsNetworkConnected] = useState(null);
    useEffect(() => {
        axios.post(api + url.AndroidAppVersion, { TokenIDN: TokenIDN })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    if (res.data[0].VersionCode > currentAppVersion) {

                        navigation.navigate('AppVersionError');
                    }
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

    useEffect(() => {
        let data = {
            TokenID: user.TokenId
        }

        axios.post(api + url.CommissionAndMyBankBalance, data)
            .then((res) => {

                if (res.data[0].Status === 'Success') {
                    setWalletBalance(res.data[0].Response);
                }
                else if (res.data[0].Status === 'Failure') {
                    if (res.data[0].Response === "Server is busy, please try again later") {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        if (res.data[0].Response === "Server is busy, please try again later") {
                            navigation.navigate('PayoutTimeError');
                        }
                        else {
                            setWalletBalance(null);
                            setErrorMessage(res.data[0].Response);
                        }

                    }

                }
            })
            .catch((err) => {
                setWalletBalance(null);
                setErrorMessage(err.message);
            })
    }, [])



    if (isNetworkConnected === false) {
        navigation.navigate('NetworkError')
    }
    const confirm = () => {

        if (!transcationPassword) {
            setErrorMessage("Please Enter Transctaion Password");
            return
        }
        else if (!user.TokenId || !data.UpgradeID || !data.TypeNo) {
            setErrorMessage("invalid details");
            return
        }
        else {
            let activation = {
                InputType: "UPGRADATION",
                TokenID: user.TokenId,
                UpgradeID: data.UpgradeID,
                TypeNo: data.TypeNo,
                TransactionPassword: transcationPassword
            }
            axios.post(api + url.CeilingActivation, activation)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setSuccessMessage(res.data[0].Response);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        if (res.data[0].Response === "Server is busy, please try again later") {
                            navigation.navigate('PayoutTimeError');
                        }
                        else {
                            setSuccessMessage(null);
                            setErrorMessage(res.data[0].Response);
                        }

                    }
                })
                .catch((err) => {
                    setSuccessMessage(null);
                    setErrorMessage(err.message);

                })
        }

    }





    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >

            {/* =================   Header     ================== */}


            <LinearGradient
                colors={['#61B743', '#23A772']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                }} >

                <View>
                    <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                </View>
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontSize: 18, color: '#fff' }} >Ceiling Activation Confirmation</Text>
                </View>
            </LinearGradient>

            {/* ================= End of  Header     ================== */}

            {/* =================   Body     ================== */}

            <View style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>

                {successMessage ?
                    <View>
                        <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'green', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                            <Text style={{ color: 'green' }} >{successMessage}</Text>
                        </View>
                        <TouchableOpacity onPress={() => { navigation.navigate('CeilingUpgradation') }} style={{ width: '50%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#23A26F', padding: 10, borderRadius: 10, alignSelf: 'center', backgroundColor: '#23A26F' }}>
                            <Text style={{ color: '#fff' }}>Next Activation</Text>
                        </TouchableOpacity>
                    </View>
                    : (
                        <ScrollView style={{ margin: 20, padding: 10, paddingBottom: 20, elevation: 10, backgroundColor: '#fff', borderRadius: 10 }} >



                            <View style={{ alignItems: 'center' }} >
                                <Text style={{ fontSize: 18, marginTop: 10, color: 'orange' }} >Confirm Details</Text>
                            </View>

                            <View style={{ paddingHorizontal: 20, marginTop: 30, }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Id : </Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16 }} >{data.UpgradeID}</Text>
                                    </View>


                                </View>



                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Name : </Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16 }} >{data.Name}</Text>
                                    </View>


                                </View>



                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Wallet Balance :</Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 0 }} >
                                            <Text> {walletBalance}</Text>
                                        </FontAwesome>
                                    </View>


                                </View>



                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Activation Type : </Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        {data.activationTypes.map((item) => {
                                            if (item.TypeNo === data.selectedActivationType) {
                                                return (
                                                    <Text style={{ fontSize: 16 }} >{item.TypeName}</Text>
                                                )
                                            }

                                        })}

                                    </View>
                                </View>

                            </View>
                            <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                                <View style={{ flexDirection: 'row' }} >
                                    <View style={{ flex: 1 }} >
                                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >To Pay :</Text>
                                    </View>
                                    <View style={{ flex: 1 }} >
                                        <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 0 }} >
                                            <Text> {data.toPayAmount}</Text>
                                        </FontAwesome>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 0, paddingTop: 10, alignSelf: 'center', marginTop: 30 }} >
                                <Text style={{ fontSize: 16, alignSelf: 'center', color: '#7c7c7c' }} >Transcation Password </Text>
                                <View>

                                </View>
                                <View style={{
                                    marginTop: 10,
                                    flexDirection: 'row',
                                    height: 40,
                                    width: '70%',
                                    // justifyContent: 'center',
                                    // alignItems: 'center',
                                    borderRadius: 10,
                                    elevation: 5,
                                    backgroundColor: '#fff',
                                }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                        <MaterialCommunityIcons name="lock" size={20} />
                                    </View>
                                    <View style={{ flex: 1, width: '70%', height: '100%', }} >
                                        <TextInput
                                            placeholderTextColor="#000"
                                            style={{ color: '#000' }}
                                            value={transcationPassword}
                                            secureTextEntry={!showPwd}
                                            onChangeText={(text) => { setTranscationPassword(text) }}
                                        />
                                    </View>

                                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                        <Ionicons name={showPwd ? "eye-outline" : "eye-off-outline"} size={20} onPress={() => { setShowPwd(!showPwd) }} />
                                    </View>


                                </View>

                            </View>
                            <TouchableOpacity onPress={() => { confirm() }}>
                                <LinearGradient
                                    colors={['#61B743', '#23A772']}
                                    start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                                    style={{
                                        paddingHorizontal: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 50,
                                        width: 200,
                                        borderRadius: 15,
                                        alignSelf: 'center',
                                        marginTop: 30
                                    }} >


                                    <View style={{ paddingLeft: 0 }} >
                                        <Text style={{ fontSize: 18, color: '#fff' }} >Confirm</Text>
                                    </View>


                                </LinearGradient>
                            </TouchableOpacity>

                            {
                                errorMessage ?
                                    <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                                        <Text style={{ color: 'red' }} >{errorMessage}</Text>
                                    </View>
                                    : null
                            }

                        </ScrollView>
                    )}



            </View>


            {/* =================  End of Body  ================== */}


        </View>
    )


}

export default CeilingUpgradationConfirmationScreen
