// import React, { useCallback, memo, useState } from 'react';
// import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useSelector } from 'react-redux';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import ButtonCompo from '../../../../Components/ButtonCompo';


// const PendingItem = memo(({ item }) => {
//   return (
//     <View style={[styles.itemContainer, { elevation: 8 }]}>

//       <View style={[, styles.ContainerBothView, {}]}>
//         <Text style={styles.itemTitle}>OrderId-</Text>
//         <Text style={[styles.itemTitle,{fontWeight:'500'}]}>{item.order_id}</Text>
//       </View>

//       <View style={[, styles.ContainerBothView, {}]}>
//         <Text style={styles.itemTitle}>Date-</Text>
//         <Text style={[styles.itemTitle,{fontWeight:'500'}]}>{item.order_date}</Text>
//       </View>

//       <View style={[, styles.ContainerBothView, {}]}>
//         <Text style={styles.itemTitle}>Name-</Text>
//         <Text style={[styles.itemTitle,{fontWeight:'500'}]}>{item.customer_name}</Text>
//       </View>

//       <View style={[, styles.ContainerBothView, {backgroundColor:'red'}]}>
//         <View>
//           <Text style={styles.itemTitle}>Quantity-</Text>
//           <Text style={[styles.itemTitle, { alignSelf: 'center',fontWeight:'500' }]}>{item.order_qty}</Text>
//         </View>
//         <View>
//           <Text style={styles.itemTitle}>Value</Text>
//           <Text style={[styles.itemTitle, { alignSelf: 'center',fontWeight:'500' }]}>{item.order_value}</Text>
//         </View>
//       </View>


//       <View style={[{alignSelf:'center',width:'100%',flex:1}]}>
//         <ButtonCompo
//           title={'Process Order'}
//         />
//       </View>


//     </View>
//   );
// });

// const RenderOrderPending = () => {
//   const keyExtractor = useCallback((item) => item.id, []);
//   const [numColumns, setNumColumns] = useState(2);
//   const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
//   const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer)
//   // console.log("ordersData", ordersData.length)
//   const pendingOrders = ordersData.filter(order => order.status === "PENDING");
//   console.log("pendingOrders", pendingOrders)



//   return (
//     <>
//       <HeaderComp
//         screenName={'Pending Orders'}
//       />
//       <FlatList
//         data={pendingOrders}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         horizontal={false}
//         numColumns={numColumns}
//         extraData={numColumns} // Ensure a re-render when numColumns changes
//       />
//     </>

//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flex: 1,
//     margin: 8,
//     borderRadius: 8,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     // backgroundColor: 'grey',
//     // padding: 16,
//   },
//   itemImage: {
//     width: 150,
//     height: 150,
//     resizeMode: 'cover',
//     marginBottom: 8,
//   },
//   itemTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   addressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   addressText: {
//     marginLeft: 8,
//     flex: 1,
//   },
//   deliveryInfoContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   deliveryText: {
//     marginLeft: 8,
//   },
//   ContainerBothView: {
//     // flex: 1,
//     //  backgroundColor: 'pink',
//     width: '100%',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     // margin: moderateScale(4)
//     paddingHorizontal:moderateScale(8)
//   }
// });

// export default RenderOrderPending









// import React, { useCallback, memo, useState } from 'react';
// import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useSelector } from 'react-redux';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import ButtonCompo from '../../../../Components/ButtonCompo';

// const PendingItem = memo(({ item }) => {
//   return (
//     <View style={[styles.itemContainer, { elevation: 8 }]}>

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Order ID:</Text>
//         <Text style={[styles.itemTitle, { fontWeight: '500' }]}>{item.order_id}</Text>
//       </View>

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Date:</Text>
//         <Text style={[styles.itemTitle, { fontWeight: '500' }]}>{item.order_date}</Text>
//       </View>

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Name:</Text>
//         <Text style={[styles.itemTitle, { fontWeight: '500' }]}>{item.customer_name}</Text>
//       </View>

//       <View style={[styles.ContainerBothView, {  }]}>
//         <View style={styles.quantityContainer}>
//           <Text style={styles.itemTitle}>Quantity:</Text>
//           <Text style={[styles.itemTitle, { alignSelf: 'center', fontWeight: '500' }]}>{item.order_qty}</Text>
//         </View>
//         <View style={styles.valueContainer}>
//           <Text style={styles.itemTitle}>Value:</Text>
//           <Text style={[styles.itemTitle, { alignSelf: 'center', fontWeight: '500' }]}>{item.order_value}</Text>
//         </View>
//       </View>

