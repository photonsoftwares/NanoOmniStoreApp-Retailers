////////////////
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { GetMasterCategoryMethod, deleteCategoryMethod, deleteMasterCategoryMethod } from '../../../../config/userApiMethods';
import HeaderComp from '../../../../Components/HeaderCompo';
import ImagePath from '../../../../constants/ImagePath';
import MyImgCompo from '../../../../Components/MyImgCompo';
import SubCategory from './SubCategory';
import NoDataFound from '../../../../Components/NoDataFound';
import Loader from '../../../../Components/Loader';
import CategoryUpdate from './CategoryUpdate';

const Category = () => {
    const { masterCategory } = useSelector((state) => state?.mainCategoryReducer);
    const [key, setKey] = useState(Date.now());
    const [loading, setLoading] = useState(true)

    const handleForceUpdate = () => {
        setKey(Date.now());
    };

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        const fetchMasterCategory = async () => {
            setLoading(true)
            dispatch(GetMasterCategoryMethod())
            setLoading(false)
        }
        fetchMasterCategory()
    }, [])

    useEffect(() => {
        handleForceUpdate();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            handleForceUpdate();
        }, [])
    );

    const handleDeletePress = async (item) => {
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
                        dispatch(deleteMasterCategoryMethod(item?.masterCategoryId));
                        // console.log("first",item)
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {
        // const imageUrl = `${item.image_path}?key=${key}`;
        const imageUrl = `https://posprdapi.photonsoftwares.com/prod/api/v1/Master-category/get-master-image/${item.masterCategoryId}?key=${key}`;

        return (
            <TouchableOpacity key={item?.masterCategoryId} activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee' }]}>
                <View style={styles.itemContainer}>
                    <View style={{
                        justifyContent: 'space-around', flexDirection: 'row', gap: 10,
                    }}>
                        
                        <MyImgCompo
                            imageUri={imageUrl}
                            ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5, backgroundColor: '#FFF' }}
                            resizeMode={'cover'}

                        />

                        {/* <Text style={[styles.categoryName, {}]} numberOfLines={2}>{item.category_name}   </Text> */}
                        <Text style={[styles.categoryName, {}]} numberOfLines={2}>{item.masterCategoryName}   </Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8 }}>

                        <TouchableOpacity onPress={() => navigation.push('SubCategory', { item: item })}>
                            <MaterialCommunityIcons name="shape-plus" size={26} color={'#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleDeletePress(item)}>
                            <MaterialCommunityIcons name="delete" size={26} color={'#000'} />
                        </TouchableOpacity>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    const handleCategoryPress = (category) => {
        // navigation.navigate('CategoryUpdate', { category: category.category_id });
        navigation.navigate('CategoryUpdate', { category: category });
    };

    // console.log("first",categoryData)
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComp
                screenName="Category"
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
                onPressLeftImage={ImagePath.plusIcon}
                onPressLeft={() => navigation.navigate('CategoryAdd')}
            />
            {
                masterCategory.length == 0 ?
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <NoDataFound text='No Category' />
                        </View>
                    </>
                    :
                    loading ?
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Loader isLoading={loading} />
                        </View>
                        :

                        <>
                            <FlatList
                                // data={categoryData || []}
                                data={masterCategory || []}
                                renderItem={renderItem}
                                keyExtractor={(item) => item.masterCategoryId.toString()}
                                showsHorizontalScrollIndicator={false}
                                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                                estimatedItemSize={50}
                            />
                        </>
            }

        </View>
    );
};

export default Category;

const styles = StyleSheet.create({
    itemContainer: {
        alignItems: 'center',
        marginRight: 10, // Add marginRight to create space between items
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    itemSeparator: {
        width: 10,
    },
    categoryName: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        alignSelf: 'center',
        color: '#000'
    },
    categoryButton: {
        borderRadius: 10,
        margin: 4,
        height: 60,
        flex: 1,
    },
});






