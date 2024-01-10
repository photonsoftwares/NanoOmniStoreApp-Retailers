// import React, { useCallback } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { BASE_URL } from '../../../../config/Base_Url';
// import { moderateScale } from '../../../../styles/responsiveSize';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const { cartItems } = useSelector((state) => state?.cartReducer);
//     console.log("jo", cartItems[0].length)

//     const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
//         console.log("1")
//         // Dispatch the action to update the quantity
//         // dispatch(updateCartItemQuantity({ itemId, newQuantity }));
//     }, [dispatch]);

//     const renderItem = useCallback(({ item }) => (
//         <View style={styles.cartItem}>
//             <Image
//                 // source={ImagePath.JennyWilson}
//                 source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
//                 style={styles.itemImage}
//                 resizeMode='contain'
//             />

//             <Text>{item.itemName}</Text>
//             <Text>Price: ${item.price}</Text>
//             <Text>Quantity:{item.productQty}</Text>
//             <TextInput
//                 style={styles.quantityInput}
//                 keyboardType="numeric"
//                 // value={item.quantity.toString()}
//                 onChangeText={(text) => handleUpdateQuantity(item.id, parseInt(text, 10))}
//             />
//         </View>
//     ), [handleUpdateQuantity]);

//     const keyExtractor = useCallback((item, index) => index, []);

//     return (
//         <>
//             <HeaderComp screenName={'Cart'} />
//             <View style={styles.container}>
//                 <FlatList
//                     data={cartItems[0]}
//                     renderItem={renderItem}
//                     keyExtractor={keyExtractor}
//                     numColumns={2}
//                 />
//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     cartItem: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 8,
//         padding: 16,
//         borderRadius: 10,
//         elevation: 2,
//     },
//     quantityInput: {
//         width: 50,
//         height: 30,
//         borderWidth: 1,
//         borderColor: 'gray',
//         textAlign: 'center',
//         marginVertical: 8,
//     },
//     itemImage: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover',
//         // margin:8
//         marginTop: moderateScale(2)
//     },
// });

// export default Cart;


// import React, { useCallback } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { BASE_URL } from '../../../../config/Base_Url';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Cart = () => {
//   const dispatch = useDispatch();
//   const { cartItems } = useSelector((state) => state?.cartReducer);

//   const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
//     // Dispatch the action to update the quantity
//     // dispatch(updateCartItemQuantity({ itemId, newQuantity }));
//   }, [dispatch]);

//   const renderQuantityControls = useCallback((item) => (
//     <View style={styles.quantityControls}>
//       <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.productQty - 1)}>
//         <MaterialCommunityIcons name="minus" size={20} color="black" />
//       </TouchableOpacity>
//       <Text>{item.productQty}</Text>
//       <TouchableOpacity onPress={() => handleUpdateQuantity(item.id, item.productQty + 1)}>
//         <MaterialCommunityIcons name="plus" size={20} color="black" />
//       </TouchableOpacity>
//     </View>
//   ), [handleUpdateQuantity]);

//   const renderItem = useCallback(({ item }) => (
//     <View style={styles.cartItem}>
//       <Image
//         source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
//         style={styles.itemImage}
//         resizeMode='contain'
//       />
//       <Text>{item.itemName}</Text>
//       <Text>Price: ${item.price}</Text>
//       {renderQuantityControls(item)}
//     </View>
//   ), [renderQuantityControls]);

//   const keyExtractor = useCallback((item, index) => index.toString(), []);

//   return (
//     <>
//       <HeaderComp screenName={'Cart'} />
//       <View style={styles.container}>
//         <FlatList
//           data={cartItems[0]}
//           renderItem={renderItem}
//           keyExtractor={keyExtractor}
//           numColumns={2}
//         />
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   cartItem: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     margin: 8,
//     padding: 16,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   itemImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     marginTop: moderateScale(2),
//   },
// });

// export default Cart;



// import React, { useCallback } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { BASE_URL } from '../../../../config/Base_Url';
// import { moderateScale, textScale } from '../../../../styles/responsiveSize';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import SelectPaymentMethod from '../../../../Components/SelectPaymentMethod';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const navigation = useNavigation()
//     const { cartItems } = useSelector((state) => state?.cartReducer);


//     const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
//         // Dispatch the action to update the quantity
//         // dispatch(updateCartItemQuantity({ itemId, newQuantity }));
//     }, [dispatch]);

