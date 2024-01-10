import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CustomRadioButton from './CustomRadioButton';
import HeaderComp from './HeaderCompo';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GenrateInvoicePdf from '../Screens/AppScreens/Order/RenderOrderPending/PendingItemWithUserDetails/GenrateInvoicePdf/GenrateInvoicePdf';
import { SaveTransactionMethod } from '../config/userApiMethods';

const SelectPaymentMethod = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { cartItems } = useSelector((state) => state?.cartReducer);
    // console.log("cartItem", cartItems[0])


    const handlePaymentSelection = (method) => {
        setSelectedMethod(method);
    };

    const handleButtonPress = async () => {
        // Log or display the total
        // console.log('Total Price:', total);
        const mergeBody = cartItems.map((obj) => {
            return {
                item_id: obj?.item_id,
                item_name: obj?.itemName,
                description: obj?.description,
                special_description: null,
                price: obj?.price,
                // brand: obj?.brand,
                brand: null,
                // sub_price: obj?.sub_price,
                sub_price: null,
                // actual_price: obj?.actual_price,
                actual_price: null,
                // price_pcs: obj?.price_pcs,
                price_pcs: null,
                product_qty: obj?.productQty,
                discount: obj?.discount,
                tax: obj?.tax,
                // tax_percent: obj?.tax_percent,
                tax_percent: obj?.taxPercent,
                status: obj?.status,
                category: obj?.category,
                saas_id: obj?.saasId,
                store_id: obj?.storeId,
                // promo_id: obj?.promo_id,
                promo_id: obj?.promoId,
                // image_name: obj?.image_name,
                // hsn_code: obj?.hsn_code,
                hsn_code: obj?.hsnCode,
                // tax_rate: obj?.tax_rate,
                tax_rate: obj?.taxRate,
                // tax_code: obj?.tax_code,
                tax_code: obj?.taxCode,
                // barcode: obj?.barcode,
                barcode: obj?.bar_code,
                supplier_name: obj?.supplier_name,
                // opening_qty: obj?.opening_qty,
                opening_qty: obj?.opening_quantity,
                // received_qty: obj?.received_qty,
                received_qty: null,
                // sold_qty: obj?.sold_qty,
                sold_qty: null,
                // closing_qty: obj?.closing_qty,
                closing_qty: null,
                // product_cost: obj?.product_cost,
                product_cost: null,
                // product_price: obj?.product_price,
                product_price: null,
                // product_av_cost: obj?.product_av_cost,
                product_av_cost: null,
                mrp: obj?.mrp,
                // newPrice: obj?.newPrice,
                newPrice: obj?.new_price,
                productQty: obj?.productQty

            }
        })
        const saveTBody = {
            // registerId: "REG101",
            storeId: storeId,
            saasId: saasId,
            // tenderId: "TENDER1",
            tender: {
                Cash: 0
            },
            cartItems: mergeBody
        };


        const jsonString = JSON.stringify(saveTBody);
        // console.log("saveBody", mergeBody[0])

        const pdf_file_name = await dispatch(SaveTransactionMethod(jsonString))

        navigation.navigate('GenrateInvoicePdf', pdf_file_name)
        // console.log('GenrateInvoicePdf', pdf_file_name)
    };

    return (
        <>
            <HeaderComp
                screenName={'Select Payment Method'}
                onBackPress={() => navigation.goBack()}

            />
            <View style={styles.container}>
                {/* <Text style={styles.headerText}>Select Payment Method</Text> */}

                <CustomRadioButton
                    label="Cash on Delivery (COD)"
                    isSelected={selectedMethod === 'cod'}
                    onPress={() => handlePaymentSelection('cod')}
                />

                <CustomRadioButton
                    label="Online Payment"
                    isSelected={selectedMethod === 'online'}
                    onPress={() => handlePaymentSelection('online')}
                />

                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    {/* <TouchableOpacity style={styles.confirmButton} disabled={!selectedMethod} onPress={() => console.log('j')}> */}
                    <TouchableOpacity style={styles.confirmButton} disabled={!selectedMethod} onPress={() => handleButtonPress()}>
                        <Text style={styles.confirmButtonText}>Genrate Invoice</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // justifyContent: 'center',
        backgroundColor:'pink',
        backgroundColor:'#fff'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: '#ECE447',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmButtonText: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default SelectPaymentMethod;



// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import CustomRadioButton from './CustomRadioButton';

// const SelectPaymentMethod = () => {
//   const [selectedMethod, setSelectedMethod] = useState(null);

//   const handlePaymentSelection = (method) => {
//     setSelectedMethod(method);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.headerText}>Select Payment Method</Text>

//       <CustomRadioButton
//         label="Cash on Delivery (COD)"
//         isSelected={selectedMethod === 'cod'}
//         onPress={() => handlePaymentSelection('cod')}
//       />

//       <CustomRadioButton
//         label="Online Payment"
//         isSelected={selectedMethod === 'online'}
//         onPress={() => handlePaymentSelection('online')}
//       />

//       <TouchableOpacity style={[styles.confirmButton, !selectedMethod && styles.disabledButton]} disabled={!selectedMethod}>
//         <Text style={styles.confirmButtonText}>Confirm Payment</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     justifyContent: 'center',
//     backgroundColor: '#f0f0f0',
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   confirmButton: {
//     backgroundColor: '#007bff',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#a0a0a0', // Light gray for disabled state
//   },
//   confirmButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default SelectPaymentMethod;
