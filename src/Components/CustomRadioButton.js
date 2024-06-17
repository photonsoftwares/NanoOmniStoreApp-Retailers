
// CustomRadioButton.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// How to Call
// const [selectedRadio, setSelectedRadio] = useState(null);

// const handleRadioPress = (value) => {
//   setSelectedRadio(value);
// };

{/* <CustomRadioButton
        label="Option 1"
        isSelected={selectedRadio === 'Option 1'}
        onPress={() => handleRadioPress('Option 1')}
      /> */}

const CustomRadioButton = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.radioButtonContainer}>
        <MaterialCommunityIcons
          name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
          size={24}
          color={isSelected ? '#ECE447' : 'black'}
        />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color:'#666'
  },
});

export default CustomRadioButton;
