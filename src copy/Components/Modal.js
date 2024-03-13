import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomModal = ({ visible, onClose, children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', }}>

        <View style={{ height: '45%', width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, elevation: 5, }}>
          <TouchableOpacity onPress={onClose} style={{ alignSelf: 'flex-end' }}>

            <MaterialCommunityIcons name="close" size={26} />
          </TouchableOpacity>
          {children}
          {/* <Button title="Close Modal" onPress={onClose} /> */}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
