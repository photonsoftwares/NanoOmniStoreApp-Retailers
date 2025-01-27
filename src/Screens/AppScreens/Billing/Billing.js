import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config/Base_Url';
import { moderateScale } from '../../../styles/responsiveSize';
import HeaderComp from '../../../Components/HeaderCompo';
import { AddToCartMethod, GetCartMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import Cart from './Cart/Cart';
import MyImgCompo from '../../../Components/MyImgCompo';
import { FlashList } from "@shopify/flash-list";
import Scan from '../../../Components/Scan';

const Billing = () => {
  const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
  const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [numColumns, setNumColumns] = useState(3);
  const [searchText, setSearchText] = useState('');

  const filteredData = recommendedData.filter((item) =>
    item?.item_name?.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToCart = async (item) => {
    let data = JSON.stringify({
      item_id: item?.item_id,
      item_name: item?.item_name,
      category: item?.category,
      price: item?.price,
      new_price: item?.price,
      discount: item?.discount,
      saas_id: saasId,
      store_id: storeId,
      promoId: item?.promo_id,
      item_quantity: item?.product_qty,
      actual_price: item?.actual_price,
    });

    const resp = await dispatch(AddToCartMethod(data));
    if (resp) {
      dispatch(GetCartMethod());
    }
  };

  const renderCategoryItemsItem = useCallback(({ item }) => {
    if (item?.price !== undefined && item?.actual_price !== undefined) {
      const originalPrice = item.actual_price;
      const discountedPrice = item.price;

      const discountAmount = originalPrice - discountedPrice;
      const percentageOff = (discountAmount / originalPrice) * 100;

      var totalOff = percentageOff.toFixed(0) + "%";
    }

    return (
      <View style={styles.categoryItemsItem}>
        <MyImgCompo
          imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
          resizeMode="cover"
          ImgCompoStyle={styles.serviceImage}
        />
        <Text style={styles.itemName} numberOfLines={1}>
          {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
        </Text>
        <View style={{ width: '80%', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={[styles.itemPrice, { textDecorationLine: 'line-through' }]} numberOfLines={1}>
            {item.actual_price > item.price ? '₹' : ''}
            {item.actual_price > item.price ? item.actual_price : ''}
          </Text>
          <Text style={styles.itemPrice} numberOfLines={1}>₹{item.price}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
          {item?.stock === 0 ? (
            <Text style={styles.outOfStock}>OOS</Text>
          ) : (
            <Text style={styles.stockText}>Stock: {item?.stock}</Text>
          )}
          {totalOff !== '-Infinity%' && (
            <Text
              style={[
                styles.discountText,
                { backgroundColor: item?.actual_price > item?.price ? '#008000' : '#FFF' },
              ]}
            >
              {item?.actual_price > item?.price ? totalOff : null}
            </Text>
          )}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            console.log('Adding to cart:', item);
            addToCart(item);
          }}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const handleEndReached = () => {
    dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage));
  };

  return (
    <>
      <HeaderComp
        screenName={'Billing'}
        onBackPress={() => navigation.goBack()}
        cartTrue
        onPressCart={() => navigation.navigate(Cart)}
        showScan={true}
        onPressScan={() => navigation.navigate(Scan)}
      />
      <TextInput
        style={styles.searchBar}
        placeholder="Search items..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlashList
        data={filteredData || []}
        renderItem={renderCategoryItemsItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        key={numColumns.toString()}
        contentContainerStyle={styles.verticalFlatList}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        estimatedItemSize={200}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    margin: moderateScale(8),
    paddingHorizontal: moderateScale(8),
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    margin: moderateScale(4),
  },
  categoryItemsItem: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 10,
    padding: 4,
    elevation: 2,
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000',
  },
  itemName: {
    fontSize: 12,
    color: 'grey',
  },
  button: {
    backgroundColor: '#ECE447',
    padding: moderateScale(4),
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    marginTop: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  verticalFlatList: {},
  outOfStock: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    color: 'grey',
    borderRadius: 4,
    fontSize: 12,
    backgroundColor: '#edf1f7',
  },
  stockText: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    color: 'grey',
    borderRadius: 4,
    fontSize: 12,
  },
  discountText: {
    alignSelf: 'flex-end',
    paddingHorizontal: 6,
    color: '#FFF',
    borderRadius: 4,
    fontSize: 12,
  },
});

export default Billing;
