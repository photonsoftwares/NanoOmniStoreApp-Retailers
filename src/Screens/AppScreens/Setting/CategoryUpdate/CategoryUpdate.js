// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import TextInputCompo from '../../../../Components/TextInputCompo'
// import ButtonCompo from '../../../../Components/ButtonCompo';

// const CategoryUpdate = () => {
//     const [inputs, setInputs] = useState({
//         saas_id: '',
//         store_id: '',
//         category: '',
//     });
//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     const handleOnChange = (text, input) => {
//         const updatedInputs = { ...inputs, [input]: text };
//         setInputs(updatedInputs);

//     };

//     const handleSubmit = async () => {

//         console.log("handle", inputs)
//     }

//     return (
//         <View>
//             <Text>CategoryUpdate</Text>
//             <TextInputCompo
//                 onChangeText={(text) => handleOnChange(text, 'category')}
//                 onFocus={() => setErrors({ ...errors, storeId: null })}
//                 iconName="phone"
//                 placeholder="Enter Store Id"
//                 maxLength={10}
//                 keyboardType="number-pad"
//                 error={errors.category}

//             />
//             <ButtonCompo onPress={() => handleSubmit()} title="Update Category" style={{}} />

//         </View>
//     )
// }

// export default CategoryUpdate

// const styles = StyleSheet.create({})









// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import TextInputCompo from '../../../../Components/TextInputCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { showToast } from '../../../../utils/toast';
// import { useSelector } from 'react-redux';

// const CategoryUpdate = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage } = useSelector((state) => state?.categoriesReducer)

//     const [inputs, setInputs] = useState({
//         saas_id: saasId,
//         store_id: storeId,
//         category: '',
//     });

//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     const handleOnChange = (text, input) => {
//         const updatedInputs = { ...inputs, [input]: text };
//         setInputs(updatedInputs);
//     };

//     const handleSubmit = async () => {
//         if (!inputs.category) {
//             showToast("Please Input category name")
//             return;
//         }
//         console.log("handle", inputs);
//         // Your logic for handling the submission
//     };


//     console.log("s", categoryData[0],storeId, saasId,)
//     return (
//         <View>
//             <TextInputCompo
//                 onChangeText={(text) => handleOnChange(text, 'category')}
//                 onFocus={() => setErrors({ ...errors, category: null })}
//                 iconName="shape-plus"
//                 placeholder="Enter Category Name"
//                 maxLength={10}
//                 error={errors.category}
//             />
//             <ButtonCompo onPress={handleSubmit} title="Update Category" style={{}} />
//         </View>
//     );
// };

// export default CategoryUpdate;

// const styles = StyleSheet.create({});







// import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import React, { useState } from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// import TextInputCompo from '../../../../Components/TextInputCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { showToast } from '../../../../utils/toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedCategory } from '../../../../ReduxToolkit/features/categoriesSlice';
// import { GetSelectedCategoryItemsMethod } from '../../../../config/userApiMethods';
// import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
// import HeaderComp from '../../../../Components/HeaderCompo';

// const CategoryUpdate = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
//     const dispatch = useDispatch()


//     const [inputs, setInputs] = useState({
//         saas_id: saasId,
//         store_id: storeId,
//         category: '',
//     });

//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     const handleOnChange = (text, input) => {
//         const updatedInputs = { ...inputs, [input]: text };
//         setInputs(updatedInputs);
//     };

//     const handleSubmit = async () => {
//         if (!inputs.category) {
//             showToast("Please Input category name")
//             return;
//         }
//         console.log("handle", inputs);
//         // Your logic for handling the submission
//     };
//     const handleDeletePress = async () => {

//         console.log("handleDeletePress",);
//         // Your logic for handling the submission
//     };

//     const ItemSeparator = () => <View style={styles.itemSeparator} />;
//     const renderItem = ({ item }) => (
//         // <TouchableOpacity disabled onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: item.category_name === selectedCategory ? '#ECE447' : '#eee', }]}>
//         <TouchableOpacity disabled onPress={() => handleCategoryPress(item)} style={[styles.categoryButton, { backgroundColor: '#eee', }]}>
//             <View style={styles.itemContainer}>
//                 <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
//                 {/* {item.category_name === selectedCategory ?
//                     <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text>
//                     : null
//                 } */}
//                 {/* <Text style={styles.categoryName} numberOfLines={2}>{item.category_name}</Text> */}
//                 <TouchableOpacity onPress={() => handleDeletePress(item)}>
//                     <MaterialCommunityIcons name="delete" size={26} />
//                 </TouchableOpacity>


//             </View>
//         </TouchableOpacity>
//     );
//     const handleCategoryPress = (category) => {
//         console.log('Category Pressed:', category?.category_name);
//         dispatch(setCurrentCategoryItemPage(1))
//         dispatch(setSelectedCategory(category?.category_name))
//         dispatch(GetSelectedCategoryItemsMethod(category?.category_name))

//     };



//     // console.log("s", categoryData[0], storeId, saasId,)
//     return (
//         <View style={{ flex: 1, }}>
//             <HeaderComp
//                 screenName='Add Category'
//                 onBackPress={() => navigation.goBack()}

//             />

//             <FlatList
//                 data={categoryData || []}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.category_id.toString()}
//                 showsHorizontalScrollIndicator={false}
//                 ItemSeparatorComponent={ItemSeparator}
//                 estimatedItemSize={50}
//             />

//             {/* <TextInputCompo
//                 onChangeText={(text) => handleOnChange(text, 'category')}
//                 onFocus={() => setErrors({ ...errors, category: null })}
//                 iconName="shape-plus"
//                 placeholder="Enter Category Name"
//                 maxLength={10}
//                 error={errors.category}
//             />
//             <ButtonCompo onPress={handleSubmit} title="Update Category" style={{}} /> */}
//         </View>
//     );
// };

