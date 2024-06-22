

// import { View, Text, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native'
// import React, { useMemo } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { scale, width } from '../styles/responsiveSize';
// import FastImage from 'react-native-fast-image';
// import { BASE_URL } from '../config/Base_Url';
// import { useNavigation } from '@react-navigation/native';


// const NoData = () => {
//   return (
//     <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160), marginRight: scale(70) }}>
//     {/* // <View style={{ backgroundColor: '#FFF', alignItems: 'center', marginTop: scale(160),  }}> */}
//       <Text style={{ fontSize: 18, fontWeight: '700' }}>No Items</Text>
//     </View>

//   )
// }

// const SubCategoryItemListRender = ({ item }) => {
//   const dispatch = useDispatch();
//   const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//   const navigation = useNavigation()
//   // console.log("HomeSubeCategoryItem", item)


//   return (
//     <View style={[styles.itemContainer, {}]}>

//       <FastImage
//         source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}`}}
//         style={styles.img}
//         resizeMode='cover'
//       />



//       <View style={{ width: '100%', gap: 6, height: 65 }}>

//         <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

//           <Text style={styles.price}>₹{item?.price}</Text>
//           <Text style={[styles.price, { textDecorationLine: 'line-through', color: "grey" }]}>{item.actual_price > item.price ? '₹' : ''}{item.actual_price > item.price ? item.actual_price : ''}</Text>
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
//   const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
//   const memoizedsubCategoryItems = useMemo(() => {
//     return subCategoryItems;
//   }, [subCategoryItems]);





//   // console.log("HomeSubeCategoryItem", memoizedsubCategoryItems?.length)
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
//     marginBottom:scale(90)
//   },
//   itemContainer: {
//     // flex: 1,
//     padding: 10,
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
//     fontSize: scale(14),
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










////////////////////




import { View, Text, Pressable, StyleSheet, FlatList, ScrollView, ActivityIndicator } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { scale, width } from '../styles/responsiveSize';
import FastImage from 'react-native-fast-image';
import { BASE_URL } from '../config/Base_Url';
import { useNavigation } from '@react-navigation/native';
import { GetSubCategoryItemsMethod } from '../config/userApiMethods';
import ButtonCompo from './ButtonCompo';
import { setSubCategoryItemsPage } from '../ReduxToolkit/features/mainCategorySlice';
import { showToast } from '../utils/toast';


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
    <View style={[styles.itemContainer, {}]}>
      {
        totalOff == '-Infinity%' ?
          <Text style={{ alignSelf: 'flex-end', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}></Text>
          :
          <Text style={{ alignSelf: 'flex-end', backgroundColor: item?.actual_price > item?.price ? '#008000' : '#FFF', paddingHorizontal: 6, color: '#FFF', borderRadius: 4, fontSize: 12 }}>{item?.actual_price > item?.price ? totalOff : null}</Text>
      }

      <FastImage
        source={{ uri: `${BASE_URL}item/get-image/${item.item_id}?key=${new Date()}` }}
        style={styles.img}
        resizeMode='cover'
      />
      <View style={{ width: '100%', gap: 6, height: 65 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

          <Text style={styles.price}>₹{item?.price}</Text>
          <Text style={[styles.price, { textDecorationLine: 'line-through', color: "grey" }]}>{item.actual_price > item.price ? '₹' : ''}{item.actual_price > item.price ? item.actual_price : ''}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>{item.title}{item?.item_name}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => navigation.navigate('UpdateCategoryItems', { itemId: item.item_id })}>
        <Text style={styles.buttonTitle}>Update</Text>
      </Pressable>
    </View>
  );
};

const HomeSubeCategoryItem = () => {
  const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems, subCategoryItemsTotalPage, subCategoryItemsPage } = useSelector((state) => state?.mainCategoryReducer);
  const dispatch = useDispatch()
  const [loder, setLoder] = useState(false)
  const memoizedsubCategoryItems = useMemo(() => {
    return subCategoryItems;
  }, [subCategoryItems]);

  const loadMoreData = async () => {


    if (subCategoryItemsTotalPage > subCategoryItemsPage) {
      setLoder(true)
      dispatch(setSubCategoryItemsPage(subCategoryItemsPage + 1))
      await dispatch(GetSubCategoryItemsMethod(selectedSubCategory))
      setLoder(false)
    } else {
      showToast("No More Data")
    }



    console.log("loadMoreDataSubCategory", subCategoryItemsTotalPage < subCategoryItemsPage, subCategoryItemsTotalPage, subCategoryItemsPage)
  };
  const Footer = () => {

    return (
      <View>
        {
          loder ? <ActivityIndicator size="large" color="#0000ff" />
            :
            <ButtonCompo title={'Lode more'} onPress={() => loadMoreData()} textStyle={{ fontSize: 12 }} />
        }
      </View>
    )
  }


  // console.log("HomeSubeCategoryItem", subCategoryItemsPage,selectedSubCategory)
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
            // onEndReached={loadMoreData}
            // onEndReachedThreshold={1}
            // ListFooterComponent={loder ? <View style={{ alignItems: 'center', width: '100%' }}><ActivityIndicator size="large" color="#0000ff" /></View> : <ButtonCompo title={'lode more'} onPress={loadMoreData()}/>}
            ListFooterComponent={<Footer />}
            ListFooterComponentStyle={{ alignSelf: 'center', marginRight: 100 }}

          />
      }
    </View>

  )
}

export default HomeSubeCategoryItem

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginBottom: scale(90)
  },
  itemContainer: {
    padding: 10,
    borderBottomColor: '#ccc',
    height: 260,
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
    fontSize: scale(14),
    fontWeight: '700',
    textAlign: 'left',
    color: 'green'
  },
  button: {
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
  },
});














