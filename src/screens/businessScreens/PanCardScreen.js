
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';


import DataContext from '../../context/DataContext';

function PanCardScreen({ navigation }) {

    const { authUser, user, userData, logOut, url, api, TokenIDN } = React.useContext(DataContext);



    // axios.post(api + url.MyBusiness, { TokenID: user.TokenId })
    //     .then((res) => { console.log(res.data[0]) })
    //     .catch((err) => { console.log(err.message) })




    const [bankDetails, setBankDetails] = useState(null);
    const [panDetails, setPanDetails] = useState(null);

    const [panNumber, setPanNumber] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [txnPwd, setTxnPwd] = useState(null);


    useEffect(() => {

        if (panDetails) {
            setPanNumber(panDetails);
        }

    }, [panDetails])



    useEffect(() => {

        let data = {
            InputType: "GET",
            TokenID: user.TokenId


        }
        axios.post(api + url.Panno, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setPanDetails(res.data[0].Response)
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrorMessage(res.data[0].Response);
                }
            })
            .catch((err) => { setErrorMessage(err.message) })
    }, [])


    const submit = () => {

        if (!txnPwd || txnPwd === '') {
            setErrorMessage("Please Enter Transcation Password");
        }
        else if (panNumber === null || panNumber === '' || panNumber === 'N.A.') {
            setErrorMessage("Please Enter all fields");
        }
        else {
            let data = {
                InputType: 'UPDATE',
                PANNo: panNumber,
                TransactionPassword: txnPwd,
                TokenID: user.TokenId

            }


            axios.post(api + url.Panno, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setSuccessMessage(res.data[0].Response);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        setSuccessMessage(null);
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }

    }

    if (panDetails) {



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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}


                {/* ==================  Body  ======================= */}

                <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center', paddingVertical: 20 }} >

                    <View style={{
                        paddingHorizontal: 0,
                        width: '100%',
                        borderRadius: 10,
                        // elevation: 5,
                        // backgroundColor: '#fff',
                        flexDirection: 'row'
                    }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }} >PanCard Details</Text>
                    </View>

                    <View style={{
                        paddingVertical: 10,
                        paddingHorizontal: 30,
                        marginTop: 20,
                        width: '100%',
                        borderRadius: 10,
                        elevation: 5,
                        backgroundColor: '#fff',
                        paddingBottom: 30
                    }} >

                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Pan Number</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {

                                    <TextInput
                                        style={{ color: '#000' }}
                                        placeholder="Pan Number" value={panNumber === 'N.A.' ? '' : panNumber} onChangeText={(text) => { setPanNumber(text) }} />

                                }

                            </View>
                        </View>




                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Transcation Password  </Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1,
                                flexDirection:'row'
                            }} >
                                <View style={{ height: '100%', width: '90%' }} >
                                    <TextInput
                                        style={{ color: '#000' }}
                                        secureTextEntry={!showPassword}
                                        placeholder="Password"
                                        value={txnPwd} onChangeText={(text) => { setTxnPwd(text) }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <Ionicons
                                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                                        size={20}
                                        onPress={() => { setShowPassword(!showPassword) }} />
                                </View>

                            </View>

                        </View>

                        {
                            errorMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'red' }} >{errorMessage}</Text>
                                </View> : null
                        }
                        {
                            successMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'green',
                                    justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'green' }} >{successMessage}</Text>
                                </View> : null
                        }





                        <LinearGradient
                            colors={['#61B743', '#23A772']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{
                                marginTop: 20,
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '60%',
                                borderRadius: 50,
                                alignSelf: 'center'
                            }} >
                            <View style={{
                                paddingVertical: 13,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}  >

                                <TouchableOpacity
                                    onPress={() => { submit() }}
                                    style={{ alignItems: 'center', }} >

                                    <Text style={{ color: COLORS.white, fontSize: 18 }} >Save</Text>
                                </TouchableOpacity>
                            </View>


                        </LinearGradient>

                    </View>
                </ScrollView>
                {/* ====================  End Of Body ===================== */}
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading....</Text>
            </View>
        )
    }
}

export default PanCardScreen

















