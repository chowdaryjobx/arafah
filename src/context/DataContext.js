import React, { useState, useEffect } from 'react';
import { Dimensions, } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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



    }




    const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);
    const [productStatus, setProductStatus] = useState(null);
    const [user, setUser] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [Err, setErr] = useState('');
    const [TokenIDN, setTokenIDN] = useState("5kkxMgGdTJqKDljMjJcWhXHDqcBFvJwVGeKTfc2FmfjRCCH5hd36LnlUE5yyPQ3g");


    useEffect(() => {
        AsyncStorage.getItem('ARAFAHUSER', (err, result) => {
            setUser(JSON.parse(result));
        })
    }, [refresh])



    const storeData = async (data) => {
        try {
            await AsyncStorage.setItem(
                'ARAFAHUSER', data, async () => {
                    await AsyncStorage.getItem('ARAFAHUSER', (err, result) => {
                        let data = JSON.parse(result);
                        setUser(data);
                    })
                }
            );
        } catch (error) {
            // Error saving data
        }
    };



    const authUser = (user) => {
        axios.post(api + url.Login, user)
            .then((res) => {

                let data = res.data;
                if (data[0].Response) {
                    setErr('');
                    storeData(JSON.stringify({ userToken: data[0].Response }));
                }
            })
            .catch((err) => setErr(err))

    }






    const logOut = async () => {
        console.log("logging out")
        let data = null;
        try {
            await AsyncStorage.clear();
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
            authUser,
            // registerUser,
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
            userData,
            api,
            url
        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;