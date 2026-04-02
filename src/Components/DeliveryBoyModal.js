import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {GetUserDeliveryDetailsMethod } from '../config/userApiMethods';

const DeliveryBoyModal = ({ visible, onClose, onSelect }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);
 const {
    storeId,
    saasId,
   

  } = useSelector((state) => state?.authReducer?.user?.store_data)
  useEffect(() => {
    if (visible) {
      fetchDeliveryBoys();
    }
  }, [visible]);

 const fetchDeliveryBoys = async () => {
  try {
    const data = await dispatch(
      GetUserDeliveryDetailsMethod(saasId, storeId)
    );

    setList(data || []);
  } catch (error) {
    console.log('API Error:', error);
  }
};


  console.log('deliveryboy--------',list);
  
 const renderItem = ({ item }) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() => {
      onSelect(item);
      onClose(); // auto close modal
    }}
  >
    <Text style={styles.text}>
      {item?.user_name || 'No Name'}
    </Text>

    <Text style={{ fontSize: 12, color: 'gray' }}>
      {item?.mobile_number}
    </Text>
  </TouchableOpacity>
);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      <View style={styles.container}>
        <Text style={styles.title}>Select Delivery Boy</Text>

        <FlatList
          data={list}
         keyExtractor={(item) => item.user_id.toString()}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    maxHeight: '60%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'#000'
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 16,
    color:'#000'
  },
});

export default DeliveryBoyModal;