//     const renderQuantityControls = useCallback((item) => (
//         <View style={styles.quantityControls}>
//             <TouchableOpacity
//                 style={styles.controlButton}
//                 onPress={() => handleUpdateQuantity(item.id, item.productQty - 1)}
//             >
//                 <MaterialCommunityIcons name="minus" size={20} color="black" />
//             </TouchableOpacity>
//             <Text style={styles.quantityText} numberOfLines={1} ellipsizeMode="tail">{item.productQty}</Text>
//             <TouchableOpacity
//                 style={styles.controlButton}
//                 onPress={() => handleUpdateQuantity(item.id, item.productQty + 1)}
//             >
//                 <MaterialCommunityIcons name="plus" size={20} color="black" />
//             </TouchableOpacity>
//         </View>
//     ), [handleUpdateQuantity]);

//     const renderItem = useCallback(({ item }) => (
//         <View style={styles.cartItem}>
//             <Image
//                 source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
//                 style={styles.itemImage}
//                 resizeMode='contain'
//             />
//             <Text>{item.itemName}</Text>
//             <Text>Price: ${item.price}</Text>
//             {renderQuantityControls(item)}

//         </View>
//     ), [renderQuantityControls]);

//     const keyExtractor = useCallback((item, index) => index.toString(), []);

//     return (
//         <>
//             <HeaderComp screenName={'Cart'} />
//             <View style={styles.container}>
//                 <FlatList
//                     data={cartItems[0]}
//                     renderItem={renderItem}
//                     keyExtractor={keyExtractor}
//                     numColumns={2}
//                 />
//             </View>
//             <View style={{ width: '95%', alignSelf: 'center', marginBottom: moderateScale(8) }}>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SelectPaymentMethod', { itemId: '1' })}>
//                     <Text style={styles.buttonText}>Buy</Text>
//                 </TouchableOpacity>
//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // padding: 16,
//         backgroundColor: '#f4f4f4', // Light background color
//     },
//     cartItem: {
//         flex: 1,
//         backgroundColor: '#fff',
//         justifyContent: 'center',
//         alignItems: 'center',
//         margin: 8,
//         padding: 16,
//         borderRadius: 10,
//         elevation: 2,
//     },
//     quantityControls: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: moderateScale(6),
//         overflow: 'hidden'
//     },
//     controlButton: {
//         backgroundColor: '#ddd', // Light button background color
//         borderRadius: 5,
//         padding: 8,
//         marginHorizontal: moderateScale(16),
//     },
//     quantityText: {
//         fontSize: textScale(20),
//         fontWeight: 'bold',
//     },
//     itemImage: {
//         width: 110,
//         height: 100,
//         resizeMode: 'cover',
//         marginTop: moderateScale(2),
//         borderRadius: 8
//     },
//     button: {
//         backgroundColor: '#ECE447',
//         padding: moderateScale(4),
//         borderRadius: 5,
//         alignItems: 'center',
//         marginTop: moderateScale(12)
//     },
//     buttonText: {
//         color: 'black', // You can adjust the text color as needed
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default Cart;



