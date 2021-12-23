import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NetInfo from "@react-native-community/netinfo";

import DataContext from '../../context/DataContext';
import axios from 'axios';


function SignUpScreen({ navigation }) {

    const { TokenIDN, api, url,currentAppVersion } = React.useContext(DataContext);
    const [radio, setRadio] = useState({
        left: false,
        right: false
    })
    // const [radioButton, setRadioButton] = useState(false);
    const [userName, setUserName] =  useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [sponsorId, setSponsorId] = useState(null);
    const [sponsorName, setSponsorName] = useState(null);


    const [userNameError, setUserNameError] = useState(null);
    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [sponsorIdError, setSponsorIdError] = useState(null);
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
          else if (res.data[0].Status === 'Failure') {
            if (res.data[0].Response === "Server is busy, please try again later") {
                navigation.navigate('PayoutTimeError');
            }
            else {
                setErrMessage(res.data[0].Response);
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



    // useEffect(() => {
    //     if (email !== '') {
    //         var regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    //         if (!regex.test(email)) {
    //             setEmailError("Enter a valid email");
    //             return false;
    //         }
    //         else {
    //             // console.log("valid email id")
    //             setEmailError(null)
    //         }

    //     }

    // }, [email])










    useEffect(() => {
        setErrMessage(null);

    }, [userName, phoneNumber, email, sponsorId])




    useEffect(() => {

        if (sponsorId && sponsorId.length == 10 || sponsorId == 0) {

            // console.log(sponsorId);
            let user = {
                Sponsor: sponsorId,
                TokenIDN
            }
            axios.post(api + url.ReferralCheck, user)
                .then((res) => {
                    console.log(res.data[0])
                    let data = res.data;
                    if (data[0].Status === 'Success') {
                        setErrMessage(null)
                        setSponsorName(data[0].Response)

                    }
                    else if (data[0].Status === 'Failure') {
                        if (res.data[0].Response) {
                            navigation.navigate('PayoutTimeError');
                        }
                        else {
                            setSponsorName(null)
                            setErrMessage(data[0].Response)
                        }

                    }

                })
                .catch((err) => {
                    setSponsorName(null)
                    setErrMessage(err.message)
                })
        }
        else {
            // console.log("not length");
        }

    }, [sponsorId])



    const registerUser = (user) => {
        axios.post(api + url.GetOTP, user)
            .then((res) => {

                let data = res.data;
                if (data[0].Status === 'Success') {
                    setErrMessage(null);
                    if (data[0].Response) {
                        navigation.navigate('OtpScreen', { user })
                    }
                }
                else if (data[0].Status === 'Failure') {
                    if (res.data[0].Response) {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        setErrMessage(data[0].Response);
                    }
                }
            })
            .catch((err) => setErrMessage(err.message))
    }


    const Submit = () => {
        if (phoneNumber !== '') {
            var regex = /^[6-9][0-9]{9}$/;
            if (!regex.test(phoneNumber)) {
                setPhoneNumberError("invalid mobile")
                return
            }
        }

        if (!userName) {
            setUserNameError('Enter User Name');
        }
        else if (!phoneNumber || phoneNumberError) {
            setPhoneNumberError('Enter valid Phone Number');
        }
        else if (emailError) {
            setEmailError('Enter valid email id');
        }
        else if (!sponsorId) {
            setSponsorIdError('Enter valid sponsor id');
        }
        else {
            const user = {
                Name: userName,
                Mobile: phoneNumber,
                Email: email == '' || email == null ? 'N.A.' : email,
                Sponsor: sponsorId,
                TokenIDN,
                Placement: radio.left === false && radio.right === false ? 'Left' : radio.left === true ? 'left' : 'right'
            }

            registerUser(user);
        }
    }


    const radioUnClicked = <View style={{ flexDirection: 'row' }} >
        <View style={{ height: 15, width: 15, borderColor: 'black', borderWidth: 1, borderRadius: 15 / 2 }} ></View>

    </View>

    const radioClicked = <View style={{ flexDirection: 'row' }} >
        <View style={{ height: 15, width: 15, borderColor: 'black', borderWidth: 1, borderRadius: 15 / 2, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }} >
            <View style={{ height: 10, width: 10, backgroundColor: '#000', borderRadius: 50 }}  ></View>
        </View>

    </View>;

    return (
        <View style={styles.container}>
            <View style={{ height: '40%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <ScrollView style={{ height: '60%', width: '100%', backgroundColor: '#fff' }}>
                <View style={{ paddingTop: 30, flex: 1, width: '100%', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="account" size={20} />
                        </View>
                        <View style={{ flex: 1, width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                placeholder="Full Name"
                                value={userName} onChangeText={(text) => {
                                    setUserNameError(null)
                                    setUserName(text)
                                }} />
                        </View>
                    </View>
                    {
                        userNameError ? <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }} >{userNameError}</Text>
                        </View> : null
                    }

                    <View style={styles.inputContainer2} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholder="Phone Number"
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                keyboardType="number-pad" onChangeText={(text) => {
                                    setPhoneNumberError(null);
                                    setPhoneNumber(text)
                                }} value={phoneNumber} />
                        </View>
                    </View>
                    {
                        phoneNumberError ? <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }} >{phoneNumberError}</Text>
                        </View> : null
                    }
                    <View style={styles.inputContainer3} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="mail" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholder="Email  (optional)"
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                onChangeText={(text) => {
                                    setEmailError('');
                                    setEmail(text)
                                }} value={email} />
                        </View>
                    </View>
                    {
                        emailError ? <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }} >{emailError}</Text>
                        </View> : null
                    }

                    <View style={styles.inputContainer3} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="account-supervisor" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholder="Sponsor ID"
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                onChangeText={(text) => {
                                    setSponsorIdError(null);
                                    setSponsorId(text)
                                }} value={sponsorId} />
                        </View>
                    </View>
                    {
                        sponsorIdError ? <View style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red' }} >{sponsorIdError}</Text>
                        </View> : null
                    }
                    <View style={{ marginTop: 10, width: '70%' }} >
                        {sponsorName ? <Text>Name :  {sponsorName} </Text> : null}
                    </View>
                    {sponsorId !== null && sponsorId.length === 10 ?
                        <View style={{ flexDirection: 'row', marginTop: 10, width: '70%', }} >
                            <TouchableOpacity onPress={() => { setRadio({ left: true, right: false }) }} style={{ flexDirection: 'row', alignItems: 'center' }} >
                                {radio.left ? radioClicked : radioUnClicked}
                                <Text style={{ paddingLeft: 30 }} >Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setRadio({ left: false, right: true }) }} style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 50 }} >
                                {radio.right ? radioClicked : radioUnClicked}
                                <Text style={{ paddingLeft: 30 }} >Right</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </View>
                {
                    errMessage ?
                        <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10, alignSelf: 'center' }} >
                            <Text style={{ color: 'red' }} >{errMessage}</Text>
                        </View>
                        : null
                }
                <View style={{ paddingTop: 30, flex: 0.3, width: '100%', alignItems: 'center', backgroundColor: '#fff' }} >
                    <TouchableOpacity onPress={() => { Submit() }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Request OTP</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                        <Text>Already have an Account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                            <Text style={{ color: "#26A36C" }} >Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: '25%', width: '100%', position: 'absolute', backgroundColor: 'transparent' }} >
                <View style={{ flex: 0.5 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeText} >Sign Up</Text>
                    <Text style={styles.headingText} >Please fill your details</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeText: {
        fontSize: 40,
        color: '#fff',
        paddingLeft: 20
    },
    headingText: {
        fontSize: 20,
        color: '#fff',
        paddingLeft: 20
    },
    inputContainer1: {
        flexDirection: 'row',
        height: 50,
        width: '70%',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        backgroundColor: '#fff'
    },
    inputContainer2: {
        marginTop: 10,
        flexDirection: 'row',
        height: 50,
        width: '70%',
        elevation: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10
    },
    inputContainer3: {
        marginTop: 10,
        flexDirection: 'row',
        height: 50,
        width: '70%',
        elevation: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10
    }
})

export default SignUpScreen;
