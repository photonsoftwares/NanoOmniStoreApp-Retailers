// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet,  Image, ScrollView } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { useDispatch, useSelector } from 'react-redux';
// import HeaderComp from '../../../../../Components/HeaderCompo';
// import { GetCategoryItemMethod, GetCategoryMethod, GetSearchItemsMethod, GetSelectedCategoryItemsMethod, ItemUpdateMethod, RecommendedItemMethod, uploadImageMethod } from '../../../../../config/userApiMethods';
// import { useNavigation } from '@react-navigation/native';
// import { moderateScale } from '../../../../../styles/responsiveSize';
// import { showMessage } from 'react-native-flash-message';
// import axios from 'axios';
// import { BASE_URL } from '../../../../../config/Base_Url';
// import Loader from '../../../../../Components/Loader';
// import Home from '../../Home';
// import CustomDropDown from '../../../../../Components/CustomDropDown';

// const UpdateItemScreen = ({ route }) => {
//     const { itemId } = route?.params;
//     const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer);
//     const itemToUpdate = recommendedData.find((item) => item?.item_id === itemId);

//     // console.log("itemId",itemId)

//     const [itemName, setItemName] = useState(itemToUpdate?.item_name || '');
//     const [description, setDescription] = useState(itemToUpdate?.description || '');
//     const [newprice, setPrice] = useState(itemToUpdate?.price.toString() || '');
//     const [receivedQty, setReceivedQty] = useState(itemToUpdate?.received_qty || '');
//     const [actualPrice, setActualPrice] = useState(itemToUpdate?.actual_price || '');
//     const [status, setStatus] = useState(itemToUpdate?.status);
//     const [category, setCategory] = useState(itemToUpdate?.category || '');
//     const [isOpen, setOpen] = useState(false);

//     const dispatch = useDispatch()
//     const navigation = useNavigation()
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const imageData = selectedImage?.assets[0]
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const [selectedCategory, setSelectedCategory] = useState(null);




//     // Function to handle selection of category
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//     };


//     // Dummy data for the status options
//     const statusOptions = [
//         { label: 'Active', value: 'active' },
//         { label: 'Inactive', value: 'inactive' },
//     ];

//     const handleStatusChange = (selectedStatus) => {
//         setStatus(selectedStatus);
//     };

//     const handleUpdate = async () => {
//         // setIsLoading(true)

//         const data = {
//             "item_name": itemName,
//             "item_code": itemId,
//             "description": description,
//             "price": newprice,
//             "discount": 0,
//             "acutal_price": newprice,
//             "special_description": "no description",
//             "tax": "00",
//             "status": status,
//             "saas_id": saasId,
//             "store_id": storeId,
//             "hsn_code": "00",
//             "promo_id": 0,
//             "sku": 0,
//             "category": selectedCategory,
//             "barcode": 0,
//             "mrp": 0,
//             "stock_quantity": 0,
//             "update_price": "00",
//             "selling_price": "00",
//             "opening_quantity": "00",
//             "closing_quantity": 0,


//             "received_quantity": receivedQty,
//             "actual_price": actualPrice,

//         }
//         const jsonString = JSON.stringify(data);

//         // console.log("jsonString", jsonString)

//         const ItemUpdateMethod_resp = await dispatch(ItemUpdateMethod(jsonString,
//             itemId,
//             storeId,
//             saasId,
//             recommendedCurrentPage
//         ))
//         if (ItemUpdateMethod_resp?.status) {
//             const itemId = ItemUpdateMethod_resp?.data?.item_id

//             // console.log("ItemUpdatea", itemId)
//             if (itemId?.length > 0) {
//             }
//             const url = `${BASE_URL}item/save-image/${itemId}`

//             // Check if the 'uri' property exists in the object
//             const hasURI = imageData?.hasOwnProperty('uri');



//             // Log true if 'uri' exists, otherwise log false
//             if (hasURI === true) {
//                 // console.log("hasURI === true", hasURI === true)
//                 imgUpload(url)


//             } else {
//                 setIsLoading(false)
//                 navigation.goBack()


//             }

//             dispatch(GetCategoryItemMethod())

//         }

//     };

//     const imgUpload = async (url) => {
//         // console.log("imgUpload_props", url)

//         const formData = new FormData();
//         formData.append('file', {
//             uri: imageData?.uri,
//             name: imageData?.fileName,
//             type: imageData?.type // Adjust according to your file type
//         });

