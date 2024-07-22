
// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux'
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { FlashList } from "@shopify/flash-list";
// import HeaderComp from '../../../../Components/HeaderCompo';
// import Loader from '../../../../Components/Loader';
// import { GetAllWalletMethod } from '../../../../config/userApiMethods';
// import ImagePath from '../../../../constants/ImagePath';

// const CustomerListData = memo(({ item }) => {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.item} >
//             <View>

//                 <Text style={styles.title}>{item.customer_name}</Text>
//                 <Text style={styles.keyValue}>Wallet Balance:  ₹{item.balance}</Text>
//             </View>
//             <View style={styles.itemTwo}>
//                 <TouchableOpacity
//                     onPress={() => navigation.push('UpdateWallet', { id: item.wallet_id })}
//                 >

//                     <MaterialCommunityIcons name="book-edit" size={26} color={'grey'} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// });

// const Wallet = () => {
//     const { allWalletData } = useSelector(state => state?.walletSliceReducer);
//     const navigation = useNavigation();
//     const [loding, setLoding] = useState(false)
//     const keyExtractor = useCallback((item, index) => index, []);
//     const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
//     const dispatch = useDispatch()

//     useFocusEffect(
//         useCallback(() => {
//             dispatch(GetAllWalletMethod())
//         }, [])
//     );


//     const array = allWalletData.slice().reverse()

//     const data = useMemo(() => {
//         return array;
//     }, [array]);


//     return (
//         <View style={styles.container}>
//             <HeaderComp screenName={'Customer Wallet'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//                 onPressLeftImage={ImagePath.plusIcon}
//                 onPressLeft={() => navigation.navigate('CustomerWallet')}
//             />
//             {
//                 loding ? <Loader isLoading={loding} /> :
//                     <FlashList
//                         data={data || []}
//                         renderItem={renderItem}
//                         keyExtractor={keyExtractor}
//                         estimatedItemSize={200}
//                     />
//             }

//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF'
//     },
//     item: {
//         backgroundColor: '#fff',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         elevation: 4,
//         borderRadius: 8,
//         flexDirection: 'row',
//         justifyContent: 'space-between'

//     },
//     itemTwo: {
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         color: '#000',
//         fontWeight: '500'
//     },
//     keyValue: {
//         fontSize: 14,
//         color: 'grey'
//     },
// });

// export default Wallet;










/////////////////////////////////////


// import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux'
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { FlashList } from "@shopify/flash-list";
// import HeaderComp from '../../../../Components/HeaderCompo';
// import Loader from '../../../../Components/Loader';
// import { GetAllWalletMethod } from '../../../../config/userApiMethods';
// import ImagePath from '../../../../constants/ImagePath';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import { showToast } from '../../../../utils/toast';


// const CustomerListData = memo(({ item }) => {
//     const navigation = useNavigation();

//     return (
//         <View style={styles.item} >
//             <View>

//                 <Text style={styles.title}>{item.customer_name}</Text>
//                 <Text style={styles.keyValue}>Wallet Balance:  ₹{item.balance}</Text>
//             </View>
//             <View style={styles.itemTwo}>
//                 <TouchableOpacity
//                     onPress={() => navigation.push('UpdateWallet', { id: item.wallet_id })}
//                 >

//                     <MaterialCommunityIcons name="book-edit" size={26} color={'grey'} />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// });

// const Wallet = () => {
//     const { allWalletData } = useSelector(state => state?.walletSliceReducer);
//     const navigation = useNavigation();
//     const [loding, setLoding] = useState(false)
//     const keyExtractor = useCallback((item, index) => index, []);
//     const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
//     const dispatch = useDispatch()
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     // console.log(" userId, storeId, saasId,", userId, storeId, saasId,)

//     useFocusEffect(
//         useCallback(() => {
//             dispatch(GetAllWalletMethod())
//         }, [])
//     );
//     const array = allWalletData.slice().reverse()
//     const data = useMemo(() => {
//         return array;
//     }, [array]);


//     ////
//     const [balance, setBalance] = useState(0);
//     const [amount, setAmount] = useState('');

//     const handleAddMoney = () => {
//         const numericAmount = parseFloat(amount);
//         if (!isNaN(numericAmount) && numericAmount > 0) {
//             setBalance(balance + numericAmount);
//             setAmount('');
//         } else {
//             showToast('Please enter a valid amount to add.')

//         }
//     };

//     const handleWithdrawMoney = () => {
//         const numericAmount = parseFloat(amount);
//         if (!isNaN(numericAmount) && numericAmount > 0 && numericAmount <= balance) {
//             setBalance(balance - numericAmount);
//             setAmount('');
//         } else {
//             showToast('Please enter a valid amount to withdraw.')
//         }
//     };



