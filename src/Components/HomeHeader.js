
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Switch } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { moderateScale, scale, textScale } from '../styles/responsiveSize';
import ImagePath from '../constants/ImagePath';
import SearchBar from './SearchBar';
import Profile from '../Screens/AppScreens/Profile/Profile';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateOnlineStatusMethod } from '../config/userApiMethods'


const HomeHeader = () => {
    const { storeName } = useSelector(state => state?.authReducer?.user?.store_data);
    const userId = useSelector(state => state?.auth?.data?.customer_data?.id);
    const { storeId } = useSelector((state) => state?.authReducer?.user?.user_data)
    const userType = useSelector(state => state?.auth?.data?.customer_data?.customerType
    );

    const dispatch = useDispatch();
    const [isOnline, setIsOnline] = useState(false);
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);


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

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Switch
                    value={isOnline}
                    onValueChange={handleToggle}
                    disabled={loading} // Disable the switch while the API call is in progress
                    style={{ marginRight: moderateScale(10) }}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate(SearchBar)}
                    style={[{ height: moderateScale(35), width: moderateScale(35), alignSelf: 'center', }]}>
                    <Icon name="magnify" style={{ color: 'grey', fontSize: 30, marginRight: 8 }} />

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
