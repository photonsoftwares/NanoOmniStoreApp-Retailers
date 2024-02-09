import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GetCustomerAddressMethod, OrderMasterDetailsMethod, SaveTransactionMethod, UpdateOrderMasterMethod } from '../../../../../config/userApiMethods';
import ButtonCompo from '../../../../../Components/ButtonCompo';
import HeaderComp from '../../../../../Components/HeaderCompo';
import GenrateInvoicePdf from './GenrateInvoicePdf/GenrateInvoicePdf';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../../../Components/Loader';

const PendingItemWithUserDetails = ({ route }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const { customerBookedOrders, customerAddresses, customerData, } = useSelector((state) => state.customerReducer);
  const hiajsi = useSelector((state) => state.customerReducer);
  const { extraDeliveryCharges, extraDeliveryChargesValue } = useSelector((state) => state.extraChargesReducer);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  const { customer_name } = customerData
  console.log("customerData", customerData)


  useEffect(() => {
    const res = dispatch(OrderMasterDetailsMethod(storeId, saasId, route?.params));

    setTimeout(() => {

      setLoader(false);

    }, 1500);
  }, []);




  // useEffect(() => {
  //   // Calculate the total whenever customerBookedOrders changes
  //   const newTotal = customerBookedOrders.reduce((acc, order) => acc + parseFloat(order.item_price), 0);
  //   setTotal(newTotal);
  // }, [customerBookedOrders]);


  useEffect(() => {
    // Calculate the total amount with quantity whenever customerBookedOrders changes
    const newTotal = customerBookedOrders.reduce((acc, order) => {
      const orderTotal = parseFloat(order.item_price) * parseInt(order.item_qty);
      return acc + orderTotal;
    }, 0);

    setTotal(newTotal);
  }, [customerBookedOrders]);


  const renderOrderDetails = () => {

    return (
      <>
        <Text style={styles.sectionHeading}>Order Details</Text>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {customerBookedOrders.map(order => (
            <View key={order.order_id} style={styles.itemContainer}>
              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Order ID: `}</Text>
                <Text style={styles.valueStyle}>{order.order_id}</Text>
              </View>

              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Order Date: `}</Text>
                <Text style={styles.valueStyle}>{order.order_date}</Text>
              </View>

              {/* <View style={styles.allView}>
                <Text>{`Item ID: `}</Text>
                <Text>{order.item_id}</Text>
              </View>

              <View style={styles.allView}>
                <Text>{`Order Item Quantity: `}</Text>
                <Text >{order.item_qty}</Text>
              </View>

              <View style={styles.allView}>
                <Text>{`Item Price: `}</Text>
                <Text>₹{order.item_price}</Text>
              </View> */}

              <View style={styles.divider}></View>
            </View>
          ))}
        </ScrollView>
      </>
    );
  };

  const renderCustomerDetails = () => (
    <>
      <Text style={styles.sectionHeading}>Customer Details</Text>
      <View style={styles.itemContainer}>
        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Customer ID: `}</Text>
          <Text style={styles.valueStyle}>{customerData?.customer_id}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Customer Name: `}</Text>
          <Text style={styles.valueStyle}>{customerData?.customer_name}</Text>
        </View>
        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Mobile Number: `}</Text>
          <Text style={styles.valueStyle}>{customerData?.mobile_number}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Address: `}</Text>
          <Text style={styles.valueStyle}>{customerAddresses?.address}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Street: `}</Text>
          <Text style={styles.valueStyle}>{customerAddresses?.street}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`Pincode: `}</Text>
          <Text style={styles.valueStyle}>{customerAddresses?.pincode}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`City: `}</Text>
          <Text style={styles.valueStyle}>{customerAddresses?.city}</Text>
        </View>

        <View style={styles.allView}>
          <Text style={styles.titleStyle}>{`State: `}</Text>
          <Text style={styles.valueStyle}>{customerAddresses?.state}</Text>
        </View>

        <View style={styles.divider}></View>
      </View>
    </>
  );

  const renderItemDetails = () => {
    return (
      <>
        <Text style={styles.sectionHeading}>Item Details</Text>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {customerBookedOrders.map(order => (
            <View key={order.order_id} style={styles.itemContainer}>
              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Item ID: `}</Text>
                <Text style={styles.valueStyle}>{order.item_id}</Text>
              </View>

              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Item Name: `}</Text>
                <Text style={styles.valueStyle}>{order.item_name}</Text>
              </View>

              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Category: `}</Text>
                <Text style={styles.valueStyle}>{order.category}</Text>
              </View>

              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Item Quantity: `}</Text>
                <Text style={styles.valueStyle}>{order.bill_qty}</Text>
              </View>

              <View style={styles.allView}>
                <Text style={styles.titleStyle}>{`Item Price: `}</Text>
                <Text style={styles.valueStyle}>₹{order.item_price}</Text>
              </View>

              <View style={styles.divider}></View>
            </View>
          ))}
        </ScrollView>
      </>
    );
  };


  const handleButtonPress = async () => {
    // Log or display the total
    // console.log('Total Price:', total);
    const mergeBody = customerBookedOrders.map((obj) => {
      return {
        item_id: obj?.item_id,
        item_name: obj?.item_name,
        description: null,
        special_description: null,
        price: obj?.item_price,
        brand: null,
        sub_price: null,
        actual_price: obj?.item_price,
        price_pcs: null,
        product_qty: obj?.item_qty,
        discount: 0,
        tax: null,
        tax_percent: null,
        status: obj?.status,
        category: obj?.category,
        saas_id: obj?.saas_id,
        store_id: obj?.store_id,
        promo_id: null,
        image_name: null,
        hsn_code: null,
        tax_rate: null,
        tax_code: null,
        barcode: null,
        supplier_name: null,
        opening_qty: null,
        received_qty: null,
        sold_qty: null,
        closing_qty: null,
        product_cost: null,
        product_price: null,
        product_av_cost: null,
        mrp: null,
        newPrice: null,
        productQty: obj?.item_qty

      }
    })
    const saveTBody = {
      // registerId: "REG101",
      storeId: storeId,
      saasId: saasId,
      // tenderId: "TENDER1",
      tender: {
        Cash: 0
      },
      cartItems: mergeBody
    };

    const jsonString = JSON.stringify(saveTBody);

    // console.log('jsonString_Before:',);
    const orderIdd = route?.params

    const pdf_file_name = await dispatch(SaveTransactionMethod(jsonString, orderIdd))
    // console.log('jsonString:', pdf_file_name,transaction_id);

    if (pdf_file_name) {
      navigation.navigate('GenrateInvoicePdf', pdf_file_name)
    }
    // navigation.navigate('GenrateInvoicePdf', )
  };



  return (
    <>
      <HeaderComp screenName={'Order Details'} onBackPress={() => navigation.goBack()} />

      {loader ?

        <Loader
          isLoading={loader}
        /> :

        <View style={{ backgroundColor: 'white', flex: 1 }}>

          <View style={styles.cardContainer}>
            {renderCustomerDetails()}
            {renderOrderDetails()}
            {renderItemDetails()}
          </View>

          <ButtonCompo
            title={`Pick Pack - Total: ₹${total.toFixed(2)}`}
            onPress={handleButtonPress}
          />
        </View>
      }

    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    margin: 16,
    padding: 16,
    height: '100%',
    flex: 1,
  },
  divider: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    marginVertical: 8,
  },
  scrollContainer: {
    maxHeight: 200, // Adjust the max height as needed
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000'
  },
  allView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemContainer: {
    marginBottom: 8,
  },
  titleStyle: {
    color: '#000'
  },
  valueStyle: {
    color: '#000'
  },
});

export default PendingItemWithUserDetails;

