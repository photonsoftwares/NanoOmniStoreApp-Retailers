import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeHeader from '../../../Components/HomeHeader';
import HomeSliderCompo from '../../../Components/HomeSliderCompo';
import { moderateScale, scale } from '../../../styles/responsiveSize';
import Services from './Services/Services';
import { GetCartMethod, GetCategoryItemMethod, GetSelectedCategoryItemsMethod, OrderViewOrderMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useTheme } from '@react-navigation/native';
import Banner from '../../../Components/Banner';

const Home = () => {
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)

  const dispatch = useDispatch()
  const colors = useTheme().colors;

  // RecommendedItemMethod
  useEffect(() => {
    dispatch(RecommendedItemMethod(storeId, saasId))

  }, [])

  useEffect(() => {
    GetCategoryItemFunct()

  }, [])

  const GetCategoryItemFunct = async () => {
    const GetCategoryItemMethod_res = await dispatch(GetCategoryItemMethod())

    if (GetCategoryItemMethod_res && GetCategoryItemMethod_res.length > 0) {
      dispatch(GetSelectedCategoryItemsMethod(GetCategoryItemMethod_res[0].category_name))
    }
  }

  // OrderViewOrderMethod
  useEffect(() => {
    dispatch(OrderViewOrderMethod(storeId, saasId,))
  }, [dispatch])



  useEffect(() => {
    dispatch(GetCartMethod())
  }, [dispatch])


  return (
    <>
      {/*  */}
      <View>
        <HomeHeader />
      </View>
      <View style={[styles.container]}>
        {/* SearchBar */}


        <View
          style={{
            height: scale(200),
            width: '100%',
            marginTop: 2
          }}>
          {/* <HomeSliderCompo /> */}
          <Banner />
        </View>

        <View
          style={{
            flex: 1
          }}>
          <Services />
        </View>



      </View>
    </>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(4)
  },
  searcbarstyle: {
    // flex:1,
    // padding: 16,
    // backgroundColor: 'red'
  }
})