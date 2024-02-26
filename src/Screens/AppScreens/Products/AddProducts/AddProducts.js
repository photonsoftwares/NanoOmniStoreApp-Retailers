// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddNewItemMethod, GetCategoryMethod, RecommendedItemMethod } from '../../../../config/userApiMethods';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';
// import CustomDropDown from '../../../../Components/CustomDropDown'; // Adjust the path as per your project structure
// import { BASE_URL } from '../../../../config/Base_Url';
// import Home from '../../Home/Home';
// import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';




// // Dummy data for the status options
// const statusOptions = [
//     { label: 'Active', value: 'active' },
//     { label: 'Inactive', value: 'inactive' },
// ];

// const AddProducts = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const dispatch = useDispatch()
//     const navigation = useNavigation()
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const [dropdownData, setdropdownData] = useState([])
//     const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name);
//     // const [selectedCategory, setSelectedCategory] = useState(null);

//     // console.log("selectedCategoryAddItem", selectedCategory,)


//     const [formData, setFormData] = useState({
//         item_name: '',
//         description: '',
//         price: 0,
//         acutal_price: 0,
//         status: 'active',
//         // category: selectedCategory,
//         mrp: 0,
//         stock_quantity: 0,
//         product_cost: 0,
//         opening_quantity: 0,
//         closing_quantity: 0,
//         received_quantity: 0,


//     });

//     // console.log("selectedCategoryFormData", formData.category,)




//     useEffect(() => {
//         getCategoryDropDown()
//     }, [])

//     const getCategoryDropDown = async () => {
//         const resp = await dispatch(GetCategoryMethod())
//         setdropdownData(resp)

//     }

//     // Function to handle selection of category
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//     };


//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const imageData = selectedImage?.assets[0]

//     // console.log(imageData)

//     const imgUpload = async (url) => {

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
//                 // console.log('Success', response.data);
//                 setTimeout(() => {
//                     setIsLoading(false)

//                 }, 2000)

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
//                 // console.log('User cancelled image picker');
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


//     const [isOpen, setOpen] = useState(false);
//     const [status, setStatus] = useState('');

//     // console.log(status)
//     const handleChange = useCallback((key, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [key]: value,
//         }));
//     }, []);

//     const handleStatusChange = useCallback((value) => {
//         setStatus(value);
//         setFormData((prevData) => ({
//             ...prevData,
//             status: value,
//         }));
//     }, []);


//     const handleAddProduct = async () => {

//         const body = {
//             item_name: formData.item_name,
//             description: formData.description,
//             price: formData.price,
//             discount: 0,
//             acutal_price: formData.acutal_price,
//             special_description: formData.description,
//             tax: 0,
//             tax_code: 0,
//             status: status,
//             status: 'active',
//             saas_id: saasId,
//             store_id: storeId,
//             hsn_code: 0,
//             promo_id: 0,
//             sku: 0,
//             // category: formData.category,
//             category: selectedCategory,
//             barcode: 0,
//             mrp: formData.mrp,
//             stock_quantity: formData.stock_quantity,
//             update_price: 0,
//             selling_price: 0,
//             opening_quantity: 0,
//             closing_quantity: 0,
//             received_quantity: 0,

//             UOM: "pieces",
//             colorList: [],

//         };

//         // console.log(body,selectedCategory)

//         const resp = await dispatch(AddNewItemMethod(body))
//         if (resp?.status === true) {
//             var itemId = await resp?.data?.item_id;

//             if (itemId && itemId?.toString().length > 0) {
//                 console.log(itemId);
//                 const url = `${BASE_URL}item/save-image/${itemId}`
//                 imgUpload(url)


//             } else {
//                 showToast("item_id is empty or undefined")
//             }
//             navigation.navigate(Home)
//             dispatch(RecommendedItemMethod(storeId, saasId,))
//             dispatch(setCurrentCategoryItemPage(1))
//             dispatch(setSelectedCategory(selectedCategory))



//         }


//         // Reset the form after adding the product
//         // setFormData({
//         //     item_name: '',
//         //     description: '',
//         //     price: '',
//         //     acutal_price: '',
//         //     status: '',
//         //     category: '',
//         //     mrp: '',
//         // });
//         // setStatus('');
//         // setOpen(false);
//     }


//     /////////////////////////////////
//     // const handleAddProduct = useCallback(async () => {

//     //     const body = {
//     //         item_name: formData.item_name,
//     //         description: formData.description,
//     //         price: formData.price,
//     //         discount: 0,
//     //         acutal_price: formData.acutal_price,
//     //         special_description: formData.description,
//     //         tax: 0,
//     //         tax_code: 0,
//     //         status: status,
//     //         status: 'active',
//     //         saas_id: saasId,
//     //         store_id: storeId,
//     //         hsn_code: 0,
//     //         promo_id: 0,
//     //         sku: 0,
//     //         // category: formData.category,
//     //         category: selectedCategory,
//     //         barcode: 0,
//     //         mrp: formData.mrp,
//     //         stock_quantity: formData.stock_quantity,
//     //         update_price: 0,
//     //         selling_price: 0,
//     //         opening_quantity: 0,
//     //         closing_quantity: 0,
//     //         received_quantity: 0,

