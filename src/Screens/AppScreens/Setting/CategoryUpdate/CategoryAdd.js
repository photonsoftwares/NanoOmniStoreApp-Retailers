import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TextInputCompo from '../../../../Components/TextInputCompo';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderComp from '../../../../Components/HeaderCompo';
import { AddCategoryMethod } from '../../../../config/userApiMethods';

const CategoryAdd = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { categoryData, categoryCurrentPage } = useSelector((state) => state?.categoriesReducer)
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
        if (resp === true) {
            navigation.goBack()

        }
    };


    // console.log("s", categoryData[0], storeId, saasId,)
    return (
        <View>
            <HeaderComp
                screenName={'Add Category'}
                onBackPress={() => navigation.goBack()}
                onPressLefttrue={true}
            />
            <View style={{height:'100%',marginTop:16}}>

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
    );
};



export default CategoryAdd

const styles = StyleSheet.create({})