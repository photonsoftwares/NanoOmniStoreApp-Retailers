
// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import imagePath from '../constants/ImagePath';
// import { useTheme } from '@react-navigation/native';
// import { moderateScale, textScale } from '../styles/responsiveSize';
// import MenuPopUp from './MenuPopUp';

// const HomeHeader = ({ userName }) => {
//   const userInitial = userName ? userName[0].toUpperCase() : '';
//   const colors = useTheme().colors;



//   return (
//     <View style={styles.container}>
//       <Image
//         source={imagePath.alert}
//         style={styles.logo}

//       />
//       <TouchableOpacity style={[styles.profileButton, { backgroundColor: colors.btnColor }]} >
//         <MenuPopUp
//           userInitial={userInitial}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: moderateScale(10),
//     backgroundColor: 'white',
//     // borderBottomWidth: 1,
//     borderBottomColor: 'lightgray',
//     // elevation:4
//   },
//   logo: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//   },
//   profileButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(20),
//     backgroundColor: 'lightblue',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   profileInitial: {
//     fontSize: textScale(18),
//     color: 'white',
//     color: 'red'
//   },
// });

// export default HomeHeader;

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import ImagePath from '../constants/ImagePath';
import SearchBar from './SearchBar';
import Profile from '../Screens/AppScreens/Profile/Profile';
import { UpdateOnlineStatusMethod } from '../config/userApiMethods'

const HomeHeader = () => {
    const storeName = useSelector(state => state?.auth?.data?.store_name);
    const userId = useSelector(state => state?.auth?.data?.customer_data?.id);
    const { storeId } = useSelector((state) => state?.authReducer?.user?.user_data)
    const userType = useSelector(state => state?.auth?.data?.customer_data?.customerType
    );
    const dispatch = useDispatch();
    const [isOnline, setIsOnline] = useState(false);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);

    // console.log("storenammoe", storeName)
    // console.log("storenammoe", userType)
    const handleToggle = async (value) => {
        setIsOnline(value); // Update the toggle state immediately for better UX
        setLoading(true); // Show loading state while the API call is in progress

        console.log(storeId)

        try {

            // Call the API to update the online status
            const response = await dispatch(UpdateOnlineStatusMethod(storeId));

            console.log('API Response:', response);

            // Update the toggle state based on the API response
            if (response === "Online") {
                setIsOnline(true);
            } else if (response === "Offline") {
                setIsOnline(false);
            }
        } catch (error) {
            console.error('Error updating online status:', error);
            setIsOnline(!value); // Revert the toggle state if the API call fails
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Profile)}
                    style={[{ height: moderateScale(50), width: moderateScale(50), alignSelf: 'center', right: moderateScale(10) }]}

                >
                    {/* <Icon
                        name={'account'}
                        style={{ color: '#ECE447', fontSize: scale(35) }}
                    /> */}
                    <Image
                        source={ImagePath.NanoPosLogo}
                        style={{ height: '100%', width: '100%', }}
                        resizeMode='center'
                    />
                </TouchableOpacity>
                <ScrollView style={styles.textContainer} horizontal={true} showsHorizontalScrollIndicator={false}>

                    {/* <Text numberOfLines={1} style={styles.text}>{storeName}  {userId}</Text> */}
                    <Text numberOfLines={1} style={styles.text}>NanoPos</Text>
                </ScrollView>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Switch
                    value={isOnline}
                    onValueChange={handleToggle}
                    disabled={loading} // Disable the switch while the API call is in progress
                    style={{ marginRight: moderateScale(10) }}
                />
                <TouchableOpacity
                    // onPress={() => onPressRight()}
                    onPress={() => navigation.navigate(SearchBar)}
                    style={[{ height: moderateScale(35), width: moderateScale(35), alignSelf: 'center', }]}>
                    <Image
                        source={ImagePath.Magnifer}
                        style={{ height: '90%', width: '90%' }}
                        resizeMode='center'
                    />
                </TouchableOpacity>

            </View>

            {/* <View style={styles.bottom}>
                {userType == 'seller' ? null 

                    :
                    <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                        <Icon
                            name={'magnify'}
                            style={{ color: '#ECE447', fontSize: scale(35) }}
                        />
                    </TouchableOpacity>

                }

            </View> */}

        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        height: scale(50),
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(15),
        elevation: 8,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'pink',
        // width: '93.5%',
        flex: 1



    },
    textContainer: {
        // flex: 1,
        // width: '70%',
        // marginLeft: scale(5),
        // backgroundColor: 'green'
    },
    text: {
        fontSize: textScale(18),
        color: '#000',
        fontWeight: 'bold'
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
        // width: moderateScale(20),
        // backgroundColor: 'pink'

    }
})
