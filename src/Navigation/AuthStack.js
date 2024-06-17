import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from '../Screens/AuthScreens/LogIn/Login'
import Signup from '../Screens/AuthScreens/Signup/Signup'
import NavigationStrings from '../constants/NavigationStrings'

const AuthStack = (Stack, isFirstTime = false) => {
    return (
        <>
            {/* {isFirstTime && <Stack.Screen
                name={NavigationStrings.ON_BOARDING}
                component={OnBoarding}
                options={{ headerShown: false }}
            />} */}
            {/* <Stack.Screen
        name={navigationStrings.INITIAL_AUTH}
        component={InitialAuth}
        options={{ headerShown: false }}
      /> */}
            <Stack.Screen
                name={NavigationStrings.LOGIN}
                component={Login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={NavigationStrings.SIGNUP}
                component={Signup}
                options={{ headerShown: false }}
            />
        </>
    )
}

export default AuthStack

const styles = StyleSheet.create({})