//       <View style={styles.processOrderContainer}>
//         <ButtonCompo title={'Process Order'} />
//       </View>

//     </View>
//   );
// });

// const RenderOrderPending = () => {
//   const keyExtractor = useCallback((item,index) => index.toString(), []);
//   const [numColumns, setNumColumns] = useState(1);
//   const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
//   const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
//   const pendingOrders = ordersData.filter(order => order.status === "PENDING");

//   return (
//     <>
//       <HeaderComp screenName={'Pending Orders'} />
//       <FlatList
//         data={pendingOrders}
//         keyExtractor={keyExtractor}
//         renderItem={renderItem}
//         numColumns={numColumns}
//         extraData={numColumns} // Ensure a re-render when numColumns changes
//         contentContainerStyle={styles.flatListContainer}
//       />
//     </>

//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     flex: 1,
//     margin: 8,
//     borderRadius: 8,
//     overflow: 'hidden',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   itemTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   ContainerBothView: {
//     width: '100%',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     paddingHorizontal: moderateScale(8),
//   },
//   quantityContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   valueContainer: {
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
//   processOrderContainer: {
//     alignSelf: 'center',
//     width: '100%',
//     marginTop: 16,
//   },
//   flatListContainer: {
//     paddingVertical: 16,
//   },
// });

// export default RenderOrderPending;



import React, { useCallback, memo, useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from '../../../../styles/responsiveSize';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { useNavigation, } from '@react-navigation/native';
import { OrderViewOneMethod } from '../../../../config/userApiMethods';
import PendingItemWithUserDetails from './PendingItemWithUserDetails/PendingItemWithUserDetails';
import NoDataFound from '../../../../Components/NoDataFound';

const PendingItem = memo(({ item }) => {
  const navigation = useNavigation()
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const dispatch = useDispatch()

  return (
    <View style={[styles.itemContainer, { elevation: 8, }]}>

      <View style={styles.ContainerBothView}>
        <Text style={styles.itemTitle}>Order ID:</Text>
        <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_id}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.ContainerBothView}>
        <Text style={styles.itemTitle}>Date:</Text>
        <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_date}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.ContainerBothView}>
        <Text style={styles.itemTitle}>Name:</Text>
        <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.customer_name}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.ContainerBothView}>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemTitle}>Quantity:</Text>
          <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_qty}</Text>
        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.valueContainer}>
          <Text style={styles.itemTitle}>Value:</Text>
          <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_value}</Text>
          {/* <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_id}</Text> */}
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.processOrderContainer}>
        <ButtonCompo title={'Process Order'}
          onPress={() => {
            dispatch(OrderViewOneMethod(storeId, saasId, item.order_id))
            navigation.navigate('PendingItemWithUserDetails', item?.order_id)

          }
          }
        />
      </View>

    </View>
  );
});

const RenderOrderPending = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const [numColumns, setNumColumns] = useState(1);
  const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
  const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
  const pendingOrders = ordersData.filter(order => order.status === "PENDING");

  // console.log("<>", pendingOrders)

  // console.log(pendingOrders[0])
  // useEffect(() => {
  //   dispatch(OrderViewOneMethod(storeId, saasId, '19866'))
  // }, [])

  // console.log(pendingOrders[0])
  const s = []

  return (
    <>
      <HeaderComp screenName={'Pending Orders'} onBackPress={() => navigation.goBack()} />

      <View style={{  flex: 1 }}>

        {
          pendingOrders.length !== 0 ?
            <>
              <FlatList
                data={pendingOrders}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                numColumns={numColumns}
                extraData={numColumns} // Ensure a re-render when numColumns changes
                contentContainerStyle={styles.flatListContainer}
              />
            </>
            :
            <>
              <NoDataFound
                text={'No Pending Orders'}
                containerStyle={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',

                }}
              />
            </>
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#000'

  },
  itemValue: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000'

  },
  ContainerBothView: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
  verticalSeparator: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
  },
  quantityContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  valueContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  processOrderContainer: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 16,
  },
  flatListContainer: {
    // paddingVertical: 16,
    // backgroundColor: "#fff"
  },
});

export default RenderOrderPending;
