
import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants'

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import DataContext from '../../context/DataContext';

function AppVersionErrorScreen({ navigation }) {
    const { TokenIDN, api, url, currentAppVersion } = React.useContext(DataContext);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    useEffect(() => {
        axios.post(api + url.AndroidAppVersion, { TokenIDN: TokenIDN })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setSuccessMessage(res.data[0])
                    // setErrorMessage(null);
                }
                else if (res.data[0].Status === 'Failure') {
                    setSuccessMessage(null);
                    setErrorMessage(res.data[0].Response);
                }
            })
            .catch((err) => { setErrorMessage(err.message) })
    }, [])

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
                        setErrorMessage(res.data[0].Response);
                    }

                }

            })
    }, [])


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >
                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }} >
                <View style={{ width: '80%', elevation: 5, backgroundColor: '#fff', padding: 10, borderRadius: 10 }} >
                    {successMessage ? <Text style={{ fontSize: 18 }} >{successMessage.Message}</Text> : null}
                    <TouchableOpacity style={{ padding: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 10, alignItems: 'flex-end' }} >
                        <View style={{ backgroundColor: 'green', padding: 10, paddingHorizontal: 20, borderRadius: 10 }} >
                            <Text style={{ fontSize: 16, color: '#fff' }} >Update</Text>
                        </View>
                    </TouchableOpacity>
                    {errorMessage ? <View style={{ alignSelf: 'center', width: '80%', borderWidth: 1, borderRadius: 10, borderColor: 'red', paddingVertical: 10, justifyContent: 'center', alignItems: 'center' }} ><Text style={{ color: 'red' }} >{errorMessage}</Text></View> : null}
                </View>
            </View>
        </ScrollView>
    )
}

export default AppVersionErrorScreen

