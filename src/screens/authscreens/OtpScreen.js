import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';

function OtpScreen({ navigation }) {
    const { authUser } = React.useContext(DataContext);

    const [otp, setOtp] = useState(1234);
    const [userInputOtp, setUserInputOtp] = useState(null);



    const [input1, setInput1] = useState(null);
    const [input2, setInput2] = useState(null);
    const [input3, setInput3] = useState(null);
    const [input4, setInput4] = useState(null);



    const inputRef1 = useRef();
    const inputRef2 = useRef();
    const inputRef3 = useRef();
    const inputRef4 = useRef();


    useEffect(() => {

        if (input1) {
            setUserInputOtp(input1);
        }
        if (input2) {
            let value = 1;
      
            value = userInputOtp * 10 + input2;
           
            setUserInputOtp(value);
        }
        if (input3) {
            let value = 1;
            value = value * 10 + input3;
            setUserInputOtp(value);
        }
        if (input4) {
            let value = 1;
            value = value * 10 + input4;
            setUserInputOtp(value);
        }

    }, [input1, input2, input3, input4])


    useEffect(() => {

        if (input1 == '' && input2 == '' && input3 == '' && input4 == '')
            setUserInputOtp(null);
            
    }, [input1, input2, input3, input4])


    //working function to get digits from an integer.
    // if (otp !== null) {
    //     let n = otp;
    //     let r;
    //  while(n>0){
    //      let r = n % 10;
    //      console.log(r);
    //      n = Math.floor(n/10);
    //  }
    // }


    useEffect(() => {
        if (input1) {
            inputRef2.current.focus();
        }
    }, [input1])


    useEffect(() => {
        if (input2) {
            inputRef3.current.focus();
        }
        else if (input2 == '') {
            inputRef1.current.focus();
        }
    }, [input2])


    useEffect(() => {
        if (input3) {
            inputRef4.current.focus();
        }
        else if (input3 == '') {
            inputRef2.current.focus();
        }
    }, [input3])

    useEffect(() => {
        if (input4 == '') {
            inputRef3.current.focus();
        }
    }, [input4])




    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }} >
            <View style={{ flex: 0.3, flexDirection: 'row' }} >
                <View style={{}} >
                    <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
                </View>
                <View style={{ flex: 0.8, alignItems: 'center' }} >
                    <Image source={require('../../assests/extras/otpScreenImg.png')} resizeMode='stretch' />
                </View>
            </View>
            <View style={{ flex: 0.6, top: 10 }} >
                <Text style={{ fontSize: 22, alignSelf: 'center', paddingTop: 10 }} >Verification Code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center', paddingTop: 20 }} >we have sent you the Verification code</Text>
                <Text style={{ fontSize: 16, alignSelf: 'center' }} >to your mobile number</Text>

                <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 40 }} >+91 9919205678  <AntDesign name="edit" size={25} onPress={() => { navigation.navigate('Login') }} /> </Text>


                <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 30, top: 30 }}>
                    <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#fff', elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <TextInput
                            autoFocus={true}
                            ref={inputRef1}
                            onChangeText={(text) => { setInput1(parseInt(text)) }}
                            style={{ fontSize: 22, alignSelf: 'center', }}
                            keyboardType='number-pad' />
                    </View>
                    <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#fff', elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <TextInput
                            ref={inputRef2}
                            style={{ fontSize: 22 }}
                            onChangeText={(text) => { setInput2(parseInt(text)) }}
                            keyboardType='number-pad'
                        />
                    </View>
                    <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#fff', elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <TextInput
                            ref={inputRef3}
                            style={{ fontSize: 22 }}
                            onChangeText={(text) => { setInput3(parseInt(text)) }}
                            keyboardType='number-pad'
                        />
                    </View>
                    <View style={{ height: 50, width: 50, borderRadius: 25, backgroundColor: '#fff', elevation: 10, justifyContent: 'center', alignItems: 'center' }} >
                        <TextInput
                            ref={inputRef4}
                            style={{ fontSize: 22 }}
                            onChangeText={(text) => { setInput4(parseInt(text)) }}
                            keyboardType='number-pad'
                        />
                    </View>
                </View>
                <View style={{ top: 70, alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => authUser()} >


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
