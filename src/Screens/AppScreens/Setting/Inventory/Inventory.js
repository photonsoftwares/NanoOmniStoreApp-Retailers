// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SalesReport from '../Dashboard/Sales/SalesReport/SalesReport';
// import SalesSummary from '../Dashboard/Sales/SalesSummary/SalesSummary';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import RecommendedInventory from './RecommendedInventory';
// import { scale, width } from '../../../../styles/responsiveSize';
// import CategoryInventory from './CategoryInventory';


// const Inventory = () => {
//   const [selectedTab, setSelectedTab] = useState('Tab1');
//   const navigation = useNavigation()
//   const dispatch = useDispatch()

//   const handleTabPress = (tab) => {
//     setSelectedTab(tab);
//   };

//   const renderScreen = () => {
//     switch (selectedTab) {
//       case 'Tab1':
//         return <CategoryInventory />;
//         case 'Tab2':
//           return <RecommendedInventory />;
//       default:
//         return null;
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <HeaderComp screenName={'Inventory'} onBackPress={() => navigation.goBack()}
//         // showInventory={true}
//       />

//       <View style={styles.tabsContainer}>
//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'Tab1' && styles.selectedTab]}
//           onPress={() => handleTabPress('Tab1')}
//         >
//           {/* <MaterialCommunityIcons
//             name={selectedTab === 'Tab1' ? 'book-open' : 'book-open'}
//             size={24}
//             color={selectedTab === 'Tab1' ? '#3498db' : '#bdc3c7'}
//           /> */}
//           <Text style={[styles.tabText, { backgroundColor: selectedTab === 'Tab1' ? '#ECE447' : '#bdc3c7' }]}>Category</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tab, selectedTab === 'Tab2' && styles.selectedTab]}
//           onPress={() => handleTabPress('Tab2')}
//         >
//           {/* <MaterialCommunityIcons
//             name={selectedTab === 'Tab2' ? 'book-open' : 'book-open'}
//             size={24}
//             color={selectedTab === 'Tab2' ? '#3498db' : '#bdc3c7'}
//           /> */}
//           <Text style={[styles.tabText, { backgroundColor: selectedTab === 'Tab2' ? '#ECE447' : '#bdc3c7' }]}>Recommended</Text>
//         </TouchableOpacity>
//       </View>
//       {renderScreen()}

//     </View>
//   )
// }

// export default Inventory

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff'
//   },
//   tabsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#ecf0f1',
//     padding: 10,
//     justifyContent: 'space-around'
//   },
//   tab: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'row',
//     // padding: 10,
//     // backgroundColor:'red'
//   },
//   tabText: {
//     marginLeft: 8,
//     color: "#000",
//     padding: scale(8),
//     borderRadius: 8,
//     fontWeight: '600',
//     width: width / 3,
//     alignSelf: 'center',
//     textAlign: 'center'

//   },
// })









/////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
// import { BASE_URL } from '../../../../config/Base_Url';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetInventoryMethod } from '../../../../config/userApiMethods';

// const Inventory = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState([]);
//   const dispatch = useDispatch()
//   const { inventory, inventoryCurrentPage, inventoryTotalPages } = useSelector((state) => state?.inventoryReducer)

//   // console.log("invenory", inventory, inventoryCurrentPage, inventoryTotalPages)

//   useEffect(() => {
//     const fetchInventory = async () => {
//       setLoading(true)

//       await dispatch(GetInventoryMethod())
//       setLoading(false);

//     };

//     fetchInventory();
//   }, []);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // if (error) {
//   //   return (
//   //     <View style={styles.centered}>
//   //       <Text style={styles.errorText}>{error}</Text>
//   //     </View>
//   //   );
//   // }

//   return (
//     <View style={styles.container}>
//       {data.length > 0 ? (
//         inventory.map((item, index) => (
//           <View key={index} style={styles.item}>
//             <Text>{item.item_name}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>No inventory items found.</Text>
//       )}

//       <Button title='das' onPress={() => dispatch(GetInventoryMethod())} />
//     </View>
//   );
// };

// export default Inventory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });






/////////////


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetInventoryMethod } from '../../../../config/userApiMethods';

// const Inventory = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const { inventory, inventoryCurrentPage, inventoryTotalPages } = useSelector((state) => state?.inventoryReducer);

