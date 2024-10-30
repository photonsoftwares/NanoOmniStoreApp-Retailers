
import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../../../config/Base_Url';
import { moderateScale } from '../../../styles/responsiveSize';
import HeaderComp from '../../../Components/HeaderCompo';
import { AddToCartMethod, GetCartMethod, GetSelectedCategoryItemsMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import Cart from './Cart/Cart';
import MyImgCompo from '../../../Components/MyImgCompo';
import { FlashList } from "@shopify/flash-list";
import Scan from '../../../Components/Scan';


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
    // console.log("addCartScreen_dataTest", item)

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
      actual_price: item?.actual_price
    });
    // console.log("addCartScreen", data)

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




  const renderCategoryItemsItem = useCallback(({ item }) => {

    if (item?.price !== undefined && item?.actual_price !== undefined) {
      const originalPrice = item.actual_price;
      const discountedPrice = item.price;

      const discountAmount = originalPrice - discountedPrice;
      const percentageOff = (discountAmount / originalPrice) * 100;

      var totalOff = percentageOff.toFixed(0) + "%";
      // console.log("first", totalOff)
    } else {
      showToast("Prices are not defined or null.");
    }



    return (
      <View style={styles.categoryItemsItem}>

        <MyImgCompo
          imageUri={`${BASE_URL}item/get-image/${item.item_id}`}
          resizeMode='cover'
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


        {/* Stock && DIscount */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around',  width: '100%' }}>
          {
            item?.stock == 0 ?
              <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, backgroundColor: '#edf1f7', }}>OOS</Text>
              :
              <Text style={{ alignSelf: 'flex-start', paddingHorizontal: 6, color: 'grey', borderRadius: 4, fontSize: 12, }}>Stock: {item?.stock}</Text>
          }
          {
            totalOff == '-Infinity%' ?
              <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}></Text>
              :
              <Text style={{ alignSelf: 'flex-end', backgroundColor: item?.actual_price > item?.price ? '#008000' : '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12, }}>{item?.actual_price > item?.price ? totalOff : null}</Text>
          }
        </View>

        <TouchableOpacity style={styles.button} onPress={() => {
          console.log('Adding to cart:', item);
          addToCart(item);
        }}>
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

      <FlashList
        data={recommendedData || []}
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
    paddingHorizontal: moderateScale(8),
    height: 60,
    backgroundColor: '#ECE447',
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
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    borderRadius: 10,
    padding: 4,
    elevation: 2, // Add elevation for a shadow effect
    gap: 8
  },
  serviceImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 5
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000'
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
    marginTop: 8, // Increased margin
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',

  },
  verticalFlatList: {
    // marginTop: 16,
  },
});

export default Billing;
