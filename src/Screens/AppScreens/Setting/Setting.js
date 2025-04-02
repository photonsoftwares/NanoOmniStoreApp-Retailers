import React, { useCallback, memo, useEffect, useRef } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale, textScale } from '../../../styles/responsiveSize';
import HeaderComp from '../../../Components/HeaderCompo';
import Products from '../Products/Products';
import Dashboard from './Dashboard/Dashboard';
import ExtraCharges from './Dashboard/ExtraCharges/ExtraCharges';
import { DashboardMMethod, GetCustomerMethod, GetDelivryChargesMethod, GetMinOrderValueMethod } from '../../../config/userApiMethods';
import Category from './CategoryUpdate/Category';
import Addstore from './Dashboard/Store/Addstore';
import Inventory from './Inventory/Inventory';
import Customer from './Customer/Customer';
import Wallet from './Wallet/Wallet';
import Coupan from './Coupan/Coupan';
import QrCode from './QrCode';
import BusinessSummary from './BusinessSummary/BusinessSummary';
import Notification from './Notification/Notification';

const orderStatusData = [
  { id: '1', status: 'Dashboard', elevation: 1, screen: Dashboard },
  { id: '2', status: 'Product', elevation: 1, screen: Products },
  { id: '3', status: 'Inventory', elevation: 1, screen: Inventory },
  { id: '4', status: 'Customer', elevation: 1, screen: Customer },
  { id: '10', status: 'Category', elevation: 1, screen: Category },
  { id: '11', status: 'Extra Charges', elevation: 1, screen: ExtraCharges },
  { id: '12', status: 'Store Banner', elevation: 1, screen: Addstore },
  { id: '13', status: 'Wallet', elevation: 1, screen: Wallet },
  { id: '14', status: 'Coupon', elevation: 1, screen: Coupan },
  { id: '15', status: 'Qr Code', elevation: 1, screen: QrCode },
  { id: '16', status: 'Notification', elevation: 1, screen: Notification },
  // Add more order statuses as needed
];





const OrderStatusItem = React.memo(({ orderStatus, index }) => {
  const navigation = useNavigation();
  const animatedValue = useRef(new Animated.Value(0)).current;



  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300, // Animation duration
      delay: index * 300, // Delay based on index
      useNativeDriver: true,
    }).start();
  }, [index, animatedValue]);

  const containerStyle = {
    ...styles.itemContainer,
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [30, 0], // Slide from 30 units down to 0
        }),
      },
    ],

  };

  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity activeOpacity={2} style={styles.serviceContainer} onPress={() => navigation.navigate(orderStatus.screen)}>
        <Text style={styles.serviceName}>{orderStatus.status}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(orderStatus.screen)}>
          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const Setting = () => {
  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(({ item, index }) => <OrderStatusItem orderStatus={item} index={index} />, []);
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const dispatch = useDispatch()
  const navigation = useNavigation()


  useEffect(() => {
    dispatch(GetMinOrderValueMethod())
    dispatch(GetDelivryChargesMethod())
    dispatch(GetCustomerMethod())
    dispatch(DashboardMMethod())
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
          ListHeaderComponent={<BusinessSummary />}
        />

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  flatListContainer: {
    paddingVertical: moderateScale(15)
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
    backgroundColor: '#fff'

  },
  serviceContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1, // Add elevation for shadow (Android)
    bottom: 25
  },
});



export default Setting

