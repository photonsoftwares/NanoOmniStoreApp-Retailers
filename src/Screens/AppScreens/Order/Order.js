// import React, { useCallback, memo } from 'react';
// import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import ImagePath from '../../../constants/ImagePath';
// import HeaderComp from '../../../Components/HeaderCompo';
// import { textScale } from '../../../styles/responsiveSize';

// const orderStatusData = [
//     { id: '1', status: 'Cancel', image: ImagePath.JennyWilson, elevation: 5 },
//     { id: '2', status: 'Pending', image: ImagePath.JennyWilson, elevation: 10 },
//     { id: '3', status: 'Delivered Item', image: ImagePath.JennyWilson, elevation: 15 },
//     { id: '4', status: 'Return Item', image: ImagePath.JennyWilson, elevation: 5 },
//     // Add more order statuses as needed
// ];

// const OrderStatusItem = memo(({ orderStatus }) => {
//     return (
//         <TouchableOpacity activeOpacity={0.9} contentContainerStyle={{}}>
//             <View style={[styles.serviceContainer, { elevation: orderStatus.elevation }]}>
//                 <Image source={orderStatus.image} style={styles.serviceImage} />
//                 <Text style={styles.serviceName}>{orderStatus.status}</Text>
//             </View>
//         </TouchableOpacity>
//     );
// });

// const OrderStatusList = () => {
//     const keyExtractor = useCallback((item) => item.id, []);

//     const renderItem = useCallback(({ item }) => <OrderStatusItem orderStatus={item} />, []);

//     return (
//         <>
//             <View >
//                 <HeaderComp
//                     screenName='Orders'
//                 />
//                 <FlatList
//                     data={orderStatusData}
//                     keyExtractor={keyExtractor}
//                     renderItem={renderItem}
//                     horizontal={false}
//                     numColumns={2}
//                     contentContainerStyle={styles.flatListContainer}
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
//     flatListContainer: {
//         marginTop: 16,
//     },
//     serviceContainer: {
//         flex: 1,
//         margin: 8,
//         borderRadius: 8,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         padding: 16,
//     },
//     serviceImage: {
//         width: 150, // Adjusted image size
//         height: 150, // Adjusted image size
//         resizeMode: 'cover',
//     },
//     serviceName: {
//         marginTop: 8,
//         fontWeight: 'bold',
//         fontSize: textScale(20)
//     },
// });

// export default OrderStatusList;



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
