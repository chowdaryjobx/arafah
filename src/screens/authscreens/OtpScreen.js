import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';
import axios from 'axios';

function OtpScreen({ navigation, route }) {


    const { user } = route.params;


    const { authUser } = React.useContext(DataContext);

    const [otp, setOtp] = useState('');
    const [userInputOtp, setUserInputOtp] = useState(null);

    const [timer, setTimer] = useState(120);
    // console.log(otp)
    setTimeout(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }

    }, 1000);

    const resendOtp = () => {
        setTimer(120);
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

        axios.post('http://testapi.arafahmarket.in/api/Registration', data)
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
