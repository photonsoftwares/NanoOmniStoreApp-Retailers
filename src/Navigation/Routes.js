import { StyleSheet, Text, View, useColorScheme, Modal } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import colors from '../styles/colors';
import { useDispatch, useSelector } from 'react-redux';
import NoInternet from '../Components/NoInternet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setFcmTokenMethod } from '../config/userApiMethods';

const Stack = createNativeStackNavigator();

const Routes = () => {
    const theme = useColorScheme() === 'dark' ? colors.dark : colors.light;
    const accessToken = useSelector(state => state?.authReducer?.user?.jwt_response);
    const usertType = useSelector(state => state?.authReducer?.user?.user_data?.userType);

    
    const dispatch = useDispatch()

    useEffect(() => {
        getFcmToken()
    })

    const getFcmToken = async () => {
        let fcmToken = await AsyncStorage.getItem('fcmToken')
        console.log("old fcmTokenjj", fcmToken)
        dispatch(setFcmTokenMethod(fcmToken))

    }


    let network = NoInternet();
    const NoInternetModal = () => {
        return (
            <View>
                {network == false ? (
                    <Modal transparent={true} animationType={'slide'} isVisible={network}>
                        <View style={{ flex: 1, zIndex: -1, justifyContent: 'center' }}>
                            <View
                                style={{
                                    height: 60,
                                    width: '90%',
                                    alignSelf: 'center',
                                    backgroundColor: 'black',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    elevation: 5,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        // margin: 15,
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>
                                    No Internet Connection!
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        // margin: 15,
                                        fontWeight: '500',
                                        color: 'white',

                                        // justifyContent: 'center',
                                        // alignItems: 'center',
                                        // alignSelf: 'center',
                                        // marginBottom: 10,
                                    }}>
                                    Please check your internet connection.
                                </Text>
                            </View>
                        </View>
                    </Modal>
                ) : null}
            </View>
        );
    };


    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator screenOptions={{
                headerShown: false,
            }}>
                {
                    accessToken && accessToken !== undefined ? <>{AppStack(Stack)}</>
                        : <>{AuthStack(Stack)}</>
                }
            </Stack.Navigator>

            <NoInternetModal />
        </NavigationContainer>
    )
}

export default Routes

const styles = StyleSheet.create({})