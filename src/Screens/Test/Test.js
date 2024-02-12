// import { StyleSheet, Text, View, Button } from 'react-native'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { GetCartMethod, GetCategoryItemMethod, GetCustomerAddressMethod, GetSearchItemsMethod, GetSelectedCategoryItemsMethod, GetgetSalesReportMethod, OrderMasterDetailsMethod, OrderViewOneMethod, OrderViewOrderMethod, SaveTransactionMethod, TestMethod, UpdateOrderMasterMethod, UpdateOrderStatusMethod } from '../../config/userApiMethods'
// import { selectRecommended } from '../../ReduxToolkit/features/recommendedSlice'
// import SelectPaymentMethod from '../../Components/SelectPaymentMethod'

// const Test = () => {
//   const AllState = useSelector((state) => state)
//   // console.log("AllState", AllState)

//   const { authReducer,
//     loadingReducer,
//     productReducer,
//     userProfileReducer,
//     orderReducer,
//     customerReducer,
//     recommendedReducer,
//     categoriesReducer,
//     categoryItemsReducer,
//     salesReportReducer,
//     salesSummaryReducer,
//     searchReducer,
//   } = useSelector((state) => state)

//   // console.log("allState", categoriesReducer, categoryItemsReducer,)
//   // console.log("AllStateReducer", AllStateReducer)

//   const { searchData } = searchReducer
//   // console.log("searchData",searchData.length)

//   const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//   // console.log(id, storeId, saasId,)

//   const { productsData } = useSelector((state) => state?.productReducer)
//   // console.log("<>", productsData.length)

//   const { ordersData, ordersCurrentPage } = useSelector((state) => state?.orderReducer)
//   // const { order_id } = ordersData
//   // console.log("ordersData", ordersData)

//   // const { recommendedData, recommendedTotalPages } = useSelector((state) => state?.recommendedReducer)
//   // console.log("recommendedData, recommendedTotalPages", recommendedData, recommendedTotalPages)

//   const { customerBookedOrders, customerAddresses, customerData } = customerReducer
//   const combinedArray = [...customerBookedOrders, customerAddresses, customerData];
//   // console.log("combinedArray", combinedArray)
//   // console.log("customerReducer", customerBookedOrders, customerAddresses, customerData)


//   const pendingOrders = ordersData.filter(order => order.status === "PENDING");
//   // console.log(pendingOrders.length)

//   const dispatch = useDispatch()



//   return (
//     <View style={{ gap: 10 }}>
//       <Text>Test</Text>
//       <Button
//         title='TestMethod'
//         onPress={() => dispatch(TestMethod(storeId, saasId))}
//       />
//       <Button
//         title='OrderViewOrderMethod'
//         onPress={() => dispatch(OrderViewOrderMethod(storeId, saasId, ordersCurrentPage))}
//       />
//       <Button
//         title='OrderViewOneMethod'
//         onPress={() => dispatch(OrderViewOneMethod(storeId, saasId, '19866'))}
//       />
//       <Button
//         title='OrderMasterDetailsMethod'
//         onPress={() => dispatch(OrderMasterDetailsMethod(storeId, saasId, '19866'))}
//       />
//       <Button
//         title='GetCustomerAddressMethod'
//         onPress={() => dispatch(GetCustomerAddressMethod(storeId, saasId, '78'))}
//       />
//       <Button
//         title='UpdateOrderMasterMethod'
//         onPress={() => dispatch(UpdateOrderMasterMethod(data))}
//       />
//       <Button
//         title='GetCategoryItemMethod'
//         onPress={() => dispatch(GetCategoryItemMethod())}
//       />
//       <Button
//         title='GetSelectedCategoryItemsMethod'
//         onPress={() => dispatch(GetSelectedCategoryItemsMethod())}
//       />
//       <Button
//         title='GetCartMethod'
//         onPress={() => dispatch(GetCartMethod())}
//       />
//       <Button
//         title='GetCartMethod'
//         onPress={() => dispatch(GetSearchItemsMethod('s'))}
//       />
//       <Button
//         title='GetgetSalesReportMethod'
//         onPress={() => dispatch(GetgetSalesReportMethod('2023-12-12'))}
//       />
//       <Button
//         title='UpdateOrderStatusMethod'
//         onPress={() => dispatch(UpdateOrderStatusMethod())}
//       />







//     </View>
//   )
// }

// export default Test

// const styles = StyleSheet.create({})





// import React, { useState } from 'react';
// import { View, Button, Image, Alert } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import axios from 'axios';

// const Test = () => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   const selectImage = () => {
//     const options = {
//       title: 'Select Image',
//       storageOptions: {
//         skipBackup: true,
//         path: 'images',
//       },
//     };

//     ImagePicker.showImagePicker(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else {
//         // Set the selected image URI to state
//         setSelectedImage(response.uri);
//         // Upload the selected image
//         uploadImage(response.uri);
//       }
//     });
//   };

//   const uploadImage = async (imageUri) => {
//     const apiUrl = 'http://3.111.70.84:8089/prod/api/v1/item/save-image/49681';

//     const formData = new FormData();
//     formData.append('file', {
//       uri: imageUri,
//       type: 'image/jpeg',
//       name: 'image.jpg',
//     });

//     try {
//       const response = await axios.post(apiUrl, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Upload successful:', response.data);
//       Alert.alert('Upload successful!', 'Image has been uploaded successfully.');
//     } catch (error) {
//       console.error('Upload failed:', error);
//       Alert.alert('Upload failed!', 'There was an error uploading the image.');
//     }
//   };

//   return (
//     <View>
//       {selectedImage && (
//         <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
//       )}
//       <Button title="Select Image" onPress={selectImage} />
//     </View>
//   );
// };

// export default Test;




import React, { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { ActivityIndicator, Button, Image, Text, View } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../config/Base_Url';

const Test = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        // maxHeight: 200,
        // maxWidth: 200,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
      } else if (result.error) {
        console.error('ImagePicker Error: ', result.error);
      } else {
        setSelectedImage(result);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  // console.log("first", selectedImage)

  const uploadImage = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: selectedImage.assets[0].uri,
        type: selectedImage.assets[0].type,
        name: 'potato.jpg', // Adjust filename as needed
      });

      const response = await axios.post(
        `${BASE_URL}item/save-image/49681`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Upload response:', response.data);
      // Handle successful upload
      setSelectedImage(null); // Clear selected image after successful upload
    } catch (error) {
      console.error('Upload error:', error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {selectedImage ? (
        <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: '80%', height: '80%', padding: 10, marginBottom: 10 }} resizeMode='contain' />
      ) : (
        <Button title="Select Image" onPress={pickImage} />
      )}
      <Button title="Select Image" onPress={pickImage} />

      {isLoading && <ActivityIndicator size="large" />}
      {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
      {selectedImage && <Button title="Upload" onPress={uploadImage} />}
    </View>
  );
};

export default Test;




