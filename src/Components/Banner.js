import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ImageSlider } from '@pembajak/react-native-image-slider-banner'
import { moderateScale } from '../styles/responsiveSize'


const Banner = () => {
  return (
    <View>
      <ImageSlider
        data={[
          { img: 'https://img.freepik.com/premium-vector/online-shopping-store-delivery-website-mobile-phone-design-smart-business-marketing-concept-horizontal-view-vector-illustration_62391-764.jpg?w=996' },
          { img: 'https://img.freepik.com/premium-photo/colorful-food-groceries-red-supermarket-plastic-basket_8087-2233.jpg?w=900' },
          { img: 'https://img.freepik.com/premium-photo/delivery-concept-handsome-cacasian-delivery-man-carrying-package-box-grocery-food-drink_1258-15203.jpg?w=900' },

          // { img: `${imgPath.qrCode2}` }
        ]}
        autoPlay={true}
        // onItemChanged={(item) => console.log("item", item)}
        closeIconColor="#fff"
        caroselImageStyle={{ height: '100%', resizeMode: 'cover', }}
        indicatorContainerStyle={{ backgroundColor: 'red', top: moderateScale(2) }}

      />
    </View>
  )
}

export default Banner

const styles = StyleSheet.create({})