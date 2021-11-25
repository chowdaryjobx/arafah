import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DataContext from '../../context/DataContext';

const ProfileScreen = ({ navigation }) => {

    const { authUser, user, userData, logOut } = React.useContext(DataContext);



    let size = 15;
    return (
        <View style={styles.container} >
            <View style={styles.header} >
                <View style={styles.headerContent} >
                    <View style={styles.headerContent1} >
                        <View>
                            <View>
                                <AntDesign name="arrowleft" size={20} onPress={() => { navigation.goBack() }} />
                            </View>
                            <View style={{ top: 10 }} >
                                <Text style={{ fontSize: 20, color: "#F26822" }} >{user ? user.userName : null}</Text>
                                <Text style={styles.normalText} >{user ? user.email : null}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.headerContent2} >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('ProfileEditing')}
                            style={styles.profilePic} >
                            <Image source={{ uri: userData.profilePic }}
                                style={{ height: 70, width: 70, borderRadius: 70 / 2 }} />
                            <View style={{ height: 20, width: 20, position: 'absolute' }} >
                                <AntDesign name="edit" size={20} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* End of Header */}


            {/*============== profile page body ================== */}


            <View style={styles.bodyContainer} >
                <View style={{ paddingBottom: 10, top: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                    <Text style={{ color: 'gray', paddingVertical: 10, color: '#F26822' }} >FOOD ORDERS</Text>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <Foundation name="clipboard-notes" size={size} onPress={() => { }} />
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('PreviousOrders')}
                            style={styles.bodyText} >
                            <Text style={styles.headingText}  >Your Orders</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <MaterialIcons name="favorite-border" size={size} onPress={() => { }} />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('FavouriteOrders')} style={styles.bodyText} >
                            <Text style={styles.headingText}  >Favourite Orders</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <FontAwesome name="address-book" size={size} onPress={() => { }} />
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('AddressBook')} style={styles.bodyText} >
                            <Text style={styles.headingText}  >Address Book</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <MaterialCommunityIcons name="message-outline" size={size} onPress={() => { }} />
                        </View>
                        <View style={styles.bodyText} >
                            <Text style={styles.headingText}  >Online Ordering Help</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingBottom: 10, top: 20, borderBottomWidth: 1, borderBottomColor: '#ccc' }} >
                    <Text style={{ color: 'gray', paddingVertical: 10, color: '#F26822' }} >TABLE BOOKINGS</Text>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <Ionicons name="md-checkmark-circle-outline" size={size} onPress={() => { }} />
                        </View>
                        <View style={styles.bodyText} >
                            <Text style={styles.headingText}  >Your bookings</Text>
                        </View>

                    </View>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <MaterialCommunityIcons name="message-outline" size={size} onPress={() => { }} />
                        </View>
                        <View style={styles.bodyText} >
                            <Text style={styles.headingText}  >Table Reservation Help</Text>
                        </View>
                    </View>
                    <View style={styles.bodyRow} >
                        <View style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <MaterialCommunityIcons name="information-variant" size={size} onPress={() => { }} />
                        </View>
                        <View style={styles.bodyText} >
                            <Text style={styles.headingText}  >About</Text>
                        </View>
                    </View>
                </View>
                <View style={{ top: 40 }} >
                    <View style={styles.bodyRow} >
                        <View onPress={() => alert("hello")} style={{ height: 25, width: 25, borderRadius: 25 / 2, backgroundColor: '#E5E5E5', justifyContent: 'center', alignItems: 'center' }} >
                            <AntDesign name="logout" size={size} onPress={() => { }} />
                        </View>
                        <TouchableOpacity onPress={() => { logOut(), navigation.goBack() }} style={styles.bodyText} >
                            <Text style={styles.headingText}  >Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff'

    },
    header: {
        paddingVertical: 10,
        flex: 0.15,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    headerContent: {
        flex: 1,
        flexDirection: 'row',
    },
    headerContent1: {
        justifyContent: 'space-between',
        flex: 0.7,
    },
    headerContent2: {
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'center',

    },
    profilePic: {
        height: 70,
        width: 70,
        backgroundColor: '#fff',
        borderRadius: 70 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,

    },
    headingText: {
        fontSize: 16,
        fontWeight: '400',
    },
    normalText: {
        fontSize: 14
    },
    bodyContainer: {
        flex: 0.7,
    },
    bodyRow: {
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center'


    },
    bodyText: {
        paddingLeft: 10
    },
    footerContainer: {
        flex: 0.35
    },
    footerText: {
        paddingLeft: 35,
    }
})


export default ProfileScreen;