//     //         UOM: "pieces",
//     //         colorList: [],

//     //     };

//     //     console.log(body,selectedCategory)

//     //     // const resp = await dispatch(AddNewItemMethod(body))
//     //     // if (resp?.status === true) {
//     //     //     var itemId = await resp?.data?.item_id;

//     //     //     if (itemId && itemId?.toString().length > 0) {
//     //     //         console.log(itemId);
//     //     //         const url = `${BASE_URL}item/save-image/${itemId}`
//     //     //         imgUpload(url)


//     //     //     } else {
//     //     //         showToast("item_id is empty or undefined")
//     //     //     }
//     //     //     navigation.navigate(Home)
//     //     //     dispatch(RecommendedItemMethod(storeId, saasId,))

//     //     // }


//     //     // Reset the form after adding the product
//     //     // setFormData({
//     //     //     item_name: '',
//     //     //     description: '',
//     //     //     price: '',
//     //     //     acutal_price: '',
//     //     //     status: '',
//     //     //     category: '',
//     //     //     mrp: '',
//     //     // });
//     //     // setStatus('');
//     //     // setOpen(false);
//     // }, [formData]);

//     return (
//         <>
//             <HeaderComp screenName={'Add New Product'} onBackPress={() => navigation.goBack()} />
//             <View style={{ flex: 1, backgroundColor: '#fff', }}>

//                 <ScrollView
//                     contentContainerStyle={styles.container}
//                     keyboardDismissMode="interactive"
//                     keyboardShouldPersistTaps="always"
//                     showsVerticalScrollIndicator={false}
//                 >


//                     <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32), }}>
//                         <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>
//                             <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

//                                 {/* <MaterialCommunityIcons name="account" size={155} color={'#ECE447'} /> */}
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
//                             {/* <Image
//                                         source={ImagePath.penIconBG}
//                                         style={{ height: '100%', width: '100%', left: 20 }}
//                                     /> */}

//                             {/* <TouchableOpacity style={{ height: '25%', width: '25%', alignSelf: 'flex-end', left: 20, borderWidth: 1 }} activeOpacity={0.8} onPress={() => pickImage()}>

//                             <MaterialCommunityIcons name="cloud-upload" size={26} color='red' />

//                         </TouchableOpacity> */}


//                         </View>
//                         <Text style={{ marginTop: moderateScale(8), color: '#000' }}>Please Upload Item Image</Text>
//                     </View>
//                     {/* <ButtonCompo title="Upload Image" onPress={uploadImage} /> */}

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Item Name"
//                         placeholderTextColor={'grey'}

//                         value={formData.item_name}
//                         onChangeText={(text) => handleChange('item_name', text)}
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Description"
//                         placeholderTextColor={'grey'}

//                         value={formData.description}
//                         onChangeText={(text) => handleChange('description', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Acutal Price"
//                         value={formData.acutal_price}
//                         onChangeText={(text) => handleChange('acutal_price', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Price"
//                         placeholderTextColor={'grey'}
//                         value={formData.price}
//                         onChangeText={(text) => handleChange('price', text)}
//                         keyboardType='numeric'

//                     />


//                     {/* {categoryData.length > 0 ?
//                         < CustomDropDown onSelect={handleCategorySelect} />
//                         :
//                         null
//                     } */}


//                     <TextInput
//                         style={styles.input}
//                         placeholder="Opening Quantity"
//                         value={formData.opening_quantity}
//                         onChangeText={(text) => handleChange('opening_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Stock Quantity"
//                         placeholderTextColor={'grey'}

//                         value={formData.stock_quantity}
//                         onChangeText={(text) => handleChange('stock_quantity', text)}
//                         keyboardType='numeric'
//                     />


//                     <TextInput
//                         style={styles.input}
//                         placeholder="Closing Quantity"
//                         value={formData.closing_quantity}
//                         onChangeText={(text) => handleChange('closing_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Received_quantity Quantity"
//                         value={formData.received_quantity}
//                         onChangeText={(text) => handleChange('received_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Purcahse Price"
//                         value={formData.product_cost}
//                         onChangeText={(text) => handleChange('product_cost', text)}
//                         keyboardType='numeric'

//                     />

//                 </ScrollView>
//                 <View style={{ height: 100, marginHorizontal: 16 }}>

//                     {categoryData.length > 0 ?
//                         < CustomDropDown onSelect={handleCategorySelect} />
//                         :
//                         null
//                     }



//                     <View style={{ marginTop: moderateScale(16) }}>
//                         <ButtonCompo title="Add Product" onPress={handleAddProduct} style={{}} />
//                     </View>
//                 </View>

