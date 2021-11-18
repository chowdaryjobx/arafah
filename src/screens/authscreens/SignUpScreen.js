import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function SignUpScreen({ navigation }) {

    const [radio, setRadio] = useState({
        left: false,
        right: false
    })



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

            <View style={{ height: '30%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
                <View style={{ paddingTop: 30, flex: 1, width: '100%', backgroundColor: 'transparent', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="account" size={20} />
                        </View>
                        <View style={{ flex: 1, width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="User Name" />
                        </View>
                    </View>
                    <View style={styles.inputContainer2} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Phone Number" />
                        </View>
                    </View>
                    <View style={styles.inputContainer3} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="mail" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Email" />
                        </View>
                    </View>
                    <View style={styles.inputContainer3} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="account" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Sponsor id" />
                        </View>
                    </View>
                    <View style={{ marginTop: 10, width: '70%' }} >
                        <Text style={{ fontSize: 16 }} >Select Placement</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start' }} >
                            <TouchableOpacity onPress={() => { setRadio({ left: true, right: false }) }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                {radio.left ? radioClicked : radioUnClicked}
                                <Text style={{ marginLeft: 10 }} >Left</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setRadio({ left: false, right: true }) }} style={{ flexDirection: 'row', marginLeft: 30, justifyContent: 'center', alignItems: 'center' }} >
                                {radio.right ? radioClicked : radioUnClicked}
                                <Text style={{ marginLeft: 10 }} >Right</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ paddingTop: 30, flex: 0.3, width: '100%', alignItems: 'center', backgroundColor: '#fff' }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('OtpScreen') }}  >
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
                    <Text style={styles.welcomeText} >sign up</Text>
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
