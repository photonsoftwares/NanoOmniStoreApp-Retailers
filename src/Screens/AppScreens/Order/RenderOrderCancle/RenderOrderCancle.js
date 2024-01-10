// import React, { useCallback, memo, useState } from 'react';
// import { View, FlatList, Image, Text, StyleSheet } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import ImagePath from '../../../../constants/ImagePath';
// import HeaderComp from '../../../../Components/HeaderCompo';
// // import ImagePath from '../../../constants/ImagePath';

// const pendingItemsData = [
//     {
//         id: '1',
//         title: 'Item 1',
//         image: ImagePath.JennyWilson,
//         address: '123 Main St, Cityville, 56789',
//         deliveryDate: '2023-12-01',
//         deliveryTime: '10:00 AM',
//         elevation: 5,
//     },
//     {
//         id: '2',
//         title: 'Item 2',
//         image: ImagePath.JennyWilson,
//         address: '456 Elm St, Townsville, 34567',
//         deliveryDate: '2023-12-02',
//         deliveryTime: '2:30 PM',
//         elevation: 10,
//     },
//     {
//         id: '3',
//         title: 'Item 3',
//         image: ImagePath.JennyWilson,
//         address: '789 Oak St, Villagetown, 12345',
//         deliveryDate: '2023-12-03',
//         deliveryTime: '6:45 PM',
//         elevation: 10,
//     },
//     {
//         id: '3',
//         title: 'Item 3',
//         image: ImagePath.JennyWilson,
//         address: '789 Oak St, Villagetown, 12345',
//         deliveryDate: '2023-12-03',
//         deliveryTime: '6:45 PM',
//         elevation: 10,
//     },
//     // Add more pending items as needed
// ];

// const PendingItem = memo(({ item }) => {
//     return (
//         <View style={[styles.itemContainer, { elevation: item.elevation }]}>
//             <Image source={item.image} style={styles.itemImage} />
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <View style={styles.addressContainer}>
//                 <MaterialCommunityIcons name="map-marker" size={20} color="black" />
//                 <Text style={styles.addressText}>{item.address}</Text>
//             </View>
//             <View style={styles.deliveryInfoContainer}>
//                 <MaterialCommunityIcons name="calendar" size={20} color="black" />
//                 <Text style={styles.deliveryText}>
//                     {item.deliveryDate} {item.deliveryTime}
//                 </Text>
//             </View>
//         </View>
//     );
// });

// const RenderOrderCancle = () => {
//     const keyExtractor = useCallback((item) => item.id, []);
//     const [numColumns, setNumColumns] = useState(2);

//     const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);

//     return (
//         <>
//             <HeaderComp
//                 screenName={'Cancle Orders'}
//             />
//             <FlatList
//                 data={pendingItemsData}
//                 keyExtractor={keyExtractor}
//                 renderItem={renderItem}
//                 horizontal={false}
//                 numColumns={numColumns}
//                 extraData={numColumns} // Ensure a re-render when numColumns changes
//             />
//         </>

//     );
// };

// const styles = StyleSheet.create({
//     itemContainer: {
//         flex: 1,
//         margin: 8,
//         borderRadius: 8,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//         padding: 16,
//     },
//     itemImage: {
//         width: 150,
//         height: 150,
//         resizeMode: 'cover',
//         marginBottom: 8,
//     },
//     itemTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     addressContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 4,
//     },
//     addressText: {
//         marginLeft: 8,
//         flex: 1,
//     },
//     deliveryInfoContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 4,
//     },
//     deliveryText: {
//         marginLeft: 8,
//     },
// });

// export default RenderOrderCancle



// import React, { useCallback, memo, useState } from 'react';
// import { View, FlatList, Text, StyleSheet } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useSelector } from 'react-redux';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { useNavigation } from '@react-navigation/native';

// const PendingItem = memo(({ item }) => {
//     return (
//         <View style={[styles.itemContainer, { elevation: 8 }]}>

//             <View style={styles.ContainerBothView}>
//                 <Text style={styles.itemTitle}>Order ID:</Text>
//                 <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_id}</Text>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.ContainerBothView}>
//                 <Text style={styles.itemTitle}>Date:</Text>
//                 <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_date}</Text>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.ContainerBothView}>
//                 <Text style={styles.itemTitle}>Name:</Text>
//                 <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.customer_name}</Text>
//             </View>

//             <View style={styles.separator} />

//             <View style={styles.ContainerBothView}>
//                 <View style={styles.quantityContainer}>
//                     <Text style={styles.itemTitle}>Quantity:</Text>
//                     <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_qty}</Text>
//                 </View>
//                 <View style={styles.verticalSeparator} />
//                 <View style={styles.valueContainer}>
//                     <Text style={styles.itemTitle}>Value:</Text>
//                     <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_value}</Text>
//                 </View>
//             </View>

//             <View style={styles.separator} />
//             <View style={styles.processOrderContainer}>
//                 <ButtonCompo title={'Process Order'} />
//             </View>

//         </View>
//     );
// });

// const RenderOrderCancle = () => {
//     const navigation = useNavigation()
//     const keyExtractor = useCallback((item, index) => index.toString(), []);
//     const [numColumns, setNumColumns] = useState(1);
//     const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
//     const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
//     const pendingOrders = ordersData.filter(order => order.status === "PENDING");

//     return (
//         <>
//             <HeaderComp screenName={'Cancle Orders'} onBackPress={() => navigation.goBack()} />
//             <FlatList
//                 data={pendingOrders}
//                 keyExtractor={keyExtractor}
//                 renderItem={renderItem}
//                 numColumns={numColumns}
//                 extraData={numColumns} // Ensure a re-render when numColumns changes
//                 contentContainerStyle={styles.flatListContainer}
//             />
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     itemContainer: {
//         flex: 1,
//         margin: 8,
//         borderRadius: 8,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'white',
//     },
//     itemTitle: {
//         fontWeight: 'bold',
//         fontSize: 16,
//         marginBottom: 4,
//     },
//     itemValue: {
//         fontSize: 16,
//         marginBottom: 8,
//     },
//     ContainerBothView: {
//         width: '100%',
//         justifyContent: 'space-between',
//         flexDirection: 'row',
//         paddingHorizontal: moderateScale(8),
//         paddingVertical: moderateScale(4),
//     },
//     separator: {
//         width: '100%',
//         height: 1,
//         backgroundColor: '#ccc',
//     },
//     verticalSeparator: {
//         width: 1,
//         height: '100%',
//         backgroundColor: '#ccc',
//     },
//     quantityContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     valueContainer: {
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     processOrderContainer: {
//         alignSelf: 'center',
//         width: '100%',
//         marginTop: 16,
//     },
//     flatListContainer: {
//         paddingVertical: 16,
//     },
// });

// export default RenderOrderCancle





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


const RenderOrderCancle = () => {
  const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
  const cancelOrders = ordersData.filter(order => order.status === "cancel");
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
  const [numColumns, setNumColumns] = useState(1);
  const navigation = useNavigation()





  // console.log("first", deliveredOrders?.length)
  const s = []

  return (
    <>
      <HeaderComp screenName={'Cancel Orders'} onBackPress={() => navigation.goBack()} />
      <View style={{  flex: 1 }}>
        {
          cancelOrders.length !== 0 ?
            <>
              <FlatList
                data={cancelOrders}
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
                text={'No Cancel Orders'}
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

export default RenderOrderCancle

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

