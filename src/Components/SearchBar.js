/////////////////////////
// use memo

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

  // useFocusEffect(()=>{

  // },[])

  const renderItem = useMemo(() => ({ item }) => (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('UpdateItems', { itemId: item?.item_id })}>
        {/* <Image
          // source={{ uri: `${BASE_URL}item/get-image/${item.item_id}`}}
          source={{ uri: `http://3.111.70.84:8089/prod/api/v1/item/get-image/22237`}}
          style={styles.itemImage}
        /> */}

        <Image
          key={item?.item_id}  // Add this line to set a unique key for each Image component
          // source={{ uri: `http://3.111.70.84:8089/prod/api/v1/item/get-image/${item?.item_id}` }}
          source={{ uri: `${BASE_URL}item/get-image/${item?.item_id}?timestamp=${Date.now()}` }}

          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <Text numberOfLines={1} style={styles.itemName}>{item.item_name}</Text>
          <Text numberOfLines={1} style={styles.itemCategory}>{item.category}</Text>
          <Text numberOfLines={1} style={styles.itemPrice}>Price: ₹{item.price}</Text>
          {/* <Text numberOfLines={1} style={styles.itemPrice}>{`${item?.item_id}`}</Text> */}
        </View>
      </TouchableOpacity>
    </View>
  ), [storeData]);

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
          placeholder='Search'
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

// export default React.memo(SearchBar);
export default SearchBar;

















































































//////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false); // New state to track search bar status

//   const [data, setData] = useState([
//     {
//       id: '1',
//       sender: 'Alice',
//       message: 'Hello, how are you?',
//     },
//     {
//       id: '2',
//       sender: 'Bob',
//       message: 'I\'m doing well, thanks!',
//     },
//     {
//       id: '3',
//       sender: 'Alice',
//       message: 'What\'s new?',
//     },
//     {
//       id: '4',
//       sender: 'Bob',
//       message: 'Not much, just working on some projects.',
//     },
//     // ... add more messages as needed
//   ]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter the data based on the search input
//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     // Update the displayed data
//     setFilteredData(filteredData);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);
//   };

//   const [filteredData, setFilteredData] = useState(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           onFocus={() => {
//             console.log(true); // Search bar opened
//             setIsSearchBarOpen(true);
//           }}
//           onBlur={() => {
//             console.log(false); // Search bar closed
//             setIsSearchBarOpen(false);
//           }}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={handleClear}>
//             <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchQuery.length > 0 && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => console.log(item.message)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
// });

// export default SearchBar;






// Woring
// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   const [isItemSelected, setIsItemSelected] = useState(false);

//   const [data, setData] = useState([
//     {
//       id: '1',
//       sender: 'Alice',
//       message: 'Hello, how are you?',
//     },
//     {
//       id: '2',
//       sender: 'Bob',
//       message: 'I\'m doing well, thanks!',
//     },
//     {
//       id: '3',
//       sender: 'Alice',
//       message: 'What\'s new?',
//     },
//     {
//       id: '4',
//       sender: 'Bob',
//       message: 'Not much, just working on some projects.',
//     },
//     // ... add more messages as needed
//   ]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter the data based on the search input
//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     // Update the displayed data
//     setFilteredData(filteredData);

//     // Set isSearchBarOpen to true when search input is not empty and no item is selected
//     setIsSearchBarOpen(!!text.trim() && !isItemSelected);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);
//     setIsSearchBarOpen(false); // Set isSearchBarOpen to false when the search bar is cleared
//     onBlur(); // Trigger onBlur event when search bar is cleared
//   };

//   const onBlur = () => {
//     setIsSearchBarOpen(false); // Set isSearchBarOpen to false when the search bar loses focus
//   };

//   const handleItemSelect = async () => {
//     Keyboard.dismiss()
//     await handleClear()
//     setIsItemSelected(true);
//     setSearchQuery('');

//     // setIsSearchBarOpen(false); // Set isSearchBarOpen to false when an item is selected
//   };

//   const [filteredData, setFilteredData] = useState(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           onFocus={() => setIsSearchBarOpen(true)}
//           onBlur={onBlur}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={handleClear}>
//             <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchQuery.length > 0 && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemSelect(item)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       {/* Display 'true' or 'false' based on isSearchBarOpen state */}
//       <Text>{isSearchBarOpen ? 'true' : 'false'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
// });

// export default SearchBar;


// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = ({ IsSearchBarOpenFunct }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   const [isItemSelected, setIsItemSelected] = useState(false);