//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: moderateScale(16),
//         // justifyContent: 'center',
//         backgroundColor: '#fff',
//         // marginTop:4

//     },
//     input: {
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         borderRadius: 8,
//         fontSize: 16,
//         color: '#000'

//     },
//     dropdownContainer: {
//         height: 40,
//         marginBottom: 10,
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
// });

// export default AddProducts;















///////////////
// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddNewItemMethod, GetCategoryMethod, RecommendedItemMethod } from '../../../../config/userApiMethods';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';
// import CustomDropDown from '../../../../Components/CustomDropDown'; // Adjust the path as per your project structure
// import { BASE_URL } from '../../../../config/Base_Url';
// import Home from '../../Home/Home';
// import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
// import CustomModal from '../../../../Components/Modal';
// import { showToast } from '../../../../utils/toast';




// // Dummy data for the status options
// const statusOptions = [
//     { label: 'Active', value: 'active' },
//     { label: 'Inactive', value: 'inactive' },
// ];

// const AddProducts = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const [modalVisible, setModalVisible] = useState(false);
//     const dispatch = useDispatch()
//     const navigation = useNavigation()
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const [dropdownData, setdropdownData] = useState([])
//     const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name);
//     // const [selectedCategory, setSelectedCategory] = useState(null);

//     // console.log("selectedCategoryAddItem", selectedCategory,)


//     const [formData, setFormData] = useState({
//         item_name: '',
//         description: '',
//         price: 0,
//         acutal_price: 0,
//         status: 'active',
//         mrp: 0,
//         stock_quantity: 0,
//         product_cost: 0,
//         opening_quantity: 0,
//         closing_quantity: 0,
//         received_quantity: 0,
//         discount: 0,
//         selling_price: 0


//     });

//     // console.log("selectedCategoryFormData", formData.category,)




//     useEffect(() => {
//         getCategoryDropDown()
//     }, [])

//     const getCategoryDropDown = async () => {
//         const resp = await dispatch(GetCategoryMethod())
//         setdropdownData(resp)

//     }

//     // Function to handle selection of category
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//         setModalVisible(false)

//     };


//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const imageData = selectedImage?.assets[0]

//     // console.log(imageData)

//     const imgUpload = async (url) => {

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
//                 // console.log('Success', response.data);
//                 setTimeout(() => {
//                     setIsLoading(false)

//                 }, 2000)

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
//                 // console.log('User cancelled image picker');
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


//     const [isOpen, setOpen] = useState(false);
//     const [status, setStatus] = useState('');

//     // console.log(status)
//     const handleChange = useCallback((key, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [key]: value,
//         }));
//     }, []);

//     const handleStatusChange = useCallback((value) => {
//         setStatus(value);
//         setFormData((prevData) => ({
//             ...prevData,
//             status: value,
//         }));
//     }, []);


//     const handleAddProduct = async () => {

//         if (!formData.item_name.trim()) {
//             showToast('Please enter item name');
//             return;
//         }
//         if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
//             showToast('Please enter item price');
//             return;
//         }
//         if (!selectedCategory) {
//             showToast('Please select a category');
//             return;
//         }



//         const body = {
//             item_name: formData.item_name,
//             description: formData.description,
//             price: formData.price,
//             discount: formData.discount,
//             acutal_price: formData.acutal_price,
//             special_description: formData.description,
//             tax: 0,
//             tax_code: 0,
//             status: status,
//             status: 'active',
//             saas_id: saasId,
//             store_id: storeId,
//             hsn_code: 0,
//             promo_id: 0,
//             sku: 0,
//             category: selectedCategory,
//             barcode: 0,
//             mrp: formData.mrp,
//             stock_quantity: formData.stock_quantity,
//             update_price: 0,
//             selling_price: formData.selling_price,
//             opening_quantity: formData.opening_quantity,
//             closing_quantity: formData.closing_quantity,
//             received_quantity: formData.received_quantity,

//             UOM: "pieces",
//             colorList: [],

//         };

//         // console.log(body)

//         const resp = await dispatch(AddNewItemMethod(body))
//         if (resp?.status === true) {
//             var itemId = await resp?.data?.item_id;

//             if (itemId && itemId?.toString().length > 0) {
//                 console.log(itemId);
//                 const url = `${BASE_URL}item/save-image/${itemId}`
//                 imgUpload(url)


//             } else {
//                 showToast("item_id is empty or undefined")
//             }
//             navigation.navigate(Home)
//             dispatch(RecommendedItemMethod(storeId, saasId,))
//             dispatch(setCurrentCategoryItemPage(1))
//             dispatch(setSelectedCategory(selectedCategory))
//         }


//         // Reset the form after adding the product
//         // setFormData({
//         //     item_name: '',
//         //     description: '',
//         //     price: '',
//         //     acutal_price: '',
//         //     status: '',
//         //     category: '',
//         //     mrp: '',
//         // });
//         // setStatus('');
//         // setOpen(false);
//     }


