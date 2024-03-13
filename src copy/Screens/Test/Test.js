
// import React from 'react';
// import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

// const Test = () => {
//   const [text, onChangeText] = React.useState('Useless Text');
//   const [number, onChangeNumber] = React.useState('');

//   return (
//     <SafeAreaView>
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeText}
//         value={text}
//       />
//       <TextInput
//         style={styles.input}
//         onChangeText={onChangeNumber}
//         value={number}
//         placeholder="useless placeholder"
//         keyboardType="numeric"
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//   },
// });

// export default Test;






import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const Test = () => {
  const placeholders = ["Search", "Search your product", "Placeholder 3"];
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');

  // Function to handle text input change
  const onChangeText = (text) => {
    setInputValue(text);
  };

  // Effect to cycle through placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 2000); // Change the duration as needed
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <View style={{ margin: 16 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={inputValue}
        placeholder={placeholders[currentPlaceholderIndex]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default Test;