//   const [data, setData] = useState([
//     {
//       id: '1',
//       sender: 'Alice',
//       message: 'Hello, how are you?',
//     },
//     {
//       id: '2',
//       sender: 'Bob',
//       message: 'I\'m doing well, thanks!',
//     },
//     {
//       id: '3',
//       sender: 'Alice',
//       message: 'What\'s new?',
//     },
//     {
//       id: '4',
//       sender: 'Bob',
//       message: 'Not much, just working on some projects.',
//     },
//     // ... add more messages as needed
//   ]);

//   const IsSearchBarOpenOrClose = () => {
//     IsSearchBarOpenFunct(isSearchBarOpen)
//   }

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter the data based on the search input
//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     // Update the displayed data
//     setFilteredData(filteredData);

//     // Set isSearchBarOpen to true when search input is not empty and no item is selected
//     setIsSearchBarOpen(!!text.trim() && !isItemSelected);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);
//     setIsSearchBarOpen(false); // Set isSearchBarOpen to false when the search bar is cleared
//     onBlur(); // Trigger onBlur event when search bar is cleared
//   };

//   const onBlur = () => {
//     setIsSearchBarOpen(false); // Set isSearchBarOpen to false when the search bar loses focus
//   };

//   const handleItemSelect = (item) => {
//     setSearchQuery('');
//     setFilteredData([item]); // Show only the selected item
//     setIsItemSelected(true);
//     setIsSearchBarOpen(false); // Close the search bar
//   };

//   const [filteredData, setFilteredData] = useState(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           onFocus={() => { setIsSearchBarOpen(true), IsSearchBarOpenOrClose() }}
//           onBlur={onBlur}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={handleClear}>
//             <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchQuery.length > 0 && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemSelect(item)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       {/* Display 'true' or 'false' based on isSearchBarOpen state */}
//       <Text>{isSearchBarOpen ? 'true' : 'false'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
// });

// export default SearchBar;








// import React, { useState } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = ({ IsSearchBarOpenFunct }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   const [isItemSelected, setIsItemSelected] = useState(false);

//   const IsSearchBarOpenOrClose = () => {
//     IsSearchBarOpenFunct(isSearchBarOpen);
//   };

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredData(filteredData);

//     setIsSearchBarOpen(!!text.trim() && !isItemSelected);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);
//     setIsSearchBarOpen(false);
//     onBlur();
//   };

//   const onBlur = () => {
//     setIsSearchBarOpen(false);
//   };

//   const handleItemSelect = (item) => {
//     setSearchQuery('');
//     setFilteredData([item]);
//     setIsItemSelected(true);
//     setIsSearchBarOpen(false);
//   };

//   // Sample data
//   const [data, setData] = useState([
//     { id: '1', sender: 'Alice', message: 'Hello, how are you?' },
//     { id: '2', sender: 'Bob', message: 'I\'m doing well, thanks!' },
//     { id: '3', sender: 'Alice', message: 'What\'s new?' },
//     { id: '4', sender: 'Bob', message: 'Not much, just working on some projects.' },
//   ]);

//   const [filteredData, setFilteredData] = useState(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           onFocus={() => { setIsSearchBarOpen(true); IsSearchBarOpenOrClose(); }}
//           onBlur={onBlur}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={handleClear}>
//             <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchQuery.length > 0 && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemSelect(item)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       <Text>{isSearchBarOpen ? 'true' : 'false'}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
// });

// export default SearchBar;








// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = ({ isSearchBarOpenCallback }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
//   const [isItemSelected, setIsItemSelected] = useState(false);

//   useEffect(() => {
//     isSearchBarOpenCallback(isSearchBarOpen);
//   }, [isSearchBarOpen, isSearchBarOpenCallback]);

//   const IsSearchBarOpenOrClose = () => {
//     // isSearchBarOpenCallback(isSearchBarOpen);
//   };

//   const handleSearch = (text) => {
//     setIsSearchBarOpen(true)
//     setSearchQuery(text);

//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     setFilteredData(filteredData);

//     setIsSearchBarOpen(!!text.trim() && !isItemSelected);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);
//     setIsSearchBarOpen(false);
//     onBlur();
//   };

//   const onBlur = () => {
//     // setIsSearchBarOpen(false);
//   };

//   const handleItemSelect = (item) => {
//     setSearchQuery('');
//     setFilteredData([item]);
//     setIsItemSelected(true);
//     setIsSearchBarOpen(false);
//   };

//   const data = [
//     { id: '1', sender: 'Alice', message: 'Hello, how are you?' },
//     { id: '2', sender: 'Bob', message: 'I\'m doing well, thanks!' },
//     { id: '3', sender: 'Alice', message: 'What\'s new?' },
//     { id: '4', sender: 'Bob', message: 'Not much, just working on some projects.' },
//   ];

