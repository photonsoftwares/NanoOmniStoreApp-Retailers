import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomDropDown from '../../Components/CustomDropDown';

const Test = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // console.log(">><<<<>>>>>", category)
  };
  const handlePress = () => {
    const body = {
      tax: 0,
      tax_code: 0,
      status: 'active',
      hsn_code: 0,
      promo_id: 0,
      sku: 0,
      category: selectedCategory,
    }

    console.log(">><<<<>>>>>", body)
  }
  return (
    <View style={{flex:1}}>
      <Text>Test</Text>
      <View style={{ marginTop: 8, paddingVertical: 8 }}>
        <Button title='as' onPress={()=>handlePress()}/>
        <Text style={[styles.label, { marginBottom: 8 }]}>Category</Text>
        < CustomDropDown onSelect={handleCategorySelect} />
      </View>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})