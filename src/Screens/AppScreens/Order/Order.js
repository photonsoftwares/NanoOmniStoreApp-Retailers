



import React, { useCallback, memo, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import HeaderComp from '../../../Components/HeaderCompo';
import { moderateScale, textScale } from '../../../styles/responsiveSize';
import RenderOrderCancle from './RenderOrderCancle/RenderOrderCancle';
import { useDispatch, useSelector } from 'react-redux';
import RenderOrderPending from './RenderOrderPending/RenderOrderPending';
import RenderOrderDelivery from './RenderOrderDelivery/RenderOrderDelivery';
import RenderOrderReturn from './RenderOrderReturn/RenderOrderReturn';
import { OrderViewOrderMethod } from '../../../config/userApiMethods';

const orderStatusData = [
    { id: '1', status: 'Cancel', elevation: 5, screen: RenderOrderCancle },
    { id: '2', status: 'Pending', elevation: 10, screen: RenderOrderPending },
    { id: '3', status: 'Delivered Item', elevation: 15, screen: RenderOrderDelivery },
    { id: '4', status: 'Return Item', elevation: 5, screen: RenderOrderReturn },
    // Add more order statuses as needed
];

const OrderStatusItem = memo(({ orderStatus }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity activeOpacity={2} style={styles.itemContainer}>
            <View style={[styles.serviceContainer, { elevation: orderStatus.elevation }]}>
                <Text style={styles.serviceName}>{orderStatus.status}</Text>
                <TouchableOpacity onPress={() => navigation.navigate(orderStatus.screen)}>

                    <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
});

const OrderStatusList = () => {
    const navigation = useNavigation()
    const keyExtractor = useCallback((item) => item.id, []);
    const renderItem = useCallback(({ item }) => <OrderStatusItem orderStatus={item} />, []);
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const dispatch = useDispatch()
    const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer)

    // console.log("first",ordersData)

    // OrderViewOrderMethod
    useEffect(() => {
        dispatch(OrderViewOrderMethod(storeId, saasId,))
    }, [dispatch])



    return (
        <>
            <View >
                <HeaderComp
                    screenName='Orders'
                    onBackPress={() => navigation.goBack()}
                />

                <FlatList
                    data={orderStatusData}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    horizontal={false}
                    contentContainerStyle={styles.flatListContainer}
                />

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // margin: moderateScale(8),
        // backgroundColor:'#FFF'
    },
    flatListContainer: {
        // marginTop: 16,
    },
    serviceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: 'white',
        paddingHorizontal: 16, // Adjusted padding
        // marginVertical: moderateScale(4),
    },
    serviceName: {
        fontWeight: 'bold',
        fontSize: textScale(20),
        // Ensure the text doesn't overflow
        flex: 1,
        color:'#000'

    },
    itemContainer: {
        flex: 1,
        margin: moderateScale(8),
        // backgroundColor: 'red'
    },
});

export default OrderStatusList;
