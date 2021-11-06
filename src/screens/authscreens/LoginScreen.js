import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput } from 'react-native';
import { SIZES, COLORS } from '../../constants'
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DataContext from '../../context/DataContext';


function LoginScreen({ navigation }) {
    const { authUser } = React.useContext(DataContext);

    return (
        <View style={styles.container}>

            <View style={{ height: '35%', width: '100%', }} >
                <Image source={require('../../assests/loginimages/rect1.png')} style={{ height: '100%', width: '100%' }} resizeMode="stretch" />
            </View>
            <View style={{ height: '65%', width: '100%', backgroundColor: '#fff' }}>

                <View style={{ height: '50%', width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.inputContainer1} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="phone" size={20} />
                        </View>
                        <View style={{ flex: 1, width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Phone Number" />
                        </View>
                    </View>
                    <View style={styles.inputContainer2} >
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: '20%', height: '100%', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }} >
                            <MaterialCommunityIcons name="lock" size={20} />
                        </View>
                        <View style={{ width: '80%', height: '100%', borderTopRightRadius: 10, borderBottomRightRadius: 10 }} >
                            <TextInput placeholder="Password" />
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => alert("we are working on it")}
                        style={styles.inputContainer3} >
                        <Text> Forgot Password?  </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ height: '50%', width: '100%', alignItems: 'center' }} >
                    <TouchableOpacity onPress={() => { navigation.navigate('OtpScreen') }}  > 
                    {/* authUser() */}
                        <LinearGradient
                            colors={['#62B742', '#23A26F']}
                            start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                            style={{ width: 0.6 * SIZES.width, height: 0.07 * SIZES.height, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ fontSize: 16, color: '#fff' }}  >Login Now</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', top: 100 }} >
                        <Text>Dont't have an Account ? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")} >
                            <Text style={{ color: "#26A36C" }} >Sign Up</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </View>

            <View style={{ height: '35%', width: '100%', position: 'absolute', backgroundColor: 'transparent' }} >
                <View style={{ flex: 0.5 }}>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.welcomeText} >LOG IN</Text>
                    <Text style={styles.headingText} >please login to use app </Text>
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
        fontSize: 30,
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
        elevation: 10,
        backgroundColor: '#fff'

    },
    inputContainer2: {
        top: 15,
        flexDirection: 'row',
        height: 50,
        width: '70%',
        elevation: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10
    },
    inputContainer3: {
        top: 30,
        flexDirection: 'row',
        width: '70%',
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }
})

export default LoginScreen
