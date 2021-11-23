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
    ProfileEditingScreen,
    PaymentSuccessfulScreen,
    orderSummaryScreen,
    RewardPoints
} from '../../screens';




import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DrawerNavigator from '../drawernavigator/DrawerNavigator';
import TabNavigator from '../tabnavigator/TabNavigator';


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
                <Stack.Screen name="Tab" component={TabNavigator} />
                <Stack.Screen name="Product" component={ProductScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="Address" component={AddressScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
                <Stack.Screen name="PreviousOrders" component={PreviousOrdersScreen} />
                <Stack.Screen name="FavouriteOrders" component={FavouriteOrdersScreen} />
                <Stack.Screen name="AddressBook" component={AddressBookScreen} />
                <Stack.Screen name="ProfileEditing" component={ProfileEditingScreen} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="Success" component={PaymentSuccessfulScreen} />
                <Stack.Screen name="OrderSummary" component={orderSummaryScreen} />

                
            
                <Stack.Screen name="RewardPoints" component={RewardPoints} />


            </Stack.Navigator>
        </NavigationContainer>
    )
}