import React, { useCallback, useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComp from '../../../../Components/HeaderCompo';
import { BASE_URL } from '../../../../config/Base_Url';
import { moderateScale, textScale } from '../../../../styles/responsiveSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import SelectPaymentMethod from '../../../../Components/SelectPaymentMethod';
import { DeleteAllCartMethod, DeleteOneMethod, GetCartMethod, UpdateCartItemQntyMethod } from '../../../../config/userApiMethods';
import { showMessage } from 'react-native-flash-message';
import NoDataFound from '../../../../Components/NoDataFound';
import MyImgCompo from '../../../../Components/MyImgCompo';
import { FlashList } from "@shopify/flash-list";



const Cart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { cartItems, totalInvoiceAmount } = useSelector((state) => state?.cartReducer);
    // console.log("cartItems",cartItems)

    // useEffect(() => {
    //     dispatch(GetCartMethod())
    // }, [dispatch])

    const DeleteOneCartFunc = (itemId) => {
        if (cartItems.length > 0) {
            dispatch(DeleteOneMethod(itemId))
            // console.log(itemId)
        } else {
            showMessage({
                message: "Cart ",
                description: "Please Add Item In Cart",
                type: "danger",
            });
        }

    }
    const handleUpdateQuantity = useCallback(
        (itemId, newQuantity) => {
            // Dispatch the action to update the quantity
            dispatch(UpdateCartItemQntyMethod(itemId, newQuantity));
        },
        [dispatch]
    );

    // console.log(cartItems[0]?.productQty)
    // console.log(cartItems[0]?.price)
    // console.log("totalInvoiceAmount", totalInvoiceAmount)
    const renderQuantityControls = useCallback(
        (item) => (
            <View style={styles.quantityControls}>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() => {
                        if (item?.productQty <= 1) {
                            DeleteOneCartFunc(item?.id)
                        } else {
                            handleUpdateQuantity(item.id, item.productQty - 1)
                        }
                    }
                    }
                >
                    <MaterialCommunityIcons name="minus" size={20} color="black" />
                </TouchableOpacity>
                <Text style={styles.quantityText} numberOfLines={1} ellipsizeMode="tail">
                    {item.productQty}
                </Text>
                <TouchableOpacity
                    style={styles.controlButton}
                    onPress={() =>
                        handleUpdateQuantity(item.id, item.productQty + 1)
                    }
                >
                    <MaterialCommunityIcons name="plus" size={20} color="black" />
                </TouchableOpacity>
            </View>
        ),
        [handleUpdateQuantity]
    );

    const renderItem = useCallback(
        ({ item }) => (
            <View style={styles.cartItem}>


                <MyImgCompo
                    imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
                    resizeMode="contain"
                    ImgCompoStyle={styles.itemImage}
                />
                {/* Main */}
                {/* Dummy */}
                <View style={{ flex: 1, width: moderateScale(115), overflow: 'hidden', }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                flex: 1, // Allow the text to take up remaining space
                                alignSelf: 'center',
                                color: '#000'
                            }}
                            numberOfLines={1}
                            allowFontScaling={true}
                        >
                            {item.itemName}
                        </Text>

                        <TouchableOpacity onPress={() => DeleteOneCartFunc(item?.id)} style={{ marginLeft: 8 }}>
                            <MaterialCommunityIcons name="delete" size={26} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ alignSelf: 'center' }} numberOfLines={1}>
                            Price:
                        </Text>
                        <Text style={{ alignSelf: 'center' }} numberOfLines={1}>
                            ₹{item.price}
                        </Text>
                    </View>
                </View>



                {renderQuantityControls(item)}

            </View>
        ),
        [renderQuantityControls]
    );

    const keyExtractor = useCallback((item, index) => index.toString(), []);

    // Calculate the total amount based on the items in the cart
    // const totalAmount = useMemo(() => {
    //     return cartItems.reduce((total, item) => item.price * item.productQty, 0);
    // }, [cartItems]);

    const DeleteAllCartFunc = () => {
        if (cartItems.length > 0) {
            dispatch(DeleteAllCartMethod())
        } else {
            showMessage({
                message: "Cart ",
                description: "Please Add In Cart",
                type: "danger",
            });

        }

    }

    const BuyCartItemFunc = () => {
        if (cartItems.length > 0) {
            navigation.navigate('SelectPaymentMethod', { itemId: '1' })
        } else {
            showMessage({
                message: "Cart ",
                description: "Please Add In Cart",
                type: "danger",
            });
        }

    }

    return (
        <>
            <HeaderComp
                screenName={'Cart'}
                onBackPress={() => navigation.goBack()}
            />
            {cartItems.length === 0 ?
                (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <NoDataFound
                            text='No item in cart'
                            iconName='cart-remove'
                            iconSize={50}
                        />
                    </View>
                )
                :
                (
                    <>
                        <View style={styles.container}>
                            <FlashList
                                data={cartItems}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                numColumns={2}

                                estimatedItemSize={200}

                            />
                        </View>
                        {/* u */}
                    </>
                )
            }

            <View style={{ width: '100%', alignSelf: 'center', paddingBottom: moderateScale(8), backgroundColor: '#fff', paddingHorizontal: 20 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: moderateScale(6) }}>
                    <Text style={{ fontSize: textScale(18), color: '#666' }}>Total Amount:- ₹({totalInvoiceAmount})</Text>
                    <TouchableOpacity onPress={() => DeleteAllCartFunc()}>
                        <MaterialCommunityIcons name="delete" size={26} color="black" />
                    </TouchableOpacity>


                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => BuyCartItemFunc()}
                // onPress={() => navigation.navigate('SelectPaymentMethod', { itemId: '1' })}
                // disabled={cartItems?.length === 0}
                >
                    <Text style={styles.buttonText}>Select Payment Method</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        // backgroundColor: 'red',
    },
    cartItem: {
        flex: 1,
        backgroundColor: '#fff',
        // backgroundColor: 'pink',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        padding: 16,
        borderRadius: 10,
        elevation: 2,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(6),
        overflow: 'hidden',
    },
    controlButton: {
        backgroundColor: '#ddd',
        borderRadius: 5,
        padding: 8,
        marginHorizontal: moderateScale(16),
    },
    quantityText: {
        fontSize: textScale(20),
        fontWeight: 'bold',
        color: '#000'
    },
    itemImage: {
        width: 110,
        height: 100,
        resizeMode: 'cover',
        marginTop: moderateScale(2),
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#ECE447',
        padding: moderateScale(4),
        borderRadius: 5,
        alignItems: 'center',
        marginTop: moderateScale(12),
        paddingVertical: moderateScale(12),
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Cart;
