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
        {/* <Text style={styles.itemDetailsText}>Item Quantity: {order.item_qty}</Text> */}
        <Text style={styles.itemDetailsText}>Item Quantity: {order.bill_qty}</Text>
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


  // console.log("first",deliverditemdetails)
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


