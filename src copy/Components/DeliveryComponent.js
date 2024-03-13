// import React, { useState } from 'react';
// import { View, Text, Switch, TextInput, StyleSheet } from 'react-native';
// import ButtonCompo from './ButtonCompo';

// const DeliveryComponent = ({ onSubmit, onUpdate, isDeliveryEnabledProp, submittedProp }) => {
//   const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(isDeliveryEnabledProp || false);
//   const [deliveryCharges, setDeliveryCharges] = useState('');
//   const [submitted, setSubmitted] = useState(submittedProp || false);

//   const handleSubmit = () => {
//     // Handle the submission logic here
//     if (isDeliveryEnabled) {
//       // Process delivery charges
//     //   console.log(`Delivery Charges: ${deliveryCharges}`);
//       setSubmitted(true);
//       if (onSubmit) onSubmit(deliveryCharges);
//     }
//   };

//   const handleUpdate = () => {
//     // Handle the update logic here
//     // console.log(`Updated Delivery Charges: ${deliveryCharges}`);
//     setSubmitted(false);
//     if (onUpdate) onUpdate(deliveryCharges);
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
//           <ButtonCompo  title="Submit" onPress={handleSubmit} />
//         </View>
//       )}

//       {submitted && (
//         <View style={[styles.inputContainer, { gap: 10 }]}>
//           <Text>Delivery Charges: {deliveryCharges}</Text>
//           <ButtonCompo title="Update" onPress={handleUpdate} />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
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


import React, { useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
import { moderateScale } from '../../styles/responsiveSize';
import ButtonCompo from './ButtonCompo';

const DeliveryComponent = () => {
  const [isDeliveryEnabled, setIsDeliveryEnabled] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Handle the submission logic here
    if (isDeliveryEnabled) {
      // Process delivery charges
      console.log(`Delivery Charges: ${deliveryCharges}`);
      setSubmitted(true);
    }
  };

  const handleUpdate = () => {
    // Handle the update logic here
    console.log(`Updated Delivery Charges: ${deliveryCharges}`);
    setSubmitted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Enable Delivery Charges</Text>
        <Switch
          value={isDeliveryEnabled}
          onValueChange={(value) => setIsDeliveryEnabled(value)}
        />
      </View>

      {isDeliveryEnabled && !submitted && (
        <View style={[styles.inputContainer, { gap: 10 }]}>
          <Text>Delivery Charges:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter delivery charges"
            keyboardType="numeric"
            value={deliveryCharges}
            onChangeText={(text) => setDeliveryCharges(text)}
          />
          <ButtonCompo title="Submit" onPress={handleSubmit} />
        </View>
      )}

      {submitted && (
        <View style={[styles.inputContainer, { gap: 10 }]}>
          <Text>Delivery Charges: {deliveryCharges}</Text>
          {/* <View style={{ backgroundColor: 'red',  }}> */}

          <ButtonCompo title="Update" onPress={handleUpdate} style={{}} />
          {/* </View> */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff'
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
  },
  deliveryText: {
    flex: 1,
    marginRight: 10,
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
  },
});

export default DeliveryComponent;