// export default CategoryUpdate;

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
//         alignSelf: 'flex-start'
//     },
//     categoryButton: {
//         borderRadius: 10,
//         padding: 16,
//         margin: 8,
//         flex: 1,
//     },
// });




// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import TextInputCompo from '../../../../Components/TextInputCompo';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { showToast } from '../../../../utils/toast';

// const CategoryUpdate = ({ route }) => {
//     const { category } = route.params;
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
//     const navigation = useNavigation()
//     const dispatch = useDispatch()
//     const filterdCategory = categoryData.filter(item => item.category_id === category)
//     console.log("first", category, filterdCategory)

//     const [inputs, setInputs] = useState({
//         saas_id: saasId,
//         store_id: storeId,
//         category: '',
//         // category: filterdCategory[0]?.category_name,
//     });

//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     const handleOnChange = (text, input) => {
//         const updatedInputs = { ...inputs, [input]: text };
//         setInputs(updatedInputs);
//     };

//     const handleSubmit = async () => {
//         if (!inputs.category) {
//             showToast("Please Input category name")
//             return;
//         }
//         console.log("handle", inputs);
//         // Your logic for handling the submission
//         // const resp = await dispatch(AddCategoryMethod(inputs))
//         // if (resp === true) {
//         //     navigation.goBack()

//         // }
//     };

//     // console.log("first",filterdCategory[0]?.category_name)
//     return (
//         <View>
//             <HeaderComp
//                 screenName={'Update Category'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//             />
//             <View style={{ height: '100%', marginTop: 16 }}>

//                 <TextInputCompo
//                     onChangeText={(text) => handleOnChange(text, 'category')}
//                     // onFocus={() => setErrors({ ...errors, category: null })}
//                     iconName="shape-plus"
//                     placeholder="Enter Category Name"
//                     error={errors.category}
//                     value={filterdCategory[0]?.category_name}
//                 />
//                 <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />

//             </View>
//         </View>
//     )
// }

// export default CategoryUpdate

// const styles = StyleSheet.create({})





//not woring

// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import TextInputCompo from '../../../../Components/TextInputCompo';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { showToast } from '../../../../utils/toast';

// const CategoryUpdate = ({ route }) => {
//     const { category } = route.params;
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage, selectedCategory } = useSelector((state) => state?.categoriesReducer)
//     const navigation = useNavigation()
//     const dispatch = useDispatch()
//     const filterdCategory = categoryData.filter(item => item.category_id === category)
//     console.log("first", category, filterdCategory)

//     const [inputs, setInputs] = useState({
//         saas_id: saasId,
//         store_id: storeId,
//         category: '',
//         // category: filterdCategory[0]?.category_name,
//     });

//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     // const handleOnChange = (text, input) => {
//     //     const updatedInputs = { ...inputs, [input]: text };
//     //     setInputs(updatedInputs);
//     // };

//     const handleSubmit = async () => {
//         if (!inputs.category) {
//             showToast("Please Input category name")
//             return;
//         }
//         console.log("handle", inputs);
//         // Your logic for handling the submission
//         // const resp = await dispatch(AddCategoryMethod(inputs))
//         // if (resp === true) {
//         //     navigation.goBack()

//         // }
//     };

//     // console.log("first",filterdCategory[0]?.category_name)
//     return (
//         <View>
//             <HeaderComp
//                 screenName={'Update Category'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//             />
//             <View style={{ height: '100%', marginTop: 16 }}>

//                 <TextInputCompo
//                     onChangeText={(text) => inputs.category(text)}
//                     // onFocus={() => setErrors({ ...errors, category: null })}
//                     iconName="shape-plus"
//                     placeholder="Enter Category Name"
//                     error={errors.category}
//                     value={filterdCategory[0]?.category_name}
//                 />
//                 <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />

//             </View>
//         </View>
//     )
// }

// export default CategoryUpdate

// const styles = StyleSheet.create({})



import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonCompo from '../../../../Components/ButtonCompo';
import TextInputCompo from '../../../../Components/TextInputCompo';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../../../utils/toast';
import { updateCategoryMethod } from '../../../../config/userApiMethods';

const CategoryUpdate = ({ route }) => {
    const { category } = route.params;
    const { userId, storeId, saasId } = useSelector(state => state?.authReducer?.user?.user_data);
    const { categoryData } = useSelector(state => state?.categoriesReducer);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const filteredCategory = categoryData.filter(item => item.category_id === category);
    const initialCategoryName = filteredCategory[0]?.category_name || '';

    // console.log(filteredCategory)
    const [inputs, setInputs] = useState({
        saas_id: saasId,
        store_id: storeId,
        category: initialCategoryName,
    });

    const [errors, setErrors] = useState({
        category: null,
    });

    const handleSubmit = async () => {
        if (!inputs.category) {
            showToast('Please Input category name');
            return;
        }
        console.log('handle', inputs);
        // Your logic for handling the submission
        const resp = await dispatch(updateCategoryMethod(inputs, filteredCategory[0].category_id))
        if (resp === true) {
            navigation.goBack()
        }
    };

    return (
        <View>
            <HeaderComp
                screenName={'Update Category'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
            />
            <View style={{ height: '100%', marginTop: 16 }}>
                <TextInputCompo
                    onChangeText={text => setInputs({ ...inputs, category: text })}
                    iconName="shape-plus"
                    placeholder="Enter Category Name"
                    error={errors.category}
                    value={inputs.category}
                />
                <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />
            </View>
        </View>
    );
};

export default CategoryUpdate;

const styles = StyleSheet.create({});
``