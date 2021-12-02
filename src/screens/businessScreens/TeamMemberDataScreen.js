import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import DataContext from '../../context/DataContext';

import axios from 'axios';
function TeamMemberDataScreen({ navigation, route }) {

    const { authUser, user, userData, logOut, api, url } = React.useContext(DataContext);


    const { TeamMemberData } = route.params;

    const [teamMemberUserData, setTeamMemberUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [errMessage, setErrMessage] = useState(null);



    useEffect(() => {

        if (TeamMemberData) {
            axios.post(api + url.TeamUserData, { TokenID: TeamMemberData })
                .then((res) => {
                    if (res.data[0].Status === 'Success') {

                        setErrMessage(null);

                        setTeamMemberUserData(res.data[0]);
                        setLoading(false);

                    }
                    else if (res.data[0].Status === 'Failure') {
                        setErrMessage(res.data[0].Response)
                    }
                })
                .catch((err) => { setErrMessage(err.message) })
        }

    }, [TeamMemberData])


    if (!loading) {

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

                            <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah </Text>
                        </View>



                    </View>
                </LinearGradient>
                <View style={{ flex: 1, }} >
                    <View style={{ height: 150, marginHorizontal: 20, marginVertical: 20, elevation: 5, borderRadius: 10, backgroundColor: '#fff' }} >
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }} >
                                <MaterialCommunityIcons name="account" size={40} />
                            </View>
                            <View style={{ flex: 0.7 }} >
                                <Text style={{ fontWeight: '300', paddingTop: 20 }} >Name  :</Text>
                                <Text style={{ fontWeight: 'bold', paddingTop: 5, fontSize: 16 }} >{teamMemberUserData ? teamMemberUserData.Name : null}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }} >
                            <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }} >
                                <MaterialCommunityIcons name="account-multiple-plus" size={40} />
                            </View>
                            <View style={{ flex: 0.7 }} >
                                <Text style={{ fontWeight: '300', paddingTop: 20 }} >Sponsor Name  :</Text>
                                <Text style={{ fontWeight: 'bold', paddingTop: 5, fontSize: 16 }} >{teamMemberUserData ? teamMemberUserData.Sponsor : null}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 20, elevation: 5, borderRadius: 10, backgroundColor: '#fff' }} >

                        <View style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} ></Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >A </Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >B </Text>
                        </View>
                        <View style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Team</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{teamMemberUserData ? teamMemberUserData.ATeamCount : null}</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{teamMemberUserData ? teamMemberUserData.BTeamCount : null}</Text>
                        </View>
                        <View style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Business</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{teamMemberUserData ? teamMemberUserData.ATeamBusiness : null}</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{teamMemberUserData ? teamMemberUserData.BTeamBusiness : null}</Text>
                        </View>

                    </View>

                </View>

            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading ....</Text>
                <Text style={{ color: 'red' }} >{errMessage}</Text>
            </View>
        )
    }
}

export default TeamMemberDataScreen