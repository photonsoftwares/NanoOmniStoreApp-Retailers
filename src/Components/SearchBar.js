// import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
// import React, { useState, useCallback, useMemo, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { BASE_URL } from '../config/Base_Url';
// import { scale, textScale } from '../styles/responsiveSize';
// import NoDataFound from './NoDataFound';
// import { GetSearchItemsMethod } from '../config/userApiMethods';
// import { FlashList } from "@shopify/flash-list";
// import { useFocusEffect, useNavigation } from '@react-navigation/native';


// const SearchBar = () => {
//   const dispatch = useDispatch()
//   const navigation = useNavigation()
//   const { searchReducer } = useSelector((state) => state)
//   const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//   const { searchData } = searchReducer


//   const searchItem = useCallback((search) => {
//     dispatch(GetSearchItemsMethod(search))
//   }, [dispatch]);

//   const storeData = useCallback(async (item) => {
//     let body = JSON.stringify({
//       // ... your body data
//     });
//     const res = await dispatch(
//       // ... your dispatch action
//     );
//     if (res?.status) {
//       await dispatch(
//         // ... your dispatch action
//       );
//     }
//   }, [dispatch]);

//   // useFocusEffect(()=>{

//   // },[])

//   const renderItem = useMemo(() => ({ item }) => (
//     <View>
//       <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('UpdateItems', { itemId: item?.item_id })}>

//         <Image
//           key={item?.item_id}  // Add this line to set a unique key for each Image component
//           source={{ uri: `${BASE_URL}item/get-image/${item?.item_id}?timestamp=${Date.now()}` }}

//           style={styles.itemImage}
//         />
//         <View style={styles.itemDetails}>
//           <Text numberOfLines={1} style={styles.itemName}>{item.item_name}</Text>
//           <Text numberOfLines={1} style={styles.itemCategory}>{item.category}</Text>
//           <Text numberOfLines={1} style={styles.itemPrice}>Price: ₹{item.price}</Text>
//         </View>
//       </TouchableOpacity>
//     </View>
//   ), [storeData]);

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff' }}>
//       <View style={{
//         flexDirection: 'row',
//         borderWidth: 1.5,
//         borderColor: '#C1C1E2',
//         alignContent: 'center',
//         alignItems: 'center',
//         marginHorizontal: scale(8),
//         borderRadius: scale(10),
//         borderBottomWidth: 3
//       }}>
//         <Icon
//           name={'magnify'}
//           style={{ fontSize: 25, left: 5, }}
//           color='#000'
//         />
//         <TextInput
//           placeholder='Search'
//           placeholderTextColor={'#666'}
//           onChangeText={(text) => searchItem(text)}

//           style={{
//             fontSize: textScale(18),
//             paddingLeft: scale(8),
//             flex: 1,
//             color: '#000'
//           }}
//         />
//       </View>

//       <View style={styles.container}>
//         {searchData && searchData?.length > 0 ?
//           <FlashList
//             data={searchData.slice(0, 20)} // Display only the first 20 items
//             renderItem={renderItem}
//             keyExtractor={(item, index) => index.toString()}
//             showsVerticalScrollIndicator={false}

//             estimatedItemSize={200}

//           />
//           :
//           <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <NoDataFound
//               text='No Search'
//               iconName={'text-search'}
//               iconSize={30}
//             />
//           </View>

//         }
//       </View>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: scale(8),
//     marginHorizontal: scale(8),
//   },
//   itemContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#C1C1E2',
//     paddingVertical: scale(12),

//   },
//   itemImage: {
//     width: scale(60),
//     height: scale(60),
//     marginRight: scale(16),
//     borderRadius: 8


//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: textScale(18),
//     fontWeight: 'bold',
//     color: '#000'
//   },
//   itemCategory: {
//     fontSize: textScale(16),
//     color: '#666',
//   },
//   itemPrice: {
//     fontSize: textScale(14),
//     color: '#333',
//     marginTop: scale(4),
//   },
// });

// // export default React.memo(SearchBar);
// export default SearchBar;









// ///////////animated serachbar
import { StyleSheet, Text, View, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../config/Base_Url';
import { scale, textScale } from '../styles/responsiveSize';
import NoDataFound from './NoDataFound';
import { GetSearchItemsMethod } from '../config/userApiMethods';
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect, useNavigation } from '@react-navigation/native';


const SearchBar = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { searchReducer } = useSelector((state) => state)
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const { searchData } = searchReducer
  const [query, setQuery] = useState()


  const searchItem = useCallback((search) => {
    setQuery(search)

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

  // useFocusEffect(()=>{

  // },[])

  const renderItem = useMemo(() => ({ item }) => (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('UpdateItems', { itemId: item?.item_id })}>

        <Image
          key={item?.item_id}  // Add this line to set a unique key for each Image component
          source={{ uri: `${BASE_URL}item/get-image/${item?.item_id}?timestamp=${Date.now()}` }}

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

  const placeholders = [ "Search your product","Search your item", "Search your need"];
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
          color='#000'
        />
        <TextInput
          placeholder={placeholders[currentPlaceholderIndex]}
          value={query}



          placeholderTextColor={'#666'}
          onChangeText={(text) => searchItem(text)}

          style={{
            fontSize: textScale(18),
            paddingLeft: scale(8),
            flex: 1,
            color: '#000'
          }}
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NoDataFound
              text='No Search'
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
    color: '#000'
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

export default SearchBar;