//     return (
//         <View style={styles.container}>
//             <HeaderComp screenName={'Customer Wallet'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//                 onPressLeftImage={ImagePath.plusIcon}
//                 onPressLeft={() => navigation.navigate('CustomerWallet')}
//             />
//             <View style={{ justifyContent: 'center', alignItems: 'center' }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(32) }}>
//                     <MaterialCommunityIcons name="wallet" size={26} color={'grey'} />
//                     <Text style={[styles.balance]}>Current Balance:</Text>
//                 </View>

//                 <Text style={styles.balance}>₹{balance.toFixed(2)}</Text>
//                 <TextInput
//                     style={styles.input}
//                     placeholder="Enter amount"
//                     value={amount}
//                     onChangeText={setAmount}
//                     keyboardType="numeric"


//                 />
//                 <View style={styles.buttonContainer}>
//                     <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
//                         <Text style={styles.buttonText}>Add Money</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.button} onPress={handleWithdrawMoney}>
//                         <Text style={styles.buttonText}>Withdraw Money</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>





//             {
//                 loding ? <Loader isLoading={loding} /> :
//                     <FlashList
//                         data={data || []}
//                         renderItem={renderItem}
//                         keyExtractor={keyExtractor}
//                         estimatedItemSize={200}
//                     />
//             }

//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFF'
//     },
//     item: {
//         backgroundColor: '#fff',
//         padding: 20,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         elevation: 4,
//         borderRadius: 8,
//         flexDirection: 'row',
//         justifyContent: 'space-between'

//     },
//     itemTwo: {
//         justifyContent: 'center',
//     },
//     title: {
//         fontSize: 20,
//         color: '#000',
//         fontWeight: '500'
//     },
//     keyValue: {
//         fontSize: 14,
//         color: 'grey'
//     },
//     header: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#343a40',
//     },
//     balance: {
//         fontSize: 24,
//         marginBottom: 20,
//         color: '#495057',
//     },
//     input: {
//         height: 50,
//         borderColor: '#ced4da',
//         borderWidth: 0.4,
//         marginBottom: 20,
//         paddingHorizontal: 15,
//         // width: '80%',
//         borderRadius: 8,
//         backgroundColor: '#ffffff',
//         maxWidth: '80%',
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#000'

//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//     },
//     button: {
//         flex: 1,
//         marginHorizontal: 10,
//         backgroundColor: '#007bff',
//         paddingVertical: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Wallet;




////////////////////////////////////


import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard, KeyboardAvoidingView, } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import HeaderComp from '../../../../Components/HeaderCompo';
import Loader from '../../../../Components/Loader';
import { CreateRetailerWalletMethod, GetAllWalletMethod, GetRetailerWalletMethod, UpdateRetailerWalletMethod } from '../../../../config/userApiMethods';
import ImagePath from '../../../../constants/ImagePath';
import { moderateScale } from '../../../../styles/responsiveSize';
import { showToast } from '../../../../utils/toast';


const CustomerListData = memo(({ item }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.item} >
            <View>

                <Text style={styles.title}>{item.customer_name}</Text>
                <Text style={styles.keyValue}>Wallet Balance:  ₹{item.balance}</Text>
            </View>
            <View style={styles.itemTwo}>
                <TouchableOpacity
                    onPress={() => navigation.push('UpdateWallet', { id: item.wallet_id })}
                >

                    <MaterialCommunityIcons name="book-edit" size={26} color={'grey'} />
                </TouchableOpacity>
            </View>
        </View>
    );
});

const ListHeader = memo(() => {
    const navigation = useNavigation();

    return (
        <View style={styles.listheader} >
            <View>

                <Text style={styles.listHeaderTitle}>Customer Wallet</Text>
            </View>

        </View>
    );
});

