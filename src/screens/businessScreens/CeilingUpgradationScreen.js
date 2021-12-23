import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, RefreshControl, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";

import DataContext from '../../context/DataContext';
import axios from 'axios';


import { COLORS, SIZES } from '../../constants'

function CeilingUpgradationScreen({ navigation }) {



    const { user, api, url,TokenIDN,currentAppVersion } = React.useContext(DataContext);

    if (!user) {
        navigation.navigate('Login');
    }

    const [userId, setUserId] = useState(null);
    const [upgradeId, setUpgradeId] = useState(null);
    const [upgradeIdUserDetails, setUpgradeIdUserDeatils] = useState(null);
    const [activationTypes, setActivationTypes] = useState(null);
    const [selectedActivationType, setSelectedActivationType] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);
    const [toPayAmount, setToPayAmount] = useState(null);

    const [successMessage, setSuccessMessage] = useState(null);
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
          else if (res.data[0].Status === 'Failure') {
            if (res.data[0].Response === "Server is busy, please try again later") {
                navigation.navigate('PayoutTimeError');
            }
            else {
                setErrorMessage(res.data[0].Response);

            }
        }
  
        })
        .catch((err)=>{ setErrorMessage(err.message)})
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
        if (selectedActivationType > 0) {
            axios.post(api + url.CeilingActivation, {
                InputType: "GETPAY",
                TokenID: user.TokenId,
                UpgradeID: upgradeId,
                TypeNo: selectedActivationType
            })
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setToPayAmount(res.data[0].Response);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        setErrorMessage(res.data[0].Response)
                    }
                })
                .catch((err) => { setErrorMessage(err.message) });
        }

    }, [selectedActivationType])


    useEffect(() => {
        if (upgradeId !== null && upgradeId !== '' && upgradeId !== undefined && upgradeId.length === 10) {
            axios.post(api + url.CeilingActivation, { InputType: "GET", TokenID: user.TokenId, UpgradeID: upgradeId })
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setUpgradeIdUserDeatils(res.data[0]);
                        setActivationTypes(res.data[0].Types)
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
                .catch((err) => { setErrorMessage(err.message) })
        }
        else {
            setUpgradeIdUserDeatils(null);
            setActivationTypes(null);
        }
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

    }, [upgradeId])


    const submit = () => {

        if (upgradeId === null && upgradeId === '' && upgradeId === undefined && upgradeId.length !== 10) {
            setErrorMessage("Please Enter valid user Id");
            return
        }


        let data = {
            InputType: "RECHECK",
            TokenID: user.TokenId,
            UpgradeID: upgradeId,
            TypeNo: selectedActivationType
        }

        axios.post(api + url.CeilingActivation, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    if (res.data[0].Response === 'Proceed') {
                        let confirmData = {
                            UpgradeID: upgradeId,
                            TypeNo: selectedActivationType,
                            Name: upgradeIdUserDetails.Name,
                            activationTypes: activationTypes,
                            selectedActivationType: selectedActivationType,
                            toPayAmount: toPayAmount
                        }
                        navigation.navigate('CeilingUpgradationConfirm', { data: confirmData });

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



    }

    const onpagerefresh = () => {
        setPagerefreshing(true);
        filldata();
        // GetSponName(upgradeId);
        setPagerefreshing(false);
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
                    <Text style={{ fontSize: 18, color: '#fff' }} >Ceiling Upgradation</Text>
                </View>


            </LinearGradient>

            {/* ================= End of  Header     ================== */}

            {/* =================   Body     ================== */}
            <ScrollView refreshControl={<RefreshControl refreshing={Pagerefreshing} onRefresh={onpagerefresh}></RefreshControl>}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <View style={{ margin: 30, padding: 10, elevation: 10, backgroundColor: '#fff', borderRadius: 10 }} >

                        <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Upgrade ID </Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                                <View style={{ flex: 1, width: '90%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput
                                        placeholderTextColor="#000"
                                        style={{ color: '#000' }}
                                        keyboardType="number-pad"
                                        value={upgradeId}
                                        onChangeText={(text) => { setUpgradeId(text) }} />
                                </View>

                            </View>
                            {
                                upgradeIdUserDetails ?
                                    <View style={{ flexDirection: 'row', }} >
                                        <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: '300', color: '#7c7c7c' }} >Name  :   </Text>
                                        <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: '300', color: '#000' }} >{upgradeIdUserDetails.Name}</Text>
                                    </View>

                                    : null
                            }
                        </View>
                        {activationTypes ? <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                            <Text style={{ fontSize: 16 }} >Activation Type </Text>
                            <View>

                            </View>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 40,
                                width: '80%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 0,
                                backgroundColor: '#fff',
                                borderWidth: 1
                            }} >
                                {
                                    activationTypes ?
                                        activationTypes.length === 1 ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                            <Text>{activationTypes[0].TypeName}</Text>
                                        </View>
                                            :
                                            <View style={{ flex: 1, justifyContent: 'center' }} >
                                                <Picker
                                                    mode="dropdown"
                                                    selectedValue={selectedActivationType}
                                                    style={{}}
                                                    onValueChange={(itemValue, itemIndex) => setSelectedActivationType(itemValue)}
                                                >
                                                    <Picker.Item
                                                        label="--Activation Type--"
                                                        value={0}
                                                        key={0} />
                                                     {activationTypes ? (
                                                        activationTypes.map((item, index) =>
                                                            <Picker.Item
                                                                label={item.TypeName}
                                                                value={item.TypeNo}
                                                                key={index + 1} />
                                                        )
                                                    )
                                                        : null
                                                    }


                                                </Picker>
                                            </View>

                                        : null
                                }




                            </View>

                        </View> : null}

                        <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }} >

                            <Text style={{ fontSize: 16 }} >Wallet Balance  -</Text>
                            <View>
                                <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                    <Text>  {walletBalance ? walletBalance : null}</Text>
                                </FontAwesome>

                            </View>


                        </View>
                        {toPayAmount ? <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }} >

                            <Text style={{ fontSize: 16 }} >To Pay  -</Text>
                            <View>
                                <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                    <Text>  {toPayAmount}</Text>
                                </FontAwesome>

                            </View>


                        </View> : null}
                        <TouchableOpacity onPress={() => { submit() }}>
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
                                    marginTop: 20
                                }} >


                                <View style={{ paddingLeft: 0 }} >
                                    <Text style={{ fontSize: 18, color: '#fff' }} >Submit</Text>
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
                    </View>



                </View>
            </ScrollView>


            {/* =================  End of Body  ================== */}


        </View>
    )

}

export default CeilingUpgradationScreen

