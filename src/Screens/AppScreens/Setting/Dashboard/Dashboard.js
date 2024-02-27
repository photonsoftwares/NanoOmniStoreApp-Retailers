import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useCallback, memo, useEffect } from 'react';
import Sales from './Sales/Sales';
import Tender from './Tender/Tender';
import HourlySale from './HourlySale/HourlySale';
import DailyOps from './DailyOps/DailyOps';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { moderateScale, textScale } from '../../../../styles/responsiveSize';


const DashboardData = [

  { id: '1', status: 'Sales', screen: Sales },
  
  // { id: '2', status: 'Tender', screen: Tender },
  // { id: '3', status: 'HourlySale', screen: HourlySale },
  // { id: '4', status: 'DailyOps', screen: DailyOps },
  // Add more order statuses as needed
];


const OrderStatusItem = memo(({ orderStatus }) => {
  const navigation = useNavigation()
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)



  return (
    <TouchableOpacity activeOpacity={2} style={styles.itemContainer}>
      <View style={[styles.serviceContainer, { elevation: 8 }]}>
        <Text style={styles.serviceName}>{orderStatus.status}</Text>
        <TouchableOpacity onPress={() => navigation.navigate(orderStatus.screen)}>
          {/* <TouchableOpacity onPress={() => navigation.navigate()}> */}

          <MaterialIcons name="keyboard-arrow-right" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
});
const Dashboard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const keyExtractor = useCallback((item) => item.id, []);
  const renderItem = useCallback(({ item }) => <OrderStatusItem orderStatus={item} />, []);



  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <HeaderComp
          screenName='Dashboard'
          onBackPress={() => navigation.goBack()}

        />
        <FlatList
          data={DashboardData}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          horizontal={false}
          contentContainerStyle={styles.flatListContainer}
        // pagingEnabled={true}
        />

      </View>
    </>
  )
}

export default Dashboard

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
    color:'#000'
  },
  itemContainer: {
    flex: 1,
    margin: moderateScale(8),
    // backgroundColor: 'white',


    // elevation:8
  },
});