//     /////////////////////////////////
//     // const handleAddProduct = useCallback(async () => {

//     //     const body = {
//     //         item_name: formData.item_name,
//     //         description: formData.description,
//     //         price: formData.price,
//     //         discount: 0,
//     //         acutal_price: formData.acutal_price,
//     //         special_description: formData.description,
//     //         tax: 0,
//     //         tax_code: 0,
//     //         status: status,
//     //         status: 'active',
//     //         saas_id: saasId,
//     //         store_id: storeId,
//     //         hsn_code: 0,
//     //         promo_id: 0,
//     //         sku: 0,
//     //         // category: formData.category,
//     //         category: selectedCategory,
//     //         barcode: 0,
//     //         mrp: formData.mrp,
//     //         stock_quantity: formData.stock_quantity,
//     //         update_price: 0,
//     //         selling_price: 0,
//     //         opening_quantity: 0,
//     //         closing_quantity: 0,
//     //         received_quantity: 0,

//     //         UOM: "pieces",
//     //         colorList: [],

//     //     };

//     //     console.log(body,selectedCategory)

//     //     // const resp = await dispatch(AddNewItemMethod(body))
//     //     // if (resp?.status === true) {
//     //     //     var itemId = await resp?.data?.item_id;

//     //     //     if (itemId && itemId?.toString().length > 0) {
//     //     //         console.log(itemId);
//     //     //         const url = `${BASE_URL}item/save-image/${itemId}`
//     //     //         imgUpload(url)


//     //     //     } else {
//     //     //         showToast("item_id is empty or undefined")
//     //     //     }
//     //     //     navigation.navigate(Home)
//     //     //     dispatch(RecommendedItemMethod(storeId, saasId,))

//     //     // }


//     //     // Reset the form after adding the product
//     //     // setFormData({
//     //     //     item_name: '',
//     //     //     description: '',
//     //     //     price: '',
//     //     //     acutal_price: '',
//     //     //     status: '',
//     //     //     category: '',
//     //     //     mrp: '',
//     //     // });
//     //     // setStatus('');
//     //     // setOpen(false);
//     // }, [formData]);

//     return (
//         <>
//             <HeaderComp screenName={'Add New Product'} onBackPress={() => navigation.goBack()} />
//             <View style={{ flex: 1, backgroundColor: '#fff', }}>

//                 <ScrollView
//                     contentContainerStyle={styles.container}
//                     keyboardDismissMode="interactive"
//                     keyboardShouldPersistTaps="always"
//                     showsVerticalScrollIndicator={false}
//                 >


//                     <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32), }}>
//                         <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>
//                             <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

//                                 {/* <MaterialCommunityIcons name="account" size={155} color={'#ECE447'} /> */}
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
//                             {/* <Image
//                                         source={ImagePath.penIconBG}
//                                         style={{ height: '100%', width: '100%', left: 20 }}
//                                     /> */}

//                             {/* <TouchableOpacity style={{ height: '25%', width: '25%', alignSelf: 'flex-end', left: 20, borderWidth: 1 }} activeOpacity={0.8} onPress={() => pickImage()}>

//                             <MaterialCommunityIcons name="cloud-upload" size={26} color='red' />

//                         </TouchableOpacity> */}


//                         </View>
//                         <Text style={{ marginTop: moderateScale(8), color: '#000' }}>Please Upload Item Image</Text>
//                     </View>
//                     {/* <ButtonCompo title="Upload Image" onPress={uploadImage} /> */}
//                     <Text style={{ color: 'grey' }}>*</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Item Name"
//                         placeholderTextColor={'grey'}
//                         value={formData.item_name}
//                         onChangeText={(text) => handleChange('item_name', text)}
//                     />
//                     <Text style={{ color: 'grey' }}>*</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Price"
//                         placeholderTextColor={'grey'}
//                         value={formData.price}
//                         onChangeText={(text) => handleChange('price', text)}
//                         keyboardType='numeric'

//                     />
//                     <TouchableOpacity
//                         onPress={() => setModalVisible(true)}
//                         containerStyle={styles.input}
//                     >
//                         <Text style={{ color: 'grey' }}>*</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={selectedCategory}
//                             keyboardType="numeric"
//                             placeholderTextColor="#666"
//                             placeholder='Category'
//                             editable={false}
//                         />
//                     </TouchableOpacity>
//                     <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
//                         {categoryData.length > 0 ?

//                             <View style={{ justifyContent: 'center', }}>
//                                 <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
//                                 < CustomDropDown onSelect={handleCategorySelect} />
//                             </View>

//                             :
//                             null
//                         }
//                     </CustomModal>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Description"
//                         placeholderTextColor={'grey'}

//                         value={formData.description}
//                         onChangeText={(text) => handleChange('description', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Acutal Price"
//                         value={formData.acutal_price}
//                         onChangeText={(text) => handleChange('acutal_price', text)}
//                         keyboardType='numeric'

