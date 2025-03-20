import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import HeaderComp from '../../../../../Components/HeaderCompo';
import { CategoryItemUpdateMethod, GetCategoryItemMethod, GetCategoryMethod, GetSearchItemsMethod, GetSelectedCategoryItemsMethod, GetSubCategoryMethod, ItemUpdateMethod, RecommendedItemMethod, uploadImageMethod } from '../../../../../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '../../../../../styles/responsiveSize';
import axios from 'axios';
import { BASE_URL } from '../../../../../config/Base_Url';
import Loader from '../../../../../Components/Loader';
import CustomDropDown from '../../../../../Components/CustomDropDown';
import CustomModal from '../../../../../Components/Modal';
import { setSelectedMasterCategory } from '../../../../../ReduxToolkit/features/mainCategorySlice';
import { showToast } from '../../../../../utils/toast';

const UpdateItemScreen = ({ route }) => {
    const itemToUpdate = route?.params
    const itemId = itemToUpdate?.item_id

    console.log(itemToUpdate, "itemToUpdate")

    const [modalVisible, setModalVisible] = useState(false);
    const [subCategoryModalVisible, setSubCategoryModalVisible] = useState(false);
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer);
    const [itemName, setItemName] = useState(itemToUpdate?.item_name || '');
    const [description, setDescription] = useState(itemToUpdate?.special_description || '');
    const [newprice, setPrice] = useState(itemToUpdate?.price.toString() || '');
    const [receivedQty, setReceivedQty] = useState(itemToUpdate?.opening_qty?.toString() || '');
    const [actualPrice, setActualPrice] = useState(itemToUpdate?.actual_price?.toString() || '');
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
    const { masterCategory, selectedMasterCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory[0]?.category);

    const [uomOpen, setUomOpen] = useState(false);
    const [uomValue, setUomValue] = useState(itemToUpdate?.UOM || '');
    const [uomItems, setUomItems] = useState([
        { label: 'W', value: 'W' },
        { label: 'E', value: 'E' },
    ]);




    // Function to handle selection of category
    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setModalVisible(false)

        const masterCategoryIds = filterCategoryByName(category())
        const numberString = masterCategoryIds.join('');
        await dispatch(setSelectedMasterCategory(numberString))
        const resp1 = await dispatch(GetSubCategoryMethod(numberString))

        // console.log("addItem", category(), masterCategoryIds, numberString, "resp1", resp1)
    };
    const filterCategoryByName = (categoryName) => {
        // console.log("categoryName", categoryName)
        return masterCategory
            .filter(category => category.masterCategoryName === categoryName)
            .map(category => category.masterCategoryId);
    };

    // Function to handle selection of category
    const handleSubCategorySelect = (category) => {
        setSelectedSubCategory(category);
        setSubCategoryModalVisible(false)

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

        if (receivedQty == 0) {
            showToast("please add quantity")
        }
        // setIsLoading(true)

        const data = {
            "item_name": itemName,
            "item_code": itemId,
            "description": description,
            "price": newprice,
            "discount": 0,
            "acutal_price": newprice,
            "special_description": description,
            "tax": "00",
            "status": status,
            "saas_id": saasId,
            "store_id": storeId,
            "hsn_code": "00",
            "promo_id": 0,
            "sku": 0,
            "category": selectedSubCategory,
            "barcode": 0,
            "mrp": 0,
            "stock_quantity": 0,
            "update_price": "00",
            "selling_price": "00",
            "opening_quantity": "00",
            "opening_qty": receivedQty,
            "closing_quantity": 0,
            "received_quantity": receivedQty,
            "actual_price": actualPrice,
            "UOM": uomValue

        }
        const jsonString = JSON.stringify(data);

        console.log("jsonString", jsonString)

        const ItemUpdateMethod_resp = await dispatch(CategoryItemUpdateMethod(jsonString,
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
                // navigation.goBack()
                navigation.popToTop()
            }
            dispatch(GetCategoryItemMethod())
        }
        // setIsLoading(false)

    };

    const imgUpload = async (url) => {

        const formData = new FormData();
        formData.append('file', {
            uri: imageData?.uri,
            name: imageData?.fileName,
            type: imageData?.type // Adjust according to your file type
        });

        // console.log("imgUpload_propss", url,formData?._parts)

        // Axios POST request
        axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                console.log('Success', response.data);
                setTimeout(() => {
                    navigation.popToTop()
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



    // console.log("UpdateItem", actualPrice)
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
                        <Text style={{ marginTop: moderateScale(8), color: 'red', fontSize: 12, alignSelf: 'center' }}>JPG or PNG images, maximum 20KB</Text>

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
                            dropDownContainerStyle={styles.dropdownContainers}
                        />
                        <Text style={styles.label}>Price</Text>
                        <TextInput
                            style={styles.input}
                            value={newprice}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Price'
                        />

                        <Text style={styles.label}>MRP</Text>
                        <TextInput
                            style={styles.input}
                            value={actualPrice}
                            onChangeText={(text) => setActualPrice(text)}
                            keyboardType="numeric"
                            placeholderTextColor="#666"
                            placeholder='Mrp'
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
                        <Pressable
                            onPress={() => setModalVisible(true)}
                            containerStyle={[styles.input, { marginTop: 20 }]}
                        >
                            <Text style={styles.label}>Main Category</Text>
                            <TextInput
                                style={styles.input}
                                value={selectedCategory}
                                keyboardType="numeric"
                                placeholderTextColor="#666"
                                placeholder='Category'
                                editable={false}
                            />
                        </Pressable>

                        <Text style={[styles.label, { marginTop: 20 }]}>Sub-Category</Text>
                        <Pressable
                            onPress={() => setSubCategoryModalVisible(true)}
                            containerStyle={styles.input}
                        >
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
                            {masterCategory.length > 0 ?
                                <View style={{ marginTop: 8, paddingVertical: 8, justifyContent: 'center', }}>
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
    dropdownContainers: {
        height: 90,
        marginBottom: 10,
    },
});

export default UpdateItemScreen;



// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import Routes from '../../../../../Navigation/Routes'

// const UpdateItems = ({ route }) => {
//     const itemToUpdate = route?.params

//     console.log("first",itemToUpdate)
//     return (
//         <View>
//             <Text>UpdateItems</Text>
//         </View>
//     )
// }

// export default UpdateItems

// const styles = StyleSheet.create({})