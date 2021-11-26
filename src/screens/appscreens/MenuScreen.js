import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
                <TouchableOpacity onPress={() => { navigation.navigate('Login') }} style={{ marginTop: 10 }} >
                    <Text style={{ fontSize: 16, color: '#7c7c7c' }} >Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('SignUp') }} style={{ marginTop: 10 }} >
                    <Text style={{ fontSize: 16, color: '#7c7c7c' }}  >Register</Text>
                </TouchableOpacity>
            </View>
            {/* ====================  End Of Body ===================== */}
        </View>
    )
}

export default MenuScreen
