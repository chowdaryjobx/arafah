import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

const DataContext = React.createContext();

export const AuthContext = ({ children }) => {


    const [isNetworkAvailable, setIsNetworkAvailable] = useState(false);




    const [user, setUser] = useState(false);


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
        profilePic: 'https://images-na.ssl-images-amazon.com/images/G/31/img21/MA2021/Winterflip_P0/Halo/Winterwear._CB638119294_.gif',
        token: 123456789,
        address: '4-256/8-1, jobxrobot,sainikpuri',
        walletBalance: 500
    });



    const [userAddresses, setUserAddresses] = useState([]);


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


    const [cartItems, setCartItems] = useState([]);


    const [refresh, setRefresh] = useState(false);

    useEffect(() => {

    }, [refresh])


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

        // alert(index);
        cartItems.splice(index, 1);

        setRefresh(!refresh);

    }

    const authUser = () => {
        setUser(true);

    }



    return (
        <DataContext.Provider value={{
            user,
            authUser,

            cartItems,
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
            userData
        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;