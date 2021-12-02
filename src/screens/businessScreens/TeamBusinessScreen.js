
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import DataContext from '../../context/DataContext';

import axios from 'axios';

function TeamBusinessScreen({ navigation, route }) {

    const { TeamData } = route.params;


    const { authUser, user, userData, logOut, api, url } = React.useContext(DataContext);

    const [businessTeamData, setBusinessTeamData] = useState(null);
    const [tableData, setTableData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    console.log(businessTeamData)

    useEffect(() => {
        if (TeamData) {

            axios.post(api + url.TeamWiseReport, { Team: TeamData.type, ReportNo: TeamData.ReportNo, PageIndex: TeamData.pageIndex, TokenID: user.TokenId })
                .then((res) => {

                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setTableData(res.data[0].Team);
                        setBusinessTeamData(res.data[0])
                    }
                    else if (res.data[0].Status === 'Failure') {

                        setErrorMessage(res.data.Response)

                    }
                })
                .catch((err) => { setErrorMessage(err.message) })

        }

    }, [TeamData])


    const submit = (data) => {



    }




    if (businessTeamData) {
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
                {/*================End Of Header  ================= */}

                {/* =============  Body  ================ */}
                <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 30 }} >

                    <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }} >{businessTeamData.Heading} {businessTeamData.TeamBusiness + '/' + businessTeamData.TeamCount}</Text>
                    <View style={{ width: '100%', elevation: 10, backgroundColor: '#fff', borderRadius: 10, marginTop: 20 }} >
                        <View key={0} style={{ width: '100%', padding: 10, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Name</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >Level</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >A Team</Text>
                            <Text style={{ flex: 1, alignSelf: 'flex-start' }} >B Team</Text>
                        </View>
                        {tableData.length !== 0 ?
                            tableData.map((item, index) => {
                                return (
                                    <View key={index + 1} style={{ width: '100%', padding: 10, paddingVertical: 15, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                                        <TouchableOpacity onPress={() => { navigation.navigate('TeamMemberData', { TeamMemberData: item.DownlineTokenID }) }} style={{ flex: 1, alignSelf: 'flex-start' }}  >
                                            <Text >{item.Name}</Text>
                                        </TouchableOpacity>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.Level}</Text>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.ATeam}</Text>
                                        <Text style={{ flex: 1, alignSelf: 'flex-start' }} >{item.BTeam}</Text>
                                    </View>
                                )
                            }) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16 }} >No records found</Text>
                            </View>
                        }

                    </View>


                </View>

                {/* =============  End of Body  ================= */}
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text>Loading...</Text>
            </View>
        )

    }



}

export default TeamBusinessScreen





