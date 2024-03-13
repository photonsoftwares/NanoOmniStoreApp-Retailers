import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../styles/responsiveSize';
import NoDataFound from '../../../../Components/NoDataFound';
import { FlashList } from "@shopify/flash-list";
import ButtonCompo from '../../../../Components/ButtonCompo';
import { getOrderItemDetailMethod } from '../../../../config/userApiMethods';


const PendingItem = memo(({ item }) => {
  const { user_data } = useSelector((state) => state?.authReducer?.user);
  const { storeId, saasId } = user_data;
  const navigation = useNavigation();
  const dispatch = useDispatch();


  const renderContainer = (title, value) => (
    <View style={styles.ContainerBothView}>
      <Text style={styles.itemTitle}>{title}:</Text>
      <Text style={[styles.itemValue, { fontWeight: '500' }]}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.itemContainer, { elevation: 8 }]}>
      {renderContainer('Order ID', item.order_id)}
      <View style={styles.separator} />
      {renderContainer('Date', item.order_date)}
      <View style={styles.separator} />
      {renderContainer('Name', item.customer_name)}
      <View style={styles.separator} />
      <View style={styles.ContainerBothView}>
        <View style={styles.quantityContainer}>
          <Text style={styles.itemTitle}>Items</Text>
          <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_qty}</Text>

        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.valueContainer}>
          <Text style={styles.itemTitle}>Total Value</Text>
          <Text style={[styles.itemValue, { fontWeight: '500' }]}>{item.order_value}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.processOrderContainer}>
        {/* Add your button component here */}
        <View style={styles.processOrderContainer}>
          <ButtonCompo
            title={'Check Order items'}
            onPress={() => {
              dispatch(getOrderItemDetailMethod(item.order_id));
              navigation.navigate('DeliveredItemDetail', item?.order_id);
            }}
          />
        </View>
      </View>
    </View>
  );
});

const RenderOrderDelivery = () => {
  const { ordersData } = useSelector((state) => state?.orderReducer);
  const deliveredOrders = ordersData.filter((order) => order.status === 'delivered');
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
  const [numColumns] = useState(1);
  const navigation = useNavigation();
  const reversedArray = deliveredOrders.reverse();

// console.log(reversedArray[0])
  return (
    <>
      <HeaderComp screenName={'Delivered Orders'} onBackPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        {deliveredOrders.length !== 0 ? (
          // <FlatList
          //   data={deliveredOrders}
          //   keyExtractor={keyExtractor}
          //   renderItem={renderItem}
          //   numColumns={numColumns}
          //   extraData={numColumns}
          //   contentContainerStyle={styles.flatListContainer}
          // />
          <FlashList
            data={reversedArray}
            // data={deliveredOrders}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={numColumns}
            extraData={numColumns}
            contentContainerStyle={styles.flatListContainer}
            estimatedItemSize={200}
          />
        ) : (
          <NoDataFound
            text={'No Delivered Orders'}
            containerStyle={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}
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
    marginBottom: 4,
    color: '#000',
  },
  itemValue: {
    marginBottom: 8,
    color: '#000',
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
  flatListContainer: {},
});

export default RenderOrderDelivery;