

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  OrderMasterDetailsMethod, SaveTransactionMethod, GetDeliveryBoysMethod,
  AssignOrderToDeliveryBoyMethod
} from '../../../../../config/userApiMethods';
import ButtonCompo from '../../../../../Components/ButtonCompo';
import HeaderComp from '../../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import Loader from '../../../../../Components/Loader';
import ProcessType from '../../../../../Components/ProcessType';

const PendingItemWithUserDetails = ({ route }) => {
  const { order_id, order_date, orderMobileNumber } = route?.params
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const storeType = useSelector(state => state?.authReducer?.user?.store_data?.storeType);
  const { customerBookedOrders, customerAddresses, customerData, } = useSelector((state) => state.customerReducer);
  const [total, setTotal] = useState(0);
  const [loader, setLoader] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [deliveryBoys, setDeliveryBoys] = useState([]);
  const [deliveryBoyModalVisible, setDeliveryBoyModalVisible] = useState(false);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(null);
  // console.log("customerData",customerData)

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setModalVisible(false);

    if (value === 'DELIVERYBOY') {
      setDeliveryBoyModalVisible(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(OrderMasterDetailsMethod(storeId, saasId, order_id));
      await fetchDeliveryBoys();
      setTimeout(() => {
        setLoader(false);
      }, 1500);
    };

    fetchData();
  }, []);

  const fetchDeliveryBoys = async () => {
    try {
      const deliveryBoysData = await dispatch(GetDeliveryBoysMethod());
      setDeliveryBoys(deliveryBoysData || []);
    } catch (error) {
      console.error('Error fetching delivery boys:', error);
    }
  };

  const handleDeliveryBoySelect = (deliveryBoy) => {
    setSelectedDeliveryBoy(deliveryBoy);
    setDeliveryBoyModalVisible(false);
  };


  useEffect(() => {
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
        <View style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* {customerBookedOrders.map(order => ( */}
          <View key={customerBookedOrders[0]?.order_id} style={styles.itemContainer}>
            <View style={styles.allView}>
              <Text style={styles.titleStyle}>{`Order ID: `}</Text>
              <Text style={styles.valueStyle}>{customerBookedOrders[0]?.order_id}</Text>
            </View>

            <View style={styles.allView}>
              <Text style={styles.titleStyle}>{`Order Date: `}</Text>
              <Text style={styles.valueStyle}>{customerBookedOrders[0]?.order_date}</Text>
            </View>



            <View style={styles.divider}></View>
          </View>
          {/* ))} */}
        </View>
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
            <View key={order?.order_id} style={styles.itemContainer}>
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

              {
                storeType === 'VEGETABLE' ?
                  <>
                    <View style={styles.allView}>
                      <Text style={styles.titleStyle}>{`Quantity: `}</Text>
                      <Text style={styles.valueStyle}>{order.bill_qty} of {order.gram} gram</Text>
                    </View>
                    <View style={styles.allView}>
                      <Text style={styles.titleStyle}>{`Total Quantity: `}</Text>
                      <Text style={styles.valueStyle}>{order.bill_qty * order.gram} gram</Text>
                    </View>


                  </>
                  :
                  <>
                    <View style={styles.allView}>
                      <Text style={styles.titleStyle}>{`Quantity: `}</Text>
                      <Text style={styles.valueStyle}>{order.bill_qty}</Text>
                    </View>
                  </>
              }


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

  console.log(selectedOption)

  const handleButtonPress = async () => {
    if (selectedOption === null) {
      setModalVisible(true);
    } else if (selectedOption === 'DELIVERYBOY' && !selectedDeliveryBoy) {
      setDeliveryBoyModalVisible(true);
    } else {
      await processOrder();
    }
  };
  // const handleButtonPress = async () => {

  //   if (selectedOption === null) {
  //     setModalVisible(true)

  //   } else {
  //     const mergeBody = customerBookedOrders.map((obj) => {
  //       return {
  //         order_id: order_id,
  //         order_date: order_date,
  //         item_id: obj?.item_id,
  //         colorList: null,
  //         item_name: obj?.item_name,
  //         conc_id: 1,
  //         // UOM: null,
  //         UOM: obj?.gram,
  //         description: null,
  //         special_description: null,
  //         price: obj?.item_price / obj?.bill_qty,
  //         brand: null,
  //         sub_price: null,
  //         actual_price: null,
  //         price_pcs: null,
  //         product_qty: obj?.bill_qty,
  //         discount: 0,
  //         tax: 0,
  //         tax_percent: 0,
  //         status: "active",
  //         category: obj?.category,
  //         saas_id: obj?.saas_id,
  //         store_id: obj?.store_id,
  //         promo_id: null,
  //         image_name: null,
  //         hsn_code: null,
  //         tax_rate: 0,
  //         tax_code: 0,
  //         barcode: null,
  //         supplier_name: null,
  //         opening_qty: null,
  //         received_qty: null,
  //         sold_qty: null,
  //         closing_qty: null,
  //         product_cost: null,
  //         product_price: null,
  //         product_av_cost: null,
  //         mrp: null,
  //         dept: null,
  //         item_class: null,
  //         sub_class: null,
  //         item_code: null,
  //         salesManId: "",
  //         salesMan: "",
  //         newPrice: null,
  //         productQty: obj?.bill_qty,
  //         Discountper: 0

  //       }
  //     })
  //     const saveTBody = {
  //       registerId: "REG1",
  //       storeId: storeId,
  //       saasId: saasId,
  //       tenderId: "TENDER1",
  //       customerName: customerData?.customer_name,
  //       customerNumber: customerData?.mobile_number,
  //       tender: {
  //         Cash: 0
  //       },
  //       cartItems: mergeBody,
  //       orderId: order_id,
  //       orderMobileNumber: orderMobileNumber,
  //     };

  //     console.log("saveTBody", saveTBody)
  //     const pdf_file_name = await dispatch(SaveTransactionMethod(saveTBody, order_id, selectedOption))

  //     if (pdf_file_name) {
  //       navigation.navigate('GenrateInvoicePdf', pdf_file_name)
  //     }

  //   }



  // };
  const processOrder = async () => {
    const mergeBody = customerBookedOrders.map((obj) => ({
      // ... your existing mergeBody code
      order_id: order_id,
      order_date: order_date,
      item_id: obj?.item_id,
      colorList: null,
      item_name: obj?.item_name,
      conc_id: 1,
      UOM: obj?.gram,
      description: null,
      special_description: null,
      price: obj?.item_price / obj?.bill_qty,
      brand: null,
      sub_price: null,
      actual_price: null,
      price_pcs: null,
      product_qty: obj?.bill_qty,
      discount: 0,
      tax: 0,
      tax_percent: 0,
      status: "active",
      category: obj?.category,
      saas_id: obj?.saas_id,
      store_id: obj?.store_id,
      promo_id: null,
      image_name: null,
      hsn_code: null,
      tax_rate: 0,
      tax_code: 0,
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
      dept: null,
      item_class: null,
      sub_class: null,
      item_code: null,
      salesManId: "",
      salesMan: "",
      newPrice: null,
      productQty: obj?.bill_qty,
      Discountper: 0
    }));

    const saveTBody = {
      registerId: "REG1",
      storeId: storeId,
      saasId: saasId,
      tenderId: "TENDER1",
      customerName: customerData?.customer_name,
      customerNumber: customerData?.mobile_number,
      tender: { Cash: 0 },
      cartItems: mergeBody,
      orderId: order_id,
      orderMobileNumber: orderMobileNumber,
    };

    console.log("saveTBody", saveTBody);

    // If order is being assigned to delivery boy, call the assignment API first
    if (selectedOption === 'DELIVERYBOY' && selectedDeliveryBoy) {
      const assignmentSuccess = await dispatch(
        AssignOrderToDeliveryBoyMethod(order_id, selectedOption, selectedDeliveryBoy.user_id)
      );

      if (!assignmentSuccess) {
        return; // Stop if assignment failed
      }
    }

    const pdf_file_name = await dispatch(SaveTransactionMethod(saveTBody, order_id, selectedOption));

    if (pdf_file_name) {
      navigation.navigate('GenrateInvoicePdf', pdf_file_name);
    }
  };


  const renderDeliveryBoyModal = () => (
    <Modal
      visible={deliveryBoyModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setDeliveryBoyModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Delivery Boy</Text>

          <FlatList
            data={deliveryBoys}
            keyExtractor={(item) => item.user_id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deliveryBoyItem}
                onPress={() => handleDeliveryBoySelect(item)}
              >
                <Text style={styles.deliveryBoyName}>{item.user_name}</Text>
                <Text style={styles.deliveryBoyNumber}>{item.mobile_number}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <Text style={styles.noDeliveryBoysText}>No delivery boys available</Text>
            }
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setDeliveryBoyModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const getButtonTitle = () => {
    if (selectedOption === 'DELIVERYBOY' && selectedDeliveryBoy) {
      return `Assign to: ${selectedDeliveryBoy.user_name} - Total: ₹${customerData?.order_value}`;
    } else if (selectedOption) {
      return 'Next';
    } else {
      return `Pick Pack - Total: ₹${customerData?.order_value}`;
    }
  };

  return (
    <>
      <HeaderComp screenName={'Order Details'} onBackPress={() => navigation.goBack()} />

      {loader ?

        <Loader
          isLoading={loader}
        /> :

        <View style={{ backgroundColor: 'white', flex: 1 }}>
          <ScrollView>
            <View style={styles.cardContainer}>
              {renderCustomerDetails()}
              {renderOrderDetails()}
              {renderItemDetails()}
            </View>
          </ScrollView>

          {/* <ButtonCompo
            title={selectedOption ? 'Next' : `Pick Pack - Total: ₹${customerData?.order_value}`}
            onPress={handleButtonPress}
          /> */}
          <ButtonCompo
            title={getButtonTitle()}
            onPress={handleButtonPress}
          />
        </View>
      }
      <ProcessType
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleOptionSelect}
      />
      {renderDeliveryBoyModal()}
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
    // maxHeight: 200, // Adjust the max height as needed
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  deliveryBoyItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  deliveryBoyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  deliveryBoyNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noDeliveryBoysText: {
    textAlign: 'center',
    padding: 20,
    color: '#666',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PendingItemWithUserDetails;


