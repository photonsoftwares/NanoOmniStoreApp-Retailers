
import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner'
import { moderateScale } from '../styles/responsiveSize'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Banner = () => {
  const [images, setImages] = useState([]);
  const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);
  const fetchData = async () => {
    try {
      const response = await axios.get('http://103.139.59.233:8089/prod/api/v1/saas-master/get-brandlogos/24');
      console.log(response.data);
  
      const images = [];
      if (response.data.banner_logo) {
        images.push({ img: response.data.banner_logo });
      }
      if (response.data.banner_logo1) {
        images.push({ img: response.data.banner_logo1 });
      }
      if (response.data.brand_logo) {
        images.push({ img: response.data.brand_logo });
      }
      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  
  
    
  };
  useEffect(() => {
    fetchData()
  }, [saasId1])
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const fetchData = async () => {
      
  //       try {
  //         console.log("danishhh",saasId1)
  //         const response = await axios.get(`http://103.139.59.233:8089/prod/api/v1/saas-master/get-brandlogos/24`).then((res)=>console.log("khumujkl",res))

          
  //         console.log('Response data:', response.data); // Log the response data
          
  //         // Extract image URLs from the response data
  //         const images = [];
  //         if (response.data.banner_logo) {
  //           images.push({ img: response.data.banner_logo });
  //         }
  //         if (response.data.banner_logo1) {
  //           images.push({ img: response.data.banner_logo1 });
  //         }
  //         if (response.data.brand_logo) {
  //           images.push({ img: response.data.brand_logo });
  //         }
  //         setImages(images);
  //       } catch (error) {
  //         console.error('Error fetching images:', error);
  //       }
  //     };
    
  //     if (saasId1) { 
  //       fetchData();
  //     }
  //   }, [saasId1])
  // );

  console.log("saasId", images);
  
  return (
    <View>
      <ImageSlider
        data={images}
        autoPlay={true} 
        // onItemChanged={(item) => console.log("item", item)}
        closeIconColor="#fff"
        caroselImageStyle={{ height: '100%', resizeMode: 'cover' }}
        indicatorContainerStyle={{ backgroundColor: 'red', top: moderateScale(2) }}
      />
     
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})

// import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
// import React, { useState } from 'react';
// import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
// import { moderateScale } from '../styles/responsiveSize';
// import { launchImageLibrary } from 'react-native-image-picker';

// const Banner = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   console.log("selectedFile", selectedFile);

//   const openImagePicker = () => {
//     const options = {
//       mediaType: 'photo',
//       quality: 0.5, // Adjust quality as needed
//     };

//     launchImageLibrary(options, (response) => {
//       if (!response.didCancel) {
//         setSelectedFile(response);
//       } else {
//         console.log('Image selection canceled or no image selected');
//       }
//     });
//   };

//   return (
//     <View>
//       <TouchableOpacity style={styles.button1} onPress={openImagePicker}>
//         {selectedFile ? (
//           <Image
//             source={{ uri: selectedFile.assets[0].uri }}
//             style={{ width: '100%', height: 200, resizeMode: 'cover' }}
//           />
//         ) : (
//           <Text>Select Image</Text>
//         )}
//       </TouchableOpacity>

//       <ImageSlider
//         data={selectedFile ? [...selectedFile.assets] : []}
//         autoPlay={true} 
//         closeIconColor="#fff"
//         caroselImageStyle={{ height: '100%', resizeMode: 'cover' }}
//         indicatorContainerStyle={{ backgroundColor: 'red', top: moderateScale(2) }}
//       />
//     </View>
//   );
// };

// export default Banner;

// const styles = StyleSheet.create({
//   button1: {
//     width: '100%',
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ccc',
//   },
// });
