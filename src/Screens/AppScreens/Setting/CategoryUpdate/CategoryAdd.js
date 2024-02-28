// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState } from 'react';
// import TextInputCompo from '../../../../Components/TextInputCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import { showToast } from '../../../../utils/toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import { AddCategoryMethod } from '../../../../config/userApiMethods';

// const CategoryAdd = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const { categoryData, categoryCurrentPage } = useSelector((state) => state?.categoriesReducer)
//     const navigation = useNavigation()
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
//         // console.log("handle", inputs);
//         // Your logic for handling the submission
//         const resp = await dispatch(AddCategoryMethod(inputs))
//         if (resp === true) {
//             navigation.goBack()

//         }
//     };


//     // console.log("s", categoryData[0], storeId, saasId,)
//     return (
//         <View>
//             <HeaderComp
//                 screenName={'Add Category'}
//                 onBackPress={() => navigation.goBack()}
//                 onPressLefttrue={true}
//             />
//             <View style={{height:'100%',marginTop:16}}>

//                 <TextInputCompo
//                     onChangeText={(text) => handleOnChange(text, 'category')}
//                     onFocus={() => setErrors({ ...errors, category: null })}
//                     iconName="shape-plus"
//                     placeholder="Enter Category Name"
//                     // maxLength={10}
//                     error={errors.category}
//                 />
//                 <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />

//             </View>
//         </View>
//     );
// };



// export default CategoryAdd

// const styles = StyleSheet.create({})




///////////
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import TextInputCompo from '../../../../Components/TextInputCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../../../../Components/HeaderCompo';
import { AddCategoryMethod } from '../../../../config/userApiMethods';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../../../../styles/responsiveSize';
import axios from 'axios';
import { BASE_URL } from '../../../../config/Base_Url';


const CategoryAdd = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { categoryData, categoryCurrentPage } = useSelector((state) => state?.categoriesReducer)
    const [selectedImage, setSelectedImage] = useState(null);
    const imageData = selectedImage?.assets[0]
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation()
    const dispatch = useDispatch()


    const [inputs, setInputs] = useState({
        saas_id: saasId,
        store_id: storeId,
        category: '',
    });

    const [errors, setErrors] = useState({
        category: null,
    });

    const handleOnChange = (text, input) => {
        const updatedInputs = { ...inputs, [input]: text };
        setInputs(updatedInputs);
    };

    const handleSubmit = async () => {
        if (!inputs.category) {
            showToast("Please Input category name")
            return;
        }
        // console.log("handle", inputs);
        // Your logic for handling the submission
        const resp = await dispatch(AddCategoryMethod(inputs))
        if (resp?.status === true) {
            var categoryId = await resp?.data?.category_id
            // console.log("<>", resp,categoryId)

            if (categoryId && categoryId?.toString().length > 0) {
                console.log(categoryId);
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
                // showToast("Image  upload failed!")
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
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.error('ImagePicker Error: ', result.error);
            } else {
                setSelectedImage(result);
                console.log(result)
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };


    // console.log("s", categoryData[0], storeId, saasId,)
    // console.log("selectedImage", selectedImage)
    return (
        <View>
            <HeaderComp
                screenName={'Add Category'}
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
                        onChangeText={(text) => handleOnChange(text, 'category')}
                        onFocus={() => setErrors({ ...errors, category: null })}
                        iconName="shape-plus"
                        placeholder="Enter Category Name"
                        // maxLength={10}
                        error={errors.category}
                    />

                    <ButtonCompo onPress={handleSubmit} title="Submit" style={{}} />
                </View>
            </View>
        </View>
    );
};



export default CategoryAdd

const styles = StyleSheet.create({})