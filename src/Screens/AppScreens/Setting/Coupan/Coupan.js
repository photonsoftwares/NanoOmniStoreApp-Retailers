
import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Clipboard, Pressable, TouchableHighlight, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlashList } from "@shopify/flash-list";
import HeaderComp from '../../../../Components/HeaderCompo';
import Loader from '../../../../Components/Loader';
import { GetAllCoupanMethod, } from '../../../../config/userApiMethods';
import ImagePath from '../../../../constants/ImagePath';
import CreateCoupan from './CreateCoupan';


const CustomerListData = memo(({ item }) => {
    const navigation = useNavigation();
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    return (
        <View style={styles.item} >
            <View style={{ gap: 4 }}>
                <Text style={styles.title}>{capitalizeFirstLetter(item?.couponName)}</Text>
                <Text style={styles.keyValue}>Starting Date:  {item.effectiveFrom}</Text>
                <Text style={styles.keyValue}>Expiration Date:  {item.expirationDate}</Text>
                <Text style={styles.keyValue}>Category:  {item.category}</Text>
                <Text style={styles.keyValue}>Eligibility:  {item.customerEligibility}</Text>
                <Text style={styles.keyValue}>Max Usage:  {item.maxusageperCustomer}</Text>
                {/* <Text style={[styles.title, { fontSize: 14, fontWeight: 'bold' }]}>{item.couponCode}</Text> */}
                <Text style={styles.keyValue}>Discount Type:  {item.discountType}</Text>
                <Text style={styles.keyValue}>Max Discount:  ₹{item.maxDiscount}</Text>
                <Text style={styles.keyValue}>Minimum Order:  ₹{item.minOrderAmount}</Text>
            </View>
            <View style={styles.itemTwo}>
                <TouchableOpacity
                    // onPress={() => navigation.push('UpdateCoupan', { id: item.customer_id })}
                    onPress={() => Clipboard.setString(item.couponCode)}
                    style={{ width: 100, borderWidth: 1, padding: 4, borderRadius: 8 }}
                >

                    <Text style={[styles.title, { fontSize: 14, fontWeight: 'bold', textAlign: 'center', color: 'grey' }]}>{item.couponCode}</Text>

                    {/* <MaterialCommunityIcons name="book-edit" size={26} color={'grey'} /> */}
                </TouchableOpacity>
            </View>
        </View>
    );
});

const Coupan = () => {
    const { allCoupanData } = useSelector(state => state?.coupanSliceReducer);
    const navigation = useNavigation();
    const [loding, setLoding] = useState(false)
    const keyExtractor = useCallback((item, index) => index, []);
    const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            dispatch(GetAllCoupanMethod())
        }, [])
    );


    const array = allCoupanData
    // const array = allCoupanData.slice().reverse()

    const data = useMemo(() => {
        return array;
    }, [array]);

    // console.log("allCoupanData", allCoupanData)
    return (
        <View style={styles.container}>
            <HeaderComp screenName={'All Coupon'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate(CreateCoupan)}
            />
            {
                loding ? <Loader isLoading={loding} /> :
                    <FlashList
                        data={data || []}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        estimatedItemSize={200}
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
        justifyContent: 'space-between',
        gap: 4

    },
    itemTwo: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500'
    },
    keyValue: {
        fontSize: 14,
        color: 'grey'
    },
});


export default Coupan

