import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DataContext from '../../context/DataContext';
import axios from 'axios';


import { COLORS, SIZES } from '../../constants'

function IdActivationPage({ navigation }) {



    const { user, api, url } = React.useContext(DataContext);


    const [confirm, setConfirm] = useState(false);

    const [userId, setUserId] = useState(null);
    const [upgradeIdUserDetails, setUpgradeIdUserDeatils] = useState(null);
    const [activationTypes, setActivationTypes] = useState(null);
    const [selectedActivationType, setSelectedActivationType] = useState(null);
    const [walletBalance, setWalletBalance] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);

    // console.log(userId)

    useEffect(() => {
        setErrorMessage(null);
        setUpgradeIdUserDeatils(null);
    }, [userId])




    useEffect(() => {
        if (user) {



            let data = {
                TokenID: user.TokenId
            }

            axios.post(api + url.IDActivationTypes, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        if (res.data[0].Types.length == 1) {
                            setSelectedActivationType(res.data[0].Types[0].TypeNo);
                        }
                        setActivationTypes(res.data[0].Types);

                        //    ==========  this axios is called after the success of Id activationTypes =========

                        axios.post(api + url.CommissionAndMyBankBalance, data)
                            .then((res) => {
                                if (res.data[0].Status === 'Success') {
                                    setWalletBalance(res.data[0].Response);
                                }
                                else if (res.data[0].Status === 'Failure') {
                                    setWalletBalance(null);
                                    setErrorMessage(res.data[0].Response);
                                }
                            })
                            .catch((err) => {
                                setWalletBalance(null);
                                setErrorMessage(err.message);
                            })

                        //    ==========  end =========


                    }
                    else if (res.data[0].Status === 'Failure') {
                        setWalletBalance(null);
                        setActivationTypes(null);
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => {
                    setWalletBalance(null);
                    setActivationTypes(null);
                    setErrorMessage(err.message);
                })
        }


    }, [user])






    useEffect(() => {


        if (userId !== null && userId.length == 10) {
            let data = {
                InputType: 'GET',
                TokenID: user.TokenId,
                UpgradeID: userId
            }

            axios.post(api + url.IDActivation, data)
                .then((res) => {
                    let data = res.data;
                    if (data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setUpgradeIdUserDeatils(data[0].Response);
                    }
                    else if (data[0].Status === 'Failure') {
                        setErrorMessage(data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }


    }, [userId])


    const submit = () => {

        if (!upgradeIdUserDetails) {
            setErrorMessage("Please Enter valid user Id");
            return
        }

        let data = {
            InputType: "RECHECK",
            TokenID: user.TokenId,
            UpgradeID: userId,
            TypeNo: selectedActivationType

        }

        setConfirm(true);


        // axios.post(api + url.IDActivation, data)
        //     .then((res) => {
        //         if (res.data[0].Status === 'Success') {
        //             console.log(res.data[0].Response);

        //         }
        //         else if (res.data[0].Status === 'Failure') {
        //             setErrorMessage(res.data[0].Response);

        //         }
        //     })
        //     .catch((err) => { setErrorMessage(err.message) })



    }

    const Confirm = () => {
        console.log("upgraded successfulluy");
    }


    if (confirm) {
        return (
            <View style={{ flex: 1 }} >

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
                        <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack }} />
                    </View>
                    <View style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 18, color: '#fff' }} >ID Activation</Text>
                    </View>


                </LinearGradient>

                {/* ================= End of  Header     ================== */}

                {/* =================   Body     ================== */}

                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={{ fontSize: 18, marginTop: 10, color: 'orange' }} >Confirm Details</Text>
                    </View>

                    <View style={{ paddingHorizontal: 20, marginTop: 30, }} >
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Id : </Text>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 16 }} >{userId}</Text>
                            </View>


                        </View>



                    </View>
                    <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Name : </Text>
                            </View>
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 16 }} >{upgradeIdUserDetails}</Text>
                            </View>


                        </View>



                    </View>
                    <View style={{ paddingHorizontal: 20, paddingTop: 15, }} >
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Wallet Balance : </Text>
                            </View>
                            <View style={{ flex: 1 }} >
                                <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                    <Text>  {walletBalance ? walletBalance : null}</Text>
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
                                <Text style={{ fontSize: 16 }} >{activationTypes[0].TypeName}  -  {activationTypes[0].Cost}</Text>
                            </View>


                        </View>



                    </View>



                    <View style={{ paddingHorizontal: 20, paddingTop: 10, alignSelf: 'center', marginTop: 30 }} >
                        <Text style={{ fontSize: 16, alignSelf: 'center', color: '#7c7c7c' }} >Transcation Password </Text>
                        <View>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            height: 40,
                            width: '60%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                        }} >

                            <View style={{ flex: 1, width: '90%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10, justifyContent: 'center', alignItems: 'center' }} >
                                <TextInput placeholder="Enter Transcation password" />
                            </View>

                        </View>

                    </View>
                    <TouchableOpacity onPress={() => { Confirm() }}>
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
                </View>


                {/* =================  End of Body  ================== */}


            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1 }} >

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
                        <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack }} />
                    </View>
                    <View style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 18, color: '#fff' }} >ID Activation</Text>
                    </View>


                </LinearGradient>

                {/* ================= End of  Header     ================== */}

                {/* =================   Body     ================== */}

                <View style={{
                    flex: 1,
                    backgroundColor: '#fff'
                }}>

                    <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >User Id </Text>
                        <View>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            height: 40,
                            width: '60%',
                            justifyContent: 'center',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                        }} >
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                            </View>
                            <View style={{ flex: 1, width: '90%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                <TextInput


                                    placeholder="User Id"
                                    onChangeText={(text) => { setUserId(text) }} />
                            </View>

                        </View>
                        <Text style={{ paddingTop: 10, fontSize: 15, fontWeight: '300', color: '#7c7c7c' }} >Name:  {upgradeIdUserDetails ? upgradeIdUserDetails : null}</Text>
                    </View>




                    <View style={{ paddingHorizontal: 20, paddingTop: 20, }} >
                        <Text style={{ fontSize: 16 }} >Activation Type </Text>
                        <View>

                        </View>
                        <View style={{
                            marginTop: 10,
                            flexDirection: 'row',
                            height: 40,
                            width: '60%',
                            justifyContent: 'center',
                            borderRadius: 10,
                            elevation: 0,
                            backgroundColor: '#fff',
                            borderWidth: 1
                        }} >
                            {
                                activationTypes ?
                                    activationTypes.length === 1 ? <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                        <Text>{activationTypes[0].TypeName}  -  {activationTypes[0].Cost}</Text>
                                    </View>
                                        :
                                        <View style={{ flex: 1, justifyContent: 'center' }} >
                                            <Picker
                                                mode="dropdown"
                                                selectedValue={selectedActivationType}
                                                style={{}}
                                                onValueChange={(itemValue, itemIndex) => setSelectedActivationType(itemValue)}
                                            >
                                                {activationTypes ?
                                                    activationTypes.map((item, index) => {
                                                        return (
                                                            <Picker.Item
                                                                label={item.TypeName + " - " + item.Cost}
                                                                value={item.TypeNo}
                                                                key={index} />
                                                        )

                                                    }) : null
                                                }


                                            </Picker>
                                        </View>

                                    : null
                            }




                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' }} >

                        <Text style={{ fontSize: 16 }} >Wallet Balance  -</Text>
                        <View>
                            <FontAwesome name="rupee" size={14} color="black" style={{ marginLeft: 10 }} >
                                <Text>  {walletBalance ? walletBalance : null}</Text>
                            </FontAwesome>

                        </View>


                    </View>
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


                {/* =================  End of Body  ================== */}


            </View>
        )
    }
}

export default IdActivationPage
