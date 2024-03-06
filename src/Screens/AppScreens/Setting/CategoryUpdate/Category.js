// import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import TextInputCompo from '../../../../Components/TextInputCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { showToast } from '../../../../utils/toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategory } from '../../../../ReduxToolkit/features/categoriesSlice';
// import { GetCategoryItemMethod, GetSelectedCategoryItemsMethod, deleteCategoryMethod } from '../../../../config/userApiMethods';
// import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import ImagePath from '../../../../constants/ImagePath';
// import MyImgCompo from '../../../../Components/MyImgCompo';

// const Category = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)


//     const dispatch = useDispatch()
//     const navigation = useNavigation()

//     // useFocusEffect(() => {
//     //     dispatch(GetCategoryItemMethod() )
//     // }, [])

//     // useEffect(() => {
//     //     dispatch(GetCategoryItemMethod())
//     // }, [categoryData])





//     const handleDeletePress = async (item) => {
//         // console.log(item?.category_id,)

//         Alert.alert(
//             'Confirm Delete',
//             'Are you sure you want to delete?',
//             [
//                 {
//                     text: 'Cancel',
//                     onPress: () => console.log('Delete canceled'),
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Delete',
//                     onPress: () => {
//                         console.log('Delete confirmed');
//                         // Your logic for handling the delete action
//                         dispatch(deleteCategoryMethod(item?.category_id))
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     }


//     const ItemSeparator = () => <View style={styles.itemSeparator} />;
//     const renderItem = ({ item }) => (

//         // <TouchableOpacity disabled onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.category_name === selectedCategory ? '#ECE447' : '#eee', }]}>
//         <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee', }]}>
//             <View style={styles.itemContainer}>
//                 <View style={{ flexDirection: 'row', gap: 10 }}>
//                     <MyImgCompo
//                         // imageUri={item.image_path}
//                         imageUri={`${item.image_path}?key=${new Date()}`}
//                         ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
//                     />

//                     {/* <Image
//                         source={{ uri: `${item.image_path}?key=${new Date()}` }}
//                         style={{ height: 60, width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
//                     /> */}

//                     <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => handleDeletePress(item)}>
//                     <MaterialCommunityIcons name="delete" size={26} />
//                 </TouchableOpacity>


//             </View>
//         </TouchableOpacity>
//     );
//     const handleCategoryPress = (category) => {
//         // console.log('Category Pressed:', category);
//         navigation.navigate('CategoryUpdate', { category: category.category_id })

//     };



//     console.log("s", categoryData[0], storeId, saasId,)
//     return (
//         <View style={{ flex: 1, backgroundColor: "white" }}>
//             <HeaderComp
//                 screenName='Category'
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//                 onPressLeftImage={ImagePath.plusIcon}
//                 onPressLeft={() => navigation.navigate('CategoryAdd')}


//             />

//             <FlatList
//                 data={categoryData || []}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.category_id.toString()}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={ItemSeparator}
//                 estimatedItemSize={50}
//             />

//         </View>
//     );
// };

// export default Category;

// const styles = StyleSheet.create({
//     itemContainer: {
//         alignItems: 'center',
//         marginRight: 10, // Add marginRight to create space between items
//         justifyContent: 'space-between',
//         flexDirection: 'row'

//     },
//     itemSeparator: {
//         width: 10,
//     },
//     categoryName: {
//         marginTop: 2,
//         fontSize: 16,
//         fontWeight: 'bold',
//         alignSelf: 'flex-start',
//         alignSelf: 'center'
//     },
//     categoryButton: {
//         borderRadius: 10,
//         // padding: 16,
//         margin: 4,
//         height: 60,
//         flex: 1,
//     },
// });







///////////////

// import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import { useDispatch, useSelector } from 'react-redux';
// import { deleteCategoryMethod } from '../../../../config/userApiMethods';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useFocusEffect, useNavigation } from '@react-navigation/native';
// import ImagePath from '../../../../constants/ImagePath';
// import MyImgCompo from '../../../../Components/MyImgCompo';

// const Category = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
//     const [key, setKey] = useState(Date.now());

//     const handleForceUpdate = () => {
//         setKey(Date.now());
//     };

//     const dispatch = useDispatch()
//     const navigation = useNavigation()




//     useEffect(() => {
//         handleForceUpdate();
//     }, []);




//     const handleDeletePress = async (item) => {
//         // console.log(item?.category_id,)

