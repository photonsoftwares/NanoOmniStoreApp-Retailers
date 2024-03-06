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
                        // handleUpdateQuantity(item.id, item.productQty)
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
                            Price/pcs:
                        </Text>
                        <Text style={{ alignSelf: 'center' }} numberOfLines={1}>
                            {/* ₹{item.price} */}
                            ₹{item.new_price}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ alignSelf: 'center' }} numberOfLines={1}>
                            Total:
                        </Text>
                        <Text style={{ alignSelf: 'center' }} numberOfLines={1}>
                            ₹{item.price}
                            {/* ₹{item.new_price} */}
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

    // console.log("cartItems",cartItems)

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
