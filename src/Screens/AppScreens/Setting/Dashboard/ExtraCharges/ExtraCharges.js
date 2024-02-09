// import React, { useState } from 'react';
// import { View, Text, Switch, TextInput, StyleSheet, TouchableHighlight } from 'react-native';
// import ButtonCompo from '../../../../../Components/ButtonCompo';
// import HeaderComp from '../../../../../Components/HeaderCompo';
// import { moderateScale, textScale } from '../../../../../styles/responsiveSize';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     setExtraDeliveryChargesBoolean,
//     setExtraDeliveryChargesValue,
//     setExtraMinOrderValue,
//     setExtraMinOrderValueBoolean,
// } from '../../../../../ReduxToolkit/features/extraChargesSlice';
// import { useNavigation } from '@react-navigation/native';

// const ExtraCharges = () => {
//     const {
//         extraDeliveryCharges,
//         extraDeliveryChargesValue,
//         extraMinOrderValue,
//         extraMinOrderValueEnabled,
//     } = useSelector((state) => state.extraChargesReducer);
//     const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(extraDeliveryCharges);
//     const [isMinOrderEnabled, setIsMinOrderEnabled] = useState(extraMinOrderValueEnabled);
//     const [deliveryCharges, setDeliveryCharges] = useState('');
//     const [minOrderValue, setMinOrderValue] = useState('');
//     const [submitted, setSubmitted] = useState(false);
//     const [submittedMin, setSubmittedMin] = useState(false);
//     const dispatch = useDispatch();
//     const navigation = useNavigation();

//     const handleDeliverySubmit = async () => {
//         // console.log(`Delivery Charges: ${deliveryCharges}`);
//         // setSubmitted(true);
//         const dispatchedResp = await dispatch(setExtraDeliveryChargesValue(deliveryCharges));
//         if (dispatchedResp) {
//             // setIsDeliveryEnabled(false);
//             // navigation.goBack();
//         }
//     };

//     const handleDeliveryUpdate = () => {
//         console.log(`Updated Delivery Charges: ${deliveryCharges}`);
//         setSubmitted(false);
//     };

//     const handleMinOrderSubmit = () => {
//         // console.log(`Enable Minimum Order: ${isMinOrderEnabled}`);
//         // console.log(`Minimum Order Value: ${minOrderValue}`);
//         setSubmittedMin(true);
//         // Dispatch action for minimum order value
//         const dispatchedResp = dispatch(setExtraMinOrderValue(minOrderValue));
//         if (dispatchedResp) {
//             // navigation.goBack();
//         }
//     };

//     const handleMinOrderUpdate = () => {
//         console.log(`Updated Enable Minimum Order: ${isMinOrderEnabled}`);
//         console.log(`Updated Minimum Order Value: ${minOrderValue}`);
//         setSubmittedMin(false);
//     };

//     return (
//         <>
//             <HeaderComp screenName={'Extra Charges'} />
//             <View style={styles.container}>
//                 <View style={styles.deliveryContainer}>
//                     <Text style={styles.deliveryText}>Delivery Charges:  ₹{extraDeliveryChargesValue}
//                     </Text>
//                     <Switch
//                         value={isDeliveryEnabled}
//                         onValueChange={(value) => {
//                             dispatch(setExtraDeliveryChargesBoolean(value));
//                             setIsDeliveryEnabled(value);
//                         }}
//                         thumbColor={isDeliveryEnabled ? "#ECE447" /* Green for 'on' state */ : "#E57373" /* Pink for 'off' state */}
//                         trackColor={{ false: '#767577', true: '#767577' }}


//                     />
//                 </View>

//                 {isDeliveryEnabled && (
//                     <View style={[styles.inputContainer, { gap: 10 }]}>
//                         {/* <Text>Delivery Charges: {extraDeliveryChargesValue}</Text> */}
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter delivery charges"
//                             placeholderTextColor={'#666'}

//                             keyboardType="numeric"
//                             value={deliveryCharges}
//                             onChangeText={(text) => setDeliveryCharges(text)}
//                         />
//                         <ButtonCompo title="Submit" onPress={handleDeliverySubmit} />
//                     </View>
//                 )}

//                 {/* {submitted && (
//                     <View style={[styles.inputContainer, { gap: 10 }]}>
//                         <Text>Delivery Charges: {extraDeliveryChargesValue}</Text>
//                         <ButtonCompo title="Update" onPress={handleDeliveryUpdate} style={{}} />
//                     </View>
//                 )} */}

