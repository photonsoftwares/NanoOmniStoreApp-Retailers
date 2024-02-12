import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import navigationStrings from '../../constants/navigationStrings'
import WrapperContainer from '../../Components/WrapperContainer'

const InitialAuth = ({ navigation }) => {

  const goToScreen = (screen) => {
    navigation.navigate(screen)
  }
  return (
    <WrapperContainer>
      <View style={{ flex: 1, }}>
        <Text>InitialAuth</Text>
        <Button onPress={() => goToScreen(navigationStrings.LOGIN)} title='LOGIN' />
        <Button onPress={() => goToScreen(navigationStrings.SIGNUP)} title='SIGNUP' />
        <Button onPress={() => goToScreen(navigationStrings.OTP_VERIFICATION)} title='OTP_VERIFICATION' />
        <Button onPress={() => goToScreen(navigationStrings.FORGOT_PASSWORD)} title='FORGOT_PASSWORD' />
      </View>
    </WrapperContainer>
  )
}

export default InitialAuth

const styles = StyleSheet.create({})