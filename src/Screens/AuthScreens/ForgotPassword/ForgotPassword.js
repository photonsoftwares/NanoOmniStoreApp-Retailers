import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Home from '../Home/Home'
import OtpVerification from '../OtpVerification/OtpVerification'

const ForgotPassword = () => {
  const navigation = useNavigation()
  return (
    <View>
      <Text>ForgotPassword</Text>
      <Button title='jo' onPress={() => navigation.navigate(OtpVerification)} />
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({})