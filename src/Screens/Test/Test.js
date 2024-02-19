
//Test.js

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import CustomCheckBox from '../../Components/CustomCheckBox';

const Test = () => {
  const [checkBoxes, setCheckBoxes] = useState([
    { id: 4, label: 'Select All', isChecked: false },
    { id: 1, label: 'Option 1', isChecked: false },
    { id: 2, label: 'Option 2', isChecked: false },
    { id: 3, label: 'Option 3', isChecked: false },
  ]);

  const toggleCheckBox = (id) => {
    if (id === 4) {
      // Select All logic
      const allChecked = checkBoxes.every((checkbox) => checkbox.isChecked);
      console.log("allChecked",allChecked)
      setCheckBoxes((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) => ({
          ...checkbox,
          isChecked: !allChecked,
        }))
      );
    } else {
      setCheckBoxes((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.id === id
            ? { ...checkbox, isChecked: !checkbox.isChecked }
            : checkbox
        )
      );
    }
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 20 }}>
      {checkBoxes.map((checkbox) => (
        <CustomCheckBox
          key={checkbox.id}
          label={checkbox.label}
          isChecked={checkbox.isChecked}
          onToggle={() => toggleCheckBox(checkbox.id)}
        />
      ))}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({});

