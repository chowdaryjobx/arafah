import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
const DataContext = React.createContext();

export const AuthContext = ({ children }) => {


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


    const [userCards, setCards] = useState([
        {
            id: 1,
            cardName: 'Thimma chowdary',
            cardNumber:'xxxx xxxx xxxx 1234',
            expiraryYear: 2025,
            expiraryMonth: 12,
            cvv: 121,
            nickName: 'personal',
            cardType: 'visa',
            bankName:'Andhra Bank'
        },

    ]);


    const addCard =(cardData)=>{
        setCards([...userCards, cardData ])
    }


    const [cartItems, setCartItems] = useState([]);


    const [refresh, setRefresh] = useState(false);
    const [user, setUser] = useState(null);

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
        setUser(!user);
    }



    return (
        <DataContext.Provider value={{
            authUser,
            cartItems,
            user,
            addToCart,
            increaseProducts,
            decreaseProducts,
            removeProduct,
            deliverableAddresses,
            userCards,
            addCard
        }} >
            {children}
        </DataContext.Provider>
    );
}

export default DataContext;