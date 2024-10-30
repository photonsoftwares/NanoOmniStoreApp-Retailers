import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { DashboardMMethod } from '../../config/userApiMethods'

const Test1 = () => {
  const dispatch = useDispatch()
  return (
    <View>
      <Text>Test1</Text>
      <Button title='dispatch' onPress={() => dispatch(DashboardMMethod())} />
    </View>
  )
}

export default Test1

const styles = StyleSheet.create({})