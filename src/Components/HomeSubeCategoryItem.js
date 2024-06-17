// import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native'
// import React, { useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { scale, width } from '../styles/responsiveSize';
// import FastImage from 'react-native-fast-image';
// import { BASE_URL } from '../config/Base_Url';
// import { useNavigation } from '@react-navigation/native';


// const NoData = () => {
//   return (
//     <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160), marginRight: scale(70) }}>
//       <Text style={{ fontSize: 18, fontWeight: '700' }}>No Items</Text>
//     </View>

//   )
// }



// const HomeSubeCategoryItem = () => {
//   const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
//   const memoizedsubCategoryItems = useMemo(() => {
//     return subCategoryItems;
//   }, [subCategoryItems]);
//   const navigation = useNavigation()

//   const SubCategoryItemListRender = ({ item }) => {
//     const dispatch = useDispatch();
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)

//     // console.log("product",storeId,saasId,id)

//     const storeData = async item => {
//       // console.log("addToCartBody", item)


//       let body = JSON.stringify({
//         item_id: item?.item_id,
//         item_name: item?.item_name,
//         category: item?.category,
//         message: 'This is an example cart item.',
//         itemCode: null,
//         sku: 'SKU123',
//         description: item?.item_name,
//         price: item?.price,
//         mrp: item?.actual_price,
//         new_price: item?.price,
//         discount: item?.discount,
//         status: item?.status,
//         department: 'no departments',
//         saas_id: saasId,
//         store_id: storeId,
//         promoId: item?.promo_id,
//         item_quantity: item?.product_qty,
//         hsnCode: item?.hsn_code,
//         taxRate: item?.tax_rate,
//         taxCode: item?.tax_code,
//         taxPercent: item?.tax_percent,
//         actual_price: item?.actual_price
//         // actual_price: item?.actual_price * item?.bill_qty
//       });

//       console.log("Cart_Body", body)

//       const res = await dispatch(
//         // Addtocartaction(body, saasId, storeId, id)
//       );

//       if (res?.status) {
//         // await dispatch(Cartget(saasId, storeId, id));
//       }

//     }

//     return (
//       <View style={[styles.itemContainer, {}]}>

//         <FastImage
//           source={{ uri: `${BASE_URL}item/get-image/${item.item_id}` }}
//           style={styles.img}
//           resizeMode='contain'
//         />



//         <View style={{ width: '100%', gap: 6, height: 65 }}>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//             <Text style={styles.price}>₹{item?.price}</Text>
//             <Text style={[styles.price, { textDecorationLine: 'line-through', color: "grey" }]}>₹{item?.actual_price}</Text>
//           </View>
//           <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
//         </View>
//         {/* <Pressable style={styles.button} onPress={()=>storeData(item)}> */}
//         {/* <Pressable style={styles.button} onPress={() => console.log("first", item,item.item_id)}> */}
//         <Pressable style={styles.button} onPress={() => navigation.navigate('UpdateCategoryItems', { itemId: item.item_id })}>
//           <Text style={styles.buttonTitle}>Update</Text>
//         </Pressable>
//       </View>
//     );
//   };



//   console.log("HomeSubeCategoryItem", memoizedsubCategoryItems?.length)
//   return (
//     <View style={styles.container}>
//       {
//         memoizedsubCategoryItems?.length == 0 ?
//           <>{NoData()}</>
//           :
//           <FlatList
//             data={memoizedsubCategoryItems || []}
//             keyExtractor={(item, index) => item.id || index}
//             renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
//             numColumns={2}
//             contentContainerStyle={styles.contentContainer}
//             ListEmptyComponent={() => NoData()}
//           />
//       }
//     </View>

//   )
// }

// export default HomeSubeCategoryItem

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF',