//         Alert.alert(
//             'Confirm Delete',
//             'Are you sure you want to delete?',
//             [
//                 {
//                     text: 'Cancel',
//                     onPress: () => console.log('Delete canceled'),
//                     style: 'cancel',
//                 },
//                 {
//                     text: 'Delete',
//                     onPress: () => {
//                         console.log('Delete confirmed');
//                         // Your logic for handling the delete action
//                         dispatch(deleteCategoryMethod(item?.category_id))
//                     },
//                 },
//             ],
//             { cancelable: false }
//         );
//     }


//     const ItemSeparator = () => <View style={styles.itemSeparator} />;
//     const renderItem = ({ item }) => (

//         // <TouchableOpacity disabled onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.category_name === selectedCategory ? '#ECE447' : '#eee', }]}>
//         <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee', }]}>
//             <View style={styles.itemContainer}>
//                 <View style={{ flexDirection: 'row', gap: 10 }}>
//                     <MyImgCompo
//                         // imageUri={item.image_path}
//                         imageUri={`${item.image_path}?key=${key}`}
//                         ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
//                     />

//                     {/* <Image
//                         source={{ uri: `${item.image_path}?key=${new Date()}` }}
//                         style={{ height: 60, width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 }}
//                     /> */}

//                     <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
//                 </View>
//                 <TouchableOpacity onPress={() => handleDeletePress(item)}>
//                     <MaterialCommunityIcons name="delete" size={26} />
//                 </TouchableOpacity>


//             </View>
//         </TouchableOpacity>
//     );
//     const handleCategoryPress = (category) => {
//         // console.log('Category Pressed:', category);
//         navigation.navigate('CategoryUpdate', { category: category.category_id })

//     };



//     console.log("s", categoryData[0], storeId, saasId,)
//     return (
//         <View style={{ flex: 1, backgroundColor: "white" }}>
//             <HeaderComp
//                 screenName='Category'
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//                 onPressLeftImage={ImagePath.plusIcon}
//                 onPressLeft={() => navigation.navigate('CategoryAdd')}


//             />

//             <FlatList
//                 data={categoryData || []}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.category_id.toString()}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={ItemSeparator}
//                 estimatedItemSize={50}
//             />

//         </View>
//     );
// };

// export default Category;

// const styles = StyleSheet.create({
//     itemContainer: {
//         alignItems: 'center',
//         marginRight: 10, // Add marginRight to create space between items
//         justifyContent: 'space-between',
//         flexDirection: 'row'

//     },
//     itemSeparator: {
//         width: 10,
//     },
//     categoryName: {
//         marginTop: 2,
//         fontSize: 16,
//         fontWeight: 'bold',
//         alignSelf: 'flex-start',
//         alignSelf: 'center'
//     },
//     categoryButton: {
//         borderRadius: 10,
//         // padding: 16,
//         margin: 4,
//         height: 60,
//         flex: 1,
//     },
// });




////////////////
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryMethod } from '../../../../config/userApiMethods';
import HeaderComp from '../../../../Components/HeaderCompo';
import ImagePath from '../../../../constants/ImagePath';
import MyImgCompo from '../../../../Components/MyImgCompo';

const Category = () => {
    const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
    const { categoryData, selectedCategory } = useSelector((state) => state?.categoriesReducer);
    const [key, setKey] = useState(Date.now());

    const handleForceUpdate = () => {
        setKey(Date.now());
    };

    const dispatch = useDispatch();
    const navigation = useNavigation();

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
                        dispatch(deleteCategoryMethod(item?.category_id));
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const renderItem = ({ item }) => {
        const imageUrl = `${item.image_path}?key=${key}`;

        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee' }]}>
                <View style={styles.itemContainer}>
                    <View style={{
                        justifyContent: 'space-around', flexDirection: 'row', gap: 10,
                        //  borderRadius: 60, height: 50, width: 70, overflow: 'hidden'
                        // backgroundColor: '#FFF'
                    }}>
                        <MyImgCompo
                            imageUri={imageUrl}
                            ImgCompoStyle={{ height: '100%', width: 60, borderRadius: 4, paddingHorizontal: 10, marginLeft: 8, borderWidth: 0.5 , backgroundColor: '#FFF'}}

                        />
                        <Text style={[styles.categoryName, {  }]} numberOfLines={2}>{item.category_name}   </Text>
                    </View>

                    <TouchableOpacity onPress={() => handleDeletePress(item)}>
                        <MaterialCommunityIcons name="delete" size={26} />
                    </TouchableOpacity>

                </View>
            </TouchableOpacity>
        );
    };

    const handleCategoryPress = (category) => {
        navigation.navigate('CategoryUpdate', { category: category.category_id });
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderComp
                screenName="Category"
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
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
                estimatedItemSize={50}
            />
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
    },
    categoryButton: {
        borderRadius: 10,
        margin: 4,
        height: 60,
        flex: 1,
    },
});






