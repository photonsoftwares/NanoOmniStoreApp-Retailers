import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import WeightUnitSelector from '../../Components/WeightUnitSelector'

const Test1 = () => {
  const [selectedUnit, setSelectedUnit] = useState('KG');

  const handleUnitChange = (unit) => {
    setSelectedUnit(unit);
  };
  return (
    <View>
      <Text>Test1</Text>
      <WeightUnitSelector onUnitChange={handleUnitChange} />
      <Text style={styles.selectedUnitText}>Selected Unit: {selectedUnit}</Text>

    </View>
  )
}

export default Test1

const styles = StyleSheet.create({})