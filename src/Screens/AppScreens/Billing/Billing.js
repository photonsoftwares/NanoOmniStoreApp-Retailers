import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config/Base_Url';
import { moderateScale } from '../../../styles/responsiveSize';
import HeaderComp from '../../../Components/HeaderCompo';
import { AddToCartMethod, GetCartMethod, GetSelectedCategoryItemsMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import Cart from './Cart/Cart';
import NoDataFound from '../../../Components/NoDataFound';
import MyImgCompo from '../../../Components/MyImgCompo';
import { FlashList } from "@shopify/flash-list";


const Billing = () => {
  const { categoryData } = useSelector((state) => state?.categoriesReducer);
  const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name)
  const { cartItems } = useSelector((state) => state?.cartReducer);
  const { categoryItemsData } = useSelector((state) => state?.categoryItemsReducer);
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer)


  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [numColumns, setNumColumns] = useState(3);

  // console.log(categoryData)

  const addToCart = async (item) => {
    // console.log("addCartScreen_dataTest",item)

    let data = JSON.stringify({
      item_id: item?.item_id,
      item_name: item?.item_name,
      category: item?.category,
      message: 'This is an example cart item.',
      itemCode: 'ITEM002',
      sku: 'SKU123',
      description: item?.item_name,
      price: item?.price,
      // new_price: 3000,
      new_price: item?.price,
      discount: item?.discount,
      status: 'In Stock',
      department: 'department',
      saas_id: saasId,
      store_id: storeId,
      promoId: item?.promo_id,
      item_quantity: item?.product_qty,
      hsnCode: item?.hsn_code,
      taxRate: item?.tax_rate,
      taxCode: item?.tax_code,
      taxPercent: item?.tax_percent,
    });
    // console.log("addCartScreen",data)

    const resp = await dispatch(AddToCartMethod(data))
    // console.log("jo", resp)
    if (resp) {
      dispatch(GetCartMethod())

    }

  }

  const selectedCategoryFunc = async (selectedCategoryItem) => {
    // console.log("first", selectedCategoryItem)
    await dispatch(GetSelectedCategoryItemsMethod(selectedCategoryItem))
    setSelectedCategory(selectedCategoryItem)
  }




  const renderCategoryItemsItem = useCallback(({ item }) => (
    <View style={styles.categoryItemsItem}>
      <MyImgCompo
        imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
        resizeMode='cover'
        ImgCompoStyle={styles.serviceImage}
      />
      <View style={{ width: '80%', justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={styles.itemPrice} numberOfLines={1}>₹{item.price}</Text>
        {/* <Text style={styles.itemPrice} numberOfLines={1}>₹{item.discount}</Text> */}
        {
          item?.discount > 0 ?
            <Text style={[styles.itemPrice, { backgroundColor: '#90EE90', paddingHorizontal: 4 }]} numberOfLines={1}>{item.discount}%</Text>
            :
            null
            // <Text style={[styles.itemPrice, { backgroundColor: '#90EE90', paddingHorizontal: 4 }]} numberOfLines={1}>{item.discount}%</Text>

        }
      </View>


      <Text style={styles.itemName} numberOfLines={1}>
        {item.item_name.charAt(0).toUpperCase() + item.item_name.slice(1)}
      </Text>


      {/* </View> */}
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Text style={styles.buttonText}>Cart</Text>
      </TouchableOpacity>
    </View>
  ), [])


  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const handleEndReached = () => {
    // Fetch more data when reaching the end of the list
    // fetchData(recommendedCurrentPage + 1);
    dispatch(RecommendedItemMethod(storeId, saasId, recommendedCurrentPage));
    // console.log("first")


  };


  return (

    <>
      <HeaderComp
        screenName={'Billing'}
        onBackPress={() => navigation.goBack()}
        cartTrue
        onPressCart={() => navigation.navigate(Cart)}

      />
      {/* Vertical Category Items Data */}
      <FlashList
        data={recommendedData}
        renderItem={renderCategoryItemsItem}
        keyExtractor={keyExtractor}
        numColumns={numColumns}
        key={numColumns.toString()} // Add a unique key based on numColumns
        contentContainerStyle={styles.verticalFlatList}

        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}

        estimatedItemSize={200}


      />

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    margin: moderateScale(4),
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  horizontalFlatList: {
    marginTop: 8,
  },
  categoryItem: {
    // width: 120,
    paddingHorizontal: moderateScale(8),
    height: 60,
    backgroundColor: '#ECE447',
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    borderRadius: 8
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  categoryItemsItem: {
    flex: 1,
    // height: 200, // Increased height
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 10,
    padding: 4,
    elevation: 2, // Add elevation for a shadow effect
    // gap:8,
    // paddingVertical:8
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    // marginBottom: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    // marginBottom: 8,
    color: '#000'
  },
  itemName: {
    fontSize: 12,
    // marginBottom: 8,
    color: 'grey',
    textAlign: 'left'

  },
  button: {
    backgroundColor: '#ECE447',
    padding: moderateScale(4),
    borderRadius: 5,
    alignItems: 'center',
    width: '90%',
    marginTop: 8, // Increased margin
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',

  },
  verticalFlatList: {
    // marginTop: 16,
  },
});

export default Billing;
