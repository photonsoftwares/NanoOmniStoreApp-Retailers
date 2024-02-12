import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Details = ({ route }) => {
  // Extract itemId from route params
  const { itemId ,itemName,itemPrice,itemQty,imageUrl} = route.params;
console.log("itemId",itemId,itemName,itemPrice,itemQty,imageUrl)
  // Assuming you have a function to fetch item details based on itemId
  // You can use the itemId to fetch item details from your data source

  // Placeholder data for demonstration
  const itemDetails = {
    name: itemName,
    description: 'Item Description',
    price: itemPrice,
    imageUrl: imageUrl,
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: itemDetails.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{itemDetails.name}</Text>
      <Text style={styles.description}>{itemDetails.description}</Text>
      <Text style={styles.price}>{itemDetails.price}</Text>
      {/* Additional information and actions can be added here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"lightblue"
  },
  image: {
    width: 350,
    height: 300,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Details;
