// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useSelector } from 'react-redux';

// const DeliveredItemDetail = () => {
//     const { deliverditemdetails } = useSelector((state) => state?.orderReducer);


//     console.log("deliverditemdetails",deliverditemdetails)
//   return (
//     <View>
//       <Text>DeliveredItemDetail</Text>
//     </View>
//   )
// }

// export default DeliveredItemDetail

// const styles = StyleSheet.create({})



// import React, { useCallback } from 'react';
// import { View, Text } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// const OrderItem = React.memo(({ order }) => {
//   const renderOrderDetails = useCallback(() => {
//     // Your rendering logic for order details
//     return (
//       <View>
//         <Text>Order ID: {order.order_id}</Text>
//         <Text>Item Name: {order.item_name}</Text>
//         {/* Add other details as needed */}
//       </View>
//     );
//   }, [order]);

//   return (
//     <View>
//       {renderOrderDetails()}
//       {/* Add other components or details as needed */}
//     </View>
//   );
// });

// const OrdersList = React.memo(({ orders }) => {
//   return (
//     <View>
//       {orders.map((order) => (
//         <OrderItem key={order.order_id} order={order} />
//       ))}
//     </View>
//   );
// });

// const DeliveredItemDetail = () => {
//     const navigation=useNavigation()
//     const { deliverditemdetails } = useSelector((state) => state?.orderReducer);



//   return (
//     <>
//       <HeaderComp screenName={'Delivered Items'} onBackPress={() => navigation.goBack()} />


//     <OrdersList orders={deliverditemdetails} />
//     </>
//   );
// };

// export default DeliveredItemDetail;




//opt


// import React, { useCallback } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { useSelector } from 'react-redux';

// const styles = StyleSheet.create({
//     orderItemContainer: {
//         marginBottom: 16,
//         padding: 16,
//         // borderWidth: 1,
//         // borderColor: '#ccc',
//         borderRadius: 8,
//         elevation:4,
//         backgroundColor:"#fff"
//     },
//     orderIdText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     itemNameText: {
//         fontSize: 14,
//         marginTop: 8,
//     },
//     itemDetailsText: {
//         fontSize: 12,
//         marginTop: 4,
//         color: '#888',
//     },
// });

// const OrderItem = React.memo(({ order }) => {
//     const renderOrderDetails = useCallback(() => {
//         // Your rendering logic for order details
//         return (
//             <View style={styles.orderItemContainer}>
//                 <Text style={styles.orderIdText}>Order ID: {order.order_id}</Text>
//                 <Text style={styles.itemNameText}>Item Name: {order.item_name}</Text>
//                 <Text style={styles.itemDetailsText}>Item Quantity: {order.item_qty}</Text>
//                 <Text style={styles.itemDetailsText}>Item Price: ${order.item_price}</Text>
//                 <Text style={styles.itemDetailsText}>Category: {order.category}</Text>
//                 <Text style={styles.itemDetailsText}>Item ID: {order.item_id}</Text>
//                 {/* Add other details as needed */}
//             </View>
//         );
//     }, [order]);

//     return <View>{renderOrderDetails()}</View>;
// });

// const OrdersList = React.memo(({ orders }) => {
//     return (
//         <View>
//             {orders.map((order) => (
//                 <OrderItem key={order.order_id} order={order} />
//             ))}
//         </View>
//     );
// });

// const DeliveredItemDetail = () => {
//     const navigation = useNavigation();
//     const { deliverditemdetails } = useSelector((state) => state?.orderReducer);

//     return (
//         <>
//             <HeaderComp screenName={'Delivered Items'} onBackPress={() => navigation.goBack()} />

//             <View style={{margin:16,backgroundColor:"#fff"}}>

//                 <OrdersList orders={deliverditemdetails} />
//             </View>
//         </>
//     );
// };

// export default DeliveredItemDetail;





///

import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';

const styles = StyleSheet.create({
  orderItemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: '#fff',
  },
  orderIdText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemNameText: {
    fontSize: 14,
    marginTop: 8,
  },
  itemDetailsText: {
    fontSize: 12,
    marginTop: 4,
    color: '#888',
  },
});

const OrderItem = React.memo(({ order }) => {
  const renderOrderDetails = useCallback(() => {
    return (
      <View style={styles.orderItemContainer}>
        {/* <Text style={styles.itemDetailsText}>Order ID: {order.order_id}</Text> */}
        <Text style={[styles.itemNameText,{fontWeight:'bold'}]}>Item ID: {order.item_id}</Text>
        <Text style={styles.itemDetailsText}>Item Name: {order.item_name}</Text>
        <Text style={styles.itemDetailsText}>Item Quantity: {order.item_qty}</Text>
        <Text style={styles.itemDetailsText}>Item Price: ₹{order.item_price}</Text>
        {/* <Text style={styles.itemDetailsText}>Category: {order.category}</Text> */}
      </View>
    );
  }, [order]);

  return <>{renderOrderDetails()}</>;
});

const DeliveredItemDetail = () => {
  const navigation = useNavigation();
  const { deliverditemdetails } = useSelector((state) => state?.orderReducer);
  const keyExtractor = (item,index) => index;

  const renderItem = ({ item }) => <OrderItem order={item} />;

  return (
    <>
      <HeaderComp screenName={'Delivered Items'} onBackPress={() => navigation.goBack()} />

      <FlashList
        data={deliverditemdetails}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, }}
        estimatedItemSize={200}

      />
    </>
  );
};

export default DeliveredItemDetail;


