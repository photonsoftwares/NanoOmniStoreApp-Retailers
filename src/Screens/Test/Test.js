import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { GetAllCoupanMethod, GetAllWalletMethod, GetMasterCategoryMethod, GetQRItemMethod, GetSubCategoryItemsMethod, GetSubCategoryMethod, GetgetSalesReportMethod } from '../../config/userApiMethods'
import HomeSubeCategoryItem from '../../Components/HomeSubeCategoryItem'

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
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})





// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import CategoryList from '../../Components/CategoryList'

// const Test = () => {
//     return (
//         <View>
//             <Text>Test</Text>
//             <CategoryList />
//         </View>
//     )
// }

// export default Test

// const styles = StyleSheet.create({})