//                 {/* Separate section for Minimum Order Value */}
//                 <View style={styles.deliveryContainer}>
//                     <Text style={styles.deliveryText}>Min Order Value :  ₹{extraMinOrderValue}</Text>
//                     {/* <Switch
//                         value={isMinOrderEnabled}
//                         onValueChange={(value) => {
//                             dispatch(setExtraMinOrderValueBoolean(value));
//                             setIsMinOrderEnabled(value);
//                         }}
//                         thumbColor={isMinOrderEnabled ? "#ECE447" : 'red'}

//                     /> */}
//                     <Switch
//                         value={isMinOrderEnabled}
//                         onValueChange={(value) => {
//                             dispatch(setExtraMinOrderValueBoolean(value));
//                             setIsMinOrderEnabled(value);
//                         }}
//                         thumbColor={isMinOrderEnabled ? "#ECE447" /* Green for 'on' state */ : "#E57373" /* Pink for 'off' state */}
//                         trackColor={{ false: '#767577', true: '#767577' }}

//                     />
//                 </View>
//                 {isMinOrderEnabled && (
//                     <View style={[styles.inputContainer, { gap: 10 }]}>
//                         {/* <Text>Minimum Order : {extraMinOrderValue}</Text> */}
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter minimum order value"
//                             placeholderTextColor={'#666'}
//                             keyboardType="numeric"
//                             value={minOrderValue}
//                             onChangeText={(text) => setMinOrderValue(text)}
//                         />
//                         <ButtonCompo title="Submit" onPress={handleMinOrderSubmit} />
//                     </View>
//                 )}
//                 {/* {submittedMin && (
//                     <View style={[styles.inputContainer, { gap: 10 }]}>
//                         <Text>Minimum Order Value: {extraMinOrderValue}</Text>
//                         <ButtonCompo title="Update" onPress={handleMinOrderUpdate} style={{}} />
//                     </View>
//                 )} */}
//             </View>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         paddingHorizontal: 20,
//         paddingTop: moderateScale(8),
//         backgroundColor: '#fff',
//         flex: 1,
//     },
//     deliveryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//         padding: 10,
//         borderWidth: 1,
//         borderRadius: 5,
//         borderColor: '#ccc',
//         width: '100%',
//         justifyContent: 'space-between',
//     },
//     deliveryText: {
//         flex: 1,
//         // marginRight: 10,
//         fontWeight: 'bold',
//         fontSize: textScale(16),
//         // backgroundColor:'red'
//         color: '#666'
//     },
//     inputContainer: {
//         flexDirection: 'column',
//         marginBottom: 20,
//         padding: 10,
//         borderWidth: 1,
//         borderRadius: 5,
//         borderColor: '#ccc',
//         width: '100%',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 8,
//         marginTop: 5,
//         color: '#666'

//     },
// });

// export default ExtraCharges;





import React, { useState } from 'react';
import { View, Text, Switch, TextInput, StyleSheet, TouchableHighlight, Button } from 'react-native';
import ButtonCompo from '../../../../../Components/ButtonCompo';
import HeaderComp from '../../../../../Components/HeaderCompo';
import { moderateScale, textScale } from '../../../../../styles/responsiveSize';
import { useDispatch, useSelector } from 'react-redux';
import {
    setExtraDeliveryChargesBoolean,
    setExtraDeliveryChargesValue,
    setExtraMinOrderValue,
    setExtraMinOrderValueBoolean,
} from '../../../../../ReduxToolkit/features/extraChargesSlice';
import { useNavigation } from '@react-navigation/native';
import { GetMinOrderValueMethod, UpdateDeliveryChargesMethod, UpdateMinOrderValueMethod } from '../../../../../config/userApiMethods';

