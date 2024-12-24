import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GetAllCoupanMethod, GetAllWalletMethod, GetMasterCategoryMethod, GetQRItemMethod, GetSubCategoryItemsMethod, GetSubCategoryMethod, GetgetSalesReportMethod } from '../../config/userApiMethods'

const Test = () => {
    const dispatch = useDispatch()

    return (
        <View style={{ gap: 30, flex: 1 }}>
            <Text>Test</Text>
            <Button title='GetAllWalletMethod' onPress={() => dispatch(GetAllCoupanMethod())} />
            <Button title='GetMasterCategoryMethod' onPress={() => dispatch(GetMasterCategoryMethod())} />
            <Button title='GetSubCategoryMethod' onPress={() => dispatch(GetSubCategoryMethod())} />
            <Button title='GetSubCategoryItemsMetho' onPress={() => dispatch(GetSubCategoryItemsMethod())} />
            <Button title='dispatchGetQRItemMethod' onPress={() => dispatch(GetQRItemMethod())} />
            <Button title='GetgetSalesReportMethod()' onPress={() => dispatch(GetgetSalesReportMethod())} />
            <Button title='GetSubCategoryItemsMethod()' onPress={() => dispatch(GetSubCategoryItemsMethod())} />
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})





