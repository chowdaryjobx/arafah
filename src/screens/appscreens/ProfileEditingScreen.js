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

    // const [selectedGender, setSelectedGender] = useState(null);
    const [profileData, setProfileData] = useState(null);
    const [states, setStates] = useState(null);
    const [districts, setDistricts] = useState(null);


    const [gender, setGender] = useState(null);
    const [dob, setDob] = useState(null);
    const [email, setEmail] = useState(null);
    const [houseNo, setHouseNo] = useState(null);
    const [landMark, setLandMark] = useState(null);
    const [street, setStreet] = useState(null);
    const [state, setState] = useState(null);
    const [district, setDistrict] = useState(null);
    const [city, setCity] = useState(null)
    const [pincode, setPincode] = useState(null);

    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        if (state) {
            axios.post(api + url.Districts, { StateName: state, TokenIDN })
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setDistricts(res.data[0].Districts);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) })
        }
    }, [state])



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




    useEffect(() => {
        if (profileData) {
            setGender(profileData.Gender)
            setDob(profileData.DOB);
            setEmail(profileData.Email)
            // setSelectedGender(profileData.Gender)
            setHouseNo(profileData.HouseNo);
            setLandMark(profileData.LandMark);
            setStreet(profileData.Street);
            setState(profileData.StateName);
            setDistrict(profileData.District);
            setCity(profileData.City);
            setPincode(profileData.Pincode);
        }

    }, [profileData])



    const submit = () => {


        let data = {
            InputType: "UPDATE",
            HouseNo: houseNo,
            Street: street,
            LandMark: landMark,
            City: city,
            StateName: state,
            District: district,
            Pincode: pincode,
            Email: email,
            Gender: gender,
            DOB: dob,
            TokenID: user.TokenId
        }


        axios.post(api + url.Profile, data)
            .then((res) => {
                if (res.data[0].Status === 'Success') {
                    setErrorMessage(null);
                    setSuccessMessage(res.data[0].Response);
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrorMessage(res.data[0].Response)
                }
            })
            .catch((err) => {
                setSuccessMessage(null);
                setErrorMessage(err.message)
            })
    }

    if (profileData) {
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
                        flexDirection: 'row'
                    }} >
                        <View style={{ height: 130, width: 130, borderRadius: 130 / 2, elevation: 10 }} >
                            <Image source={{ uri: userData.profilePic }} style={{ height: '100%', width: '100%', borderRadius: 130 / 2 }} />
                        </View>
                        <View style={{ marginLeft: 20 }} >
                            <Text style={{ fontSize: 16, paddingTop: 20, paddingBottom: 7, fontWeight: 'bold' }} >User ID</Text>
                            <Text style={{ fontSize: 14, paddingBottom: 5 }} >{profileData.UserName}</Text>
                            <Text style={{ fontSize: 16, paddingTop: 0, paddingBottom: 7, fontWeight: 'bold' }} >Registration Date </Text>
                            <Text style={{ fontSize: 14, paddingBottom: 0 }} >{profileData.RegOn}</Text>
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
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.Name}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Sponsor ID</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.SponsorID}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Sponsor Name</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.SponsorName}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Mobile</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.Mobile}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >ID Type</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.IDType}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Activation Date</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.ActivationOn}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Franchise Type</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 10 }} >{profileData.FranchiseeType}</Text>
                        <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Franchise Date</Text>
                        <Text style={{ fontSize: 14, paddingBottom: 20 }} >{profileData.FranOn}</Text>

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
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Email</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                {
                                    email === 'N.A.' ?
                                        <TextInput
                                            style={{ color: '#000' }}
                                            placeholder="House No." value={email === 'N.A.' ? '' : email} onChangeText={(text) => { setEmail(text) }} />
                                        :
                                        <Text style={{ paddingVertical: 15, }} >{email}</Text>
                                }

                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >Date of birth</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                <TextInput
                                    style={{ color: '#000' }}

                                    placeholder="House No." value={dob === 'N.A.' ? '' : dob} onChangeText={(text) => { setDob(text) }} />
                            </View>
                        </View>
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
                                        selectedValue={gender}
                                        style={{ flex: 1 }}
                                        onValueChange={(itemValue, itemIndex) => {
                                            if (itemValue === 1) {
                                                setGender('Male')
                                            }
                                            else if (itemValue === 2) {
                                                setGender('Female')
                                            }
                                        }}
                                    >
                                        <Picker.Item
                                            label="--Select Gender--"
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
                                <TextInput
                                    style={{ color: '#000' }}
                                    placeholder="House No." value={houseNo === 'N.A.' ? '' : houseNo} onChangeText={(text) => { setHouseNo(text) }} />
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
                                <TextInput
                                    style={{ color: '#000' }}
                                    placeholder="Landmark" value={landMark === 'N.A.' ? '' : landMark} onChangeText={(text) => { setLandMark(text) }} />
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
                                <TextInput
                                    style={{ color: '#000' }}
                                    placeholder="Street" value={street === 'N.A.' ? '' : street} onChangeText={(text) => { setStreet(text) }} />
                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >State</Text>
                            <View style={{
                                paddingHorizontal: 0,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >

                                <Picker
                                    mode="dropdown"
                                    selectedValue={state}
                                    style={{ flex: 1 }}
                                    onValueChange={(itemValue, itemIndex) => setState(itemValue)}
                                >
                                    <Picker.Item
                                        label="--Select State--"
                                        value={0}
                                        key={0} />
                                    {states ? states.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.StateName}
                                                value={item.StateName}
                                                key={index + 1} />
                                        )

                                    }) : null

                                    }


                                </Picker>
                            </View>
                        </View>
                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >District</Text>
                            <View style={{
                                paddingHorizontal: 0,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >

                                <Picker
                                    mode="dropdown"
                                    selectedValue={district}
                                    style={{ flex: 1 }}
                                    onValueChange={(itemValue, itemIndex) => setDistrict(itemValue)}
                                >
                                    <Picker.Item
                                        label="--Select District--"
                                        value={0}
                                        key={0} />
                                    {districts ? districts.map((item, index) => {
                                        return (
                                            <Picker.Item
                                                label={item.DistrictName}
                                                value={item.DistrictName}
                                                key={index + 1} />
                                        )

                                    }) : null

                                    }
                                </Picker>
                            </View>
                        </View>

                        <View style={{}} >
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 7, fontWeight: 'bold' }} >City</Text>

                            <View style={{
                                paddingHorizontal: 30,
                                width: '80%',
                                borderRadius: 10,
                                elevation: 5,
                                backgroundColor: '#fff',
                                paddingVertical: 0,
                                flex: 1
                            }} >
                                <TextInput
                                    style={{ color: '#000' }}
                                    placeholder="City" value={city === 'N.A.' ? '' : city} onChangeText={(text) => { setCity(text) }} />
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
                                <TextInput
                                    style={{ color: '#000' }}
                                    placeholder="Pincode" value={pincode === 'N.A.' ? '' : pincode} onChangeText={(text) => { setPincode(text) }} />
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
                                    onPress={() => { submit() }}
                                    style={{ alignItems: 'center', }} >

                                    <Text style={{ color: COLORS.white, fontSize: 18 }} >Save</Text>
                                </TouchableOpacity>
                            </View>


                        </LinearGradient>
                        {
                            errorMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'red',
                                    justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'red' }} >{errorMessage}</Text>
                                </View> : null
                        }
                        {
                            successMessage ?
                                <View style={{
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    paddingHorizontal: 30,
                                    paddingVertical: 10,
                                    width: '80%',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'green',
                                    justifyContent: 'center', alignItems: 'center'
                                }} >
                                    <Text style={{ color: 'green' }} >{successMessage}</Text>
                                </View> : null
                        }
                    </View>
                </ScrollView>
                {/* ====================  End Of Body ===================== */}
            </View>
        )
    } else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading....</Text>
            </View>
        )
    }
}

export default ProfileEditingScreen
