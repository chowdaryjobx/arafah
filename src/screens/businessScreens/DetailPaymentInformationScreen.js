import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';


import DataContext from '../../context/DataContext';

function DetailPaymentInformationScreen({ navigation }) {



    const [passwords, setPasswords] = useState(false);
    const [passwordType, setPasswordType] = useState(null);










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

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Settings</Text>
                    </View>



                </View>



            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ flex: 1, paddingHorizontal: 20 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <MaterialCommunityIcons name="account" size={15} color="black" />
                    <TouchableOpacity onPress={() => { navigation.navigate('PaymentInfo') }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Add Payment Information</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <Entypo name="key" size={15} color="black" />
                    <TouchableOpacity onPress={() => { navigation.navigate('PaymentInfoLog') }} style={{ paddingLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Payment Information Log</Text>
                    </TouchableOpacity>
                </View>





            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default DetailPaymentInformationScreen


