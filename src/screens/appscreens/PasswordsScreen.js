import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';


import DataContext from '../../context/DataContext';

function PasswordsScreen({ navigation, route }) {


    const { user, api, url, } = React.useContext(DataContext);
    const type = route.params.pwdType;

    const [txnPwdType, setTxnPwdType] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);




    useEffect(() => {

        
        if (type === 'Txn') {
            let data = {
                InputType: "GET",
                TokenID: user.TokenId
            }
            axios.post(api + url.GenerateOrUpdateTxnPwd, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setTxnPwdType(res.data[0].Response);
                    }
                    else if (res.data[0].Stataus === 'Failure') {
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }

    }, [])


    function submit() {





        if (type === 'Profile') {
            if (oldPassword === null || oldPassword === '' || newPassword === null || newPassword === '' || confirmPassword === null || confirmPassword === '') {
                setSuccessMessage(null);
                setErrorMessage("Please enter valid details");
                return
            }
            if (newPassword !== confirmPassword) {
                setSuccessMessage(null);
                setErrorMessage("New & Confirm Password did not match");

                return
            }
            else {
                let data = {
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    TokenID: user.TokenId

                }

                axios.post(api + url.ChangePassword, data)
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
                    .catch((err) => setErrorMessage(err.message))

            }
        }




        if (type === 'Txn' && txnPwdType === 'Generate') {

            if (newPassword === null || newPassword === '' || confirmPassword === null || confirmPassword === '') {
                setErrorMessage("Please fill all details")
            }
            else if (newPassword !== confirmPassword) {
                setErrorMessage('New & Confirm did not match');
            }
            else {


                let data = {
                    InputType: "GENERATE",
                    NewPassword: newPassword,
                    TokenID: user.TokenId
                }

                axios.post(api + url.GenerateOrUpdateTxnPwd, data)
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
        else if (type === 'Txn' && txnPwdType === 'Update') {

            if (oldPassword === null || oldPassword === '' || newPassword === null || newPassword === '' || confirmPassword === null || confirmPassword === '') {
                setErrorMessage("Please fill all details")
            }
            else if (newPassword !== confirmPassword) {
                setErrorMessage('New & Confirm did not match');
            }
            else {


                let data = {
                    InputType: "UPDATE",
                    OldPassword: oldPassword,
                    NewPassword: newPassword,
                    TokenID: user.TokenId
                }

                axios.post(api + url.GenerateOrUpdateTxnPwd, data)
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



    }



    if (type === 'Txn') {
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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Edit Passwords</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}

                {/* ================  body  ============= */}




                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 20, marginTop: 20 }} >
                    <Text style={{ fontSize: 18, color: 'orange', alignSelf: 'center' }} >Transcation Password</Text>
                    {
                        txnPwdType === 'Generate' ?
                            <View style={{ marginTop: 20 }} >

                                <View style={{ marginTop: 20 }} >
                                    <Text>Password</Text>

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 50,
                                        width: '60%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        elevation: 5,
                                        backgroundColor: '#fff'
                                    }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                            <MaterialCommunityIcons name="lock" size={20} />
                                        </View>
                                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                            <TextInput 
                                            style={{color:'#000'}}
                                            placeholder="Password" value={newPassword} secureTextEntry={true} onChangeText={(text) => { setNewPassword(text) }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                        </View>
                                    </View>

                                </View>
                                <View style={{ marginTop: 20 }} >
                                    <Text>Confirm Password</Text>

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 50,
                                        width: '60%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        elevation: 5,
                                        backgroundColor: '#fff'
                                    }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                            <MaterialCommunityIcons name="lock" size={20} />
                                        </View>
                                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                            <TextInput 
                                            style={{color:'#000'}}
                                            placeholder="Confirm" value={confirmPassword} secureTextEntry={true} onChangeText={(text) => { setConfirmPassword(text) }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                        </View>
                                    </View>

                                </View>


                                <TouchableOpacity onPress={() => { submit() }} style={{ marginTop: 50 }} >
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

                                {successMessage ? <View style={{
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    flexDirection: 'row',
                                    height: 50,
                                    width: '60%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'green'
                                }} >
                                    <Text style={{ color: 'green' }} >{successMessage}</Text>


                                </View> : null}
                                {errorMessage ? <View style={{

                                    alignSelf: 'center',
                                    marginTop: 20,
                                    height: 50,
                                    width: '60%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'red' }} >{errorMessage}</Text>

                                </View> : null}



                            </View>

                            :
                            <View style={{ marginTop: 20 }} >
                                <View style={{ marginTop: 10 }} >
                                    <Text>Old Password</Text>
                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 50,
                                        width: '60%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        elevation: 5,
                                        backgroundColor: '#fff'
                                    }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                            <MaterialCommunityIcons name="lock" size={20} />
                                        </View>
                                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                            <TextInput 
                                            style={{color:'#000'}}
                                            placeholder="Old Password" value={oldPassword} secureTextEntry={true} onChangeText={(text) => { setOldPassword(text) }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                        </View>
                                    </View>

                                </View>

                                <View style={{ marginTop: 20 }} >
                                    <Text>New Password</Text>

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 50,
                                        width: '60%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        elevation: 5,
                                        backgroundColor: '#fff'
                                    }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                            <MaterialCommunityIcons name="lock" size={20} />
                                        </View>
                                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                            <TextInput 
                                            style={{color:'#000'}}
                                            placeholder="New Password" value={newPassword} secureTextEntry={true} onChangeText={(text) => { setNewPassword(text) }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                        </View>
                                    </View>

                                </View>
                                <View style={{ marginTop: 20 }} >
                                    <Text>Confirm Password</Text>

                                    <View style={{
                                        marginTop: 10,
                                        flexDirection: 'row',
                                        height: 50,
                                        width: '60%',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                        elevation: 5,
                                        backgroundColor: '#fff'
                                    }} >
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                            <MaterialCommunityIcons name="lock" size={20} />
                                        </View>
                                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                            <TextInput 
                                            style={{color:'#000'}}
                                            placeholder="Confirm" value={confirmPassword} secureTextEntry={true} onChangeText={(text) => { setConfirmPassword(text) }} />
                                        </View>
                                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                        </View>
                                    </View>

                                </View>


                                <TouchableOpacity onPress={() => { submit() }} style={{ marginTop: 50 }} >
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

                                {successMessage ? <View style={{
                                    alignSelf: 'center',
                                    marginTop: 30,
                                    flexDirection: 'row',
                                    height: 50,
                                    width: '60%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'green'
                                }} >
                                    <Text style={{ color: 'green' }} >{successMessage}</Text>


                                </View> : null}
                                {errorMessage ? <View style={{

                                    alignSelf: 'center',
                                    marginTop: 20,
                                    height: 50,
                                    width: '60%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'red' }} >{errorMessage}</Text>

                                </View> : null}



                            </View>
                    }

                </View>

                {/* ================- End of Body  ================ */}



            </View>
        )
    }
    else if (type === 'Profile') {
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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Edit Passwords</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}

                {/* ================  body  ============= */}




                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 20, marginTop: 20 }} >
                    <Text style={{ fontSize: 18, color: 'orange', alignSelf: 'center' }} >Profile Password</Text>
                    <View style={{ marginTop: 20 }} >
                        <View style={{ marginTop: 10 }} >
                            <Text>Old Password</Text>
                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 50,
                                width: '60%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff'
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <MaterialCommunityIcons name="lock" size={20} />
                                </View>
                                <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput
                                    style={{color:'#000'}}
                                    placeholder="Old Password" value={oldPassword} secureTextEntry={true} onChangeText={(text) => { setOldPassword(text) }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                            </View>

                        </View>

                        <View style={{ marginTop: 20 }} >
                            <Text>New Password</Text>

                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 50,
                                width: '60%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff'
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <MaterialCommunityIcons name="lock" size={20} />
                                </View>
                                <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput 
                                    style={{color:'#000'}}
                                    placeholder="New Password" value={newPassword} secureTextEntry={true} onChangeText={(text) => { setNewPassword(text) }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                            </View>

                        </View>
                        <View style={{ marginTop: 20 }} >
                            <Text>Confirm Password</Text>

                            <View style={{
                                marginTop: 10,
                                flexDirection: 'row',
                                height: 50,
                                width: '60%',
                                justifyContent: 'center',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff'
                            }} >
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                                    <MaterialCommunityIcons name="lock" size={20} />
                                </View>
                                <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                                    <TextInput
                                    style={{color:'#000'}}
                                    placeholder="Confirm" value={confirmPassword} secureTextEntry={true} onChangeText={(text) => { setConfirmPassword(text) }} />
                                </View>
                                <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >

                                </View>
                            </View>

                        </View>


                        <TouchableOpacity onPress={() => { submit() }} style={{ marginTop: 50 }} >
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

                        {successMessage ? <View style={{
                            alignSelf: 'center',
                            marginTop: 30,
                            flexDirection: 'row',
                            height: 50,
                            width: '60%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'green'
                        }} >
                            <Text style={{ color: 'green' }} >{successMessage}</Text>


                        </View> : null}
                        {errorMessage ? <View style={{

                            alignSelf: 'center',
                            marginTop: 20,
                            height: 50,
                            width: '60%',
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'red',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }} >
                            <Text style={{ color: 'red' }} >{errorMessage}</Text>

                        </View> : null}



                    </View>

                </View>

                {/* ================- End of Body  ================ */}



            </View>
        )
    }
    else {
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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Edit Passwords</Text>
                        </View>



                    </View>



                </LinearGradient>
                {/*================End Of Header  ================= */}

                {/* ================  body  ============= */}




                <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }} >
                    <Text style={{ fontSize: 20, color: 'red' }} >Invalid data</Text>

                </View>

                {/* ================- End of Body  ================ */}



            </View>
        )

    }


}

export default PasswordsScreen
