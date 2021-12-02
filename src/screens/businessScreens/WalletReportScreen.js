import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { COLORS, SIZES } from '../../constants'

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import DataContext from '../../context/DataContext';

import axios from 'axios';

function WalletReportScreen({ navigation, route }) {


    const [date, setDate] = useState(new Date(1598051730000));

    const { user, api, url } = React.useContext(DataContext);


    const { type } = route.params;

    const [walletReport, setWalletReport] = useState(null);
    const [walletRecords, setWalletRecords] = useState(null);

    const [fromDate, setFromDate] = useState('1/1/1925');
    const [fromDate1, setFromDate1] = useState('1/1/1925');
    const [fromDateIsVisible, setFromDateIsVisible] = useState(false);

    const [toDate, setToDate] = useState('1/1/1925');
    const [toDate1, setToDate1] = useState('1/1/1925');
    const [toDateIsVisible, setToDateIsVisible] = useState(false);

    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);



    const FromDateChange = (event, selectedDate) => {


        if (Platform.OS === 'android') {
            let date = new Date(selectedDate);

            setFromDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
            setFromDate1((date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear())
            setFromDateIsVisible(false);


        }

    };

    const toDateChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            let date = new Date(selectedDate);
            setToDate(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
            setToDate1((date.getMonth() + 1) + '/' + (date.getDate()) + '/' + date.getFullYear())
            setToDateIsVisible(false);
        }
    };


    useEffect(() => {
        if (type) {

            let data = {
                WalletType: type,
                FromDate: fromDate,
                ToDate: toDate,
                PageIndex: 1,
                TokenID: user.TokenId
            }


            axios.post(api + url.Wallet, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setWalletReport(res.data[0]);
                        setWalletRecords(res.data[0].WalletRecords);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) });
        }

    }, [type])

    const Submit = () => {
   
        if (type) {

            let data = {
                WalletType: type,
                FromDate: fromDate1,
                ToDate: toDate1,
                PageIndex: 1,
                TokenID: user.TokenId
            }


            axios.post(api + url.Wallet, data)
                .then((res) => {
                    if (res.data[0].Status === 'Success') {
                        setErrorMessage(null);
                        setWalletReport(res.data[0]);
                        setWalletRecords(res.data[0].WalletRecords);
                    }
                    else if (res.data[0].Status === 'Failure') {
                        setErrorMessage(res.data[0].Response);
                    }
                })
                .catch((err) => { setErrorMessage(err.message) });
        }
        else {

            setErrorMessage("Type not found");
        }
    }




    return (
        <View style={{ flex: 1, }} >
            {/*================ Header  ================= */}
            {fromDateIsVisible ? <DateTimePicker
                value={new Date()}
                mode={'date'}
                display="default"
                onChange={FromDateChange}
            /> : null}
            {toDateIsVisible ? <DateTimePicker
                value={new Date()}
                mode={'date'}
                display="default"
                onChange={toDateChange}
            /> : null}
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

                        <Text style={{ color: COLORS.white, fontSize: 18 }} >Arafah Wallet</Text>
                    </View>



                </View>



            </LinearGradient>
            {/*================End Of Header  ================= */}
            {walletReport ?



                // {/* ==================  Body  ======================= */}


                <View style={{ flex: 1, }} >
                    <View
                        style={{ height: '12%', width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10 }} >
                        <Text style={{ fontSize: 12, color: '#7c7c7c' }} >{type} Wallet Balance</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -5 }} >
                            <FontAwesome name="rupee" size={30} color="black" style={{ paddingTop: 10 }} />
                            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }} > {walletReport.WalletBalance}</Text>
                        </View>
                    </View>
                    <View style={{ height: '20%', width: '100%', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10 }} >
                        <View style={{ flexDirection: 'row', }} >
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 0.7, height: 40, width: 150, marginRight: 5, justifyContent: 'center', paddingLeft: 10, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                    <Text>{fromDate === '1/1/1925' ? '' : fromDate}</Text>
                                </View>
                                <View style={{ flex: 0.3, height: 40, marginRight: 5, justifyContent: 'center', paddingLeft: 5 }} >
                                    <Fontisto size={25} name="date" onPress={() => { setFromDateIsVisible(true) }} />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }} >
                                <View style={{ flex: 0.7, height: 40, width: 150, marginRight: 5, justifyContent: 'center', paddingLeft: 10, elevation: 2, backgroundColor: '#fff', borderRadius: 5 }} >
                                    <Text>{toDate === '1/1/1925' ? '' : toDate}</Text>
                                </View>
                                <View style={{ flex: 0.3, height: 40, marginRight: 5, justifyContent: 'center', paddingLeft: 5 }} >
                                    <Fontisto size={25} name="date" onPress={() => { setToDateIsVisible(true) }} />
                                </View>
                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => { Submit() }}
                            style={{ alignItems: 'center', marginTop: 20, padding: 12, backgroundColor: '#62B742', width: '50%', borderRadius: 5, alignSelf: 'center' }} >
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView  >
                        <View style={{ flex: 1, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ccc', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10 }} >
                            {walletRecords ? walletRecords.map((item, index) => {
                                return (
                                    <View key={index} style={{ width: '100%', borderRadius: 10, elevation: 5, backgroundColor: '#fff', paddingRight: 20, marginTop: 20, paddingVertical: 16, borderLeftWidth: 3, borderLeftColor: item.TransactionType === 'DR' ? '#fd6a6a' : item.TransactionType === 'CR' ? '#1aca82' : null }} >

                                        <View style={{ paddingLeft: 20, }} >
                                            <Text style={{ fontSize: 12 }} >{item.Description}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }} >
                                                <View style={{ flexDirection: 'row' }} >
                                                    <FontAwesome name="rupee" size={20} color="black" style={{ paddingTop: 10 }} >
                                                        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }} > {item.Amount}</Text>
                                                    </FontAwesome>
                                                    <Text style={{
                                                        fontSize: 12,
                                                        alignSelf: 'flex-end',
                                                        paddingLeft: 10,
                                                        color: item.TransactionType === 'DR' ? '#fd6a6a' : item.TransactionType === 'CR' ? '#1aca82' : null
                                                    }}
                                                    >{item.TransactionType === 'DR' ? '+Debit' : item.TransactionType === 'CR' ? '+Credit' : null}</Text>

                                                </View>
                                                <Text style={{ alignSelf: 'flex-end', color: '#7c7c7c', fontSize: 12 }} >{item.TransactionDate}</Text>
                                            </View>
                                        </View>


                                    </View>
                                )
                            })
                                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                                    <Text>No Records to show</Text>
                                </View>
                            }


                        </View>
                    </ScrollView>

                </View>

                // {/* ====================  End Of Body ===================== */}

                :
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }} >
                    <Text style={{ fontSize: 18, color: 'red' }} >{errorMessage}</Text></View>}
        </View>
    )
}

export default WalletReportScreen


