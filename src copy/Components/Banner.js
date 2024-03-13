import React, { useState } from 'react';
import { View } from 'react-native';
import { ImageSlider } from '@pembajak/react-native-image-slider-banner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { BASE_URL } from '../config/Base_Url';

const Banner = () => {
  const [images, setImages] = useState([]);
  const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${BASE_URL}saas-master/get-brandlogos/${saasId1}?${new Date().getTime()}`);
          // console.log('Response data:', response.data);

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

      if (saasId1) {
        fetchData();
      }
    }, [saasId1])
  );

  // console.log('saasId', images);

  return (
    <View>
      <ImageSlider
        data={images}
        autoPlay={true}
        closeIconColor="#fff"
        caroselImageStyle={{ height: '100%', resizeMode: 'cover' }}
        indicatorContainerStyle={{ backgroundColor: 'red', top: 2 }}
      />
    </View>
  );
}

export default Banner;
