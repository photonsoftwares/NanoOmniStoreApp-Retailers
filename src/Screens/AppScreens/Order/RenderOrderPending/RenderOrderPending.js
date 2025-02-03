import React, { memo, useCallback, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../../../../Components/HeaderCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { moderateScale } from '../../../../styles/responsiveSize';
import { OrderViewOneMethod } from '../../../../config/userApiMethods';
import NoDataFound from '../../../../Components/NoDataFound';
import { FlashList } from "@shopify/flash-list";


const PendingItem = memo(({ item }) => {
  const navigation = useNavigation();
  const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
  const dispatch = useDispatch();



  const renderContainer = (title, value) => (
    <View style={styles.ContainerBothView}>
      <Text style={styles.itemTitle}>{title}:</Text>
      <Text style={[styles.itemValue, { fontWeight: '500' }]}>{value}</Text>
    </View>
  );

  // console.log("item",item)
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
          <Text style={styles.itemTitle}>Payment</Text>
          <Text style={[styles.itemValue, { fontWeight: '500', backgroundColor: 'green', padding: 4, color: '#fff', borderRadius: 4 }]}>{item.payment_type}</Text>
        </View>

        <View style={styles.verticalSeparator} />
        <View style={styles.valueContainer}>
          <Text style={styles.itemTitle}>Total Value</Text>
          <Text style={[styles.itemValue, { fontWeight: '500' }]}>₹{item?.order_value}</Text>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.processOrderContainer}>
        <ButtonCompo
          title={'Process Order'}
          onPress={() => {
            dispatch(OrderViewOneMethod(storeId, saasId, item.order_id));
            navigation.navigate('PendingItemWithUserDetails',
              {
                order_id: item?.order_id,
                order_date: item?.order_date,
                orderMobileNumber: item?.customer_name
              }
            );
          }}
        />
      </View>
    </View>
  );
});

const RenderOrderPending = () => {
  const navigation = useNavigation();
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const [numColumns, setNumColumns] = useState(1);
  const renderItem = useCallback(({ item }) => <PendingItem item={item} />, []);
  const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer);
  const pendingOrders = ordersData.filter(order => order.status === 'PENDING');


  console.log("pendingOrders", pendingOrders[0])
  return (
    <>
      <HeaderComp screenName={'Pending Ordes'} onBackPress={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        {pendingOrders.length !== 0 ? (
          <FlashList
            data={pendingOrders.reverse()}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={numColumns}
            extraData={numColumns}
            contentContainerStyle={styles.flatListContainer}
            estimatedItemSize={200}
          />


        ) : (
          <NoDataFound
            text={'No Pending Orders'}
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
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  itemValue: {
    fontSize: 16,
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

export default RenderOrderPending;
