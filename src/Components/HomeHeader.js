
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

import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import ImagePath from '../constants/ImagePath';
import SearchBar from './SearchBar';
import Profile from '../Screens/AppScreens/Profile/Profile';

const HomeHeader = () => {
    // const storeName = useSelector(state => state?.auth?.data?.store_name);
    const {storeName} = useSelector(state => state?.authReducer?.user?.store_data);
    const userId = useSelector(state => state?.auth?.data?.customer_data?.id);
    const userType = useSelector(state => state?.auth?.data?.customer_data?.customerType
    );
    const navigation = useNavigation()

    console.log("storenammoe", storeName)
    // console.log("storenammoe", userType)
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
                    <Text numberOfLines={1} style={styles.text}>{storeName}</Text>
                </ScrollView>
            </View>

            <View style={{ justifyContent: 'center' }}>
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
        fontSize: textScale(16),
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
