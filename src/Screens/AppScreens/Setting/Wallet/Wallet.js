
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Clipboard, Pressable, TouchableHighlight, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import HeaderComp from '../../../../Components/HeaderCompo';
import Loader from '../../../../Components/Loader';
import { GetAllWalletMethod } from '../../../../config/userApiMethods';
import ImagePath from '../../../../constants/ImagePath';

const CustomerListData = memo(({ item }) => {
    const navigation = useNavigation();

    // console.log("item",item)
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

const Wallet = () => {
    const { allWalletData } = useSelector(state => state?.walletSliceReducer);
    const navigation = useNavigation();
    const [loding, setLoding] = useState(false)
    const keyExtractor = useCallback((item, index) => index, []);
    const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
    const dispatch = useDispatch()

    useFocusEffect(
        useCallback(() => {
            dispatch(GetAllWalletMethod())
        }, [])
    );


    const array = allWalletData.slice().reverse()

    const data = useMemo(() => {
        return array;
    }, [array]);


    return (
        <View style={styles.container}>
            <HeaderComp screenName={'Customer Wallet'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate('CustomerWallet')}
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
        justifyContent: 'space-between'

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
});

export default Wallet;
