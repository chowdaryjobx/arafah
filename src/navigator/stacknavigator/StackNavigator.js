
import {
    LoginScreen,
    SignUpScreen,
    SplashScreen,
    OtpScreen,
    ProductScreen,
    CartScreen,
    AddressScreen,
    ProfileScreen,
    PaymentScreen,
    PreviousOrdersScreen,
    FavouriteOrdersScreen,
    AddressBookScreen,
    ProfileEditingScreen
} from '../../screens';


import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from '../drawernavigator/DrawerNavigator';


const Stack = createNativeStackNavigator();




export const AuthScreens = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export const AppScreens = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} >
                <Stack.Screen name="Drawer" component={DrawerNavigator} />
                <Stack.Screen name="Product" component={ProductScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Address" component={AddressScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="PreviousOrders" component={PreviousOrdersScreen} />
                <Stack.Screen name="FavouriteOrders" component={FavouriteOrdersScreen} />
                <Stack.Screen name="AddressBook" component={AddressBookScreen} />
                <Stack.Screen name="ProfileEditing" component={ProfileEditingScreen} />
                

            </Stack.Navigator>
        </NavigationContainer>
    )
}


