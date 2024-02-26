
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import ColorPicker from '../../Components/ColorPicker';

const Test = () => {
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  // console.log("selectedColor",selectedColor)

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    handleCloseColorPicker();
  };

  const handleOpenColorPicker = () => {
    setColorPickerVisible(true);
  };

  const handleCloseColorPicker = () => {
    setColorPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <Button title="Open Color Picker" onPress={handleOpenColorPicker} />
      {selectedColor && <View style={[styles.selectedColor, { backgroundColor: selectedColor }]} />}
      <ColorPicker
        visible={colorPickerVisible}
        onSelect={handleColorSelect}
        onClose={handleCloseColorPicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    marginTop: 20,
    width: 100,
    height: 100,
  },
});

export default Test;