//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Mrp"
//                         placeholderTextColor={'grey'}
//                         value={formData.mrp}
//                         onChangeText={(text) => handleChange('mrp', text)}
//                         keyboardType='numeric'

//                     />




//                     <TextInput
//                         style={styles.input}
//                         placeholder="Opening Quantity"
//                         value={formData.opening_quantity}
//                         onChangeText={(text) => handleChange('opening_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Stock Quantity"
//                         placeholderTextColor={'grey'}

//                         value={formData.stock_quantity}
//                         onChangeText={(text) => handleChange('stock_quantity', text)}
//                         keyboardType='numeric'
//                     />


//                     <TextInput
//                         style={styles.input}
//                         placeholder="Closing Quantity"
//                         value={formData.closing_quantity}
//                         onChangeText={(text) => handleChange('closing_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Received Quantity"
//                         value={formData.received_quantity}
//                         onChangeText={(text) => handleChange('received_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Purcahse Price"
//                         value={formData.product_cost}
//                         onChangeText={(text) => handleChange('product_cost', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Selling Price"
//                         value={formData.selling_price}
//                         onChangeText={(text) => handleChange('selling_price', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Discount Percent"
//                         value={formData.discount}
//                         onChangeText={(text) => handleChange('discount', text)}
//                         keyboardType='numeric'

//                     />

//                     <View style={{ marginTop: moderateScale(16) }}>
//                         <ButtonCompo title="Add Product" onPress={handleAddProduct} style={{}} />
//                     </View>

//                 </ScrollView>


//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: moderateScale(16),
//         // justifyContent: 'center',
//         backgroundColor: '#fff',
//         // marginTop:4

//     },
//     input: {
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         borderRadius: 8,
//         fontSize: 16,
//         color: '#000'

//     },
//     dropdownContainer: {
//         height: 40,
//         marginBottom: 10,
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
// });

// export default AddProducts;








/////

// import React, { useState, useCallback, useEffect } from 'react';
// import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
// import HeaderComp from '../../../../Components/HeaderCompo';
// import ButtonCompo from '../../../../Components/ButtonCompo';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { moderateScale } from '../../../../styles/responsiveSize';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddNewItemMethod, GetCategoryMethod, RecommendedItemMethod } from '../../../../config/userApiMethods';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { launchImageLibrary } from 'react-native-image-picker';
// import CustomDropDown from '../../../../Components/CustomDropDown'; // Adjust the path as per your project structure
// import { BASE_URL } from '../../../../config/Base_Url';
// import Home from '../../Home/Home';
// import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
// import CustomModal from '../../../../Components/Modal';
// import { showToast } from '../../../../utils/toast';




// // Dummy data for the status options
// const statusOptions = [
//     { label: 'Active', value: 'active' },
//     { label: 'Inactive', value: 'inactive' },
// ];

// const AddProducts = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const [modalVisible, setModalVisible] = useState(false);
//     const dispatch = useDispatch()
//     const navigation = useNavigation()
//     const { categoryData } = useSelector((state) => state?.productReducer);
//     const [dropdownData, setdropdownData] = useState([])
//     const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name);
//     // const [selectedCategory, setSelectedCategory] = useState(null);

//     // console.log("selectedCategoryAddItem", selectedCategory,)


//     const [formData, setFormData] = useState({
//         item_name: '',
//         description: '',
//         price: 0,
//         acutal_price: 0,
//         status: 'active',
//         mrp: 0,
//         stock_quantity: 0,
//         product_cost: 0,
//         opening_quantity: 0,
//         closing_quantity: 0,
//         received_quantity: 0,
//         discount: 0,
//         selling_price: 0


//     });

//     // console.log("selectedCategoryFormData", formData.category,)




//     useEffect(() => {
//         getCategoryDropDown()
//     }, [])

//     const getCategoryDropDown = async () => {
//         const resp = await dispatch(GetCategoryMethod())
//         setdropdownData(resp)

//     }

//     // Function to handle selection of category
//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category);
//         setModalVisible(false)

//     };


//     const [selectedImage, setSelectedImage] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const imageData = selectedImage?.assets[0]

//     // console.log(imageData)

//     const imgUpload = async (url) => {

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
//                 // console.log('Success', response.data);
//                 setTimeout(() => {
//                     setIsLoading(false)

//                 }, 2000)

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
//                 // console.log('User cancelled image picker');
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


//     const [isOpen, setOpen] = useState(false);
//     const [status, setStatus] = useState('');

//     // console.log(status)
//     const handleChange = useCallback((key, value) => {
//         setFormData((prevData) => ({
//             ...prevData,
//             [key]: value,
//         }));
//     }, []);

//     const handleStatusChange = useCallback((value) => {
//         setStatus(value);
//         setFormData((prevData) => ({
//             ...prevData,
//             status: value,
//         }));
//     }, []);


//     const handleAddProduct = async () => {

