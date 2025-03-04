import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { scale } from '../styles/responsiveSize';
import { GetSubCategoryItemsMethod } from '../config/userApiMethods';
import { setSelectedSubCategory, setSubCategoryItemsPage } from '../ReduxToolkit/features/mainCategorySlice';
import { BASE_URL } from '../config/Base_Url';
import MyImgCompo from './MyImgCompo';
import { showToast } from '../utils/toast';


const NoData = () => {
  return (
    <View style={{ backgroundColor: '#FFF', marginTop: scale(150), justifyContent: 'center' }}>
      {/* <View style={{ backgroundColor: '#FFF', flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' }}> */}
      <Text style={{ fontSize: 14, fontWeight: '700', textAlign: 'center' }}>No Sub-Category</Text>
    </View>

  )
}



const HomeSubCategpry = () => {
  const { masterCategory, selectedMasterCategory, selectedSubCategory, subCategory, subCategoryItems } = useSelector((state) => state?.mainCategoryReducer);
  const [key, setKey] = useState(Date.now());


  // console.log("HomeSubCategpry", subCategory)
  const memoizedsubCategory = useMemo(() => {
    return subCategory;
  }, [subCategory]);

  const SubCategoryListRender = ({ item }) => {
    const { subCategoryItemsPage, subCategoryItemsTotalPage } = useSelector((state) => state?.mainCategoryReducer);
    const [loding, setLoading] = useState(false)
    const dispatch = useDispatch()
    const imageUrl = `${BASE_URL}category/get-category-image/${item.id}?key=${key}`;



    const fetchData = async (category) => {


      dispatch(setSubCategoryItemsPage(1))
      const response = await dispatch(GetSubCategoryItemsMethod(category))
      dispatch(setSelectedSubCategory(category))

    }

    return (
      // <Pressable style={styles.itemContainer} onPress={() => console.log("hit")}>
      <Pressable style={[styles.itemContainer, { backgroundColor: item?.category == selectedSubCategory ? '#d6d6d6' : '#FFF' }]} onPress={() => fetchData(item?.category)}>
        <Image
          source={{ uri: imageUrl }}
          // source={ImagePath.noImg}
          style={styles.img}
          resizeMode='cover'
        />



        <Text style={styles.title} numberOfLines={2}>{item.category}</Text>
      </Pressable>
    );
  };



  // console.log("HomeSubCategpry", memoizedsubCategory)
  return (
    <View style={styles.container}>
      {
        memoizedsubCategory?.length == 0 ?
          <>{NoData()}</>
          :
          <FlatList
            data={memoizedsubCategory || []}
            keyExtractor={(item, index) => item.id || index}
            renderItem={({ item }) => <SubCategoryListRender item={item} />}
            estimatedItemSize={50} // Optional: Estimate the height of an item for better performance
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.contentContainer}
          />
      }
    </View>
  )
}

export default HomeSubCategpry

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFF',
    // backgroundColor: 'pink',
    // borderRightWidth: 1,
    marginBottom: scale(100),

  },
  itemContainer: {
    // flex: 1,
    padding: 10,
    height: 90,
    width: 90,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    // borderWidth: 0.5,
    borderColor: '#000',
    marginBottom: 8,
    elevation: 8,
    backgroundColor: '#FFF'

  },
  img: {
    height: 50,
    width: 50,
    borderWidth: 0.5,
    borderRadius: 50,
    borderWidth: 1

  },
  title: {
    fontSize: scale(10),
    fontWeight: '700',
    textAlign: 'center'
  },
  separator: {
    // height: 10
  },
  contentContainer: {
    paddingBottom: 4,


  },

});
