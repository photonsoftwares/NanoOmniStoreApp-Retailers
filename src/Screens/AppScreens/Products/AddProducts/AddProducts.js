import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Button, Pressable } from 'react-native';
import HeaderComp from '../../../../Components/HeaderCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { moderateScale } from '../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewItemMethod, GetCategoryMethod, GetSubCategoryMethod, RecommendedItemMethod } from '../../../../config/userApiMethods';
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
import { setSelectedMasterCategory } from '../../../../ReduxToolkit/features/mainCategorySlice';
import WeightUnitSelector from '../../../../Components/WeightUnitSelector';
import DropDownPicker from 'react-native-dropdown-picker';





const AddProducts = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { subCategory, masterCategory, } = useSelector((state) => state?.mainCategoryReducer);
    const { storeType } = useSelector((state) => state?.authReducer?.user?.store_data)

    const [modalVisible, setModalVisible] = useState(false);
    const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [selectedCategory, setSelectedCategory] = useState(masterCategory[0]?.masterCategoryName);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory[0]?.category);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState('KG');

    // State for UOM dropdown
    const [uomOpen, setUomOpen] = useState(false);
    const [uomValue, setUomValue] = useState(null);
    const [uomItems, setUomItems] = useState([
        { label: 'W', value: 'W' },
        { label: 'E', value: 'E' },
    ]);



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
        selling_price: 0,
        UOM: ''

    });


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
    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setModalVisible(false)

        const masterCategoryIds = filterCategoryByName(category())
        const numberString = masterCategoryIds.join('');
        await dispatch(setSelectedMasterCategory(numberString))
        const resp1 = await dispatch(GetSubCategoryMethod(numberString))



    };
    const filterCategoryByName = (categoryName) => {
        return masterCategory
            .filter(category => category.masterCategoryName === categoryName)
            .map(category => category.masterCategoryId);
    };


    // Function to handle selection of category
    const handleSubCategorySelect = (category) => {
        setSelectedSubCategory(category);
        setSubCategoryModalVisible(false)
    };


    const [selectedImage, setSelectedImage] = useState(null);
    const imageData = selectedImage?.assets[0]
    const [isLoading, setIsLoading] = useState(false);

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
            } else if (result.error) {
            } else {
                setSelectedImage(result);
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
    const handleUnitChange = (unit) => {
        setSelectedUnit(unit);
    };

    const handleAddProduct = async () => {

        if (!formData.item_name.trim()) {
            showToast('Please enter item name');
            return;
        }
        if (!formData.price || isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
            showToast('Please enter item price');
            return;
        }

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
            category: selectedSubCategory,
            barcode: 0,
            mrp: formData.acutal_price,
            product_qty: formData.stock_quantity,
            update_price: 0,
            selling_price: formData.selling_price,
            opening_qty: formData.opening_quantity,
            closing_qty: formData.closing_quantity,
            received_qty: formData.received_quantity,
            // UOM: storeType == 'Vegitable' ? selectedUnit : '',
            colorList: [SelectedColor],
            UOM: uomValue,
        };

        // console.log("AddItem", body)

        const resp = await dispatch(AddNewItemMethod(body))
        console.log(resp, "AddItem")
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

    console.log("categoryData", storeType)


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
                        <Text style={{ marginTop: moderateScale(8), color: 'red', fontSize: 12 }}>JPG or PNG images, maximum 20KB</Text>
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
                    <DropDownPicker
                        open={uomOpen}
                        value={uomValue}
                        items={uomItems}
                        setOpen={setUomOpen}
                        setValue={setUomValue}
                        setItems={setUomItems}
                        placeholder="Select UOM"
                        style={styles.input}
                        dropDownContainerStyle={styles.dropdownContainer}
                    />
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        containerStyle={styles.input}
                    >
                        <Text style={{ color: 'grey' }}>*Main Category</Text>
                        <TextInput
                            style={styles.input}
                            value={selectedCategory}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Category'
                            editable={false}
                        />
                    </Pressable>
                    <Pressable
                        onPress={() => setSubCategoryModalVisible(true)}
                        containerStyle={styles.input}
                    >
                        <Text style={{ color: 'grey' }}>*Sub Category</Text>
                        <TextInput
                            style={styles.input}
                            value={selectedSubCategory}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Category'
                            editable={false}
                        />
                    </Pressable>

                    <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                        {masterCategory?.length > 0 ?

                            <View style={{ justifyContent: 'center', }}>
                                <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
                                < CustomDropDown onSelect={handleCategorySelect} type={'1'} data={masterCategory} />
                            </View>

                            :
                            null
                        }
                    </CustomModal>
                    <CustomModal visible={subCategoryModalVisible} onClose={() => setSubCategoryModalVisible(false)}>
                        {subCategory?.length > 0 ?

                            <View style={{ justifyContent: 'center', }}>
                                <Text style={[styles.label, { marginBottom: 8 }]}>Select Sub-Category</Text>
                                < CustomDropDown onSelect={handleSubCategorySelect} type={'2'} data={subCategory} />
                            </View>

                            :
                            null
                        }
                    </CustomModal>
                    <Text style={{ color: 'grey' }}>*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="MRP"
                        value={formData.acutal_price}
                        onChangeText={(text) => handleChange('acutal_price', text)}
                        keyboardType='numeric'

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



                    <TextInput
                        style={styles.input}
                        placeholder={storeType == 'medical' ? "Composotion/Description" : "Description"}
                        placeholderTextColor={'grey'}
                        value={formData.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Opening Quantity"
                        value={formData.opening_quantity}
                        onChangeText={(text) => handleChange('opening_quantity', text)}
                        keyboardType='numeric'
                    />

                    {
                        storeType == 'Vegitable' ?
                            <WeightUnitSelector onUnitChange={handleUnitChange} />
                            :
                            null
                    }

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
    dropdownContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
});

export default AddProducts;
