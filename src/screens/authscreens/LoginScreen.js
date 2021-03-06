import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import DataContext from '../../context/DataContext';


function LoginScreen({ navigation }) {



    const { user, Err, TokenIDN, api, url, authUser } = React.useContext(DataContext);


    useEffect(() => {
        if (user) {
            navigation.goBack();
        }
    }, [user])

    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [phoneNumberError, setPhoneNumberError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [errMessage, setErrMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const storeData = async (user) => {
        try {
            await AsyncStorage.setItem('LOGGEDUSER', JSON.stringify(user))
        } catch (e) {
            setErrMessage(e.message);
        }
    }


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('LOGGEDUSER')
            if (value !== null) {
                let data = JSON.parse(value);
                authUser(data);
                // navigation.goBack();
                navigation.navigate('Home');
            }
            else {
                setErrMessage("No data found");
            }
        } catch (e) {
            setErrMessage(e.message);
        }
    }


    const submit = () => {


        if (phone !== null) {
            var regex = /^[6-9][0-9]{9}$/;
            if (!regex.test(phone)) {
                setPhoneNumberError("invalid mobile")
                return
            }
            else {
                setPhoneNumberError(null);
            }
        }

        if (phone === null) {
            setPhoneNumberError("Enter Valid Mobile Number");
        }
        else if (password === null || password === '') {
            // console.log("password");
            setPasswordError("Enter Valid Password");
        }
        else {
            setIsLoading(true);

            let user = {
                UserMobile: phone,
                Password: password,
                TokenIDN
            }
            axios.post(api + url.Login, user)
                .then((res) => {
                    let data = res.data;
                    if (data[0].Status === "Success") {
                        setIsLoading(false);
                        setErrMessage(null)
                        let user = {
                            TokenId: data[0].Response
                        }
                        storeData(user)
                            .then(() => {
                                setIsLoading(false);
                                getData();
                            })
                    }
                    else if (data[0].Status === "Failure") {
                        setIsLoading(false);
                        setErrMessage(data[0].Response)
                    }
                })
                .catch((err) => {
                    setIsLoading(false);
                    setErrMessage(err.message)
                })
        }
    }


    useEffect(() => {
        setIsLoading(false);
        setPasswordError(null);
        setErrMessage(null);
    }, [phone, password])


    return (
        <View style={styles.container}>

            <View style={{ height: '40%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <ScrollView style={{ height: '60%', width: '100%', backgroundColor: '#fff' }}>
                <View style={{ top: 30, height: '60%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputContainer2} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholder="Phone Number"
                                keyboardType="number-pad"
                                placeholderTextColor="#000"
                                style={{ color: '#000' }}
                                value={phone} onChangeText={(text) => { setPhone(text) }} style={{ color: '#000' }} />
                        </View>

                    </View>
                    {phoneNumberError ? <View style={{
                        marginTop: 10,
                        height: 20,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }} >
                        <Text style={{ color: 'red' }} >{phoneNumberError}</Text>
                    </View> : null}
                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="lock" size={20} />
                        </View>
                        <View style={{ flex: 1, width: '20%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput
                                placeholder="Password"
                                style={{ color: '#000' }} placeholderTextColor="#000"
                                value={password} secureTextEntry={!showPassword} onChangeText={(text) => { setPassword(text) }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <Ionicons
                                name={showPassword ? "eye-outline" : "eye-off-outline"}
                                size={20}
                                onPress={() => { setShowPassword(!showPassword) }} />
                        </View>
                    </View>
                    {passwordError ? <View style={{
                        marginTop: 10,
                        height: 20,
                        width: '70%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 10,
                    }} >
                        <Text style={{ color: 'red' }} >{passwordError}</Text>
                    </View> : null}

                    <View style={{ width: '70%', marginTop: 20, alignItems: 'flex-end' }} >
                        <TouchableOpacity onPress={() => { navigation.navigate('ResetPassword', {}) }} >
                            <Text>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        errMessage !== null ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10 }} >
                                <Text style={{ color: 'red' }} >{errMessage}</Text>
                            </View>
                            : null
                    }

                </View>


                <View style={{ height: 0.4 * SIZES.height, width: '100%', alignItems: 'center', paddingTop: 20 }} >
                    <TouchableOpacity onPress={() => {

                        submit();

                    }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ flexDirection: 'row', width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff', }}  >Login Now</Text>
                            <ActivityIndicator style={{ marginLeft: 0 }} color="#fff" animating={isLoading} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                        <Text>Already have an Account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                            <Text style={{ color: "#26A36C" }} >Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <View style={{ height: '35%', width: '100%', position: 'absolute', backgroundColor: 'transparent', justifyContent: 'center' }} >
                <Text style={styles.welcomeText} >Login</Text>
                <Text style={styles.headingText} >Please login to use app</Text>
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
        marginTop: 10,
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

export default LoginScreen;
