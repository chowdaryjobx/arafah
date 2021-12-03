import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

import DataContext from '../../context/DataContext';

function MenuScreen({ navigation }) {
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
                    paddingVertical: 13

                }}  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }} >

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah</Text>
                    </View>



                </View>
                <TouchableOpacity onPress={() => { navigation.navigate('RewardPoints') }}>

                </TouchableOpacity>


            </LinearGradient>
            {/*================End Of Header  ================= */}


            {/* ==================  Body  ======================= */}

            <View style={{ flex: 1, paddingHorizontal: 20 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }} >
                    <AntDesign name="login" size={14} />
                    <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={{ marginLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginTop: 10}} >
                    <AntDesign name="logout" size={14} />
                    <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }} style={{ marginLeft: 10 }} >
                        <Text style={{ fontSize: 16, color: '#7c7c7c' }}  >Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default MenuScreen
