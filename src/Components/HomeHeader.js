
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import ImagePath from '../constants/ImagePath';
import SearchBar from './SearchBar';
import Profile from '../Screens/AppScreens/Profile/Profile';

const HomeHeader = () => {
    const { storeName } = useSelector(state => state?.authReducer?.user?.store_data);
    const userId = useSelector(state => state?.auth?.data?.customer_data?.id);
    const userType = useSelector(state => state?.auth?.data?.customer_data?.customerType
    );
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(Profile)}
                    style={[{ height: moderateScale(50), width: moderateScale(50), alignSelf: 'center', right: moderateScale(10) }]}

                >
                    <Image
                        source={ImagePath.retailer}
                        style={{ height: '100%', width: '100%', }}
                        resizeMode='cover'
                    />
                </TouchableOpacity>
                <ScrollView style={styles.textContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Text numberOfLines={1} style={styles.text}>{storeName}</Text>
                </ScrollView>
            </View>

            <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(SearchBar)}
                    style={[{ height: moderateScale(35), width: moderateScale(35), alignSelf: 'center', }]}>
                    <Image
                        source={ImagePath.Magnifer}
                        style={{ height: '90%', width: '90%' }}
                        resizeMode='center'
                    />
                </TouchableOpacity>

            </View>

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
        flex: 1
    },
    textContainer: {
    },
    text: {
        fontSize: textScale(16),
        color: '#000',
        fontWeight: 'bold'
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
