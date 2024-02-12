// import React, { useCallback, memo } from 'react';
// import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import ImagePath from '../../../../constants/ImagePath';
// import { moderateScale, textScale } from '../../../../styles/responsiveSize';
// import { useDispatch, useSelector } from 'react-redux';
// import { BASE_URL } from '../../../../config/Base_Url';
// import { useNavigation, useTheme } from '@react-navigation/native';
// import UpdateItems from './UpdateItems/UpdateItems';
// import { RecommendedItemMethod } from '../../../../config/userApiMethods';
// import MyImgCompo from '../../../../Components/MyImgCompo';
// import { FlashList } from "@shopify/flash-list";




// const ServiceItem = memo(({ service }) => {
//     const navigation = useNavigation()
//     const colors = useTheme().colors;

//     // console.log("o",service)
//     return (
//         <View style={[styles.serviceContainer, { elevation: 10 }]}>
//             <Image
//                 source={{ uri: `${BASE_URL}item/get-image/${service.item_id}` }}
//                 resizeMode='center'
//                 style={styles.serviceImage}
//             // onError={(error) => console.warn('Image load error:', error.nativeEvent.error)}
//             />



//             {/* </View> */}
//             <View style={{ width: '80%', paddingVertical: moderateScale(4), }}>
//                 <Text style={[styles.serviceName, { textAlign: 'left', color: colors.grey900, fontWeight: '400', height: moderateScale(42), fontSize: textScale(12), }]} numberOfLines={2} >{service?.item_name}</Text>
//                 <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                     <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>₹{service?.price}</Text>
//                     <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900, fontWeight: '400', fontSize: 12 }]} numberOfLines={1}>Qty{service?.product_qty}</Text>
//                 </View>
//                 {/* <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
//                     <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>Status</Text>
//                     <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.white, fontWeight: '400', fontSize: 10, backgroundColor: service?.status === 'active' ? 'green' : 'red', borderRadius: 3, padding: 2 }]} numberOfLines={1}>{service?.status}</Text>
//                 </View> */}
//             </View>

//             <View style={{ width: '90%' }}>
//                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateItems', { itemId: service.item_id })}>
//                     <Text style={[styles.buttonText, { color: colors.grey900 }]}>Update</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// });

// const ServicesList = ({ ProductsScreen }) => {
//     const keyExtractor = useCallback((item, index) => index, []);
//     const renderItem = useCallback(({ item }) => <ServiceItem service={item} />, []);
//     const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer)
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)

//     // console.log(recommendedData[0])
//     const dispatch = useDispatch()
//     const colors = useTheme().colors;
//     const handleEndReached = () => {
//         // Fetch more data when reaching the end of the list
//         // fetchData(recommendedCurrentPage + 1);
//         dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage));


//     };

//     return (
//         <>
//             {ProductsScreen ? null :
//                 <View style={styles.headerContainer}>
//                     <Text style={[styles.headerText, { color: colors.grey900 }]}>All Recommended Items</Text>
//                     {/* <Text style={styles.viewAllText}>View All</Text> */}
//                 </View>
//             }

//             <FlashList
//                 data={recommendedData}
//                 keyExtractor={keyExtractor}
//                 renderItem={renderItem}
//                 horizontal={false}
//                 numColumns={3}

//                 onEndReached={handleEndReached}
//                 onEndReachedThreshold={0.1}
//                 estimatedItemSize={200}


//             />
//         </>

//     );
// };

// const styles = StyleSheet.create({
//     serviceContainer: {
//         flex: 1,
//         margin: moderateScale(4),
//         borderRadius: 8,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         // backgroundColor: 'red',
//         paddingVertical: moderateScale(4)
//     },
//     serviceImage: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover',
//         borderRadius: 8,
//         marginTop: moderateScale(2)
//     },
//     serviceName: {
//         marginTop: moderateScale(4),
//         fontWeight: 'bold',
//         // fontSize:
//         // backgroundColor: 'red',
//         // marginHorizontal: 1,
//         // width: '40%'
//     },
//     button: {
//         backgroundColor: '#ECE447',
//         padding: moderateScale(4),
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     buttonText: {
//         color: 'black', // You can adjust the text color as needed
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     headerContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: moderateScale(8),
//         marginTop: moderateScale(8),
//     },
//     headerText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default ServicesList;


import React, { useCallback, memo, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { moderateScale, textScale } from '../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../../config/Base_Url';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RecommendedItemMethod } from '../../../../config/userApiMethods';
import { FlashList } from "@shopify/flash-list";

const ServiceItem = memo(({ service }) => {
   
    const color = service?.colorList?.[0]?.product_color;
    console.log("khumeshgautam",service.item_id)

    /**
     * if(service){
     * service?.colorList
     * if(service.colorList[0]){
     * service?.colorList?.[0]
     * if(service?.colorList?.[0]?.product_color){
     * service?.colorList?.[0]?.product_color
     * }
     * }
     * 
     * }
     */
    const navigation = useNavigation();
    const colors = useTheme().colors;
const servicel=service
    const handleImagePress = () => {
        navigation.navigate('Details', { 
            itemId: service.item_id,
            itemName: service.item_name,
            itemPrice: service.price,
            itemQty: service.product_qty,
            imageUrl: `${BASE_URL}item/get-image/${service.item_id}`
        });
    };


    return (
        <View style={[styles.serviceContainer, { elevation: 10 }]}>
            <TouchableOpacity >
            <Image
    source={{ uri: `${BASE_URL}item/get-image/${service.item_id}?${new Date().getTime()}` }}
    resizeMode='cover'
    style={styles.serviceImage}
/>

            </TouchableOpacity>
            <View style={{ width: '80%', paddingVertical: moderateScale(4) }}>
                <Text style={[styles.serviceName, { color: colors.grey900, height: moderateScale(42), fontSize: textScale(12) }]} numberOfLines={2}>{service?.item_name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.serviceName, { color: colors.grey900 }]} numberOfLines={1}>₹{service?.price}</Text>
                    
                    <Text style={[styles.serviceName, { color: colors.grey900, fontWeight: '400', fontSize: 12 }]} numberOfLines={1}>Qty {service?.product_qty}</Text>
                </View>
                <View style={[styles.colorBox, { backgroundColor: color }]} />
            </View>
            
            <View style={{ width: '90%' }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateItems', { itemId: service.item_id })}>
                    <Text style={[styles.buttonText, { color: colors.grey900 }]}>Update</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
});

const ServicesList = ({ ProductsScreen }) => {
    const keyExtractor = useCallback((item, index) => index.toString(), []);
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer);
    const { storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
    const dispatch = useDispatch();
    const colors = useTheme().colors;

    const navigation = useNavigation();

    const handleEndReached = () => {
        dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage));
    };

    const renderItem = useCallback(({ item }) => <ServiceItem service={item} />, []);

    return (
        <>
            {!ProductsScreen && (
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, { color: colors.grey900 }]}>All Recommended Items</Text>
                </View>
            )}
            <FlashList
                data={recommendedData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                horizontal={false}
                numColumns={3}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                estimatedItemSize={200}
            />
        </>
    );
};

const styles = StyleSheet.create({
    serviceContainer: {
        flex: 1,
        margin: moderateScale(4),
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingVertical: moderateScale(4)
    },
    serviceImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: moderateScale(2)
    },
    serviceName: {
        marginTop: moderateScale(4),
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#ECE447',
        padding: moderateScale(4),
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: moderateScale(8),
        marginTop: moderateScale(8),
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    colorBox: {
        width: 10,
        height: 10,
        borderRadius: 10,
        marginRight: 8,
    },
});

export default ServicesList;
