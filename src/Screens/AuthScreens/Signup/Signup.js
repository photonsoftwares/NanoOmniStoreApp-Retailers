

import { Text, View, TouchableOpacity, Keyboard, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useTheme } from '@react-navigation/native';
import { moderateScale, moderateScaleVertical } from '../../../styles/responsiveSize';
import TextInputCompo from '../../../Components/TextInputCompo';
import ButtonCompo from '../../../Components/ButtonCompo';
import commonStyles from '../../../styles/commonStyles';
import { SignUpMethod } from '../../../config/authApiMethods';





const Signup = () => {
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({
    mobile_number: "",
    password: "",
    delivery_address: "",
    customer_name: "",
    store_id: "",
    email: "",
    saas_id: ""
  });


  const navigation = useNavigation()
  const dispatch = useDispatch()
  const colors = useTheme().colors;
  const product = useSelector(state => state?.auth?.data?.customer_data);
  const accessToken = useSelector(state => state?.auth?.data?.jwt_response);
  const token = null;
  // console.log('TOKENLogIn__', accessToken)

  // console.log("product", product)
  // const LoaderFunv = () => {
  //   setTimeout(() => {

  //     <Loader />
  //   }, [1000])
  // }



  const handleSubmit = async () => {


    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.customer_name) {
      handleError('Please input name', 'customer_name');
      isValid = false;
    }

    if (!inputs.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    } else if (!inputs.email.includes("@gmail.com")) {
      handleError('Please input @gmail.com', 'email');
    }

    const mobileNumberPattern = /^[0-9]+$/; // Regular expression to match digits only
    if (!inputs.mobile_number) {
      handleError('Please input number', 'mobile_number');
      isValid = false;
    } else if (inputs.mobile_number.length !== 10) {
      handleError('Mobile number must be 10 digits long', 'mobile_number');
      isValid = false;
    } else if (!mobileNumberPattern.test(inputs.mobile_number)) {
      handleError('Mobile number should contain only digits', 'mobile_number');
      isValid = false;
    } else {
      isValid = true;
    }

    // if (!inputs.saas_id) {
    //   handleError('Please input Saas Id', 'saas_id');
    //   isValid = false;
    // } else if (!/^\d+$/.test(inputs.saas_id)) {
    //   handleError('Store ID should contain only digits', 'saas_id');
    //   isValid = false;
    // } else {
    //   isValid = true;
    // }

    // if (!inputs.store_id) {
    //   handleError('Please input storeId', 'store_id');
    //   isValid = false;
    // }   else  if (inputs.store_id.length !== 5) {
    //   handleError('Store ID must be 5 digits long', 'store_id');
    //   isValid = false;
    // } 
    // else if (!/^\d+$/.test(inputs.store_id)) {
    //   handleError('Store ID should contain only digits', 'store_id');
    //   isValid = false;
    // } else {
    //   isValid = true;
    // }

    if (!inputs.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (inputs.password.length < 3) {
      handleError('Min password length of 3', 'password');
      isValid = false;
    }


    if (isValid) {
      const data = JSON.stringify({
        mobile_number: inputs.mobile_number,
        password: inputs.password,
        delivery_address: inputs.delivery_address,
        customer_name: inputs.customer_name,
        email: inputs.email,
        store_id: inputs.store_id,
        saas_id: inputs.saas_id

        // store_id: '70001',
        // saas_id: '7'
      })

      // console.log(">?",data)

      try {

        const res = await dispatch(SignUpMethod(data))

        // if (res.status !== true) {
        //   // showMessage({
        //   //   message: "User already register!",
        //   //   type: "danger"
        //   // })
        //   console.log("False SignUp")
        // } else {
        //   // navigation.goBack();
        //   navigation.navigate('OtpVerification', {
        //     mobile_number: inputs.mobile_number,

        //   });

        // }

        if (res.status == true) {
          navigation.goBack()
        }


      } catch (error) {
        console.error('Error during sign up:', error);
      }


    }

  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));

  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };



  return (


    <ScrollView contentContainerStyle={[styles.container, {}]}

      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[commonStyles.fontBold24, { color: colors.text, fontWeight: 'bold' }]}>SignUp</Text>
      </View>
      <View style={[styles.modalView, {
        paddingVertical: moderateScaleVertical(14),
        // paddingHorizontal: moderateScale(14),
      }]}>
        {/* <Loader isLoading={true}/> */}

        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'customer_name')}
          onFocus={() => handleError(null, 'customer_name')}
          iconName="account-outline"
          placeholder="Enter  name"
          error={errors.customer_name}
        />
        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'email')}
          onFocus={() => handleError(null, 'email')}
          iconName="email-outline"
          placeholder="Enter Email"
          error={errors.email}
        />
        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'mobile_number')}
          onFocus={() => handleError(null, 'mobile_number')}
          iconName="phone"
          placeholder="Enter Number"
          keyboardType='number-pad'
          maxLength={10}
          error={errors.mobile_number}
        />
        <TextInputCompo

          onChangeText={text => handleOnchange(text, 'saas_id')}
          onFocus={() => handleError(null, 'saas_id')}
          iconName="numeric"
          label="Email"
          placeholder="Enter Saas Id"
          keyboardType='number-pad'
          maxLength={2}
          error={errors.saas_id}

        // value={'7'}
        // textInputColor={'#EFEFEF'}
        // editable={false}



        />
        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'store_id')}
          onFocus={() => handleError(null, 'store_id')}
          iconName="numeric"
          label="Email"
          placeholder="Enter Store Id"
          keyboardType='number-pad'
          maxLength={5}

          // value={'70001'}
          // textInputColor={'#EFEFEF'}
          // editable={false}



          error={errors.store_id}
        />
        <TextInputCompo
          onChangeText={text => handleOnchange(text, 'password')}
          onFocus={() => handleError(null, 'password')}
          iconName="lock-outline"
          label="Password"
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <ButtonCompo
          onPress={() => {
            handleSubmit()
          }}
          title='Sign Up'
          style={{ marginVertical: 16 }}
        />
        {/*   */}
        <View style={[{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }]}>
          <Text style={{
            alignSelf: 'center', fontSize: moderateScale(16),
          }}>Already have an account ?</Text>
          <TouchableOpacity style={{}}>
            <Text style={[styles.experienceText, commonStyles.fontBold16, {
              color: 'blue',
              alignSelf: 'center',
              fontSize: moderateScale(16),
              fontWeight: 'bold'

            }]} onPress={() => navigation.goBack()}> LogIn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>

  )
}

export default Signup


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF'

  },
  experienceText: {
    alignSelf: 'center',
    alignSelf: "flex-start"

  },
  modalView: {
    justifyContent: 'center',
    borderRadius: 5,
  },


});