//         // Axios POST request
//         axios.post(url, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         })
//             .then(response => {
//                 console.log('Success', response.data);
//                 setTimeout(() => {
//                     navigation.goBack()
//                     setIsLoading(false)

//                 }, 1500)
//                 // navigation.navigate(Home)
//                 // setIsLoading(false)

//             })
//             .catch(error => {
//                 console.error('Error', error);
//             });

//     }


//     const pickImage = async () => {
//         setSelectedImage(null)
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 includeBase64: false,
//                 // maxHeight: 200,
//                 // maxWidth: 200,
//             });

//             if (result.didCancel) {
//                 console.log('User cancelled image picker');
//             } else if (result.error) {
//                 console.error('ImagePicker Error: ', result.error);
//             } else {
//                 setSelectedImage(result);
//                 // console.log(result)
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//         }
//     };

//     useEffect(() => {
//         getCategoryDropDown()
//     }, [])

//     const getCategoryDropDown = async () => {
//         const resp = await dispatch(GetCategoryMethod())
//         // setdropdownData(resp)

//     }

//     return (
//         <>
//             <HeaderComp
//                 screenName={'Item Update'}
//                 onBackPress={() => navigation.goBack()}
//             />
//             {isLoading ?
//                 <Loader
//                     isLoading={isLoading}
//                 />
//                 :
//                 <ScrollView
//                     contentContainerStyle={[{ flexGrow: 1, }]}
//                     keyboardDismissMode="interactive"
//                     keyboardShouldPersistTaps="always"
//                     showsVerticalScrollIndicator={false}
//                     nestedScrollEnabled={true}
//                 >
//                     <View style={styles.container}>
//                         {/* Image Update  */}
//                         <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", alignSelf: "center" }}>
//                             <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

//                                 {selectedImage ?

//                                     (
//                                         <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => pickImage()}>

//                                             <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }}
//                                                 resizeMode='cover'

//                                             />
//                                         </TouchableOpacity>


//                                     )
//                                     :
//                                     <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }} activeOpacity={0.8} onPress={() => pickImage()}>

//                                         <MaterialCommunityIcons name="account" size={123} color={'#ECE447'} />

//                                     </TouchableOpacity>

//                                 }

//                             </View>

//                         </View>
//                         {/* //////////// */}

//                         <Text style={styles.label}>Item Name</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={itemName}
//                             onChangeText={(text) => setItemName(text)}
//                             placeholderTextColor="#666"
//                             placeholder='Item Name'

//                         />

//                         <Text style={styles.label}>Description</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={description}
//                             onChangeText={(text) => setDescription(text)}
//                             placeholderTextColor="#666"
//                             placeholder='Description'
//                         />

//                         {/* <TextInput
//                             style={styles.input}
//                             value={category}
//                             onChangeText={(text) => setCategory(text)}
//                             placeholderTextColor="#666"
//                             placeholder='Category'
                            
//                         /> */}


//                         <Text style={styles.label}>Price</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={newprice}
//                             onChangeText={(text) => setPrice(text)}
//                             keyboardType="numeric"
//                             placeholderTextColor="#666"
//                             placeholder='Price'

//                         />

//                         <Text style={styles.label}>Actual Price</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={actualPrice}
//                             onChangeText={(text) => setActualPrice(text)}
//                             keyboardType="numeric"
//                             placeholderTextColor="#666"
//                             placeholder='Actual Price'
//                         />

//                         <Text style={styles.label}>Received Quantity</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={receivedQty}
//                             onChangeText={(text) => setReceivedQty(text)}
//                             keyboardType="numeric"
//                             placeholderTextColor="#666"
//                             placeholder='Quantity'
//                         />

//                         <Text style={styles.label}>Status</Text>
//                         <DropDownPicker
//                             open={isOpen}
//                             value={status}
//                             items={statusOptions}
//                             setOpen={setOpen}
//                             setValue={(value) => handleStatusChange(value)}
//                             setItems={() => { }}
//                             containerStyle={styles.dropdownContainer}
//                             style={styles.dropdownStyle}
//                             itemStyle={styles.dropdownItemStyle}
//                             dropDownStyle={styles.dropdownDropStyle}
//                             placeholder="Select Status"
//                             searchable={false}
//                         />
//                         {categoryData.length > 0 ?
//                             <View style={{marginTop:8,paddingVertical:8}}>
//                                 <Text style={[styles.label,{marginBottom:8}]}>Category</Text>
//                                 < CustomDropDown onSelect={handleCategorySelect} />
//                             </View>
//                             :
//                             null
//                         }












