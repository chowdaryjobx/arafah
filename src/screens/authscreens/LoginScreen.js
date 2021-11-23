import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DataContext from '../../context/DataContext';


function LoginScreen({ navigation }) {
    const { authUser, user, Err, TokenIDN } = React.useContext(DataContext);


    if (user) {
        navigation.goBack();
    }
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState('');

    const submit = () => {
        let user = {
            UserMobile: phone,
            Password: password,
            TokenIDN
        }
        authUser(user)


    }


    return (
        <View style={styles.container}>

            <View style={{ height: '35%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <ScrollView style={{ height: '65%', width: '100%', backgroundColor: '#fff' }}>
                <View style={{ top: 30, height: '60%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputContainer2} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Phone Number" value={phone} onChangeText={(text) => { setPhone(text) }} />
                        </View>

                    </View>
                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="lock" size={20} />
                        </View>
                        <View style={{ flex: 1, width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Password" value={password} secureTextEntry={true} onChangeText={(text) => { setPassword(text) }} />
                        </View>
                    </View>

                    <View style={{ width: '70%', marginTop: 20, alignItems: 'flex-end' }} >
                        <TouchableOpacity onPress={() => { alert("hello") }} >
                            <Text>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        Err ?
                            <View style={{ width: '70%', marginTop: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'red', padding: 10, borderRadius: 10 }} >
                                <Text style={{ color: 'red' }} >{Err.message}</Text>
                            </View>
                            : null
                    }

                </View>

                <View style={{ height: 0.4 * SIZES.height, width: '100%', alignItems: 'center', paddingTop: 20 }} >
                    <TouchableOpacity onPress={() => {
                        submit();
                        // authUser()
                        // navigation.goBack()
                    }}  >
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Login Now</Text>
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
            <View style={{ height: '35%', width: '100%', position: 'absolute', backgroundColor: 'transparent' }} >
                <View style={{ flex: 0.5 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeText} >Login</Text>
                    <Text style={styles.headingText} >Please login to use app</Text>
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
