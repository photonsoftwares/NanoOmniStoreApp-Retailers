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
import { GetCustomerMethod, GetDelivryChargesMethod, GetMinOrderValueMethod } from '../../../config/userApiMethods';
import Category from './CategoryUpdate/Category';
import Addstore from './Dashboard/Store/Addstore';
import Inventory from './Inventory/Inventory';
import Customer from './Customer/Customer';
import Wallet from './Wallet/Wallet';
import Coupan from './Coupan/Coupan';

const orderStatusData = [
  { id: '1', status: 'Dashboard', elevation: 5, screen: Dashboard },
  { id: '2', status: 'Product', elevation: 5, screen: Products },
  { id: '3', status: 'Inventory', elevation: 5, screen: Inventory },
  { id: '4', status: 'Customer', elevation: 5, screen: Customer },
  { id: '10', status: 'Category', elevation: 5, screen: Category },
  { id: '11', status: 'Extra Charges', elevation: 5, screen: ExtraCharges },
  { id: '12', status: 'Add Store Details', elevation: 5, screen: Addstore },
  { id: '13', status: 'Wallet', elevation: 5, screen: Wallet },
  { id: '14', status: 'Coupon', elevation: 5, screen: Coupan },
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
    dispatch(GetMinOrderValueMethod())
    dispatch(GetDelivryChargesMethod())
    dispatch(GetCustomerMethod())
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

