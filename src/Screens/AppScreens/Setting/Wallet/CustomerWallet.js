import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import TextInputCompo from '../../../../Components/TextInputCompo'
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginForm, validateWalletBalanceForm } from '../../../../utils/validation';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { CreateWalletMethod } from '../../../../config/userApiMethods';
import { FlashList } from '@shopify/flash-list';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CreateWallet from './CreateWallet';


const CustomerListData = memo(({ item }) => {
    const navigation = useNavigation()




    return (
        <Pressable style={styles.item} >
            <View>

                <Text style={styles.title}>{item.customer_name}</Text>
                <Text style={styles.keyValue}>Customer ID: {item.customer_id}</Text>

            </View>
            <View style={styles.itemTwo}>
                <TouchableOpacity
                    onPress={() => navigation.push('CreateWallet', { id: item.customer_id })}
                >
                    <MaterialCommunityIcons name="wallet" size={26} color={'grey'} />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
});

const CustomerWallet = () => {
    const { customerListData } = useSelector(state => state?.customerListReducer);
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);
    const navigation = useNavigation()



    return (
        <View style={styles.container}>
            <HeaderComp
                screenName={'My Customers'}
                onBackPress={() => navigation.goBack()}
                showCustomer={true}
                // showWalletSearch={true}

            />

            <FlashList
                data={customerListData || []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                estimatedItemSize={200}
            />
        </View>
    )
}


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

})

export default CustomerWallet