//                         <TouchableOpacity style={styles.button} onPress={handleUpdate}>
//                             <Text style={styles.buttonText}>Update Item</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             }

//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff'
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 8,
//         color: '#000'
//     },
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginTop: 8,
//         paddingHorizontal: 8,
//         color: '#000'

//     },
//     dropdownContainer: {
//         height: 40,
//         marginTop: 8,
//         // marginTop:10
//     },
//     dropdownStyle: {
//         backgroundColor: '#fafafa',
//     },
//     dropdownItemStyle: {
//         justifyContent: 'flex-start',
//     },
//     dropdownDropStyle: {
//         backgroundColor: '#fafafa',
//     },
//     button: {
//         backgroundColor: '#ECE447',
//         padding: 16,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     buttonText: {
//         color: '#000',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default UpdateItemScreen;















///////////////////
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,  Image, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../../../../Components/HeaderCompo';
import { GetCategoryItemMethod, GetCategoryMethod, GetSearchItemsMethod, GetSelectedCategoryItemsMethod, ItemUpdateMethod, RecommendedItemMethod, uploadImageMethod } from '../../../../../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../../styles/responsiveSize';
import { showMessage } from 'react-native-flash-message';
import axios from 'axios';
import { BASE_URL } from '../../../../../config/Base_Url';
import Loader from '../../../../../Components/Loader';
import Home from '../../Home';
import CustomDropDown from '../../../../../Components/CustomDropDown';
import CustomModal from '../../../../../Components/Modal';

