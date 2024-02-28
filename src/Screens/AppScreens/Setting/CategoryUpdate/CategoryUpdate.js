// import React, { useState } from 'react';
// import { StyleSheet, View } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import TextInputCompo from '../../../../Components/TextInputCompo';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';
// import { showToast } from '../../../../utils/toast';
// import { updateCategoryMethod } from '../../../../config/userApiMethods';

// const CategoryUpdate = ({ route }) => {
//     const { category } = route.params;
//     const { userId, storeId, saasId } = useSelector(state => state?.authReducer?.user?.user_data);
//     const { categoryData } = useSelector(state => state?.categoriesReducer);
//     const navigation = useNavigation();
//     const dispatch = useDispatch();
//     const filteredCategory = categoryData.filter(item => item.category_id === category);
//     const initialCategoryName = filteredCategory[0]?.category_name || '';

//     // console.log(filteredCategory)
//     const [inputs, setInputs] = useState({
//         saas_id: saasId,
//         store_id: storeId,
//         category: initialCategoryName,
//     });

//     const [errors, setErrors] = useState({
//         category: null,
//     });

//     const handleSubmit = async () => {
//         if (!inputs.category) {
//             showToast('Please Input category name');
//             return;
//         }
//         console.log('handle', inputs);
//         // Your logic for handling the submission
//         const resp = await dispatch(updateCategoryMethod(inputs, filteredCategory[0].category_id))
//         if (resp === true) {
//             navigation.goBack()
//         }
//     };

//     return (
//         <View>
//             <HeaderComp
//                 screenName={'Update Category'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//             />
//             <View style={{ height: '100%', marginTop: 16 }}>
//                 <TextInputCompo
//                     onChangeText={text => setInputs({ ...inputs, category: text })}
//                     iconName="shape-plus"
//                     placeholder="Enter Category Name"
//                     error={errors.category}
//                     value={inputs.category}
//                 />
//                 <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />
//             </View>
//         </View>
//     );
// };

// export default CategoryUpdate;

// const styles = StyleSheet.create({});




////
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonCompo from '../../../../Components/ButtonCompo';
import TextInputCompo from '../../../../Components/TextInputCompo';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { showToast } from '../../../../utils/toast';
import { updateCategoryMethod } from '../../../../config/userApiMethods';
import { launchImageLibrary } from 'react-native-image-picker';
import { moderateScale } from '../../../../styles/responsiveSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { BASE_URL } from '../../../../config/Base_Url';
import axios from 'axios';


const CategoryUpdate = ({ route }) => {
    const { category } = route.params;
    const { userId, storeId, saasId } = useSelector(state => state?.authReducer?.user?.user_data);
    const { categoryData } = useSelector(state => state?.categoriesReducer);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const imageData = selectedImage?.assets[0]
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
        if (resp?.status === true) {
            var categoryId = await resp?.data?.id
            console.log("<>", resp,categoryId)

            if (categoryId && categoryId?.toString().length > 0) {
                // console.log(categoryId);
                const url = `${BASE_URL}category/save-image-by-category/${categoryId}`
                imgUpload(url)
            } else {
                showToast("item_id is empty or undefined")
            }
            navigation.goBack()

        }
    };

    const imgUpload = async (url) => {

        const formData = new FormData();
        formData.append('file', {
            uri: imageData?.uri,
            name: imageData?.fileName,
            type: imageData?.type // Adjust according to your file type
        });

        // Axios POST request
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                // console.log('Success', response.data);
                setTimeout(() => {
                    setIsLoading(false)

                }, 2000)

            })
            .catch(error => {
                console.error('Error', error);
            });

    }




    const pickImage = async () => {
        setSelectedImage(null)
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,

            });

            if (result.didCancel) {
                // console.log('User cancelled image picker');
            } else if (result.error) {
                console.error('ImagePicker Error: ', result.error);
            } else {
                setSelectedImage(result);
                // console.log(result)
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    return (
        <View>
            <HeaderComp
                screenName={'Update Category'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
            />
            <View style={{ height: '100%', marginTop: 32, gap: 32, alignItems: 'center', }}>
                <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>
                    <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

                        {selectedImage ?

                            (
                                <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => pickImage()}>

                                    <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }}
                                        resizeMode='cover'
                                    />
                                </TouchableOpacity>


                            )
                            :
                            <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }} activeOpacity={0.8} onPress={() => pickImage()}>

                                <MaterialCommunityIcons name="account" size={123} color={'#ECE447'} />

                            </TouchableOpacity>

                        }

                    </View>
                </View>

                <View style={{ width: '100%' }}>

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
        </View>
    );
};

export default CategoryUpdate;

const styles = StyleSheet.create({});
``