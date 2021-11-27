import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { Picker } from '@react-native-picker/picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';


import DataContext from '../../context/DataContext';

function ProfileEditingScreen({ navigation }) {

    const { authUser, user, userData, logOut, url, api, TokenIDN } = React.useContext(DataContext);

    const [selectedGender, setSelectedGender] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [states, setStates] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const [houseNo, setHouseNo] = useState(null);
    const [landMark, setLandMark] = useState(null);
    const [street, setStreet] = useState(null);
    const [district, setDistrict] = useState(null);
    const [pincode, setPincode] = useState(null);

// got states from api now need to integrate 

    useEffect(() => {
        axios.post(api + url.Profile, { InputType: 'GET', TokenID: user.TokenId })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setProfileData(res.data[0].Profile[0])
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrorMessage(res.data[0].Response)
                }

            })
            .catch((err) => { setErrorMessage(err.message) })



        axios.post(api + url.States, { TokenIDN: TokenIDN })
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setStates(res.data[0].States);
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrorMessage(res.data[0].Response);
                }
            })
            .catch((err) => { setErrorMessage(err.message) })

    }, [])

    console.log(states)


    useEffect(() => {
        if (profileData) {
            setHouseNo(profileData.HouseNo);
            setLandMark(profileData.LandMark);
            setStreet(profileData.Street);
            setDistrict(profileData.District);
            setPincode(profileData.Pincode);
        }

    }, [profileData])


    return (
        <View style={{ flex: 1, }} >
            {/*================ Header  ================= */}

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
                    <View>
                        <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }} >

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Profile</Text>
                    </View>



                </View>



            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, alignItems: 'center', paddingVertical: 20 }} >

                <View style={{
                    paddingHorizontal: 30,
                    width: '100%',
                    borderRadius: 10,
                    // elevation: 5,
                    // backgroundColor: '#fff',
                    flexDirection: 'row'
                }} >
                    <View style={{ height: 130, width: 130, borderRadius: 130 / 2, backgroundColor: 'lightblue' }} >

                    </View>
                    <View style={{ marginLeft: 20 }} >
                        <Text style={{ fontSize: 16, paddingTop: 20, paddingBottom: 7, fontWeight: 'bold' }} >User ID</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 5 }} >54132</Text>
                        <Text style={{ fontSize: 16, paddingTop: 0, paddingBottom: 7, fontWeight: 'bold' }} >Registration Date </Text>
                        <Text style={{ fontSize: 14, paddingBottom: 0 }} >26/11/2021</Text>
                    </View>
                </View>

                <View style={{
                    marginTop: 20,
                    paddingHorizontal: 30,
                    width: '100%',
                    borderRadius: 10,
                    elevation: 5,
                    backgroundColor: '#fff'
                }} >
                    <Text style={{ fontSize: 16, paddingTop: 20, paddingBottom: 7, fontWeight: 'bold' }} >Name</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >Thimma chowdary</Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >User ID</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >Arafah-123</Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Sponsor ID</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >12345 </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Sponsor Name</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >Abhinay </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Mobile</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >9876543201 </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Registration Date</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >26-11-2021 </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >ID Type</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >XYZ </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Activation Date</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >26-11-2021 </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Franchise Type</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 10 }} >XYZ </Text>
                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Franchise Date</Text>
                    <Text style={{ fontSize: 14, paddingBottom: 20 }} >XYZ </Text>

                </View>
                <View style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    marginTop: 20,
                    width: '100%',
                    borderRadius: 10,
                    elevation: 5,
                    backgroundColor: '#fff',
                    paddingBottom: 30
                }} >
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Gender</Text>

                        <View style={{
                            paddingHorizontal: 0,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <View style={{ flex: 1, }} >

                                <Picker
                                    mode="dropdown"
                                    selectedValue={selectedGender}
                                    style={{ flex: 1 }}
                                    onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
                                >
                                    <Picker.Item
                                        label="--Activation Type--"
                                        value={0}
                                        key={0} />
                                    <Picker.Item
                                        label="Male"
                                        value={1}
                                        key={1} />
                                    <Picker.Item
                                        label="Female"
                                        value={2}
                                        key={2} />


                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >House No.</Text>

                        <View style={{
                            paddingHorizontal: 30,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <TextInput placeholder="House No." value={houseNo} onChangeText={(text) => { setHouseNo(text) }} />
                        </View>
                    </View>
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Landmark</Text>

                        <View style={{
                            paddingHorizontal: 30,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <TextInput placeholder="Landmark" value={landMark} onChangeText={(text) => { setLandMark(text) }} />
                        </View>
                    </View>
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Street</Text>

                        <View style={{
                            paddingHorizontal: 30,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <TextInput placeholder="Street" value={street} onChangeText={(text) => { setStreet(text) }} />
                        </View>
                    </View>
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >District</Text>

                        <View style={{
                            paddingHorizontal: 30,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <TextInput placeholder="District" value={district} onChangeText={(text) => { setDistrict(text) }} />
                        </View>
                    </View>
                    <View style={{}} >
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Pincode</Text>

                        <View style={{
                            paddingHorizontal: 30,
                            width: '80%',
                            borderRadius: 10,
                            elevation: 5,
                            backgroundColor: '#fff',
                            paddingVertical: 0,
                            flex: 1
                        }} >
                            <TextInput placeholder="Pincode" value={pincode} onChangeText={(text) => { setPincode(text) }} />
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#61B743', '#23A772']}
                        start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                        style={{
                            marginTop: 50,
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '60%',
                            borderRadius: 50,
                            alignSelf: 'center'
                        }} >
                        <View style={{
                            paddingVertical: 13,
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}  >

                            <TouchableOpacity
                                onPress={() => { alert("dflkj") }}
                                style={{ alignItems: 'center', }} >

                                <Text style={{ color: COLORS.white, fontSize: 18 }} >Save</Text>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </View>
            </ScrollView>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default ProfileEditingScreen