const Wallet = () => {
    const { allWalletData, retailerWallet } = useSelector(state => state?.walletSliceReducer);
    const navigation = useNavigation();
    const [loding, setLoding] = useState(false)
    const keyExtractor = useCallback((item, index) => index, []);
    const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
    const dispatch = useDispatch()
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    console.log(" userId, storeId, saasId,", userId, storeId, saasId, "<>", retailerWallet)

    useFocusEffect(
        useCallback(() => {
            dispatch(GetAllWalletMethod())
            dispatch(GetRetailerWalletMethod())
        }, [])
    );
    const array = allWalletData.slice().reverse()
    const data = useMemo(() => {
        return array;
    }, [array]);


    ////
    const [balance, setBalance] = useState(retailerWallet || 0);
    const [amount, setAmount] = useState('');

    const handleAddMoney = async () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0 && Number.isInteger(numericAmount)) {
            const body = {
                "store_id": storeId,
                "msg": "Transaction successful",
                "type": "credit",
                "amount": amount
            }
            await dispatch(CreateRetailerWalletMethod(body))
            await Keyboard.dismiss()
            setAmount('');
        } else {
            showToast('Please enter a valid amount to add.')
        }
    };

    const handleUpdateMoney = async () => {
        const numericAmount = parseFloat(amount);
        if (!isNaN(numericAmount) && numericAmount > 0 && Number.isInteger(numericAmount)) {
            setBalance(balance + numericAmount);
            const body = {
                "store_id": storeId,
                "amount": amount
            }
            await dispatch(UpdateRetailerWalletMethod(body))
            await Keyboard.dismiss()
            setAmount('');
        } else {
            showToast('Please enter a valid amount to add.')

        }


    };

    // console.log("balance",amount)

    const handleWithdrawMoney = () => {
        // const numericAmount = parseFloat(amount);
        // if (!isNaN(numericAmount) && numericAmount > 0 && numericAmount <= balance) {
        //     setBalance(balance - numericAmount);
        //     setAmount('');
        // } else {
        //     showToast('Please enter a valid amount to withdraw.')
        // }
        navigation.navigate('CustomerWallet')
    };



    return (
        <View style={styles.container}>
            <HeaderComp screenName={'Your Wallet'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate('CustomerWallet')}
                showWalletSearch={true}
            />
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: moderateScale(32) }}>
                    <MaterialCommunityIcons name="wallet" size={26} color='#457FD4' />
                    <Text style={[styles.balance, { color: '#000' }]}>Current Balance:</Text>
                </View>

                <Text style={[styles.balance, { color: '#000', fontWeight: 'bold', fontSize: 30 }]}>₹{retailerWallet}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter amount"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"


                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => { retailerWallet < 0 ? handleAddMoney() : handleUpdateMoney() }}>
                        {/* <TouchableOpacity style={styles.button} onPress={() => { handleAddMoney() }}> */}
                        <Text style={styles.buttonText}> {retailerWallet == 0 ? 'Add Money' : 'Update Money'}</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={handleWithdrawMoney}>
                        <Text style={styles.buttonText}>Transfer Money</Text>
                    </TouchableOpacity>
                </View>
            </View>





            {
                loding ? <Loader isLoading={loding} /> :
                    <FlashList
                        data={data || []}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        estimatedItemSize={200}
                        ListHeaderComponent={<ListHeader />}
                    />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        elevation: 4,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    listheader: {
        marginHorizontal: 16,
        paddingTop: 16,
    },
    listHeaderTitle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    itemTwo: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500'
    },
    keyValue: {
        fontSize: 14,
        color: 'grey'
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#343a40',
    },
    balance: {
        fontSize: 24,
        marginBottom: 20,
        color: '#495057',
    },
    input: {
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 0.4,
        marginBottom: 20,
        paddingHorizontal: 15,
        // width: '80%',
        borderRadius: 8,
        backgroundColor: '#ffffff',
        maxWidth: '80%',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
        // backgroundColor: '#007bff',
        backgroundColor: '#457FD4',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Wallet;











// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// const Wallet = () => {
//     const [balance, setBalance] = useState(0);
//     const [amount, setAmount] = useState('');

//     const handleAddMoney = () => {
//         const numericAmount = parseFloat(amount);
//         if (!isNaN(numericAmount) && numericAmount > 0) {
//             setBalance(balance + numericAmount);
//             setAmount('');
//         } else {
//             Alert.alert('Invalid Input', 'Please enter a valid amount to add.');
//         }
//     };

//     const handleWithdrawMoney = () => {
//         const numericAmount = parseFloat(amount);
//         if (!isNaN(numericAmount) && numericAmount > 0 && numericAmount <= balance) {
//             setBalance(balance - numericAmount);
//             setAmount('');
//         } else {
//             Alert.alert('Invalid Input', 'Please enter a valid amount to withdraw.');
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Wallet</Text>
//             <Text style={styles.balance}>Available Balance: ${balance.toFixed(2)}</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter amount"
//                 value={amount}
//                 onChangeText={setAmount}
//                 keyboardType="numeric"
//             />
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
//                     <Text style={styles.buttonText}>Add Money</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.button} onPress={handleWithdrawMoney}>
//                     <Text style={styles.buttonText}>Withdraw Money</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#f8f9fa',
//     },
//     header: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: '#343a40',
//     },
//     balance: {
//         fontSize: 24,
//         marginBottom: 20,
//         color: '#495057',
//     },
//     input: {
//         height: 50,
//         borderColor: '#ced4da',
//         borderWidth: 1,
//         marginBottom: 20,
//         paddingHorizontal: 15,
//         width: '80%',
//         borderRadius: 8,
//         backgroundColor: '#ffffff',
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//     },
//     button: {
//         flex: 1,
//         marginHorizontal: 10,
//         backgroundColor: '#007bff',
//         paddingVertical: 15,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: '#ffffff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Wallet;