const ExtraCharges = () => {
    const {
        extraDeliveryCharges,
        extraDeliveryChargesValue,
        extraMinOrderValue,
        extraMinOrderValueEnabled,
    } = useSelector((state) => state.extraChargesReducer);
    const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(extraDeliveryCharges);
    const [isMinOrderEnabled, setIsMinOrderEnabled] = useState(extraMinOrderValueEnabled);
    const [deliveryCharges, setDeliveryCharges] = useState('');
    const [minOrderValue, setMinOrderValue] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [submittedMin, setSubmittedMin] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const handleDeliverySubmit = async () => {

        await dispatch(UpdateDeliveryChargesMethod(deliveryCharges))

        const dispatchedResp = await dispatch(setExtraDeliveryChargesValue(deliveryCharges));
        if (dispatchedResp) {
        }
    };

    const handleDeliveryUpdate = () => {
        console.log(`Updated Delivery Charges: ${deliveryCharges}`);
        setSubmitted(false);
    };

    const handleMinOrderSubmit = async () => {

        await dispatch(UpdateMinOrderValueMethod(minOrderValue))


        setSubmittedMin(true);
        const dispatchedResp = dispatch(setExtraMinOrderValue(minOrderValue));
        if (dispatchedResp) {
            // navigation.goBack();
        }
    };

    const handleMinOrderUpdate = () => {
        console.log(`Updated Enable Minimum Order: ${isMinOrderEnabled}`);
        console.log(`Updated Minimum Order Value: ${minOrderValue}`);
        setSubmittedMin(false);
    };



    return (
        <>
            <HeaderComp
                screenName={'Extra Charges'}
                onBackPress={() => navigation.goBack()}


            />
            <View style={styles.container}>
                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliveryText}>Delivery Charges:  ₹{extraDeliveryChargesValue}
                    </Text>
                    <Switch
                        value={isDeliveryEnabled}
                        onValueChange={(value) => {
                            dispatch(setExtraDeliveryChargesBoolean(value));
                            setIsDeliveryEnabled(value);
                        }}
                        thumbColor={isDeliveryEnabled ? "#ECE447" /* Green for 'on' state */ : "#E57373" /* Pink for 'off' state */}
                        trackColor={{ false: '#767577', true: '#767577' }}


                    />
                </View>

                {isDeliveryEnabled && (
                    <View style={[styles.inputContainer, { gap: 10 }]}>
                        {/* <Text>Delivery Charges: {extraDeliveryChargesValue}</Text> */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter delivery charges"
                            placeholderTextColor={'#666'}

                            keyboardType="numeric"
                            value={deliveryCharges}
                            onChangeText={(text) => setDeliveryCharges(text)}
                        />
                        <ButtonCompo title="Submit" onPress={handleDeliverySubmit} />
                    </View>
                )}

                {/* {submitted && (
                    <View style={[styles.inputContainer, { gap: 10 }]}>
                        <Text>Delivery Charges: {extraDeliveryChargesValue}</Text>
                        <ButtonCompo title="Update" onPress={handleDeliveryUpdate} style={{}} />
                    </View>
                )} */}

                {/* Separate section for Minimum Order Value */}
                <View style={styles.deliveryContainer}>
                    <Text style={styles.deliveryText}>Min Order Value :  ₹{extraMinOrderValue}</Text>
                    {/* <Switch
                        value={isMinOrderEnabled}
                        onValueChange={(value) => {
                            dispatch(setExtraMinOrderValueBoolean(value));
                            setIsMinOrderEnabled(value);
                        }}
                        thumbColor={isMinOrderEnabled ? "#ECE447" : 'red'}

                    /> */}
                    <Switch
                        value={isMinOrderEnabled}
                        onValueChange={(value) => {
                            dispatch(setExtraMinOrderValueBoolean(value));
                            setIsMinOrderEnabled(value);
                        }}
                        thumbColor={isMinOrderEnabled ? "#ECE447" /* Green for 'on' state */ : "#E57373" /* Pink for 'off' state */}
                        trackColor={{ false: '#767577', true: '#767577' }}

                    />
                </View>
                {isMinOrderEnabled && (
                    <View style={[styles.inputContainer, { gap: 10 }]}>
                        {/* <Text>Minimum Order : {extraMinOrderValue}</Text> */}
                        <TextInput
                            style={styles.input}
                            placeholder="Enter minimum order value"
                            placeholderTextColor={'#666'}
                            keyboardType="numeric"
                            value={minOrderValue}
                            onChangeText={(text) => setMinOrderValue(text)}
                        />
                        <ButtonCompo title="Submit" onPress={handleMinOrderSubmit} />
                    </View>
                )}
                {/* {submittedMin && (
                    <View style={[styles.inputContainer, { gap: 10 }]}>
                        <Text>Minimum Order Value: {extraMinOrderValue}</Text>
                        <ButtonCompo title="Update" onPress={handleMinOrderUpdate} style={{}} />
                    </View>
                )} */}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: moderateScale(8),
        backgroundColor: '#fff',
        flex: 1,
    },
    deliveryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        width: '100%',
        justifyContent: 'space-between',
    },
    deliveryText: {
        flex: 1,
        // marginRight: 10,
        fontWeight: 'bold',
        fontSize: textScale(16),
        // backgroundColor:'red'
        color: '#666'
    },
    inputContainer: {
        flexDirection: 'column',
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ccc',
        width: '100%',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginTop: 5,
        color: '#666'

    },
});

export default ExtraCharges;
