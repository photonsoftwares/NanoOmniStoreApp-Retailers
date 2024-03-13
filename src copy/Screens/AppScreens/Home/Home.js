// import { StyleSheet, Text, View, Button } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import HomeHeader from '../../../Components/HomeHeader';
// import HomeSliderCompo from '../../../Components/HomeSliderCompo';
// import { moderateScale, scale } from '../../../styles/responsiveSize';
// import Services from './Services/Services';
// import { GetCartMethod, GetCategoryItemMethod, GetSelectedCategoryItemsMethod, OrderViewOrderMethod, RecommendedItemMethod } from '../../../config/userApiMethods';
// import { useTheme } from '@react-navigation/native';
// import Banner from '../../../Components/Banner';

// const Home = () => {
//   const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)

//   const dispatch = useDispatch()
//   const colors = useTheme().colors;

//   // RecommendedItemMethod
//   useEffect(() => {
//     dispatch(RecommendedItemMethod(storeId, saasId))

//   }, [])

//   useEffect(() => {
//     GetCategoryItemFunct()
//   }, [])

//   const GetCategoryItemFunct = async () => {
//     const GetCategoryItemMethod_res = await dispatch(GetCategoryItemMethod())

//     if (GetCategoryItemMethod_res && GetCategoryItemMethod_res.length > 0) {
//       dispatch(GetSelectedCategoryItemsMethod(GetCategoryItemMethod_res[0].category_name))
//     }
//   }

//   // OrderViewOrderMethod
//   useEffect(() => {
//     dispatch(OrderViewOrderMethod(storeId, saasId,))
//   }, [dispatch])



//   useEffect(() => {
//     dispatch(GetCartMethod())
//   }, [dispatch])


//   return (
//     <>
//       {/*  */}
//       <View>
//         <HomeHeader />
//       </View>
//       <View style={[styles.container]}>
//         {/* SearchBar */}


//         <View
//           style={{
//             height: scale(200),
//             width: '100%',
//             marginTop: 2
//           }}>
//           {/* <HomeSliderCompo /> */}
//           <Banner />
//         </View>

//         <View
//           style={{
//             flex: 1
//           }}>
//           <Services />
//         </View>



//       </View>
//     </>
//   )
// }

// export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginHorizontal: moderateScale(4)
//   },
// })



/////////////

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
import CategoryList from '../../../Components/CategoryList';
import CategoryItemList from '../../../Components/CategoryItemList';
import { setCurrentCategoryItemPage } from '../../../ReduxToolkit/features/categoryItemsSlice';
import { setSelectedCategory } from '../../../ReduxToolkit/features/categoriesSlice';

const Home = () => {
  const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
  const { categoryData, categoryCurrentPage } = useSelector((state) => state?.categoriesReducer)
  const { categoryItemsData, categoryItemsCurrentPage } = useSelector((state) => state?.categoryItemsReducer)
  // console.log("categoryData.length",categoryData.length,categoryCurrentPage)
  // console.log("categoryItemsData.length",categoryItemsData[0],categoryItemsCurrentPage)

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
          <Banner />
        </View>




        {
          categoryData?.length > 0 ?
            <>
              <View
                style={{
                  marginVertical: 4
                }}>
                <CategoryList />
              </View>
              <View
                style={{
                  // flex: 1
                  marginVertical: 4,
                  // backgroundColor:'grey'
                  flex: 1

                }}>
                <CategoryItemList />
              </View>
            </>
            :
            <View
              style={{
                flex: 1
              }}>
              <Services />
            </View>

        }





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