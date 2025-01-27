import { StyleSheet, View, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HomeHeader from '../../../Components/HomeHeader';
import { moderateScale} from '../../../styles/responsiveSize';
import { GetCartMethod, GetCategoryItemMethod, GetSelectedCategoryItemsMethod, OrderViewOrderMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
import { useFocusEffect, useTheme } from '@react-navigation/native';
import Banner from '../../../Components/Banner';
import { setCurrentCategoryItemPage } from '../../../ReduxToolkit/features/categoryItemsSlice';
import { setSelectedCategory } from '../../../ReduxToolkit/features/categoriesSlice';
import HomeMasterCategory from '../../../Components/HomeMasterCategory';

const Home = () => {
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const [bannerKey, setBannerKey] = useState(0);



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

  // Re-render Banner when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      setBannerKey((prevKey) => prevKey + 1);
    }, [])
  );

  return (
    <>
      <View>
        <HomeHeader />
      </View>
      <View style={[styles.container]}>

        <View
          style={{
            width: '100%',
            marginTop: 2,
            flex: 1 / 3,
          }}>
          <Banner key={bannerKey} />
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