const UpdateItemScreen = ({ route }) => {
    const { itemId } = route?.params;
    const [modalVisible, setModalVisible] = useState(false);
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer);
    const itemToUpdate = recommendedData.find((item) => item?.item_id === itemId);

    // console.log("itemToUpdateFrom_UpdateItemScreen",itemToUpdate,itemId)

    const [itemName, setItemName] = useState(itemToUpdate?.item_name || '');
    const [description, setDescription] = useState(itemToUpdate?.description || '');
    const [newprice, setPrice] = useState(itemToUpdate?.price.toString() || '');
    const [receivedQty, setReceivedQty] = useState(itemToUpdate?.received_qty || '');
    const [actualPrice, setActualPrice] = useState(itemToUpdate?.actual_price || '');
    const [status, setStatus] = useState(itemToUpdate?.status);
    const [category, setCategory] = useState(itemToUpdate?.category || '');
    const [isOpen, setOpen] = useState(false);

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const imageData = selectedImage?.assets[0]
    const { categoryData } = useSelector((state) => state?.productReducer);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(itemToUpdate?.category || '');
    console.log("selectedCategory_FromUpdateItemm", selectedCategory)




    // Function to handle selection of category
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setModalVisible(false)

    };


    // Dummy data for the status options
    const statusOptions = [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
    ];

    const handleStatusChange = (selectedStatus) => {
        setStatus(selectedStatus);
    };

    const handleUpdate = async () => {
        // setIsLoading(true)

        const data = {
            "item_name": itemName,
            "item_code": itemId,
            "description": description,
            "price": newprice,
            "discount": 0,
            "acutal_price": newprice,
            "special_description": "no description",
            "tax": "00",
            "status": status,
            "saas_id": saasId,
            "store_id": storeId,
            "hsn_code": "00",
            "promo_id": 0,
            "sku": 0,
            "category": selectedCategory,
            "barcode": 0,
            "mrp": 0,
            "stock_quantity": 0,
            "update_price": "00",
            "selling_price": "00",
            "opening_quantity": "00",
            "closing_quantity": 0,


            "received_quantity": receivedQty,
            "actual_price": actualPrice,

        }
        const jsonString = JSON.stringify(data);

        // console.log("jsonString", jsonString)

        const ItemUpdateMethod_resp = await dispatch(ItemUpdateMethod(jsonString,
            itemId,
            storeId,
            saasId,
            recommendedCurrentPage
        ))
        if (ItemUpdateMethod_resp?.status) {
            const itemId = ItemUpdateMethod_resp?.data?.item_id

            // console.log("ItemUpdatea", itemId)
            if (itemId?.length > 0) {
            }
            const url = `${BASE_URL}item/save-image/${itemId}`

            // Check if the 'uri' property exists in the object
            const hasURI = imageData?.hasOwnProperty('uri');



            // Log true if 'uri' exists, otherwise log false
            if (hasURI === true) {
                // console.log("hasURI === true", hasURI === true)
                imgUpload(url)


            } else {
                setIsLoading(false)
                navigation.goBack()


            }

            dispatch(GetCategoryItemMethod())

        }

    };

    const imgUpload = async (url) => {
        // console.log("imgUpload_props", url)

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
                console.log('Success', response.data);
                setTimeout(() => {
                    navigation.goBack()
                    setIsLoading(false)

                }, 1500)
                // navigation.navigate(Home)
                // setIsLoading(false)

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
                // maxHeight: 200,
                // maxWidth: 200,
            });

            if (result.didCancel) {
                console.log('User cancelled image picker');
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

    useEffect(() => {
        getCategoryDropDown()
    }, [])

    const getCategoryDropDown = async () => {
        const resp = await dispatch(GetCategoryMethod())
        // setdropdownData(resp)

    }

    return (
        <>
            <HeaderComp
                screenName={'Item Update'}
                onBackPress={() => navigation.goBack()}
            />
            {isLoading ?
                <Loader
                    isLoading={isLoading}
                />
                :
                <ScrollView
                    contentContainerStyle={[{ flexGrow: 1, }]}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <View style={styles.container}>
                        {/* Image Update  */}
                        <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", alignSelf: "center" }}>
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
                        {/* //////////// */}

                        <Text style={styles.label}>Item Name</Text>
                        <TextInput
                            style={styles.input}
                            value={itemName}
                            onChangeText={(text) => setItemName(text)}
                            placeholderTextColor="#666"
                            placeholder='Item Name'

                        />

                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            style={styles.input}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            placeholderTextColor="#666"
                            placeholder='Description'
                        />

                        {/* <TextInput
                            style={styles.input}
                            value={category}
                            onChangeText={(text) => setCategory(text)}
                            placeholderTextColor="#666"
                            placeholder='Category'
                            
                        /> */}


                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={newprice}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Price'

                        />

                        <Text style={styles.label}>Actual Price</Text>
                        <TextInput
                            style={styles.input}
                            value={actualPrice}
                            onChangeText={(text) => setActualPrice(text)}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Actual Price'
                        />

                        <Text style={styles.label}>Received Quantity</Text>
                        <TextInput
                            style={styles.input}
                            value={receivedQty}
                            onChangeText={(text) => setReceivedQty(text)}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Quantity'
                        />

                        <Text style={styles.label}>Status</Text>
                        <DropDownPicker
                            open={isOpen}
                            value={status}
                            items={statusOptions}
                            setOpen={setOpen}
                            setValue={(value) => handleStatusChange(value)}
                            setItems={() => { }}
                            containerStyle={styles.dropdownContainer}
                            style={styles.dropdownStyle}
                            itemStyle={styles.dropdownItemStyle}
                            dropDownStyle={styles.dropdownDropStyle}
                            placeholder="Select Status"
                            searchable={false}
                        />
                     <Text style={styles.label}>Category</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            containerStyle={styles.input}
                        >
                            <TextInput
                                style={styles.input}
                                value={selectedCategory}
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                                placeholder='Category'
                                editable={false}
                            />
                        </TouchableOpacity>

                        <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                            {categoryData.length > 0 ?

                                <View style={{ marginTop: 8, paddingVertical: 8, justifyContent: 'center', }}>
                                    <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
                                    < CustomDropDown onSelect={handleCategorySelect} />
                                </View>

                                :
                                null
                            }
                        </CustomModal>












                        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                            <Text style={styles.buttonText}>Update Item</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            }

        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#000'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8,
        paddingHorizontal: 8,
        color: '#000'

    },
    dropdownContainer: {
        height: 40,
        marginTop: 8,
        // marginTop:10
    },
    dropdownStyle: {
        backgroundColor: '#fafafa',
    },
    dropdownItemStyle: {
        justifyContent: 'flex-start',
    },
    dropdownDropStyle: {
        backgroundColor: '#fafafa',
    },
    button: {
        backgroundColor: '#ECE447',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default UpdateItemScreen;
