import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TextInputCompo from '../../../../Components/TextInputCompo'
import { useDispatch, useSelector } from 'react-redux';
import { validateLoginForm, validateWalletBalanceForm } from '../../../../utils/validation';
import ButtonCompo from '../../../../Components/ButtonCompo';
import { showToast } from '../../../../utils/toast';
import HeaderComp from '../../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';
import { CreateWalletMethod, UpdateWalletMethod } from '../../../../config/userApiMethods';
import { moderateScale } from '../../../../styles/responsiveSize';

const UpdateWallet = (props) => {
    const { id } = props?.route?.params
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const [errors, setErrors] = useState({
        balance: null,
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [inputs, setInputs] = useState({
        balance: '',
    });
    const dispatch = useDispatch();
    const navigation = useNavigation()
    // console.log("first", props, "<>JKL:", id)

        ;

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
            const data = {
                balance: inputs.balance,
                customer_id: userId,
                storeId: storeId,
                saasId: saasId,
                walletId: id,
            };

            const resp = await dispatch(UpdateWalletMethod(data))

            console.log("UpdateWalletMethod",)

            if (resp?.status == true) {
                // console.log("createWallet", resp)
                navigation.goBack()

            }


        } else {
            showToast("enter correct value")
        }
    }

    console.log("error", errors, formIsValid)
    return (
        <View style={styles.container}>
            <HeaderComp screenName={'Update Wallet'} onBackPress={() => navigation.goBack()} />

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

                <ButtonCompo onPress={() => handleSubmit()} title="Update Balance" style={{}} />

            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    itemContainer: {
        backgroundColor: '#fff',
        marginTop: moderateScale(16)

    },

})

export default UpdateWallet

