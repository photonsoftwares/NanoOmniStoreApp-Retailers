// // import React, { useState } from 'react';
// // import { View, Text, TextInput, Button,StyleSheet } from 'react-native';

// // const App = () => {
// //   // State object to store input values
// //   const [inputs, setInputs] = useState({
// //     name: '',
// //     email: '',
// //     phoneNumber: '',
// //   });

// //   const handleInputChange = (name, value) => {
// //     setInputs({
// //       ...inputs,
// //       [name]: value,
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.heading}>Enter Your Information</Text>

// //       {/* Name Input */}
// //       <View style={styles.inputGroup}>
// //         <Text style={styles.label}>Name:</Text>
// //         <TextInput
// //           style={styles.textInput}
// //           placeholder="Enter your name"
// //           onChangeText={(text) => handleInputChange('name', text)}
// //         />
// //       </View>

// //       {/* Email Input */}
// //       <View style={styles.inputGroup}>
// //         <Text style={styles.label}>Email:</Text>
// //         <TextInput
// //           style={styles.textInput}
// //           placeholder="Enter your email address"
// //           keyboardType="email-address"
// //           onChangeText={(text) => handleInputChange('email', text)}
// //         />
// //       </View>

// //       {/* Phone Number Input */}
// //       <View style={styles.inputGroup}>
// //         <Text style={styles.label}>Phone Number:</Text>
// //         <TextInput
// //           style={styles.textInput}
// //           placeholder="Enter your phone number"
// //           keyboardType="phone-pad"
// //           onChangeText={(text) => handleInputChange('phoneNumber', text)}
// //         />
// //       </View>

// //       {/* Button to display data (optional) */}
// //       <Button
// //         title="Show Data"
// //         onPress={() => console.log(inputs)}
// //       />
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     padding: 20,
// //   },
// //   heading: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     marginBottom: 10,
// //   },
// //   inputGroup: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //   },
// //   label: {
// //     width: 100,
// //   },
// //   textInput: {
// //     flex: 1,
// //     borderRadius: 5,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     padding: 10,
// //   },
// // });

// // export default App;







// import React, { useState } from 'react';
// import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
// import { moderateScale } from '../../styles/responsiveSize';
// import ButtonCompo from '../../Components/ButtonCompo';

// const DeliveryComponent = () => {
//   const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(false);
//   const [deliveryCharges, setDeliveryCharges] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = () => {
//     // Handle the submission logic here
//     if (isDeliveryEnabled) {
//       // Process delivery charges
//       console.log(`Delivery Charges: ${deliveryCharges}`);
//       setSubmitted(true);
//     }
//   };

//   const handleUpdate = () => {
//     // Handle the update logic here
//     console.log(`Updated Delivery Charges: ${deliveryCharges}`);
//     setSubmitted(false);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.deliveryContainer}>
//         <Text style={styles.deliveryText}>Enable Delivery Charges</Text>
//         <Switch
//           value={isDeliveryEnabled}
//           onValueChange={(value) => setIsDeliveryEnabled(value)}
//         />
//       </View>

//       {isDeliveryEnabled && !submitted && (
//         <View style={[styles.inputContainer, { gap: 10 }]}>
//           <Text>Delivery Charges:</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter delivery charges"
//             keyboardType="numeric"
//             value={deliveryCharges}
//             onChangeText={(text) => setDeliveryCharges(text)}
//           />
//           <ButtonCompo title="Submit" onPress={handleSubmit} />
//         </View>
//       )}

//       {submitted && (
//         <View style={[styles.inputContainer, { gap: 10 }]}>
//           <Text>Delivery Charges: {deliveryCharges}</Text>
//           {/* <View style={{ backgroundColor: 'red',  }}> */}

//             <ButtonCompo title="Update" onPress={handleUpdate} style={{}} />
//           {/* </View> */}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   deliveryContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     width: '100%',
//   },
//   deliveryText: {
//     flex: 1,
//     marginRight: 10,
//   },
//   inputContainer: {
//     flexDirection: 'column',
//     marginBottom: 20,
//     padding: 10,
//     borderWidth: 1,
//     borderRadius: 5,
//     borderColor: '#ccc',
//     width: '100%',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     padding: 8,
//     marginTop: 5,
//   },
// });

// export default DeliveryComponent;



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Test1 = () => {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>This screen is under Devlopment</Text>

    </View>
  )
}

export default Test1

const styles = StyleSheet.create({})