import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlashList } from "@shopify/flash-list";
import { GetSelectedCategoryItemsMethod } from '../config/userApiMethods';
import { setCurrentCategoryPage, setSelectedCategory } from '../ReduxToolkit/features/categoriesSlice';
import { setCurrentCategoryItemPage } from '../ReduxToolkit/features/categoryItemsSlice';

const CategoryList = () => {
    const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer);
    const { categoryItemsData, categoryItemsCurrentPage } = useSelector((state) => state?.categoryItemsReducer)

    // console.log("selectedCategory",selectedCategory)

    const dispatch = useDispatch()

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.category_name === selectedCategory ? '#ECE447' : '#eee', }]}>
            <View style={styles.itemContainer}>
                <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleCategoryPress = (category) => {
        // Handle category press here
        // console.log('Category Pressed:', category?.category_name);
        dispatch(setCurrentCategoryItemPage(1))
        dispatch(setSelectedCategory(category?.category_name))
        dispatch(GetSelectedCategoryItemsMethod(category?.category_name))

    };

    const ItemSeparator = () => <View style={styles.itemSeparator} />;

    const handleEndReached = () => {
        console.log("first", categoryItemsCurrentPage, selectedCategory)
        dispatch(setCurrentCategoryItemPage(categoryItemsCurrentPage + 1))
        dispatch(GetSelectedCategoryItemsMethod(selectedCategory))


    }

    return (
        <>
            {/* <FlashList */}
            <FlatList
                data={categoryData || []}
                horizontal
                renderItem={renderItem}
                keyExtractor={(item) => item.category_id.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparator}
                estimatedItemSize={50}

            // onEndReached={handleEndReached}
            // onEndReachedThreshold={0.5}

            />
        </>
    );
};

export default CategoryList;

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
        // backgroundColor: '#eee',
        borderRadius: 10,
        padding: 4,
        width: 120, // Set a fixed width for the button container
        // marginHorizontal: 8
        justifyContent:'center'
    },
});
