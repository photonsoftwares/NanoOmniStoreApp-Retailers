import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import NoDataFound from '../../../../Components/NoDataFound';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { BASE_URL } from '../../../../config/Base_Url';
import { scale, textScale } from '../../../../styles/responsiveSize';
import { GetSearchItemsMethod, SearchWalletItemsMethod } from '../../../../config/userApiMethods';

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};


const WalletSearch = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { searchReducer } = useSelector((state) => state)
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { searchData } = searchReducer
    const [query, setQuery] = useState()
    const { allRetailerWallet } = useSelector(state => state?.walletSliceReducer);

    console.log("allRetailerWallet", allRetailerWallet.length)



    const searchItem = useCallback((search) => {
        setQuery(search)
        console.log("first", search)

        dispatch(SearchWalletItemsMethod(search))
    }, [dispatch]);

    const storeData = useCallback(async (item) => {
        let body = JSON.stringify({
            // ... your body data
        });
        const res = await dispatch(
            // ... your dispatch action
        );
        if (res?.status) {
            await dispatch(
                // ... your dispatch action
            );
        }
    }, [dispatch]);



    const renderItem = useMemo(() => ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetails}>
                <Text numberOfLines={1} style={styles.itemName}>{capitalizeFirstLetter(item?.customer_name)}</Text>
                <Text numberOfLines={1} style={styles.itemPrice}>Wallet Balance: ₹{item.balance}</Text>
            </View>
            <ButtonCompo
                title={'Update'}
                style={styles.updateButton}
                onPress={() => navigation.push('UpdateWallet', { id: item?.wallet_id })}
                textStyle={styles.updateButtonText}
            />
        </View>
    ), [storeData]);

    const placeholders = ["Search your product", "Search your item", "Search your need"];
    const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');

    // Function to handle text input change
    const onChangeText = (text) => {
        setInputValue(text);
    };

    // Effect to cycle through placeholders
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
        }, 2000); // Change the duration as needed
        return () => clearInterval(interval);
    }, [placeholders.length]);


    // console.log("Searchbar", searchData[0])
    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
                <Icon
                    name={'magnify'}
                    style={styles.searchIcon}
                    color='#000'
                />
                <TextInput
                    placeholder={placeholders[currentPlaceholderIndex]}
                    value={query}
                    placeholderTextColor={'#666'}
                    onChangeText={(text) => searchItem(text)}
                    style={styles.searchInput}
                    autoFocus
                />
            </View>
            <View style={styles.container}>
                {allRetailerWallet && allRetailerWallet?.length > 0 ?
                    <FlashList
                        data={allRetailerWallet.slice(0, 20)} // Display only the first 20 items
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        estimatedItemSize={200}
                    />
                    :
                    <View style={styles.noDataContainer}>
                        <NoDataFound
                            text='No Wallet'
                            iconName={'text-search'}
                            iconSize={30}
                        />
                    </View>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#C1C1E2',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(8),
        borderRadius: scale(10),
        borderBottomWidth: 3,
    },
    searchIcon: {
        fontSize: 25,
        left: 5,
    },
    searchInput: {
        fontSize: textScale(18),
        paddingLeft: scale(8),
        flex: 1,
        color: '#000',
    },
    container: {
        flex: 1,
        marginTop: scale(8),
        marginHorizontal: scale(8),
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#C1C1E2',
        paddingVertical: scale(12),
    },
    itemImage: {
        width: scale(60),
        height: scale(60),
        marginRight: scale(16),
        borderRadius: 8,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: textScale(14),
        fontWeight: 'bold',
        color: '#000',
    },
    itemCategory: {
        fontSize: textScale(16),
        color: '#666',
    },
    itemPrice: {
        fontSize: textScale(14),
        color: '#333',
        marginTop: scale(4),
    },
    updateButton: {
        marginRight: 10,
        width: 100,
    },
    updateButtonText: {
        fontSize: 16,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default WalletSearch;
