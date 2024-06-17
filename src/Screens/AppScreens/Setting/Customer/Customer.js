
import React, { memo, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Clipboard, Pressable, TouchableHighlight, Linking, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlashList } from "@shopify/flash-list";
import HeaderComp from '../../../../Components/HeaderCompo';
import { showToast } from '../../../../utils/toast';

const CustomerListData = memo(({ item }) => {
  const copyToClipboard = () => {
    Clipboard.setString(item.mobile_number);
    showToast('Mobile number copied to clipboard');
  };

  const dialCall = () => {

    let phoneNumber = item.mobile_number;

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${item.mobile_number}`;
    }
    else {
      phoneNumber = 'telprompt:${+1234567890}';
    }

    Linking.openURL(phoneNumber);
  };

  return (
    <Pressable style={styles.item} >
      <View>

        <Text style={styles.title}>{item.customer_name}</Text>
        <Text style={styles.keyValue}>Customer ID: {item.customer_id}</Text>
        <Text style={styles.keyValue}>Mobile Number: {item.mobile_number}</Text>
        {
          item.email &&
          <Text style={styles.keyValue}>Email: {item.email}</Text>
        }
      </View>
      <View style={styles.itemTwo}>
        <TouchableOpacity
          onPress={dialCall}
        >

          <MaterialCommunityIcons name="phone" size={26} color={'blue'} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
});

const Customer = () => {
  const { customerListData } = useSelector(state => state?.customerListReducer);
  const navigation = useNavigation();
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const renderItem = useCallback(({ item }) => <CustomerListData item={item} />, []);

  return (
    <View style={styles.container}>
      <HeaderComp screenName={'Your Customer'} onBackPress={() => navigation.goBack()} showCustomer={true} />
      <FlashList
        data={customerListData || []}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between'

  },
  itemTwo: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: '500'
  },
  keyValue: {
    fontSize: 14,
    color: 'grey'
  },
});

export default Customer;