//   useEffect(() => {
//     const fetchInventory = async () => {
//       setLoading(true);
//       try {
//         await dispatch(GetInventoryMethod());
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, [dispatch]);

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {inventory && inventory.length > 0 ? (
//         inventory.map((item, index) => (
//           <View key={index} style={styles.item}>
//             <Text>{item.item_name}</Text>
//             <Text>Opening Qty:-{item?.opening_qty}</Text>
//             <Text>Closing Qty:-{item?.closing_qty}</Text>
//           </View>
//         ))
//       ) : (
//         <Text>No inventory items found.</Text>
//       )}
//       <Button title='Refresh' onPress={() => dispatch(GetInventoryMethod())} />
//     </View>
//   );
// };

// export default Inventory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
// });





//////////////


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { GetInventoryMethod } from '../../../../config/userApiMethods';
// import { FlashList } from '@shopify/flash-list';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { scale } from '../../../../styles/responsiveSize';

// const Inventory = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const navigation = useNavigation()
//   const { inventory, inventoryCurrentPage } = useSelector((state) => state?.inventoryReducer);

//   useEffect(() => {
//     const fetchInventory = async () => {
//       setLoading(true);
//       try {
//         await dispatch(GetInventoryMethod());
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchInventory();
//   }, [dispatch]);

//   const loadMoreInventory = async () => {
//     // if (inventoryCurrentPage <= inventoryTotalPages) {
//     try {
//       await dispatch(GetInventoryMethod(true));
//     } catch (err) {
//       setError(err.message);
//     }
//     // }
//   };

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text style={[styles.title, { fontSize: scale(16), fontWeight: 'bold' }]}>{item.item_name}</Text>
//       <Text style={styles.title}>Opening Qty: {item?.opening_qty}</Text>
//       <Text style={styles.title}>Closing Qty: {item?.closing_qty}</Text>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centered}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.centered}>
//         <Text style={styles.errorText}>{error}</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container, { padding: -16 }]}>
//       <HeaderComp
//         screenName='Inventory'
//         onBackPress={() => navigation.goBack()}
//       />
//       <View style={styles.container}>
//         {inventory && inventory.length > 0 ? (
//           <FlashList
//             data={inventory}
//             renderItem={renderItem}
//             keyExtractor={(item) => item.item_id}
//             estimatedItemSize={100}
//             showsVerticalScrollIndicator={false}
//             onEndReached={loadMoreInventory}
//             onEndReachedThreshold={0.5}

//           />
//         ) : (
//           <Text>No inventory items found.</Text>
//         )}
//         <Button title="Refresh" onPress={() => dispatch(GetInventoryMethod())} />
//       </View>
//     </View>
//   );
// };

// export default Inventory;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   centered: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     color: 'red',
//   },
//   item: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   title: {
//     color: '#000'
//   }
// });

















//////////////////////



import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GetInventoryMethod } from '../../../../config/userApiMethods';
import { FlashList } from '@shopify/flash-list';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { scale } from '../../../../styles/responsiveSize';

const Inventory = () => {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { inventory, inventoryCurrentPage, inventoryTotalPages } = useSelector((state) => state?.inventoryReducer);

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true);
      try {
        await dispatch(GetInventoryMethod());
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchInventory();
  }, [dispatch]);

  const loadMoreInventory = async () => {
    if (inventoryCurrentPage <= inventoryTotalPages && !loadingMore) {
      setLoadingMore(true);
      try {
        await dispatch(GetInventoryMethod(true));
        setLoadingMore(false);
      } catch (err) {
        setError(err.message);
        setLoadingMore(false);
      }
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={[styles.title, { fontSize: scale(16), fontWeight: 'bold' }]}>{item.item_name}</Text>
      <Text style={styles.title}>Opening Qty: {item?.opening_qty}</Text>
      <Text style={styles.title}>Closing Qty: {item?.closing_qty}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }


  console.log("inventory",inventory[0])
  return (
    <View style={[styles.container, { padding: -16 }]}>
      <HeaderComp
        screenName='Inventory'
        onBackPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        {inventory && inventory.length > 0 ? (
          <FlashList
            data={inventory}
            renderItem={renderItem}
            keyExtractor={(item) => item.item_id}
            estimatedItemSize={100}
            showsVerticalScrollIndicator={false}
            onEndReached={loadMoreInventory}
            onEndReachedThreshold={0.5}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <Text>No inventory items found.</Text>
        )}
        {/* <Button title="Refresh" onPress={() => dispatch(GetInventoryMethod())} /> */}
      </View>
    </View>
  );
};

export default Inventory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    paddingVertical: 20,
  },
  errorText: {
    color: 'red',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    color: '#000',
  },
});
