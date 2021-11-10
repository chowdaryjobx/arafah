import React, { useState } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import DataContext from '../../context/DataContext';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function ProfileEditingScreen({ navigation }) {
    const {user,userData, cartItems } = React.useContext(DataContext);



    const [userName, setUserName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email);
    const [phone, setPhone] = useState(userData.phoneNumber);
    const [dob, setDob] = useState('05/08/1997');
    const [address, setAddress] = useState(userData.address);


    const [editUserName, setEditUserName] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPhone, setEditPhone] = useState(false);
    const [editDob, setEditDob] = useState(false);
    const [editAddress, setEditAddress] = useState(false);


    return (
        <View style={{ flex: 1, backgroundColor: '#e5e5e5' }} >

            <View style={{ flex: 0.07, backgroundColor: '#fff', justifyContent: "center", paddingHorizontal: 20 }}>
                <AntDesign name="arrowleft" size={20} onPress={() => navigation.goBack()} />
            </View>
            <ScrollView style={{ flex: 0.93, paddingHorizontal: 20, backgroundColor: '#fff' }}>
                <View style={{ flex: 0.1, justifyContent: 'center' }} >
                    <Text style={{ fontSize: 22, fontWeight: '500' }}>
                        Edit Profile
                    </Text>
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }} >

                    <View style={{ height: 150, width: 150, borderRadius: 150 / 2, backgroundColor: '#fff', elevation: 10, }} >
                        <Image source={{ uri: userData.profilePic }}
                            style={{ height: 150, width: 150, borderRadius: 150 / 2 }}
                        />
                        <TouchableOpacity onPress={() => alert("hello")} style={{ alignSelf: 'flex-end', top: 80, left: 120, height: 50, width: 50, borderRadius: 25, backgroundColor: '#F25816', position: 'absolute', elevation: 10, justifyContent: 'center', alignItems: 'center', }}>
                            <EvilIcons name="camera" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ flex: 0.6, }} >



                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10, borderColor: '#ccc' }} >
                        <View style={{ paddingVertical: 5 }} >
                            <Text style={{ fontSize: 16, color: 'gray' }}  >UserName</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', paddingVertical: 5 }} >{userName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'center', alignItems: 'center' }} >

                            <AntDesign name="edit" size={20} onPress={() => { setEditUserName(!editUserName) }} />
                        </View>


                    </View>
                    {
                        editUserName ? <View>
                            <TextInput
                                value={userName}
                                onChangeText={(text) => setUserName(text)}
                                placeholder="Enter User name"
                                style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        </View> : null
                    }



                    {/* ======================================================================== */}


                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10, borderColor: '#ccc' }} >
                        <View style={{ paddingVertical: 5 }} >
                            <Text style={{ fontSize: 16, color: 'gray' }}  >Email</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', paddingVertical: 5 }} >{email}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center' }} >

                            <AntDesign name="edit" size={20} onPress={() => { setEditEmail(!editEmail) }} />
                        </View>


                    </View>
                    {
                        editEmail ? <View>
                            <TextInput
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholder="Enter Email Address"
                                style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        </View> : null
                    }



                    {/* ======================================================================== */}



                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10, borderColor: '#ccc' }} >
                        <View style={{ paddingVertical: 5 }} >
                            <Text style={{ fontSize: 16, color: 'gray' }}  >Phone</Text>
                            <Text style={{ fontSize: 16, fontWeight: '500', }} >{phone}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }} >

                            <AntDesign name="edit" size={20} onPress={() => { setEditPhone(!editPhone) }} />
                        </View>


                    </View>
                    {
                        editPhone ? <View>
                            <TextInput
                                value={phone}
                                onChangeText={(text) => setPhone(text)}
                                placeholder="Enter Phone Number"
                                style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        </View> : null
                    }




                    {/* ======================================================================== */}

                    {
                        editDob ? <View>
                            <TextInput
                                value={dob}
                                onChangeText={(text) => setDob(text)}
                                placeholder="Enter Date Of Birth"
                                style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        </View> : null
                    }




                    {/* ======================================================================== */}





                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 10, borderColor: '#ccc' }} >
                        <View style={{ paddingVertical: 5 }} >
                            <Text style={{ fontSize: 16, color: 'gray' }}  >Address</Text>
                            <Text style={{ fontSize: 12, fontWeight: '500', }} >{address}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, alignItems: 'center' }} >

                            <AntDesign name="edit" size={20} onPress={() => { setEditAddress(!editAddress) }} />
                        </View>


                    </View>
                    {
                        editAddress ? <View>
                            <TextInput
                                value={address}
                                onChangeText={(text) => setAddress(text)}
                                placeholder="Enter Address"
                                style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }} />
                        </View> : null
                    }
                    <TouchableOpacity style={{ height: 50, width: 200, backgroundColor: '#F25816', borderRadius: 50, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', top: 30 }} >
                        <Text style={{ fontSize: 16, color: '#fff' }} >Save</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>
        </View>
    )
}


