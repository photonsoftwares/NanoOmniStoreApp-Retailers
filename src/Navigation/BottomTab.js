import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Test from '../Screens/Test/Test';
import Home from '../Screens/AppScreens/Home/Home';
import NavigationStrings from '../constants/NavigationStrings';
import Order from '../Screens/AppScreens/Order/Order';
import Billing from '../Screens/AppScreens/Billing/Billing';
import Setting from '../Screens/AppScreens/Setting/Setting';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import Test1 from '../Screens/Test/Test1';

// import Sales from '../Screens/AppScreens/Sales/Sales';
// import Purchase from '../Screens/AppScreens/Purchase/Purchase';




const Tab = createMaterialBottomTabNavigator();


const BottomTab = () => {
    const colors = useTheme().colors;

    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="red"
            inactiveColor="#3e2465"
            screenOptions={{
                headerShown: false,
            }}
            barStyle={{ backgroundColor: '#FFF', elevation: 4, }}
        >
            <Tab.Screen name={NavigationStrings.HOME} component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home" size={26} color={focused ? 'red' : colors.grey900} />
                    ),
                }}
            />
            <Tab.Screen name={NavigationStrings.ORDER} component={Order}
                options={{
                    tabBarLabel: 'Order',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        // <MaterialCommunityIcons name="box" size={26} color={focused ? 'red' : null} />
                        <Feather name={'box'} size={26} color={focused ? 'red' : colors.grey900} />
                    ),
                }}
            />
            <Tab.Screen name={NavigationStrings.BILLING} component={Billing}
                options={{
                    tabBarLabel: 'Billing',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="cash-100" size={26} color={focused ? 'red' : colors.grey900} />
                    ),
                }}
            />
            <Tab.Screen name={NavigationStrings.SETTING} component={Setting}
                options={{
                    tabBarLabel: 'Manage',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="cog" size={26} color={focused ? 'red' : colors.grey900} />
                    ),
                }}
            />


            {/* <Tab.Screen name={NavigationStrings.TEST} component={Test}
                options={{
                    tabBarLabel: 'Test',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ flex: 1, }}>

                            <MaterialCommunityIcons name="email" size={26} color={focused ? 'red' : null} />
                        </View>
                    ),
                }}
            /> */}
            
            {/* <Tab.Screen name={NavigationStrings.TEST1} component={Test1}
                options={{
                    tabBarLabel: 'Test1',
                    tabBarColor: 'red',

                    tabBarIcon: ({ color, focused }) => (
                        <View style={{ flex: 1, }}>

                            <MaterialCommunityIcons name="email" size={26} color={focused ? 'red' : null} />
                        </View>
                    ),
                }}
            /> */}

        </Tab.Navigator>
    )
}

export default BottomTab

const styles = StyleSheet.create({})