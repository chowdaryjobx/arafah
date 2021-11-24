import React, { useState, useEffect } from 'react';
import { Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';

const DataContext = React.createContext();

export const AuthContext = ({ children, navigation }) => {

    const liveapi = '';
    const api = 'http://testapi.arafahmarket.in/api/';



    const url = {
        ReferralCheck: 'ReferralCheck',
        GetOTP: 'GetOTP',
        Registration: 'Registration',
        Login: 'Login',
        ResendOTP: 'ResendOTP',
        Forgot: 'Forgot'

    }




    const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);
    const [productStatus, setProductStatus] = useState(null);
    const [user, setUser] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [Err, setErr] = useState('');
    const [TokenIDN, setTokenIDN] = useState("5kkxMgGdTJqKDljMjJcWhXHDqcBFvJwVGeKTfc2FmfjRCCH5hd36LnlUE5yyPQ3g");


    const authUser = (data) => {

        setUser(data);
    }


    useEffect(() => {


        getData()
    }, [refresh])


    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('LOGGEDUSER')
            if (value !== null) {
                let data = JSON.parse(value);
                // console.log("logged user data context" + data.TokenId);
                console.log("valuedfdfd" + data);
                authUser(data);
                navigation.goBack();
            }
            else {
                setErrMessage("No data found");
            }
        } catch (e) {
            setErrMessage(e.message);
        }
    }









    const logOut = async () => {
        console.log("logging out")
        let data = null;
        try {
            let clear = await AsyncStorage.clear();
            setUser(clear);
            setRefresh(!refresh);
        } catch (error) {

        }

    }



    const [deliverableAddresses, setDeliverableAddresses] = useState([{
        title: 'address1',
        type: 'Home',
        coordinates: { latitude: null, longitude: null },
        isSelected: false,
        houseNo: '2-115',
        apartmentName: 'luxury Homes',
        directionsToReach: 'get to the top of the hill, turn right and head towards north to dead end.',
        street: '',
        colony: '',
        city: '',
        state: ''
    }]);




    const [userData, setUserData] = useState({
        name: 'Prakesh',
        email: 'prakesh@gmail.com',
        phoneNumber: 9985959242,
        profilePic: 'https://m.media-amazon.com/images/I/81-80FPGX0L._AC_SY200_.jpg',
        token: 123456789,
        address: '4-256/8-1, jobxrobot,sainikpuri',
        walletBalance: 500
    });






    const [userCards, setCards] = useState([
        {
            id: 1,
            cardName: 'Thimma chowdary',
            cardNumber: 'xxxx xxxx xxxx 1234',
            expiraryYear: 2025,
            expiraryMonth: 12,
            cvv: 121,
            nickName: 'personal',
            cardType: 'visa',
            bankName: 'Andhra Bank'
        },

    ]);


    const productState = (state) => {
        setProductStatus(state)
    }


    const addCard = (cardData) => {

        setCards([...userCards, cardData])


    }


    const [userUpis, setUserUpis] = useState([
        {
            title: 'Gpay'
        },
        {
            title: 'Phone pay'
        },
        {
            title: 'Amazon pay'
        }
    ]);




    const addUpi = (upiData) => {
        setUserUpis([...userUpis, upiData])
    }


    const emptyCart = () => {
        setCartItems([]);
    }

    const addToCart = (item) => {
        setCartItems([...cartItems, item]);
    }


    const increaseProducts = (index) => {

        cartItems[index].quantity = cartItems[index].quantity + 1;
        setRefresh(!refresh);

    }
    const decreaseProducts = (index) => {

        if (cartItems[index].quantity == 0) {

        }
        cartItems[index].quantity = cartItems[index].quantity - 1;
        setRefresh(!refresh);

    }
    const removeProduct = (index) => {
        cartItems.splice(index, 1);
        setRefresh(!refresh);
    }


    return (
        <DataContext.Provider value={{
            TokenIDN,
            user,
            userData,
            authUser,
            api,
            url,
            // storeData,
            logOut,
            Err,
            productState,
            productStatus,
            cartItems,
            emptyCart,
            user,
            addToCart,
            increaseProducts,
            decreaseProducts,
            removeProduct,
            deliverableAddresses,
            userCards,
            addCard,
            userUpis,
            addUpi,

        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;