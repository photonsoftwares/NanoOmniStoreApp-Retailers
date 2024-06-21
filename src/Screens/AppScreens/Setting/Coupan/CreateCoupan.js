import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../../../Components/HeaderCompo'
import { moderateScale } from '../../../../styles/responsiveSize'
import TextInputCompo from '../../../../Components/TextInputCompo'
import ButtonCompo from '../../../../Components/ButtonCompo'
import RadioButton from '../../../../Components/RadioButton'
import { validateCoupanForm } from '../../../../utils/validation'
import { useDispatch, useSelector } from 'react-redux'
import CustomModal from '../../../../Components/Modal'
import CustomDropDown from '../../../../Components/CustomDropDown'
import { useNavigation } from '@react-navigation/native'
import { CreateCoupanMethod } from '../../../../config/userApiMethods'
import CustomCalender from '../../../../Components/CustomCalender'
import { Customer_Eligibility } from '../../../../DataBase/db'
import { showToast } from '../../../../utils/toast'






const CreateCoupan = () => {
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const { categoryData } = useSelector((state) => state?.productReducer);
    const [modalVisible, setModalVisible] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState(categoryData[0]?.category_name);
    const [selectedCategory, setSelectedCategory] = useState();
    const [dropDownType, setDropDownType] = useState(null);
    const [dropDownRender, setDropDownRender] = useState('1');
    const [selectedOption, setSelectedOption] = useState('option1');
    const [selectedCategoryOption, setSelectedCategoryOption] = useState('option1');
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        coupon_name: '',
        storeId: storeId,
        max_usage_per_Customer: null,
        effective_from: "",
        expiration_date: '',
        description: "",
        discount_type: selectedOption,
        discount_amount: null,
        discount_percent: null,
        max_discount: null,
        Min_order_Amount: null,
        applies_to: "",
        customer_eligibility: "",
        auto_apply: true,
        show_to_customer: true,
        new_customer_only: false
    });
    const [errors, setErrors] = useState({
        coupon_name: null,
        max_usage_per_Customer: null,
        effective_from: null,
        expiration_date: null,
        description: null,
        discount_type: null,
        discount_amount: null,
        discount_percent: null,
        max_discount: null,
        Min_order_Amount: null,
        applies_to: null,
        customer_eligibility: null,
        auto_apply: null,
        show_to_customer: null,
        new_customer_only: null
    });
    const [formIsValid, setFormIsValid] = useState(false);
    const [dateVisible, setDateVisible] = useState(false);
    const [dateType, setDateType] = useState(null);
    const [render, setRender] = useState('1');



    // console.log("fromDate",fromDate)
    const handleOnChange = (text, input) => {
        const updatedInputs = { ...inputs, [input]: text };
        const formErrors = validateCoupanForm(updatedInputs);
        setInputs(updatedInputs);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [input]: formErrors[input],
        }));
        const isFormValid = Object.values(formErrors).every((error) => !error);

        setFormIsValid(isFormValid);
        // setFormIsValid(true);
    };



    const handleSubmit = async () => {
        // console.log("createCoupanLOg", inputs, inputs.coupon_name !== '',inputs)

        if (inputs.coupon_name !== '' && inputs.effective_from !== '' && inputs.expiration_date !== '' && inputs.customer_eligibility !== '') {
            const resp = await dispatch(CreateCoupanMethod(inputs))
            if (resp?.status == true) {
                navigation.goBack()
            }
        } else {
            showToast("Please fill all fields")
        }
    };


    const options = [
        { key: 'option1', text: 'Fixed' },
        { key: 'option2', text: 'Percentage' },
        // { key: 'option3', text: 'Option 3' },
    ];
    const allCategory = [
        { key: 'option1', text: 'All' },
        { key: 'option2', text: 'Specific' },
        // { key: 'option3', text: 'Option 3' },
    ];


    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setModalVisible(false)
        console.log("dropDownType", dropDownType)
        handleOnChange(category(), 'applies_to')
    };

    const handleCustomer_EligibilitySelect = (eligibility) => {
        // setSelectedCategory(eligibility);
        setModalVisible(false)
        console.log("dropDownType", dropDownType, eligibility)
        handleOnChange(eligibility(), 'customer_eligibility')

    };

    const openModal = (id) => {
        setModalVisible(true);
        setRender(id)
    };
    const closeModal = () => {
        setModalVisible(false);
    };
    const handleSelected = (selected) => {
        console.log("first", selected)
        closeModal();
    };


    const handleDateChange = (date) => {
        const formatDate = (dateString) => new Date(dateString).toISOString().split('T')[0];
        const formattedDate = formatDate(date);

        if (dateType == 'effective_from') {
            setDateVisible(false)
            handleOnChange(formattedDate, 'effective_from')

        } else {
            setDateVisible(false)
            handleOnChange(formattedDate, 'expiration_date')

        }
        setDateVisible(false)

    };



    return (
        <View style={styles.container}>
            <HeaderComp screenName={'Create New Coupon'} onBackPress={() => navigation.goBack()} />

            <ScrollView style={styles.itemContainer}
                keyboardDismissMode="interactive"
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
            >
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'coupon_name')}
                    onFocus={() => setErrors({ ...errors, coupon_name: null })}
                    iconName="format-title"
                    placeholder="Enter Coupon Name"
                    error={errors.coupon_name}
                />

                <Text style={[styles.title, { marginLeft: moderateScale(18) }]}> Set Effective Date: </Text>
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'effective_from')}
                    onFocus={() => setErrors({ ...errors, effective_from: null })}
                    iconName="calendar-month"
                    placeholder="Select Starting Date"
                    value={inputs.effective_from}
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.effective_from}
                    editable={false}
                    onPressTextInput={() => { setDateVisible(true), setDateType('effective_from') }}
                />

                <Text style={[styles.title, { marginLeft: moderateScale(18) }]}>Set Expiry Date: </Text>
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'expiration_date')}
                    onFocus={() => setErrors({ ...errors, expiration_date: null })}
                    iconName="calendar-month"
                    placeholder="Select Expiration Date"
                    value={inputs.expiration_date}
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.expiration_date}
                    editable={false}
                    onPressTextInput={() => { setDateVisible(true), setDateType('expiration_date') }}
                />

                {/* Set Category Type */}
                <View style={styles.discount}>
                    <Text style={styles.title}>Set Category Type</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', paddingVertical: moderateScale(8) }}>
                        {allCategory.map((option) => (
                            <RadioButton
                                key={option.key}
                                selected={selectedCategoryOption === option.key}
                                onPress={() => { setSelectedCategoryOption(option.key), handleOnChange(option.text, 'applies_to') }}
                                label={option.text}
                            // key={option.key}
                            // selected={selectedOption === option.key}
                            // onPress={() => { setSelectedOption(option.key), handleOnChange(option.text, 'discount_type') }}
                            // label={option.text}
                            />
                        ))}
                    </View>
                </View>


                {
                    selectedCategoryOption !== 'option1' ?
                        <>
                            <Text style={[styles.title, { marginLeft: moderateScale(18) }]}> Set Category: </Text>
                            <TextInputCompo
                                onChangeText={(text) => handleOnChange(text, 'applies_to')}
                                onFocus={() => setErrors({ ...errors, applies_to: null })}
                                iconName="shape-plus"
                                placeholder="Set Applies To"
                                value={selectedCategory}
                                maxLength={10}
                                keyboardType="number-pad"
                                error={errors.applies_to}
                                editable={false}
                                onPressTextInput={() => { setModalVisible(true), setDropDownRender('1') }}
                            />
                        </>
                        :
                        null
                }

                {/* // */}
                <Text style={[styles.title, { marginLeft: moderateScale(18) }]}>Customer Eligibility: </Text>
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'customer_eligibility')}
                    onFocus={() => setErrors({ ...errors, customer_eligibility: null })}
                    iconName="account"
                    placeholder="Select Customer Eligibility"
                    value={inputs.customer_eligibility}
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.customer_eligibility}
                    editable={false}
                    onPressTextInput={() => { setModalVisible(true), setDropDownRender('3') }}
                />
                <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                    <View style={{ justifyContent: 'center', }}>
                        {
                            dropDownRender == '1' ?
                                <>
                                    <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
                                    < CustomDropDown data={categoryData} type={dropDownRender} onSelect={handleCategorySelect} />
                                </>
                                :
                                dropDownRender == '3' ?
                                    <>
                                        <Text style={[styles.label, { marginBottom: 8 }]}>Select Category</Text>
                                        {/* < CustomDropDown onSelect={handleCustomer_EligibilitySelect} data={Customer_Eligibility} type={dropDownRender} /> */}
                                        < CustomDropDown onSelect={handleCustomer_EligibilitySelect} data={Customer_Eligibility} type='3' />
                                    </>
                                    :
                                    null
                        }
                    </View>

                </CustomModal>


                {
                    dateVisible &&
                    <CustomCalender
                        onDateChange={handleDateChange}
                    />
                }
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'max_usage_per_Customer')}
                    onFocus={() => setErrors({ ...errors, max_usage_per_Customer: null })}
                    iconName="pencil-plus"
                    placeholder="Enter Max Usage Per Customer"
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.max_usage_per_Customer}
                />

                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'description')}
                    onFocus={() => setErrors({ ...errors, description: null })}
                    iconName="pen"
                    placeholder="Enter Description"
                    maxLength={10}
                    error={errors.description} description
                />
                <View style={styles.discount}>
                    <Text style={styles.title}>Set discount Type</Text>
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-evenly', paddingVertical: moderateScale(8) }}>
                        {options.map((option) => (
                            <RadioButton
                                key={option.key}
                                selected={selectedOption === option.key}
                                onPress={() => { setSelectedOption(option.key), handleOnChange(option.text, 'discount_type') }}
                                label={option.text}
                            />
                        ))}
                    </View>


                </View>
                {
                    selectedOption == 'option1' ?
                        <>
                            <TextInputCompo
                                onChangeText={(text) => handleOnChange(text, 'discount_amount')}
                                onFocus={() => setErrors({ ...errors, discount_amount: null })}
                                iconName="currency-rupee"
                                // value={selectedOption == 'option1' ? 'fixed' : ''}
                                placeholder="Enter Discount Amount"
                                maxLength={10}
                                keyboardType="number-pad"
                                error={errors.discount_amount}
                            />
                        </>
                        :
                        selectedOption == 'option2' ?
                            <>
                                <TextInputCompo
                                    onChangeText={(text) => handleOnChange(text, 'discount_percent')}
                                    onFocus={() => setErrors({ ...errors, discount_percent: null })}
                                    // value={selectedOption == 'option2' ? 'Percentage' : ''}
                                    iconName="percent"
                                    placeholder="Enter Discount Percent"
                                    maxLength={10}
                                    keyboardType="number-pad"
                                    error={errors.discount_percent}
                                />
                            </>
                            :
                            null
                }

                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'max_discount')}
                    onFocus={() => setErrors({ ...errors, max_discount: null })}
                    iconName="sale"
                    placeholder="Enter Max Discount"
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.max_discount}
                />
                <TextInputCompo
                    onChangeText={(text) => handleOnChange(text, 'Min_order_Amount')}
                    onFocus={() => setErrors({ ...errors, Min_order_Amount: null })}
                    iconName="numeric"
                    placeholder="Enter MinOrder Amount"
                    maxLength={10}
                    keyboardType="number-pad"
                    error={errors.Min_order_Amount}
                />
                <ButtonCompo onPress={() => handleSubmit()} title="Create Coupon" style={{}} />
            </ScrollView>
        </View >
    )
}

export default CreateCoupan

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
        color: '#000',
        fontWeight: '700'
    },
    keyValue: {
        fontSize: 14,
        color: 'grey'
    },
    discount: {
        marginHorizontal: moderateScale(18),
        width: '90%',
        borderRadius: 8,
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
        width: '90%',
        alignSelf: 'center'


    },
})