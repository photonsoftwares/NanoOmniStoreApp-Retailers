import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import SearchItemUpdate from '../AppScreens/Search/SearchItemUpdate'

const Test = () => {
  const navigation = useNavigation()
  return (
    <View>
      <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('SearchItemUpdate', { itemId: '123' })}>

        <Text>Test</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Test

const styles = StyleSheet.create({})