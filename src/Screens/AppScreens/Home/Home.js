import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeHeader from '../../../Components/HomeHeader';
import { moderateScale, scale } from '../../../styles/responsiveSize';
import { GetCartMethod, GetCategoryItemMethod, GetSelectedCategoryItemsMethod, OrderViewOrderMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useTheme } from '@react-navigation/native';
import Banner from '../../../Components/Banner';
import { setCurrentCategoryItemPage } from '../../../ReduxToolkit/features/categoryItemsSlice';
import { setSelectedCategory } from '../../../ReduxToolkit/features/categoriesSlice';
import HomeMasterCategory from '../../../Components/HomeMasterCategory';
import { BASE_URL } from '../../../config/Base_Url';

const Home = () => {
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const bannerUrl = `${BASE_URL}saas-master/get-brandlogos/${saasId}?${new Date().getTime()}`

  // console.log("Home", masterCategory)

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
      dispatch(setCurrentCategoryItemPage(1))
      dispatch(GetSelectedCategoryItemsMethod(GetCategoryItemMethod_res[0].category_name))
      dispatch(setSelectedCategory(GetCategoryItemMethod_res[0].category_name))
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

        <View
          style={{
            height: scale(200),
            width: '100%',
            marginTop: 2
          }}>
          {/* <HomeSliderCompo /> */}
          <Banner url={bannerUrl} />
        </View>



        <HomeMasterCategory />


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
})