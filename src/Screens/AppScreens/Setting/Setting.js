import React, { useCallback, memo, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, textScale } from '../../../styles/responsiveSize';
import HeaderComp from '../../../Components/HeaderCompo';
import Products from '../Products/Products';
import Dashboard from './Dashboard/Dashboard';
import ExtraCharges from './Dashboard/ExtraCharges/ExtraCharges';
import Test1 from '../../Test/Test1';
import { GetDelivryChargesMethod, GetMinOrderValueMethod } from '../../../config/userApiMethods';
import Addstore from './Dashboard/Store/Addstore';

const orderStatusData = [
  { id: '1', status: 'Dashboard', elevation: 5, screen: Dashboard },
  { id: '2', status: 'Product', elevation: 10, screen: Products },
  // { id: '3', status: 'Category', elevation: 15, screen: Test1 },
  // { id: '4', status: 'Customer', elevation: 5, screen: Test1 },
  // { id: '5', status: 'Silai Center', elevation: 5, screen: Test1 },
  // { id: '6', status: 'Delivery Setting', elevation: 5, screen: Test1 },
  // { id: '7', status: 'Discounts & Coupons', elevation: 5, screen: Test1 },
  // { id: '8', status: 'Payment Gateways', elevation: 5, screen: Test1 },
  // { id: '9', status: 'Digital Marketing', elevation: 5, screen: Test1 },
  { id: '10', status: 'Extra Charges', elevation: 5, screen: ExtraCharges },
  { id: '11', status: 'Add Store Details', elevation: 5, screen: Addstore },
  // Add more order statuses as needed
];



const OrderStatusItem = memo(({ orderStatus }) => {
  const navigation = useNavigation()
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  return (
    <TouchableOpacity activeOpacity={2} style={styles.itemContainer}>
      <View style={[styles.serviceContainer, { elevation: orderStatus.elevation }]}>
        <Text style={styles.serviceName}>{orderStatus.status}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(orderStatus.screen)}>
          {/* <TouchableOpacity onPress={() => navigation.navigate()}> */}

          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});

const Setting = () => {
  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(({ item }) => <OrderStatusItem orderStatus={item} />, []);
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer)

  useEffect(() => {
    if (storeId === '30001') {
      orderStatusData.push({ id: '5', status: 'Silai Center', elevation: 5, screen: Products });
    }
  }, [storeId]);

  useEffect(() => {
    dispatch(GetMinOrderValueMethod())
    dispatch(GetDelivryChargesMethod())
  }, []);


  return (
    <>
      <View >
        <HeaderComp
          screenName='Manage'
          onBackPress={() => navigation.goBack()}

        />
        <FlatList
          data={orderStatusData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal={false}
          contentContainerStyle={styles.flatListContainer}
        // pagingEnabled={true}
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // margin: moderateScale(8),
    // backgroundColor:'#FFF'
  },
  flatListContainer: {
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    paddingHorizontal: 16, // Adjusted padding
  },
  serviceName: {
    fontWeight: 'bold',
    fontSize: textScale(20),
    flex: 1,
    color: "#000"
  },
  itemContainer: {
    flex: 1,
    margin: moderateScale(8),
  },
});



export default Setting

