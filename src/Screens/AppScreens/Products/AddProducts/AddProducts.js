



import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import DropDownPicker from 'react-native-dropdown-picker';
import { moderateScale } from '../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewItemMethod } from '../../../../config/userApiMethods';
import ImagePath from '../../../../constants/ImagePath';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { BASE_URL } from '../../../../config/Base_Url';
import { showMessage } from 'react-native-flash-message';
import SearchBar from '../../Search/Search';




// Dummy data for the status options
const statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
];

const AddProducts = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    ////

    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

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
                // uploadImage()
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };
    // console.log(selectedImage)

    const uploadImage = async (itemId) => {

        // console.log('uploadImage', itemId, selectedImage)
        setIsLoading(true);
        setError(null);
        var assets = selectedImage?.assets;


        if (assets !== null && assets?.length > 0) {
            try {
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedImage.assets[0].uri,
                    type: selectedImage.assets[0].type,
                    name: selectedImage.assets[0].fileName, 
                    // name: 'potato.jpg', 
                });

                const response = await axios.post(
                    `${BASE_URL}item/save-image/${itemId}`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                console.log('Upload response:', response.data);
                showMessage({
                    message: "Item Added Succesfully",
                    type: "success",
                })
                // Handle successful upload
                // setSelectedImage(null); // Clear selected image after successful upload
            } catch (error) {
                console.error('Upload error:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }

        } else {
            showMessage({
                message: "Item Saved without Image ",
                type: "success",
            })

        }

        // try {
        //     const formData = new FormData();
        //     formData.append('file', {
        //         uri: selectedImage.assets[0].uri,
        //         type: selectedImage.assets[0].type,
        //         name: 'potato.jpg', // Adjust filename as needed
        //     });

        //     const response = await axios.post(
        //         `${BASE_URL}item/save-image/${itemId}`,
        //         formData,
        //         {
        //             headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             },
        //         }
        //     );

        //     console.log('Upload response:', response.data);
        //     // Handle successful upload
        //     // setSelectedImage(null); // Clear selected image after successful upload
        // } catch (error) {
        //     console.error('Upload error:', error);
        //     setError(error);
        // } finally {
        //     setIsLoading(false);
        // }
    };







    /////

    const [formData, setFormData] = useState({
        item_name: '',
        description: '',
        price: '',
        acutal_price: '00',
        status: 'active',
        category: 'multiRetail',
        mrp: '00',
    });

    const [isOpen, setOpen] = useState(false);
    const [status, setStatus] = useState('');

    // console.log(status)
    const handleChange = useCallback((key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    }, []);

    const handleStatusChange = useCallback((value) => {
        setStatus(value);
        setFormData((prevData) => ({
            ...prevData,
            status: value,
        }));
    }, []);

    const handleAddProduct = useCallback(async () => {
        // Basic validation
        if (!formData.item_name || !formData.price || !formData.status) {
            Alert.alert('Validation Error', 'Item Name, Price, are required.');
            return;
        }

        // Handle the logic to add the new product using formData
        // console.log('Adding new product:', formData);

        const body = {
            item_name: formData.item_name,
            description: formData.description,
            price: formData.price,
            discount: 0,
            acutal_price: formData.acutal_price,
            special_description: formData.description,
            tax: 0,
            status: status,
            saas_id: saasId,
            store_id: storeId,
            hsn_code: 0,
            promo_id: 0,
            sku: 0,
            category: formData.category,
            barcode: 0,
            mrp: formData.mrp,
            stock_quantity: 0,
            update_price: 0,
            selling_price: 0,
            opening_quantity: 0,
            closing_quantity: 0,
            received_quantity: 0,
        };

        const resp = await dispatch(AddNewItemMethod(body))

        // console.log(">",resp)

        if (resp?.status === true) {
            var itemId = await resp?.data?.item_id;

            if (itemId && itemId?.toString().length > 0) {
                console.log(itemId);
                // const 
                uploadImage(itemId)

            } else {
                console.log("item_id is empty or undefined");
            }
            navigation.navigate(SearchBar)

        }


        // Reset the form after adding the product
        setFormData({
            item_name: '',
            description: '',
            price: '',
            acutal_price: '',
            status: '',
            category: '',
            mrp: '',
        });
        setStatus('');
        setOpen(false);
    }, [formData]);

    return (
        <>
            <HeaderComp screenName={'Add New Product'} />
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

                                {/* <MaterialCommunityIcons name="account" size={155} color={'#ECE447'} /> */}
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
                            {/* <Image
                                        source={ImagePath.penIconBG}
                                        style={{ height: '100%', width: '100%', left: 20 }}
                                    /> */}

                            {/* <TouchableOpacity style={{ height: '25%', width: '25%', alignSelf: 'flex-end', left: 20, borderWidth: 1 }} activeOpacity={0.8} onPress={() => pickImage()}>
                           
                            <MaterialCommunityIcons name="cloud-upload" size={26} color='red' />

                        </TouchableOpacity> */}


                        </View>
                        <Text style={{ marginTop: moderateScale(8), color: '#000' }}>Please Upload Item Image</Text>
                    </View>
                    {/* <ButtonCompo title="Upload Image" onPress={uploadImage} /> */}

                    <TextInput
                        style={styles.input}
                        placeholder="Item Name"
                        placeholderTextColor={'grey'}

                        value={formData.item_name}
                        onChangeText={(text) => handleChange('item_name', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        placeholderTextColor={'grey'}

                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        placeholderTextColor={'grey'}
                        value={formData.price}
                        onChangeText={(text) => handleChange('price', text)}
                    />
                    {/* <TextInput
                    style={styles.input}
                    placeholder="Actual Price"
                    value={formData.acutal_price}
                    onChangeText={(text) => handleChange('acutal_price', text)}
                /> */}

                    {/* <TextInput
                    style={styles.input}
                    placeholder="Category"
                    value={formData.category}
                    onChangeText={(text) => handleChange('category', text)}
                /> */}

                    {/* <TextInput
                    style={styles.input}
                    placeholder="MRP"
                    value={formData.mrp}
                    onChangeText={(text) => handleChange('mrp', text)}
                /> */}

                    {/* <DropDownPicker
                    open={isOpen}
                    value={status}
                    items={statusOptions}
                    setOpen={setOpen}
                    setValue={handleStatusChange}
                    setItems={() => { }}
                    containerStyle={styles.dropdownContainer}
                    style={styles.dropdownStyle}
                    itemStyle={styles.dropdownItemStyle}
                    dropDownStyle={styles.dropdownDropStyle}
                    placeholder="Select Status"
                    searchable={false}
                /> */}

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

