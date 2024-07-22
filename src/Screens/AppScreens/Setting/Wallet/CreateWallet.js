import { StyleSheet, Text, View, } from 'react-native'
import React, { useState } from 'react'
import TextInputCompo from '../../../../Components/TextInputCompo'
import { useDispatch, useSelector } from 'react-redux';
import {  validateWalletBalanceForm } from '../../../../utils/validation';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { CreateWalletMethod } from '../../../../config/userApiMethods';
import { moderateScale } from '../../../../styles/responsiveSize';
import Wallet from './Wallet';




const CreateWallet = (route) => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { id } = route?.route.params

    console.log("props", id)
    const [errors, setErrors] = useState({
        balance: null,
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [inputs, setInputs] = useState({
        balance: '',
    });
    const dispatch = useDispatch();
    const navigation = useNavigation()

    const handleOnChange = (text, input) => {
        // Update the inputs state with the new text
        const updatedInputs = { ...inputs, [input]: text };

        // Validate the updated form inputs
        const formErrors = validateWalletBalanceForm(updatedInputs);

        // Update the inputs state
        setInputs(updatedInputs);

        // Update the errors state for the specific input
        setErrors((prevErrors) => ({
            ...prevErrors,
            [input]: formErrors[input],
        }));

        // Check if the form is valid based on the validation results
        const isFormValid = Object.values(formErrors).every((error) => !error);

        // Update the formIsValid state
        setFormIsValid(isFormValid);
    };
    const handleSubmit = async () => {
        if (formIsValid) {
            const data = JSON.stringify({
                balance: inputs.balance,
                customer_id: id,
                storeId: storeId,
                saasId: saasId,
            });

            const resp = await dispatch(CreateWalletMethod(data))

            console.log("createWallethjkl", resp)

            if (resp?.status == true) {
                console.log("createWallet", resp)
                navigation.navigate('Wallet')

            }


        } else {
            showToast("enter correct value")
        }
    }

    console.log("error", errors, formIsValid)
    return (
        <View style={styles.container}>
            <HeaderComp screenName={'Create Wallet'} onBackPress={() => navigation.goBack()} />

            <View style={styles.itemContainer}>

                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'balance')}
                    onFocus={() => setErrors({ ...errors, balance: null })}
                    iconName="currency-rupee"
                    placeholder="Enter Wallet Balance"
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.balance}
                />

                <ButtonCompo onPress={() => handleSubmit()} title="Add Wallet" style={{}} />

            </View>
        </View>
    )
}

export default CreateWallet

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    itemContainer: {
        backgroundColor: '#fff',
        marginTop: moderateScale(16)

    },
    itemTwo: {
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500'
    },
    keyValue: {
        fontSize: 14,
        color: 'grey'
    },

})