//         if (!formData.item_name.trim()) {
//             showToast('Please enter item name');
//             return;
//         }
//         if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
//             showToast('Please enter item price');
//             return;
//         }
//         if (!selectedCategory) {
//             showToast('Please select a category');
//             return;
//         }



//         const body = {
//             item_name: formData.item_name,
//             description: formData.description,
//             price: formData.price,
//             discount: formData.discount,
//             actual_price: formData.acutal_price,
//             special_description: formData.description,
//             tax: 0,
//             tax_code: 0,
//             // status: status,
//             status: 'active',
//             saas_id: saasId,
//             store_id: storeId,
//             hsn_code: 0,
//             promo_id: 0,
//             sku: 0,
//             category: selectedCategory,
//             barcode: 0,
//             mrp: formData.mrp,
//             product_qty: formData.stock_quantity,
//             update_price: 0,
//             selling_price: formData.selling_price,
//             opening_qty: formData.opening_quantity,
//             closing_qty: formData.closing_quantity,
//             received_qty: formData.received_quantity,

//             UOM: "pieces",
//             colorList: [],

//         };

//         // console.log(body)

//         const resp = await dispatch(AddNewItemMethod(body))
//         if (resp?.status === true) {
//             var itemId = await resp?.data?.item_id;

//             if (itemId && itemId?.toString().length > 0) {
//                 console.log(itemId);
//                 const url = `${BASE_URL}item/save-image/${itemId}`
//                 imgUpload(url)


//             } else {
//                 showToast("item_id is empty or undefined")
//             }
//             navigation.navigate(Home)
//             dispatch(RecommendedItemMethod(storeId, saasId,))
//             dispatch(setCurrentCategoryItemPage(1))
//             dispatch(setSelectedCategory(selectedCategory))
//         }



//     }




//     return (
//         <>
//             <HeaderComp screenName={'Add New Product'} onBackPress={() => navigation.goBack()} />
//             <View style={{ flex: 1, backgroundColor: '#fff', }}>

//                 <ScrollView
//                     contentContainerStyle={styles.container}
//                     keyboardDismissMode="interactive"
//                     keyboardShouldPersistTaps="always"
//                     showsVerticalScrollIndicator={false}
//                 >


//                     <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32), }}>
//                         <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>
//                             <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>

//                                 {/* <MaterialCommunityIcons name="account" size={155} color={'#ECE447'} /> */}
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
//                             {/* <Image
//                                         source={ImagePath.penIconBG}
//                                         style={{ height: '100%', width: '100%', left: 20 }}
//                                     /> */}

//                             {/* <TouchableOpacity style={{ height: '25%', width: '25%', alignSelf: 'flex-end', left: 20, borderWidth: 1 }} activeOpacity={0.8} onPress={() => pickImage()}>

//                             <MaterialCommunityIcons name="cloud-upload" size={26} color='red' />

//                         </TouchableOpacity> */}


//                         </View>
//                         <Text style={{ marginTop: moderateScale(8), color: '#000' }}>Please Upload Item Image</Text>
//                     </View>
//                     {/* <ButtonCompo title="Upload Image" onPress={uploadImage} /> */}
//                     <Text style={{ color: 'grey' }}>*</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Item Name"
//                         placeholderTextColor={'grey'}
//                         value={formData.item_name}
//                         onChangeText={(text) => handleChange('item_name', text)}
//                     />
//                     <Text style={{ color: 'grey' }}>*</Text>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Price"
//                         placeholderTextColor={'grey'}
//                         value={formData.price}
//                         onChangeText={(text) => handleChange('price', text)}
//                         keyboardType='numeric'

//                     />
//                     <TouchableOpacity
//                         onPress={() => setModalVisible(true)}
//                         containerStyle={styles.input}
//                     >
//                         <Text style={{ color: 'grey' }}>*</Text>
//                         <TextInput
//                             style={styles.input}
//                             value={selectedCategory}
//                             keyboardType="numeric"
//                             placeholderTextColor="#666"
//                             placeholder='Category'
//                             editable={false}
//                         />
//                     </TouchableOpacity>
//                     <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
//                         {categoryData.length > 0 ?

//                             <View style={{ justifyContent: 'center', }}>
//                                 <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
//                                 < CustomDropDown onSelect={handleCategorySelect} />
//                             </View>

//                             :
//                             null
//                         }
//                     </CustomModal>

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Description"
//                         placeholderTextColor={'grey'}

//                         value={formData.description}
//                         onChangeText={(text) => handleChange('description', text)}
//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Acutal Price"
//                         value={formData.acutal_price}
//                         onChangeText={(text) => handleChange('acutal_price', text)}
//                         keyboardType='numeric'

//                     />

//                     <TextInput
//                         style={styles.input}
//                         placeholder="Mrp"
//                         placeholderTextColor={'grey'}
//                         value={formData.mrp}
//                         onChangeText={(text) => handleChange('mrp', text)}
//                         keyboardType='numeric'

