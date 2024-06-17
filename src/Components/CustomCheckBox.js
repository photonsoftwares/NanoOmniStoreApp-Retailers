// CustomCheckBox.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const CustomCheckBox = ({ label, isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle}>
      <View style={styles.checkboxContainer}>
        <MaterialCommunityIcons
          name={isChecked ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={24}
          color={isChecked ? 'green' : 'black'}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CustomCheckBox;
