import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation, } from '@react-navigation/native'
import { RecommendedItemMethod } from '../../../../config/userApiMethods';
import { capitalizeFirstLetter } from '../../../../utils/utils';
import { FlashList } from "@shopify/flash-list";



const RecommendedInventory = () => {
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer)
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    console.log("first", recommendedData?.length, recommendedCurrentPage)


    const handleLoadMore = async () => {
        // onLoadMore();
        setIsLoading(true)
        await dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage))
        setIsLoading(false)

    };




    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.itemName}>{capitalizeFirstLetter(item?.item_name)}</Text>
            <Text>Opening Qty: {item?.opening_qty}</Text>
            <Text>Closing Qty: {item?.closing_qty}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            {/* <HeaderComp screenName={'Inventory'} onBackPress={() => navigation.goBack()}
       showInventory={true} 
      /> */}
            <FlashList
                data={recommendedData || []}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.8}
                estimatedItemSize={200}
                ListFooterComponent={isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}

            />
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rendercontainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        elevation: 4
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default RecommendedInventory

