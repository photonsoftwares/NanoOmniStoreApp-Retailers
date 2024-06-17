import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ServicesList from '../Home/Services/Services'
import commonStyles from '../../../styles/commonStyles'
import HeaderComp from '../../../Components/HeaderCompo'
import { useNavigation } from '@react-navigation/native'
import AddProducts from './AddProducts/AddProducts'
import ImagePath from '../../../constants/ImagePath'

const Products = () => {
    const navigation = useNavigation()
    return (
        <>
            <HeaderComp
                screenName={'All Products'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate('AddProducts')}
            />
            <View style={[styles.container]}>
                <ServicesList ProductsScreen={true} />
            </View>
        </>
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        flex: 1
    }
})