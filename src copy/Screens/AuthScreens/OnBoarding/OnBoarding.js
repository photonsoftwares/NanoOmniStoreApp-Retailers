import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Login from '../LogIn/Login'
import ButtonCompo from '../../../Components/ButtonCompo'

const OnBoarding = () => {
  const navigattion = useNavigation()

  return (
    <View>
      <Text>OnBoarding</Text>
      <ButtonCompo
        title={'LogIn'}
        onPress={() => navigattion.navigate(Login)}
      />
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({})