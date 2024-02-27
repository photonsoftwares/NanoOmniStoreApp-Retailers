// import React from 'react';
// import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
// import { useSelector } from 'react-redux';
// import { FlashList } from "@shopify/flash-list";

// const CategoryItemList = () => {
//     const { categoryItemsData, categoryItemsCurrentPage } = useSelector((state) => state?.categoryItemsReducer)
// //   console.log("categoryItemsData.length",categoryItemsData,categoryItemsCurrentPage)


//     const renderItem = ({ item }) => (
//         // console.log("item",item)
//         <TouchableOpacity style={styles.categoryButton}>
//             <View style={styles.itemContainer}>
//                 <Text style={styles.categoryName}>{item.price}</Text>
//             </View>
//         </TouchableOpacity>
//     );

//     const handleCategoryPress = (category) => {
//         // Handle category press here
//         console.log('Category Pressed:', category?.category_id);
//     };

//     const ItemSeparator = () => <View style={styles.itemSeparator} />;

//     return (
//         <View>
//             <FlashList
//                 data={categoryItemsData || []}
//                 horizontal
//                 renderItem={renderItem}
//                 keyExtractor={(item,index) => index}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={ItemSeparator}
//                 estimatedItemSize={50}
//             />
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     itemContainer: {
//         alignItems: 'center',
//         marginRight: 10, // Add marginRight to create space between items
//     },
//     itemSeparator: {
//         width: 10, // Adjust the width according to your desired space between items
//     },
//     categoryName: {
//         marginTop: 5,
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     categoryButton: {
//         backgroundColor: '#eee',
//         borderRadius: 10,
//         padding: 10,
//         width: 120, // Set a fixed width for the button container
//         // marginHorizontal: 8
//     },
// });


// export default CategoryItemList



///

import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from "@shopify/flash-list";
import { useNavigation, useTheme } from '@react-navigation/native';
import { BASE_URL } from '../config/Base_Url';
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import MyImgCompo from './MyImgCompo';
import { setCurrentCategoryItemPage } from '../ReduxToolkit/features/categoryItemsSlice';
import { GetSelectedCategoryItemsMethod } from '../config/userApiMethods';
import UpdateCategoryItems from '../Screens/AppScreens/Home/Services/UpdateItems/UpdateCategoryItems';

const ServiceItem = memo(({ service }) => {
    const navigation = useNavigation()
    const colors = useTheme().colors






    let url = `${BASE_URL}item/get-image/${service.item_id}?key=${new Date()}`
    return (
        <View style={[styles.serviceContainer, { elevation: 10, }]}>

            <MyImgCompo
                imageUri={url}
                resizeMode='cover'
                ImgCompoStyle={styles.serviceImage}
            />

            {/* </View> */}
            <View style={{ width: '80%', paddingVertical: moderateScale(4), }}>
                <Text style={[styles.serviceName, { textAlign: 'left', color: colors.grey900, fontWeight: '400', height: moderateScale(42), fontSize: textScale(11.5), }]} numberOfLines={2} >{service?.item_name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>₹{service?.price}</Text>
                    <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900,backgroundColor:service?.colorList[0]?.product_color,padding:4, borderRadius:scale(20),width:15,height:15}]} numberOfLines={1}></Text>


                    {
                        service?.discount > 0 ?
                            <>
                                <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey800, backgroundColor: '#90EE90', paddingHorizontal: 2,borderRadius:2, }]} numberOfLines={1}>{service?.discount}%<Text style={{fontSize:13}}> off</Text></Text>

                            </>
                            :
                            null
                    }


                    {/* {
                        service?.discount > 0 ?
                            <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>₹{service?.priceAfterDiscount}</Text>
                            :
                            <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey900 }]} numberOfLines={1}>₹{service?.price}</Text>
                    }
                    {
                        service?.discount > 0 ?
                            <Text style={[styles.serviceName, { marginTop: 0, textAlign: 'left', color: colors.grey800 ,backgroundColor:'#90EE90',paddingHorizontal:4}]} numberOfLines={1}>{service?.discount}%</Text>
                            :
                            null
                    } */}
                </View>
            </View>

            <View style={{ width: '90%' }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateCategoryItems', { itemId: service.item_id })}>
                    <Text style={[styles.buttonText, { color: colors.grey900 }]}>Update</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
});

const CategoryItemList = () => {
    const dispatch = useDispatch()
    const { categoryItemsData, categoryItemsCurrentPage } = useSelector((state) => state?.categoryItemsReducer)
    const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer);
    const renderItem = useCallback(({ item }) => <ServiceItem service={item} />, []);



    const ItemSeparator = () => <View style={styles.itemSeparator} />;
    const handleEndReached = () => {
        dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1))
        dispatch(GetSelectedCategoryItemsMethod(selectedCategory))
    }

    const itemsWithPriceAfterDiscount = categoryItemsData.map(item => {
        // const price = item.price;
        const actual_price = item.actual_price;
        const discount = item.discount;
        const priceAfterDiscount = actual_price - (actual_price * (discount / 100));
        return {
            ...item,
            priceAfterDiscount: priceAfterDiscount
        };
    });

    // console.log("itemsWithPriceAfterDiscount", itemsWithPriceAfterDiscount[3]);

console.log("Danishnewcate",categoryItemsData[9]?.colorList[0]?.product_color)
    return (
        <>
            <FlashList
                data={categoryItemsData || []}
                // data={itemsWithPriceAfterDiscount || []}
                numColumns={3}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparator}
                estimatedItemSize={50}
                onEndReached={handleEndReached}
                onEndReachedThreshold={0.5}

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
        // backgroundColor: 'red',
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


export default CategoryItemList

