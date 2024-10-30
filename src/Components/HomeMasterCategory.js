import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GetMainAndSubCategoryMethod, GetMasterCategoryMethod, GetSubCategoryItemsMethod, GetSubCategoryMethod } from '../config/userApiMethods'
import { useDispatch, useSelector } from 'react-redux'
import MyImgCompo from './MyImgCompo'
import HomeSubCategpry from './HomeSubCategpry'
import HomeSubeCategoryItem from './HomeSubeCategoryItem'
import { setSelectedMasterCategory, setSelectedSubCategory, setSubCategoryItemsPage } from '../ReduxToolkit/features/mainCategorySlice'
import { BASE_URL } from '../config/Base_Url'

const HomeMasterCategory = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMasterCategory = async () => {
            // setLoading(true)
            const resp = await dispatch(GetMasterCategoryMethod())
            // setLoading(false)
            console.log("resp", resp?.data[0]?.masterCategoryId)
            dispatch(setSelectedMasterCategory(resp?.data[0]?.masterCategoryId))

            const resp1 = await dispatch(GetSubCategoryMethod(resp?.data[0]?.masterCategoryId))
            dispatch(setSelectedSubCategory(resp1?.data[0]?.category))
            const resp2 = await dispatch(GetSubCategoryItemsMethod(resp1?.data[0]?.category))
            // console.log("resp", resp, "..................", resp1, "..................", resp2)
        }
        fetchMasterCategory()
    }, [])

    const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
    // console.log("HomeMasterCategory", masterCategory, selectedMasterCategory, "......................", subCategory)

    const handleCategoryPress = (category) => {
        dispatch(setSubCategoryItemsPage(1))

        // Handle category press here
        console.log('Category Pressed:', category?.masterCategoryId);
        // dispatch(setCurrentCategoryItemPage(1))
        dispatch(setSelectedMasterCategory(category?.masterCategoryId))

        // dispatch(GetSelectedCategoryItemsMethod(category?.category_name))
        dispatch(GetSubCategoryMethod(category?.masterCategoryId))
        // dispatch(GetMainAndSubCategoryMethod)

    };

    const renderHomeMasterCategory = ({ item }) => (

        <TouchableOpacity onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.masterCategoryId == selectedMasterCategory ? '#ECE447' : '#eee', }]}>
            <View style={styles.itemContainer}>
                <View style={{ borderRadius: 200, height: 60, width: 70, overflow: 'hidden' }}>
                    <MyImgCompo
                        imageUri={`${BASE_URL}Master-category/get-master-image/${item.masterCategoryId}?key=${new Date()}`}
                        ImgCompoStyle={{ height: 60, width: 60, paddingHorizontal: 10, marginLeft: 8, borderRadius: 200 }}
                        resizeMode='cover'
                    />
                </View>
                <Text style={styles.categoryName} numberOfLines={2}>{item.masterCategoryName}</Text>
            </View>
        </TouchableOpacity>
    );
    const ItemSeparator = () => <View style={styles.itemSeparator} />;



    return (
        <View style={{ flex: 1 }}>

            <View style={{ width: '100%', }}>
                <FlatList
                    data={masterCategory || []}
                    horizontal
                    renderItem={renderHomeMasterCategory}
                    keyExtractor={(item) => item.masterCategoryId.toString()}
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={ItemSeparator}
                    estimatedItemSize={50}
                />
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 4, height: '100%', width: '100%' }}>
                <HomeSubCategpry />

                <View style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
                    <HomeSubeCategoryItem />
                </View>
            </View>
        </View>
    )
}

export default HomeMasterCategory

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        marginRight: 10, // Add marginRight to create space between items

    },
    itemSeparator: {
        width: 10, // Adjust the width according to your desired space between items
    },
    categoryName: {
        marginTop: 2,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    categoryButton: {
        borderRadius: 10,
        padding: 2,
        justifyContent: 'center',
        // width: 120,
        width: 100,
    },
});
