import React, { useState, useCallback } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import DropDownPicker from 'react-native-dropdown-picker';
import { moderateScale, scale } from '../../../../styles/responsiveSize';
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
const colorOptions = [
    { name: 'red', color: '#FF0000' },
    { name: 'green', color: '#00FF00' },
    { name: 'Blue', color: '#0000FF' },
    { name: 'purple', color: '#800080' },
    { name: 'fuchsia', color: '#FF00FF' },
    { name: 'yellow	', color: '#FFFF00' },
    { name: 'green', color: '#008000' },
    // Add more color options as needed
];
const AddProducts = () => {
    const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const [selectedColors, setSelectedColors] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
console.log("selectedColors",selectedColors)
    const pickImage = async () => {
        setSelectedImage(null);
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
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    };

    const uploadImage = async (itemId) => {
        setIsLoading(true);
        setError(null);
        const assets = selectedImage?.assets;

        if (assets !== null && assets?.length > 0) {
            try {
                const formData = new FormData();
                formData.append('file', {
                    uri: selectedImage.assets[0].uri,
                    type: selectedImage.assets[0].type,
                    name: selectedImage.assets[0].fileName,
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
                    message: "Item Added Successfully",
                    type: "success",
                });
            } catch (error) {
                console.error('Upload error:', error);
                setError(error);
            } finally {
                setIsLoading(false);
            }
        } else {
            showMessage({
                message: "Item Saved without Image",
                type: "success",
            });
        }
    };

    const [formData, setFormData] = useState({
        item_name: '',
        description: '',
        price: '',
        acutal_price: '00',
        status: 'active',
        category: 'multiRetail',
        mrp: '00',
        colorList: [
            {
              "product_size": '',
              "product_color": '',
              "item_id":'',
              "status": '',
              "saas_id": '',
              "store_id": ''
            },
            
          ]
    });
console.log("formData",formData)
    const handleChange = useCallback((key, value) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    }, []);

    const handleAddProduct = useCallback(async () => {
        if (!formData.item_name || !formData.price ) {
            Alert.alert('Validation Error', 'Item Name, Price, and Status are required.');
            return;
        }

        const body = {
            item_name: formData.item_name,
            description: formData.description,
            price: formData.price,
            product_color:formData.product_color,
            discount: 0,
            acutal_price: formData.acutal_price,
            special_description: formData.description,
            tax: 0,
            status: formData.status,
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
            colorList:[{product_size: formData.product_size,
            product_color: formData.product_color, saas_id: saasId,
            store_id: storeId}]
        };

        const resp = await dispatch(AddNewItemMethod(body));

        if (resp?.status === true) {
            const itemId = resp?.data?.item_id;

            if (itemId && itemId?.toString().length > 0) {
                console.log(itemId);
                uploadImage(itemId);
            } else {
                console.log("item_id is empty or undefined");
            }
            navigation.navigate(SearchBar);
        }

        setFormData({
            item_name: '',
            description: '',
            price: '',
            acutal_price: '',
            status: '',
            category: '',
            mrp: '',
            colorList: [
                {
                  "product_size": '',
                  "product_color": '',
                  "item_id": '',
                  "status": "available",
                  "saas_id": "saas123",
                  "store_id": "store456"
                },
                
              ]
        });
    }, [formData]);

    const handleColorSelection = (color) => {
        const index = selectedColors.indexOf(color);
        if (index !== -1) {
            setSelectedColors(selectedColors.filter(c => c !== color));
        } else {
            setSelectedColors([...selectedColors, color]);
        }
    };

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <>
            <HeaderComp screenName={'Add New Product'} />
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView
                    contentContainerStyle={styles.container}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32) }}>
                        <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff" }}>
                            <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
                                {selectedImage ?
                                    (
                                        <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => pickImage()}>
                                            <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }} resizeMode='cover' />
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
                    <TextInput
                        style={styles.input}
                        placeholder="Product Size"
                        placeholderTextColor={'grey'}
                        value={formData.product_size}
                        onChangeText={(text) => handleChange('product_size', text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Product Color"
                        placeholderTextColor={'grey'}
                        value={formData.colorList[0].product_color||selectedColors.length > 0 ? selectedColors.join(', ') : ''}
                        onChangeText={(text) => handleChange('product_color', text)}
                        onFocus={toggleModal}
                    />
                    {/* <TextInput
                        style={styles.input}
                        placeholder="Color Name"
                        placeholderTextColor="grey"
                        value={selectedColors.length > 0 ? selectedColors.join(', ') : ''}
                        onFocus={toggleModal}
                    /> */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isModalVisible}
                        onRequestClose={toggleModal}
                    >
                        <View style={styles.modalContainer}>
                            <ScrollView horizontal={true}>
                                {colorOptions.map((colorOption, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.colorOption,
                                            {
                                                backgroundColor: colorOption.color,
                                                borderWidth: selectedColors.includes(colorOption.name) ? 1 : 0,
                                            },
                                        ]}
                                        onPress={() => handleColorSelection(colorOption.name)}
                                    />
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>
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
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
        fontSize: 16,
        color: '#000',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        
    },
    colorOption: {
        marginTop:400,      
        width: 40,
        height: 40,
        flexWrap: 'wrap',
        borderRadius: 20,
        marginHorizontal: 8,
    },
});

export default AddProducts;