//   },
//   itemContainer: {
//     // flex: 1,
//     padding: 10,
//     // borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     height: 240,
//     width: width / 2.9,
//     elevation: 6,
//     backgroundColor: '#fff',
//     marginHorizontal: 6,
//     marginVertical: 6,
//     alignItems: 'center',
//     gap: 10,
//     borderRadius: 8



//   },
//   contentContainer: {
//     backgroundColor: '#FFF',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     paddingBottom: 4
//   },
//   img: {
//     height: 100,
//     width: 110,
//     borderWidth: 1,
//     borderRadius: 8

//   },
//   title: {
//     fontSize: scale(12),
//     fontWeight: '700',
//     textAlign: 'left'
//   },
//   price: {
//     fontSize: scale(16),
//     fontWeight: '700',
//     textAlign: 'left',
//     color: 'green'
//   },
//   button: {
//     // backgroundColor: '#ECE447',
//     backgroundColor: '#fff',
//     padding: 4,
//     paddingHorizontal: 8,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     borderWidth: 1,
//     elevation: 4
//   },
//   buttonTitle: {
//     fontSize: scale(14),
//     fontWeight: '700',
//     // textAlign: 'left'
//   },
// });








//////////////////

import { View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { scale, width } from '../styles/responsiveSize';
import FastImage from 'react-native-fast-image';
import { BASE_URL } from '../config/Base_Url';
import { useNavigation } from '@react-navigation/native';


const NoData = () => {
  return (
    <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160), marginRight: scale(70) }}>
    {/* // <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160),  }}> */}
      <Text style={{ fontSize: 18, fontWeight: '700' }}>No Items</Text>
    </View>

  )
}

const SubCategoryItemListRender = ({ item }) => {
  const dispatch = useDispatch();
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const navigation = useNavigation()
  // console.log("HomeSubeCategoryItem", item)


  return (
    <View style={[styles.itemContainer, {}]}>

      <FastImage
        source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}`}}
        style={styles.img}
        resizeMode='cover'
      />



      <View style={{ width: '100%', gap: 6, height: 65 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={styles.price}>₹{item?.price}</Text>
          <Text style={[styles.price, { textDecorationLine: 'line-through', color: "grey" }]}>₹{item?.actual_price}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
      </View>
      {/* <Pressable style={styles.button} onPress={()=>storeData(item)}> */}
      {/* <Pressable style={styles.button} onPress={() => console.log("first", item,item.item_id)}> */}
      <Pressable style={styles.button} onPress={() => navigation.navigate('UpdateCategoryItems', { itemId: item.item_id })}>
        <Text style={styles.buttonTitle}>Update</Text>
      </Pressable>
    </View>
  );
};

const HomeSubeCategoryItem = () => {
  const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
  const memoizedsubCategoryItems = useMemo(() => {
    return subCategoryItems;
  }, [subCategoryItems]);





  // console.log("HomeSubeCategoryItem", memoizedsubCategoryItems?.length)
  return (
    <View style={styles.container}>
      {
        memoizedsubCategoryItems?.length == 0 ?
          <>{NoData()}</>
          :
          <FlatList
            data={memoizedsubCategoryItems || []}
            keyExtractor={(item, index) => item.id || index}
            renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
            numColumns={2}
            contentContainerStyle={styles.contentContainer}
            ListEmptyComponent={() => NoData()}
            
          />
      }
    </View>

  )
}

export default HomeSubeCategoryItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom:scale(90)
  },
  itemContainer: {
    // flex: 1,
    padding: 10,
    borderBottomColor: '#ccc',
    height: 240,
    width: width / 2.9,
    elevation: 6,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    marginVertical: 6,
    alignItems: 'center',
    gap: 10,
    borderRadius: 8



  },
  contentContainer: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingBottom: 4
  },
  img: {
    height: 100,
    width: 110,
    borderWidth: 1,
    borderRadius: 8

  },
  title: {
    fontSize: scale(12),
    fontWeight: '700',
    textAlign: 'left'
  },
  price: {
    fontSize: scale(16),
    fontWeight: '700',
    textAlign: 'left',
    color: 'green'
  },
  button: {
    // backgroundColor: '#ECE447',
    backgroundColor: '#fff',
    padding: 4,
    paddingHorizontal: 8,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    elevation: 4
  },
  buttonTitle: {
    fontSize: scale(14),
    fontWeight: '700',
    // textAlign: 'left'
  },
});
















///////////////////////////////////


// import { View, Text, Pressable, StyleSheet, FlatList } from 'react-native';
// import React, { useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { scale, width } from '../styles/responsiveSize';
// import FastImage from 'react-native-fast-image';
// import { BASE_URL } from '../config/Base_Url';
// import { useNavigation } from '@react-navigation/native';

// const NoData = () => {
//   return (
//     <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160), marginRight: scale(70) }}>
//       <Text style={{ fontSize: 18, fontWeight: '700' }}>No Items</Text>
//     </View>
//   );
// };

// const SubCategoryItemListRender = ({ item }) => {
//   const dispatch = useDispatch();
//   const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
//   const navigation = useNavigation();
//   console.log("HomeSubeCategoryItem", item);

//   return (
//     <View style={styles.itemContainer}>
//       <FastImage
//         source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}` }}
//         style={styles.img}
//         resizeMode='contain'
//       />

