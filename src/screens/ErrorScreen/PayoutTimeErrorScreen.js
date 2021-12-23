import React, { useState, useEffect } from 'react';
import { View, Text, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants'

import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import DataContext from '../../context/DataContext';
function PayoutTimeErrorScreen({ navigation }) {
    const { user, api, url, TokenIDN, currentAppVersion } = React.useContext(DataContext);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

    const [status, setStatus] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const onpagerefresh = () => {
        setPagerefreshing(true);
        getData();
        setPagerefreshing(false);
    }

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
            .catch((err) => { setErrorMessage(err.message) })
    }, [])



    useEffect(() => {
        axios.post(api + url.AppBlockorMessage, { InputType: 'GET', TokenIDN: TokenIDN })
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
    }, [])

    function getData() {

        axios.post(api + url.AppBlockorMessage, {
            InputType: 'CHECK',
            TokenIDN: TokenIDN
        })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    if (res.data[0].Response === 'Release') {
                        navigation.navigate('Home');
                    }
                }
                else if (res.data[0].Status === 'Failure') {
                    if (res.data[0].Response === "Server is busy, please try again later") {
                        navigation.navigate('PayoutTimeError');
                    }
                    else {
                        setSuccessMessage(null);
                        setErrorMessage(res.data[0].Response);
                    }

                }

            })
            .catch((err) => { setErrorMessage(err.message) })

    }



    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}
            refreshControl={<RefreshControl refreshing={Pagerefreshing}
                onRefresh={onpagerefresh}></RefreshControl>}>
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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                {successMessage ? <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }} >
                    <View style={{ width: '80%', padding: 10 }} ><Text style={{ color: 'green', fontSize: 18 }} >{successMessage}</Text></View>
                </View> : null}

                <TouchableOpacity onPress={() => { onpagerefresh() }} style={{ flex: 1, justifyContent: 'center' }} >
                    <View style={{ padding: 5, paddingHorizontal: 40, borderRadius: 10, elvation: 5, backgroundColor: '#23A26F' }}>
                        <Text style={{ fontSize: 16, color: '#fff' }} >Refresh</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default PayoutTimeErrorScreen



