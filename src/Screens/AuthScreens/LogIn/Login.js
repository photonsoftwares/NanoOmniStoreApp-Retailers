import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, useNavigation } from '@react-navigation/native';
import ButtonCompo from '../../../Components/ButtonCompo';
import { scale } from '../../../styles/responsiveSize';
import commonStyles from '../../../styles/commonStyles';
import TextInputCompo from '../../../Components/TextInputCompo';
import { validateLoginForm } from '../../../utils/validation';
import { LogInMethod } from '../../../config/authApiMethods';


const Login = () => {
  const [errors, setErrors] = useState({
    user_name: null,
    password: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [inputs, setInputs] = useState({
    storeId: '',
    password: '',
  });

  const dispatch = useDispatch();
  const colors = useTheme().colors;
  const navigation = useNavigation()



  const handleSubmit = async () => {

    // console.log("first")
    // console.log(formIsValid,inputs.storeId, inputs.password)

    // if (formIsValid) {
    //   // const data = JSON.stringify({
    //   //   user_name: inputs.storeId,
    //   //   password: inputs.password,
    //   // });

    //   // await dispatch(LogInMethod(data))
    // }

    const data = JSON.stringify({
      user_name: inputs.storeId,
      password: inputs.password,
    });
    


    const a = await dispatch(LogInMethod(data))

    // console.log("second",a)


  };




  const handleOnChange = (text, input) => {
    const updatedInputs = { ...inputs, [input]: text };
    const formErrors = validateLoginForm(updatedInputs);

    setInputs(updatedInputs);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [input]: formErrors[input],
    }));

    const isFormValid = Object.values(formErrors).every((error) => !error);
    setFormIsValid(isFormValid);
  };



  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}
      keyboardDismissMode="interactive"
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.formContainer, {}]}>
        <Text style={[commonStyles.fontBold24, { fontWeight: 'bold', marginBottom: scale(10), alignSelf: 'center',color:colors.grey900 }]}>LogIn</Text>

        <TextInputCompo
          onChangeText={(text) => handleOnChange(text, 'storeId')}
          onFocus={() => setErrors({ ...errors, storeId: null })}
          iconName="phone"
          placeholder="Enter Store Id"
          maxLength={10}
          keyboardType="number-pad"
          error={errors.storeId}
        />

        <TextInputCompo
          onChangeText={(text) => handleOnChange(text, 'password')}
          onFocus={() => setErrors({ ...errors, password: null })}
          iconName="lock-outline"
          label="Password"
          placeholder="Enter your password"
          maxLength={12}
          error={errors.password}
          password
        />




        <ButtonCompo onPress={() => handleSubmit()} title="Log In" style={{}} />


      </View>
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',

  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  formContainer: {
    justifyContent: 'center',
    // marginHorizontal: moderateScale(16)
  },
  signupTextContainer: {
    flexDirection: 'row',
  },
  signupText: {
    // color: 'gray',

  },
});

export default Login;