//                     />




//                     <TextInput
//                         style={styles.input}
//                         placeholder="Opening Quantity"
//                         value={formData.opening_quantity}
//                         onChangeText={(text) => handleChange('opening_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Stock Quantity"
//                         placeholderTextColor={'grey'}

//                         value={formData.stock_quantity}
//                         onChangeText={(text) => handleChange('stock_quantity', text)}
//                         keyboardType='numeric'
//                     />


//                     <TextInput
//                         style={styles.input}
//                         placeholder="Closing Quantity"
//                         value={formData.closing_quantity}
//                         onChangeText={(text) => handleChange('closing_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Received Quantity"
//                         value={formData.received_quantity}
//                         onChangeText={(text) => handleChange('received_quantity', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Purcahse Price"
//                         value={formData.product_cost}
//                         onChangeText={(text) => handleChange('product_cost', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Selling Price"
//                         value={formData.selling_price}
//                         onChangeText={(text) => handleChange('selling_price', text)}
//                         keyboardType='numeric'

//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Discount Percent"
//                         value={formData.discount}
//                         onChangeText={(text) => handleChange('discount', text)}
//                         keyboardType='numeric'
//                         maxLength={2}

//                     />

//                     <View style={{ marginTop: moderateScale(16) }}>
//                         <ButtonCompo title="Add Product" onPress={handleAddProduct} style={{}} />
//                     </View>

//                 </ScrollView>


//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1,
//         padding: moderateScale(16),
//         // justifyContent: 'center',
//         backgroundColor: '#fff',
//         // marginTop:4

//     },
//     input: {
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         borderRadius: 8,
//         fontSize: 16,
//         color: '#000'

//     },
//     dropdownContainer: {
//         height: 40,
//         marginBottom: 10,
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
// });

// export default AddProducts;

















/////ColorPicker
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Button } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { moderateScale } from '../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewItemMethod, GetCategoryMethod, RecommendedItemMethod } from '../../../../config/userApiMethods';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomDropDown from '../../../../Components/CustomDropDown'; // Adjust the path as per your project structure
import { BASE_URL } from '../../../../config/Base_Url';
import Home from '../../Home/Home';
import { setCurrentCategoryItemPage } from '../../../../ReduxToolkit/features/categoryItemsSlice';
import CustomModal from '../../../../Components/Modal';
import { showToast } from '../../../../utils/toast';
import ColorPicker from '../../../../Components/ColorPicker';





