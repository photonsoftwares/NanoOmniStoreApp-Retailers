import React, { useCallback, memo, useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { moderateScale, textScale } from '../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../../config/Base_Url';
import { useFocusEffect, useNavigation, useTheme } from '@react-navigation/native';
import { RecommendedItemMethod } from '../../../../config/userApiMethods';
import MyImgCompo from '../../../../Components/MyImgCompo';
import { FlashList } from "@shopify/flash-list";




const ServiceItem = memo(({ service }) => {
    const color = service;
    const navigation = useNavigation()
    const colors = useTheme().colors
    let url = `${BASE_URL}item/get-image/${service.item_id}?key=${new Date()}`

    if (service?.price !== undefined && service?.actual_price !== undefined) {
        const originalPrice = service.actual_price;
        const discountedPrice = service.price;

        const discountAmount = originalPrice - discountedPrice;
        const percentageOff = (discountAmount / originalPrice) * 100;

        var totalOff = percentageOff.toFixed(0) + "%";
        // console.log("first", totalOff)
    } else {
        showToast("Prices are not defined or null.");
    }
    return (
        <View style={[styles.serviceContainer, { elevation: 10 }]}>


            <MyImgCompo
                imageUri={url}
                resizeMode='cover'
                ImgCompoStyle={styles.serviceImage}
            />

            {/* </View> */}
            <View style={{ width: '80%', paddingVertical: moderateScale(4), }}>
                <Text style={[styles.serviceName, { textAlign: 'left', color: colors.grey900, fontWeight: '400', height: moderateScale(42), fontSize: textScale(11.5), }]} numberOfLines={2} >{service?.item_name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900, textDecorationLine: 'line-through' }]} numberOfLines={1}>{service?.actual_price > service.price ? '₹' : null}{service?.actual_price > service.price ? service?.actual_price : ''}</Text>
                    <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>₹{service?.price}</Text>
                </View>
            </View>

            {/* Stock */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                {
                    service?.stock == 0 ?
                        <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, backgroundColor: '#edf1f7', }}>OOS</Text>
                        :
                        <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, }}>Stock: {service?.stock}</Text>
                }
                {
                    totalOff == '-Infinity%' ?
                        <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}></Text>
                        :
                        <Text style={{ alignSelf: 'flex-end', backgroundColor: service?.actual_price > service?.price ? '#008000' : '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, }}>{service?.actual_price > service?.price ? totalOff : null}</Text>
                }

            </View>
            <View style={{ width: '90%' }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateItems', service)}>
                    <Text style={[styles.buttonText, { color: colors.grey900 }]}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const ServicesList = ({ ProductsScreen }) => {
    const keyExtractor = useCallback((item, index) => index, []);
    const renderItem = useCallback(({ item }) => <ServiceItem service={item} />, []);
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer)
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const [isLoading, setIsLoading] = useState(false)


    const dispatch = useDispatch()
    const colors = useTheme().colors;

    const handleEndReached = async () => {
        setIsLoading(true)
        await dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage));
        setIsLoading(false)
    }

    // console.log("recommendedData",recommendedData)
    return (
        <>

            {ProductsScreen ? null :
                <View style={styles.headerContainer}>
                    <Text style={[styles.headerText, { color: colors.grey900 }]}>All Recommended Items</Text>
                </View>
            }

            <FlashList
                data={recommendedData || []}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                horizontal={false}
                numColumns={3}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.1}
                estimatedItemSize={50}
                ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
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
        paddingVertical: moderateScale(4),
        gap:8
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
        color: 'black', // You can adjust the text color as needed
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
});

export default ServicesList;


