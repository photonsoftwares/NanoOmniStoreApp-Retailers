


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
            <View style={{ height: '100%', marginTop: 16 ,backgroundColor:"white"}}>
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