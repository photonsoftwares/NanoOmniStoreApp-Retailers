import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../config/Base_Url';
import { scale, textScale } from '../../../styles/responsiveSize';


const SearchBar = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { searchReducer } = useSelector((state) => state)
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const { searchData } = searchReducer


  const searchItem = useCallback((search) => {
    dispatch(GetSearchItemsMethod(search))
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
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('UpdateItems', { itemId: item.item_id })}>
        <Image
          source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text numberOfLines={1} style={styles.itemName}>{item.item_name}</Text>
          <Text numberOfLines={1} style={styles.itemCategory}>{item.category}</Text>
          <Text numberOfLines={1} style={styles.itemPrice}>Price: ₹{item.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  ), [storeData]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        flexDirection: 'row',
        borderWidth: 1.5,
        borderColor: '#C1C1E2',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(8),
        borderRadius: scale(10),
        borderBottomWidth: 3
      }}>
        <Icon
          name={'magnify'}
          style={{ fontSize: 25, left: 5, }}
        />
        <TextInput
          placeholder='Search'
          onChangeText={(text) => searchItem(text)}
          style={{
            fontSize: textScale(18),
            paddingLeft: scale(8),
            flex: 1,
          }}
          autoFocus={true}
        />
      </View>

      <View style={styles.container}>
        {searchData && searchData?.length > 0 ?
          <FlashList
            data={searchData.slice(0, 20)} // Display only the first 20 items
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}

            estimatedItemSize={200}

          />
          :
          <NoDataFound
            text='No Search'
            iconName={'text-search'}
            iconSize={30}
          />
        }
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
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
    borderRadius: 8


  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: textScale(18),
    fontWeight: 'bold',
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
});

// export default React.memo(SearchBar);
export default SearchBar;


































