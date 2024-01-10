// import React, { useCallback, memo, useState } from 'react';
// import { View, FlatList, Text, StyleSheet } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useSelector } from 'react-redux';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { useNavigation } from '@react-navigation/native';

// const PendingItem = memo(({ item }) => {
//   return (
//     <View style={[styles.itemContainer, { elevation: 8 }]}>

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Order ID:</Text>
//         <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_id}</Text>
//       </View>

//       <View style={styles.separator} />

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Date:</Text>
//         <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_date}</Text>
//       </View>

//       <View style={styles.separator} />

//       <View style={styles.ContainerBothView}>
//         <Text style={styles.itemTitle}>Name:</Text>
//         <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.customer_name}</Text>
//       </View>

//       <View style={styles.separator} />

//       <View style={styles.ContainerBothView}>
//         <View style={styles.quantityContainer}>
//           <Text style={styles.itemTitle}>Quantity:</Text>
//           <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_qty}</Text>
//         </View>
//         <View style={styles.verticalSeparator} />
//         <View style={styles.valueContainer}>
//           <Text style={styles.itemTitle}>Value:</Text>
//           <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_value}</Text>
//         </View>
//       </View>

//       <View style={styles.separator} />

//       <View style={styles.processOrderContainer}>
//         <ButtonCompo title={'Process Order'} />
//       </View>

//     </View>
//   );
// });

// const RenderOrderReturn = () => {
//   const navigation = useNavigation()
//   const keyExtractor = useCallback((item, index) => index.toString(), []);
//   const [numColumns, setNumColumns] = useState(1);
//   const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
//   const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
//   const pendingOrders = ordersData.filter(order => order.status === "PENDING");

//   return (
//     <>
//       <HeaderComp screenName={'Return Orders'} onBackPress={() => navigation.goBack()} />

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
//     marginBottom: 4,
//   },
//   itemValue: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   ContainerBothView: {
//     width: '100%',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     paddingHorizontal: moderateScale(8),
//     paddingVertical: moderateScale(4),
//   },
//   separator: {
//     width: '100%',
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   verticalSeparator: {
//     width: 1,
//     height: '100%',
//     backgroundColor: '#ccc',
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





// export default RenderOrderReturn




// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const RenderOrderReturn = () => {
//   return (
//     <View>
//       <Text>RenderOrderReturn</Text>
//     </View>
//   )
// }

// export default RenderOrderReturn

// const styles = StyleSheet.create({})



import { StyleSheet, Text, View, FlatList } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import HeaderComp from '../../../../Components/HeaderCompo'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../styles/responsiveSize';
import ButtonCompo from '../../../../Components/ButtonCompo';
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
        {/* <ButtonCompo title={'Process Order'}
          onPress={() => {
            dispatch(OrderViewOneMethod(storeId, saasId, item.order_id))
            navigation.navigate('PendingItemWithUserDetails', item.order_id)

          }
          }
        /> */}
      </View>

    </View>
  );
});


const RenderOrderReturn = () => {
  const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
  const deliveredReturn = ordersData.filter(order => order.status === "return");
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
  const [numColumns, setNumColumns] = useState(1);
  const navigation = useNavigation()





  // console.log("first", deliveredReturn?.length)
  // const s = []
  return (
    <>
      <HeaderComp screenName={'Return Orders'} onBackPress={() => navigation.goBack()} />
      <View style={{  flex: 1 }}>

        {
          deliveredReturn.length !== 0 ?
            <>
              <FlatList
                data={deliveredReturn}
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
                text={'No Return Orders'}
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

  )
}

export default RenderOrderReturn

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
    // fontSize: 16,
    marginBottom: 4,
    color: '#000'
  },
  itemValue: {
    // fontSize: 16,
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
  },
});

