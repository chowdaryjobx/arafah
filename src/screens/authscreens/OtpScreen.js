import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';
import axios from 'axios';
import { set } from 'react-native-reanimated';

function OtpScreen({ navigation, route }) {

    const { api, url } = React.useContext(DataContext);



    const { user } = route.params;

    const [otp, setOtp] = useState('');
    const [userInputOtp, setUserInputOtp] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)
    console.log(errorMessage)
    const [timer, setTimer] = useState(120);
    // console.log(otp)
    setTimeout(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }

    }, 1000);

    const resendOtp = () => {

        let data = {
            Name: user.Name,
            Mobile: user.Mobile,
            Email: user.Email,
            TokenIDN: user.TokenIDN
        }

        axios.post(api + url.ResendOTP, data)
            .then((res) => {
                let data = res.data;
                if (data[0].Status === "Success") {
                    setTimer(120)
                }
                else {
                    setTimer(120)
                    setErrorMessage(data[0].Response)

                }
            })
            .catch((err) => { console.log(err) })

    }


    if (userInputOtp == otp) {

        navigation.navigate("Home");

    }
    else {

    }


    const registerUser = () => {


        let data = {
            Name: user.Name,
            Mobile: user.Mobile,
            Email: user.Email,
            Sponsor: user.Sponsor,
            Otp: otp,
            TokenIDN: user.TokenIDN
        }
        // console.log(data.Otp);

        axios.post(api + Registration, data)
            .then((res) => { console.log(JSON.stringify(res)) })
            .catch((err) => { console.log(err) })

    }






    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }} >
            <View style={{ flex: 0.3, backgroundColor: '#fff' }} >
                <View style={{ flex: 0.2, }} >
                    <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                </View>
                <View style={{ flex: 0.8, backgroundColor: '#fff' }} >
                    <Image source={require('../../assests/extras/otpScreenImg.png')} resizeMode='contain' style={{ height: '100%', width: '100%' }} />
                </View>
            </View>
            <View style={{ flex: 0.6, top: 10 }} >
                <Text style={{ fontSize: 22, alignSelf: 'center', paddingTop: 10 }} >Verification Code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center', paddingTop: 20 }} >we have sent you the Verification code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center' }} >to your mobile number</Text>

                <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 40 }} >+91 {user.Mobile} <AntDesign name="edit" size={25} onPress={() => { navigation.navigate('SignUp') }} /> </Text>

                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    height: 50,
                    width: '60%',
                    elevation: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    borderRadius: 10,
                    alignSelf: 'center',
                    marginTop: 30
                }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                        <Text>Otp</Text>
                    </View>
                    <View style={{ width: '70%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                        <TextInput
                            placeholder="Enter Otp"
                            onChangeText={(text) => { setOtp(text) }}
                            value={otp}
                            maxLength={6}
                        />
                    </View>
                </View>

                <View style={{ marginTop: 20, alignItems: 'center' }} >

                    {timer > 0 ?
                        <View>
                            <Text>you can request otp in - {timer}</Text>
                        </View>
                        :
                        <TouchableOpacity onPress={() => { resendOtp() }} >
                            <LinearGradient
                                colors={['#62B742', '#23A26F']}
                                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                                style={{ width: 0.4 * SIZES.width, height: 0.05 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                                <Text style={{ fontSize: 16, color: '#fff' }}  >Resend Otp</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    }


                </View>
                {errorMessage ?
                    <View style={{ marginTop: 20, alignItems: 'center' }} >
                        <View>
                            <Text style={{ color: '#000' }} >{errorMessage}</Text>
                        </View>
                    </View> : null}

                <View style={{ marginTop: 30, alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => registerUser()} >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Submit</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default OtpScreen
