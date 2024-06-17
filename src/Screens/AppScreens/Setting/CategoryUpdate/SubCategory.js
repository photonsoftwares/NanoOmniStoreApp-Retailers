import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { GetSubCategoryMethod, deleteCategoryMethod } from '../../../../config/userApiMethods';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import ImagePath from '../../../../constants/ImagePath';
import MyImgCompo from '../../../../Components/MyImgCompo';
import NoDataFound from '../../../../Components/NoDataFound';
import Loader from '../../../../Components/Loader';
import { BASE_URL } from '../../../../config/Base_Url';

const SubCategory = (props) => {
    const { masterCategoryId } = props?.route?.params?.item
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
    const { subCategory, subCategoryItems, selectedSubCategory } = useSelector((state) => state?.mainCategoryReducer);
    const [loading, setLoading] = useState(true)
    let url = `${BASE_URL}category/get-category-image/}`
    // let url = `${BASE_URL}item/get-image/}`

    const [key, setKey] = useState(Date.now());
    // console.log("first", masterCategoryId, subCategory.length)

    const handleForceUpdate = () => {
        setKey(Date.now());
    };

    const dispatch = useDispatch()
    const navigation = useNavigation()


    useEffect(() => {
        const fetchMasterCategory = async () => {
            setLoading(true)
            dispatch(GetSubCategoryMethod(masterCategoryId))
            setLoading(false)
        }
        fetchMasterCategory()
    }, [])

    useEffect(() => {
        handleForceUpdate();
    }, []);

    const handleDeletePress = async (item) => {
        console.log(item?.id, item)

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
                        dispatch(deleteCategoryMethod(item?.id, masterCategoryId))
                    },
                },
            ],
            { cancelable: false }
        );
    }

    const ItemSeparator = () => <View style={styles.itemSeparator} />;
    const renderItem = ({ item }) => {
        // const imageUrl = `${BASE_URL}category/get-category-image/${item.id}?key=${key}`;
        const imageUrl = `${BASE_URL}category/get-category-image/${item.id}?key=${new Date()}`;


        return (

            <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee', }]}>
                <View style={styles.itemContainer}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>

                        {/* <MyImgCompo
                            // imageUri={item.image_path}
                            // imageUri={`${item.image_path}?key=${key}`}
                            imageUri={`${url}/${item.id}`}
                            ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
                        /> */}

                        <MyImgCompo
                            imageUri={imageUrl}
                            ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5, backgroundColor: '#FFF' }}
                            resizeMode={'cover'}
                        />

                        {/* <MyImgCompo
                            imageUri={imageUrl}
                            ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5, backgroundColor: '#FFF' }}
                        /> */}

                        {/* <Image
                            source={{ uri: `${item.image_path}?key=${new Date()}` }}
                            style={{ height: 60, width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
                        /> */}

                        <Text style={styles.categoryName} numberOfLines={2}>{item.category}</Text>
                        {/* <Text style={styles.categoryName} numberOfLines={2}>{`${url}/${item.id}?key=${key}`}</Text> */}
                    </View>
                    <TouchableOpacity onPress={() => handleDeletePress(item)}>
                        <MaterialCommunityIcons name="delete" size={26} />
                    </TouchableOpacity>


                </View>
            </TouchableOpacity>
        );
    }
    const handleCategoryPress = (category) => {
        console.log('Category Pressed:', category);
        navigation.navigate('SubCategoryUpdate', { category: category?.id, masterCategoryId: masterCategoryId })

    };



    console.log("subCategory.", subCategory,)
    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <HeaderComp
                screenName='Sub-Category'
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.push('SubCategoryAdd', { masterCategoryId: masterCategoryId })}
            // onPressLeft={() => handleCategoryPress()}


            />

            {
                subCategory?.length == 0 ?
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <NoDataFound text='No Sub-Category' />
                        </View>
                    </>
                    :
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader isLoading={loading} />
                        </View>
                        :
                        <FlatList
                            // data={categoryData || []}
                            data={subCategory || []}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={ItemSeparator}
                            estimatedItemSize={50}
                        />
            }


        </View>
    );
};

export default SubCategory;

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
        alignSelf: 'flex-start',
        alignSelf: 'center'
    },
    categoryButton: {
        borderRadius: 10,
        // padding: 16,
        margin: 4,
        height: 60,
        flex: 1,
    },
});







