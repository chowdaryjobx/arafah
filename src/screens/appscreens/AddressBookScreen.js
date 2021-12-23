import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import DataContext from '../../context/DataContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';


export default function AddressBookScreen({ navigation }) {
    const { TokenIDN, currentAppVersion, api, url } = React.useContext(DataContext);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // version check 
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


    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }} >

            <View style={{ flex: 0.07, backgroundColor: '#fff', justifyContent: "center", paddingHorizontal: 10 }}>
                <AntDesign name="arrowleft" size={20} onPress={() => { navigation.goBack() }} />
            </View>
            <Text style={{ fontSize: 18, paddingHorizontal: 10 }} >My Addresses</Text>
            <TouchableOpacity onPress={() => {
                // navigation.navigate('Address')
            }} style={{ flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                <AntDesign name="plus" size={25} color="#F25816" />
                <Text style={{ paddingLeft: 10 }} >Add Address</Text>
            </TouchableOpacity>
            <ScrollView style={{ flex: 0.93, padding: 10 }}>
                {/* <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} >
                        <AntDesign name="home" size={20} color="#F25816" />
                        <Text style={{ fontSize: 10 }} >12km</Text>
                    </View>
                    <View style={{ flex: 0.8, paddingVertical: 10 }} >
                        <Text>Home</Text>
                        <Text>5-426/123/8, Vadapalani, Kanyakumari, Tamilnadu, </Text>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                    <View style={{ flex: 0.2, justifyContent: 'center', alignItems: 'center' }} >
                        <MaterialIcons name="work-outline" size={20} color="#F25816" />
                        <Text style={{ fontSize: 10 }} >12km</Text>
                    </View>
                    <View style={{ flex: 0.8, paddingVertical: 10 }} >
                        <Text>Home</Text>
                        <Text>5-426/123/8, Vadapalani, Kanyakumari, Tamilnadu, </Text>
                    </View>
                </View> */}

            </ScrollView>
        </View>
    )
}


