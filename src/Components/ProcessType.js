import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const ProcessType = ({ visible, onClose, onSelect }) => {
  const options = [
    { label: 'Delivered', value: 'delivered' },
    { label: 'Assign to Delivery Boy', value: 'DELIVERYBOY' },
  ];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableOpacity style={styles.overlay} onPress={onClose} />

      <View style={styles.modalContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.option}
            onPress={() => onSelect(option.value)}
          >
            <Text style={styles.optionText}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProcessType;