//       <View style={{ width: '100%', gap: 6, height: 65 }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//           <Text style={styles.price}>₹{item?.price}</Text>
//           <Text style={[styles.price, { textDecorationLine: 'line-through', color: "grey" }]}>₹{item?.actual_price}</Text>
//         </View>
//         <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
//       </View>

//       <Pressable style={styles.button} onPress={() => navigation.navigate('UpdateCategoryItems', { itemId: item.item_id })}>
//         <Text style={styles.buttonTitle}>Update</Text>
//       </Pressable>
//     </View>
//   );
// };

// const HomeSubeCategoryItem = () => {
//   const { subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
//   const memoizedsubCategoryItems = useMemo(() => {
//     return subCategoryItems;
//   }, [subCategoryItems]);

//   return (
//     <View style={styles.container}>
//       {
//         memoizedsubCategoryItems?.length === 0 ?
//           <NoData />
//           :
//           <FlatList
//             data={memoizedsubCategoryItems || []}
//             keyExtractor={(item, index) => item.id || index.toString()}
//             renderItem={({ item }) => <SubCategoryItemListRender item={item} />}
//             numColumns={2}
//             contentContainerStyle={styles.contentContainer}
//             ListEmptyComponent={() => <NoData />}
//           />
//       }
//     </View>
//   );
// };

// export default HomeSubeCategoryItem;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//   },
//   itemContainer: {
//     flex: 1,
//     padding: 10,
//     borderBottomColor: '#ccc',
//     height: 240,
//     width: width / 2.1,
//     elevation: 6,
//     backgroundColor: '#fff',
//     marginHorizontal: 6,
//     marginVertical: 6,
//     alignItems: 'center',
//     gap: 10,
//     borderRadius: 8,
//   },
//   contentContainer: {
//     backgroundColor: '#FFF',
//     paddingBottom: 4,
//   },
//   img: {
//     height: 100,
//     width: 110,
//     borderWidth: 1,
//     borderRadius: 8,
//   },
//   title: {
//     fontSize: scale(12),
//     fontWeight: '700',
//     textAlign: 'left',
//   },
//   price: {
//     fontSize: scale(16),
//     fontWeight: '700',
//     textAlign: 'left',
//     color: 'green',
//   },
//   button: {
//     backgroundColor: '#fff',
//     padding: 4,
//     paddingHorizontal: 8,
//     width: 100,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     borderWidth: 1,
//     elevation: 4,
//   },
//   buttonTitle: {
//     fontSize: scale(14),
//     fontWeight: '700',
//   },
// });
