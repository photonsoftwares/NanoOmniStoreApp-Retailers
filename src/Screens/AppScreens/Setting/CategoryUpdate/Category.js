import { Alert, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TextInputCompo from '../../../../Components/TextInputCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory } from '../../../../ReduxToolkit/features/categoriesSlice';
import { GetSelectedCategoryItemsMethod, deleteCategoryMethod } from '../../../../config/userApiMethods';
import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../../../../constants/ImagePath';

const Category = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
    const dispatch = useDispatch()
    const navigation = useNavigation()


    const handleDeletePress = async (item) => {
        // console.log(item?.category_id,)

        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Delete canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        console.log('Delete confirmed');
                        // Your logic for handling the delete action
                        dispatch(deleteCategoryMethod(item?.category_id))
                    },
                },
            ],
            { cancelable: false }
        );
    }


    const ItemSeparator = () => <View style={styles.itemSeparator} />;
    const renderItem = ({ item }) => (
        // <TouchableOpacity disabled onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.category_name === selectedCategory ? '#ECE447' : '#eee', }]}>
        <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee', }]}>
            <View style={styles.itemContainer}>
                <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
                <TouchableOpacity onPress={() => handleDeletePress(item)}>
                    <MaterialCommunityIcons name="delete" size={26} />
                </TouchableOpacity>


            </View>
        </TouchableOpacity>
    );
    const handleCategoryPress = (category) => {
        // console.log('Category Pressed:', category);
        navigation.navigate('CategoryUpdate', { category: category.category_id })

    };



    // console.log("s", categoryData[0], storeId, saasId,)
    return (
        <View style={{ flex: 1,backgroundColor:"white" }}>
            <HeaderComp
                screenName='Category'
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate('CategoryAdd')}


            />

            <FlatList
                data={categoryData || []}
                renderItem={renderItem}
                keyExtractor={(item) => item.category_id.toString()}
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={ItemSeparator}
                estimatedItemSize={50}
            />

            {/* <TextInputCompo
                onChangeText={(text) => handleOnChange(text, 'category')}
                onFocus={() => setErrors({ ...errors, category: null })}
                iconName="shape-plus"
                placeholder="Enter Category Name"
                maxLength={10}
                error={errors.category}
            />
            <ButtonCompo onPress={handleSubmit} title="Update Category" style={{}} /> */}
        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        marginRight: 10, // Add marginRight to create space between items
        justifyContent: 'space-between',
        flexDirection: 'row'

    },
    itemSeparator: {
        width: 10,
    },
    categoryName: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    },
    categoryButton: {
        borderRadius: 10,
        padding: 16,
        margin: 8,
        flex: 1,
    },
});


