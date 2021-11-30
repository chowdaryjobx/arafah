
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import DataContext from '../../context/DataContext';

import axios from 'axios';

function TeamAtAGlanceScreen({ navigation, route }) {

    const { type } = route.params;


    const { authUser, user, userData, logOut, api, url } = React.useContext(DataContext);


    const [business, setBusiness] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    useEffect(() => {
        let data = { TokenID: user.TokenId, Team: type }
        axios.post(api + url.TeamAtaGlance, data)
            .then((res) => {
                if (res.data[0].Status == 'Success') {

                    setBusiness(res.data[0]);
                }
                else if (res.data[0].Status === 'Failure') {
                    setErrorMessage(res.data[0].Response);
                }

            })
            .catch((err) => { setErrorMessage(err.message) })
    }, [])




    if (business) {
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

                    <Text style={{ marginTop: 20, fontSize: 18, fontWeight: 'bold' }} >{business.Heading} {business.TeamBusiness + '/' + business.TeamCount} </Text>

                    <View style={{ marginTop: 10, weight: '100%', backgroundColor: '#fff', borderRadius: 10, elevation: 5 }}  >
                        <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >My Team</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.MyTeam  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#7c7c7c" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >My Directs</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.MyDirects  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {  }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >Activations</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.Activations  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >Bronze</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.Bronze  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {  }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >Silver</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.Silver  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >Gold</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5, }} >

                                    <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', alignSelf: 'center' }} >{business ? business.Gold  : null}</Text>
                                </View>
                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            onPress={() => { navigation.navigate('DailySales') }}
                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                            <View style={{ borderRadius: 10, paddingHorizontal: 20, paddingVertical: 15 }} >
                                <Text style={{ color: '#7c7c7c' }} >Daily Sales</Text>

                            </View>
                            <View>
                                <EvilIcons name="chevron-right" size={40} color="#000" />
                            </View>
                        </TouchableOpacity> */}


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

export default TeamAtAGlanceScreen




