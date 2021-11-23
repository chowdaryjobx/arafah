import React, { useState } from 'react';
import { View, Button, Platform, Text, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { Table, Row, Rows } from 'react-native-table-component';



import { COLORS, SIZES } from '../../constants'

const RewardPoints = () => {




    const [from, setFrom] = useState({
        clicked: false,
        date: ''
    });
    const [to, setTo] = useState({
        clicked: false,
        date: null
    });

    const data = {
        tableHead: ['Date', 'Particulars', 'Cr/Dr', 'Points'],
        tableData: [
            ['1', 'Referal reward points of  Ganesan', '3', '4'],
            ['a', 'b', 'c', 'd'],
            ['1', '2', '3', '456\n789'],
            ['a', 'b', 'c', 'd']
        ]
    }


    return (
        <View style={{ flex: 1 }} >

            {/* =================   Header     ================== */}


            <LinearGradient
                colors={['#61B743', '#23A772']}
                start={{ x: 0, y: 1 }} end={{ x: 1, y: 0.25 }}
                style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    height: 0.08 * SIZES.height,
                    width: SIZES.width,
                    // backgroundColor: COLORS.primary
                }} >

                <View>
                    <AntDesign name="arrowleft" size={20} color="white" onPress={() => { navigation.goBack() }} />
                </View>
                <View style={{ paddingLeft: 10 }} >
                    <Text style={{ fontSize: 18, color: '#fff' }} >Reward Points</Text>
                </View>


            </LinearGradient>

            {/* ================= End of  Header     ================== */}

            {/* =================   Body     ================== */}
            <View style={{ flex: 1, backgroundColor: 'lightblue', paddingHorizontal: 20 }} >
                <View style={{ borderBottomWidth: 1, paddingBottom: 20 }} >
                    <View style={{ alignSelf: 'center', paddingTop: 10 }} >
                        <Text style={{ fontSize: 18, }} >Reward Points(350)</Text>
                    </View>
                    <View style={{ paddingTop: 10 }} >
                        <Text style={{ fontSize: 18, }} >Select Period</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10 }} >
                        <View style={{ flex: 1, flexDirection: 'row' }}  >
                            <View style={{ flex: 1 }} >
                                <Text>From</Text>

                                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                                    <TextInput placeholder="date" style={{ height: 40, borderWidth: 1, width: '80%' }} />

                                    <View style={{ height: 40, width: '20%', justifyContent: 'center', alignItems: 'center' }} >
                                        <Fontisto name="date" size={20} onPress={() => {
                                            console.log("pressed");
                                            setFrom({ clicked: true, date: '' })

                                        }} />
                                    </View>
                                    {/* {from.clicked ? */}
                                    {/* <DateTimePicker
                                        testID="dateTimePicker"
                                        value={from.date}
                                        mode='date'
                                        is24Hour={true}
                                        display="default"
                                        onChange={(d) => setFrom({
                                            clicked: false,
                                            date: d
                                        })}
                                    />  */}
                                    {/* : null
                                } */}
                                </View>
                            </View>

                            <View style={{ flex: 1 }} >
                                <Text>To</Text>

                                <View style={{ flexDirection: 'row', marginTop: 10 }} >
                                    <TextInput placeholder="date" style={{ height: 40, borderWidth: 1, width: '80%' }} />

                                    <View style={{ height: 40, width: '20%', justifyContent: 'center', alignItems: 'center' }} >
                                        <Fontisto name="date" size={20} />
                                    </View>
                                </View>
                            </View>



                        </View>

                    </View>
                </View>
                <View style={styles.container}>
                    <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                        <Row data={data.tableHead} style={styles.head} textStyle={styles.text} />
                        <Rows data={data.tableData} textStyle={styles.text} />
                    </Table>
                </View>


            </View>



            {/* =================  End of Body  ================== */}


        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 10, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#62B742' },
    text: { margin: 6 }
});



export default RewardPoints;









