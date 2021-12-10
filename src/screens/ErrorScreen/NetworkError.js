import React, { useState, useEffect } from 'react';
import { View, Text, BackHandler, RefreshControl, ScrollView } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS, SIZES } from '../../constants'

import LinearGradient from 'react-native-linear-gradient';


function NetworkError({ navigation }) {

    const [isNetworkConnected, setIsNetworkConnected] = useState(null);
    const [Pagerefreshing, setPagerefreshing] = React.useState(false);

    const onpagerefresh = () => {
        setPagerefreshing(true);
        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                navigation.goBack()
            }
        });
        setPagerefreshing(false);
    }


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])


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
                <MaterialCommunityIcons name="access-point-network-off" size={100} color="#ccc" />
                <Text style={{ fontSize: 18, color: '#ccc', marginTop: 30 }} >Check your network connection & refresh</Text>
            </View>
        </ScrollView>
    )
}

export default NetworkError