//   const [filteredData, setFilteredData] = useState(data);

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//         <TextInput
//           style={styles.input}
//           placeholder="Search..."
//           value={searchQuery}
//           onChangeText={handleSearch}
//           onFocus={() => { setIsSearchBarOpen(true); IsSearchBarOpenOrClose(); }}
//           onBlur={onBlur}
//         />
//         {searchQuery.length > 0 && (
//           <TouchableOpacity onPress={handleClear}>
//             <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//           </TouchableOpacity>
//         )}
//       </View>
//       {searchQuery.length > 0 && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemSelect(item)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}
//       {/* <Text>{isSearchBarOpen ? 'true' : 'false'}</Text> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
// });

// export default SearchBar;

////////////////////////////////////////////////////////////




// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   TextInput,
//   FlatList,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Keyboard,
// } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../styles/responsiveSize';

// const SearchBar = ({ onSearch, onClose }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [data, setData] = useState([
//     {
//       id: '1',
//       sender: 'Alice',
//       message: 'Hello, how are you?',
//     },
//     {
//       id: '2',
//       sender: 'Bob',
//       message: 'I\'m doing well, thanks!',
//     },
//     {
//       id: '3',
//       sender: 'Alice',
//       message: 'What\'s new?',
//     },
//     {
//       id: '4',
//       sender: 'Bob',
//       message: 'Not much, just working on some projects.',
//     },
//   ]);

//   const [filteredData, setFilteredData] = useState(data);
//   const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

//   useEffect(() => {
//     setFilteredData(data); // Initialize filteredData with the original data
//   }, [data]);

//   const handleSearch = (text) => {
//     setSearchQuery(text);

//     // Filter the data based on the search input
//     const filteredData = data.filter(
//       (item) =>
//         item.sender.toLowerCase().includes(text.toLowerCase()) ||
//         item.message.toLowerCase().includes(text.toLowerCase())
//     );
//     // Update the displayed data
//     setFilteredData(filteredData);

//     // Notify the parent component about the search status
//     onSearch && onSearch(text.length > 0);
//   };

//   const handleClear = () => {
//     setSearchQuery('');
//     setFilteredData(data);

//     // Notify the parent component that the search is cleared
//     onSearch && onSearch(false);
//   };

//   const handleItemSelect = (item) => {
//     // Close the search bar and handle the selected item
//     setIsSearchBarOpen(false);
//     onSearch && onSearch(false);
//     console.log(item.message); // Handle the selected item as needed
//   };

//   const handleClose = () => {
//     // Close the search bar and notify the parent component
//     setIsSearchBarOpen(false);
//     onClose && onClose(false);
//     Keyboard.dismiss();
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={() => setIsSearchBarOpen(true)}>
//         <View style={styles.searchBarContainer}>
//           <MaterialCommunityIcons name="magnify" size={24} color="black" style={styles.icon} />
//           <TextInput
//             style={styles.input}
//             placeholder="Search..."
//             value={searchQuery}
//             onChangeText={handleSearch}
//             onFocus={() => setIsSearchBarOpen(true)}
//           />
//           {searchQuery.length > 0 && (
//             <TouchableOpacity onPress={handleClear}>
//               <MaterialCommunityIcons name="close" size={24} color="black" style={styles.icon} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </TouchableOpacity>

//       {isSearchBarOpen && (
//         <FlatList
//           data={filteredData}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <TouchableOpacity onPress={() => handleItemSelect(item)}>
//               <View style={styles.messageContainer}>
//                 <Text style={styles.sender}>{item.sender}</Text>
//                 <Text style={styles.message}>{item.message}</Text>
//               </View>
//             </TouchableOpacity>
//           )}
//         />
//       )}

//       {isSearchBarOpen && (
//         <TouchableOpacity onPress={handleClose}>
//           <MaterialCommunityIcons name="close" size={24} color="black" style={styles.closeIcon} />
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: moderateScale(8),
//   },
//   searchBarContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 2,
//   },
//   input: {
//     flex: 1,
//     fontSize: 18,
//   },
//   icon: {
//     marginHorizontal: 4,
//   },
//   messageContainer: {
//     padding: 8,
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//   },
//   sender: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   message: {
//     fontSize: 18,
//   },
//   closeIcon: {
//     alignSelf: 'flex-end',
//     marginTop: 8,
//     marginRight: 8,
//   },
// });

// export default SearchBar;