const AddProducts = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const [modalVisible, setModalVisible] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { categoryData } = useSelector((state) => state?.productReducer);
    const [dropdownData, setdropdownData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name);
    const [colorPickerVisible, setColorPickerVisible] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    // const [selectedCategory, setSelectedCategory] = useState(null);
    // console.log("selectedCategoryAddItem", selectedCategory,)
    console.log("selectedColor_AddProducts", selectedColor)


    const [formData, setFormData] = useState({
        item_name: '',
        description: '',
        price: 0,
        acutal_price: 0,
        status: 'active',
        mrp: 0,
        stock_quantity: 0,
        product_cost: 0,
        opening_quantity: 0,
        closing_quantity: 0,
        received_quantity: 0,
        discount: 0,
        selling_price: 0


    });

    // console.log("selectedCategoryFormData", formData.category,)

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        handleCloseColorPicker();
    };

    const handleOpenColorPicker = () => {
        setColorPickerVisible(true);
    };

    const handleCloseColorPicker = () => {
        setColorPickerVisible(false);
    };




    useEffect(() => {
        getCategoryDropDown()
    }, [])

    const getCategoryDropDown = async () => {
        const resp = await dispatch(GetCategoryMethod())
        setdropdownData(resp)

    }

    // Function to handle selection of category
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setModalVisible(false)

    };


    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const imageData = selectedImage?.assets[0]

    // console.log(imageData)

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

    // console.log(status)
    const handleChange = useCallback((key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }, []);



    const SelectedColor = {
        product_size: 0,
        product_color: selectedColor,
        status: "available"
    }

    const handleAddProduct = async () => {

        if (!formData.item_name.trim()) {
            showToast('Please enter item name');
            return;
        }
        if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            showToast('Please enter item price');
            return;
        }
        // if (!selectedCategory) {
        //     showToast('Please select a category');
        //     return;
        // }



        const body = {
            item_name: formData.item_name,
            description: formData.description,
            price: formData.price,
            discount: formData.discount,
            actual_price: formData.acutal_price,
            special_description: formData.description,
            tax: 0,
            tax_code: 0,
            status: 'active',
            saas_id: saasId,
            store_id: storeId,
            hsn_code: 0,
            promo_id: 0,
            sku: 0,
            category: selectedCategory,
            barcode: 0,
            mrp: formData.mrp,
            product_qty: formData.stock_quantity,
            update_price: 0,
            selling_price: formData.selling_price,
            opening_qty: formData.opening_quantity,
            closing_qty: formData.closing_quantity,
            received_qty: formData.received_quantity,

            UOM: "pieces",
            colorList: [SelectedColor],

        };

        // console.log(body)

        const resp = await dispatch(AddNewItemMethod(body))
        if (resp?.status === true) {
            var itemId = await resp?.data?.item_id;

            if (itemId && itemId?.toString().length > 0) {
                console.log(itemId);
                const url = `${BASE_URL}item/save-image/${itemId}`
                imgUpload(url)


            } else {
                showToast("item_id is empty or undefined")
            }
            navigation.navigate(Home)
            dispatch(RecommendedItemMethod(storeId, saasId,))
            dispatch(setCurrentCategoryItemPage(1))
            dispatch(setSelectedCategory(selectedCategory))
        }



    }




    return (
        <>
            <HeaderComp screenName={'Add New Product'} onBackPress={() => navigation.goBack()} />
            <View style={{ flex: 1, backgroundColor: '#fff', }}>

                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >


                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32), }}>
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
                        <Text style={{ marginTop: moderateScale(8), color: '#000' }}>Please Upload Item Image</Text>
                    </View>
                    <Text style={{ color: 'grey' }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Item Name"
                        placeholderTextColor={'grey'}
                        value={formData.item_name}
                        onChangeText={(text) => handleChange('item_name', text)}
                    />
                    <Text style={{ color: 'grey' }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        placeholderTextColor={'grey'}
                        value={formData.price}
                        onChangeText={(text) => handleChange('price', text)}
                        keyboardType='numeric'

                    />
                    <TouchableOpacity
                        onPress={() => setModalVisible(true)}
                        containerStyle={styles.input}
                    >
                        <Text style={{ color: 'grey' }}>*</Text>
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

                            <View style={{ justifyContent: 'center', }}>
                                <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
                                < CustomDropDown onSelect={handleCategorySelect} />
                            </View>

                            :
                            null
                        }
                    </CustomModal>

                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor={'grey'}

                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Acutal Price"
                        value={formData.acutal_price}
                        onChangeText={(text) => handleChange('acutal_price', text)}
                        keyboardType='numeric'

                    />

                    {/* <TextInput
                        style={styles.input}
                        placeholder="Mrp"
                        placeholderTextColor={'grey'}
                        value={formData.mrp}
                        onChangeText={(text) => handleChange('mrp', text)}
                        keyboardType='numeric'

                    /> */}




                    <TextInput
                        style={styles.input}
                        placeholder="Opening Quantity"
                        value={formData.opening_quantity}
                        onChangeText={(text) => handleChange('opening_quantity', text)}
                        keyboardType='numeric'

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Stock Quantity"
                        placeholderTextColor={'grey'}

                        value={formData.stock_quantity}
                        onChangeText={(text) => handleChange('stock_quantity', text)}
                        keyboardType='numeric'
                    />


                    <TextInput
                        style={styles.input}
                        placeholder="Closing Quantity"
                        value={formData.closing_quantity}
                        onChangeText={(text) => handleChange('closing_quantity', text)}
                        keyboardType='numeric'

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Received Quantity"
                        value={formData.received_quantity}
                        onChangeText={(text) => handleChange('received_quantity', text)}
                        keyboardType='numeric'

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Purcahse Price"
                        value={formData.product_cost}
                        onChangeText={(text) => handleChange('product_cost', text)}
                        keyboardType='numeric'

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Selling Price"
                        value={formData.selling_price}
                        onChangeText={(text) => handleChange('selling_price', text)}
                        keyboardType='numeric'

                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Discount Percent"
                        value={formData.discount}
                        onChangeText={(text) => handleChange('discount', text)}
                        keyboardType='numeric'
                        maxLength={2}

                    />
                    <TouchableOpacity
                        onPress={() => handleOpenColorPicker()}
                        containerStyle={styles.input}
                    >
                        {/* <Text style={{ color: 'grey' }}>*</Text> */}
                        <TextInput
                            style={styles.input}
                            // value={selectedCategory}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Select Color'
                            editable={false}

                        />
                    </TouchableOpacity>

                    {/* <Button title="Open Color Picker" onPress={handleOpenColorPicker} /> */}

                    {selectedColor && <View style={[styles.selectedColor, { backgroundColor: selectedColor }]} />}
                    <ColorPicker
                        visible={colorPickerVisible}
                        onSelect={handleColorSelect}
                        onClose={handleCloseColorPicker}
                    />

                    <View style={{ marginTop: moderateScale(16) }}>
                        <ButtonCompo title="Add Product" onPress={handleAddProduct} style={{}} />
                    </View>

                </ScrollView>


            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: moderateScale(16),
        // justifyContent: 'center',
        backgroundColor: '#fff',
        // marginTop:4

    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#000'

    },
    dropdownContainer: {
        height: 40,
        marginBottom: 10,
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
});

export default AddProducts;
