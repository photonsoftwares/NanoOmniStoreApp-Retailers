// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '../config/Base_Url';

// const { width } = Dimensions.get('window');
// const data = ['brown', 'orange', 'red', 'blue', 'green'];
// // const data = ['grey', 'grey', 'grey', 'grey', 'grey'];

// export default function Banner(routes) {
//   const scrollValue = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);
//   const translateX = scrollValue.interpolate({
//     inputRange: [0, width],
//     outputRange: [0, 20],
//   });
//   const inputRange = [0];
//   const scaleOutputRange = [1];
//   data.forEach(
//     (_, i) =>
//       i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
//   );
//   data.forEach((_, i) => i != 0 && scaleOutputRange.push(...[0, 1]));
//   const scaleX = scrollValue.interpolate({
//     inputRange,
//     outputRange: scaleOutputRange,
//   });

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % data.length;
//       scrollViewRef.current.scrollTo({ x: index * width, animated: true });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);



//   const [images, setImages] = useState([]);
//   const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);
//   const navigation = useNavigation()



//   const fetchBrandLogos = useCallback(async () => {
//     console.log("fetchBrandLogos")
//     try {
//       const response = await axios.get(`${BASE_URL}saas-master/get-brandlogos/${saasId1}`);
//       const logoArray = Object.keys(response.data).map(key => ({ img: response.data[key] }));
//       setImages(prevImages => [...prevImages, ...logoArray]);
//     } catch (error) {
//       console.error('Error fetching brand logos:', error);
//     }
//   }, [saasId1]);


//   useEffect(() => {
//     fetchBrandLogos();
//   }, [fetchBrandLogos])

//   console.log("images", images)
//   return (
//     <View style={styles.container}>

//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         decelerationRate="fast"
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
//           { useNativeDriver: false },
//         )}
//         scrollEventThrottle={16}
//       >
//         {
//           images?.map(x => (
//             <Pressable style={[styles.card, { backgroundColor: x }]} key={x.img} onPress={() => console.log("onPress", x)}>
//               <Image
//                 style={[{ width: '100%', height: '100%', borderRadius: 8 }]}
//                 source={{
//                   uri: x.img,
//                   // headers: { Authorization: 'someAuthToken' },
//                   // priority: FastImage.priority.normal,
//                 }}
//                 // resizeMode={FastImage.resizeMode.cover}
//                 resizeMode='cover'
//               />
//             </Pressable>
//           ))
//         }

//       </ScrollView>
//       <View style={styles.indicatorContainer} pointerEvents="none">
//         {images.map(x => (
//           <Indicator key={x.img} />
//         ))}
//         <Animated.View
//           style={[
//             styles.activeIndicator,
//             {
//               position: 'absolute',
//               transform: [{ translateX }, { scaleX }],
//             },
//           ]}
//         />
//       </View>
//       {/* </>
//       } */}
//       {/* <Text>{images[0].img}</Text> */}
//     </View>
//   );
// }

// function Indicator() {
//   return <View style={styles.indicator} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 / 6,
//     paddingVertical: 3,
//     borderRadius: 8
//   },
//   card: {
//     width: width - 10,
//     height: '100%',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   indicatorContainer: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//   },
//   indicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#00000044',
//     marginHorizontal: 5,
//   },
//   activeIndicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: 5,
//   },
// });






// import axios from 'axios';
// import React, { useRef, useEffect, useState, useCallback } from 'react';
// import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '../config/Base_Url';
// import FastImage from 'react-native-fast-image';

// const { width } = Dimensions.get('window');
// const data = ['brown', 'orange', 'red', 'blue', 'green'];

// export default function Banner(routes) {
//   const scrollValue = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);
//   const translateX = scrollValue.interpolate({
//     inputRange: [0, width],
//     outputRange: [0, 20],
//   });
//   const inputRange = [0];
//   const scaleOutputRange = [1];
//   data.forEach(
//     (_, i) =>
//       i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
//   );
//   data.forEach((_, i) => i != 0 && scaleOutputRange.push(...[0, 1]));
//   const scaleX = scrollValue.interpolate({
//     inputRange,
//     outputRange: scaleOutputRange,
//   });

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % data.length;
//       scrollViewRef.current.scrollTo({ x: index * width, animated: true });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);



//   const [images, setImages] = useState([]);
//   const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);



//   const fetchBrandLogos = useCallback(async () => {
//     console.log("fetchBrandLogos")
//     try {
//       // const response = await axios.get(`${BASE_URL}saas-master/get-brandlogos/${saasId1}`);
//       const response = await axios.get(`${BASE_URL}saas-master/get-banner/${saasId1}`);
//       // const logoArray = Object.keys(response.data).map(key => ({ img: response.data[key] }));
//       // setImages(prevImages => [...prevImages, ...logoArray]);
//       setImages([{ img: `${BASE_URL}saas-master/get-banner/${saasId1}` }, { img: `${BASE_URL}saas-master/get-banne2/${saasId1}` }]);
//     } catch (error) {
//       console.error('Error fetching brand logos:', error);
//     }
//   }, [saasId1]);


//   useEffect(() => {
//     fetchBrandLogos();
//   }, [fetchBrandLogos])

//   console.log("images", images)
//   return (
//     <View style={styles.container}>

//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         decelerationRate="fast"
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
//           { useNativeDriver: false },
//         )}
//         scrollEventThrottle={16}
//       >
//         {
//           images?.map(x => (
//             <Pressable style={[styles.card, { backgroundColor: x }]} key={x.img} onPress={() => console.log("onPress", x)}>
//               <FastImage
//                 key={x.img}
//                 style={[{ width: '100%', height: '100%', borderRadius: 8 }]}
//                 source={{
//                   uri: x.img,
//                   // headers: { Authorization: 'someAuthToken' },
//                   priority: FastImage.priority.high,
//                 }}
//                 resizeMode={FastImage.resizeMode.cover}
//               />
//             </Pressable>
//           ))
//         }

//       </ScrollView>
//       <View style={styles.indicatorContainer} pointerEvents="none">
//         {images.map(x => (
//           <Indicator key={x.img} />
//         ))}
//         <Animated.View
//           style={[
//             styles.activeIndicator,
//             {
//               position: 'absolute',
//               transform: [{ translateX }, { scaleX }],
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// }

// function Indicator() {
//   return <View style={styles.indicator} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 / 6,
//     paddingVertical: 3,
//     borderRadius: 8
//   },
//   card: {
//     width: width - 10,
//     height: '100%',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   indicatorContainer: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//   },
//   indicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#00000044',
//     marginHorizontal: 5,
//   },
//   activeIndicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: 5,
//   },
// });


// import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '../config/Base_Url';
// import FastImage from 'react-native-fast-image';

// const Banner = () => {
//   const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);
//   const [images, setImages] = useState([{ img: `${BASE_URL}saas-master/get-banner/${saasId1}` }, { img: `${BASE_URL}saas-master/get-banne2/${saasId1}` }]);
//   // setImages([{ img: `${BASE_URL}saas-master/get-banner/${saasId1}` }, { img: `${BASE_URL}saas-master/get-banne2/${saasId1}` }]);

//   return (
//     <View>
//       <Text>Banner</Text>
//       {
//         images?.map(x => (
//           <Pressable style={[styles.card, { backgroundColor: x }]} key={x.img} onPress={() => console.log("onPress", x)}>
//             <FastImage
//               key={x.img}
//               style={[{ width: '100%', height: '100%', borderRadius: 8 }]}
//               source={{
//                 uri: x.img,
//                 // headers: { Authorization: 'someAuthToken' },
//                 priority: FastImage.priority.high,
//               }}
//               resizeMode={FastImage.resizeMode.cover}
//             />
//           </Pressable>
//         ))
//       }

//     </View>
//   )
// }

// export default Banner

// const styles = StyleSheet.create({})





// import React, { useRef, useEffect, useState } from 'react';
// import { Animated, Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native';
// import FastImage from 'react-native-fast-image';
// import { useSelector } from 'react-redux';
// import { BASE_URL } from '../config/Base_Url';

// const { width } = Dimensions.get('window');
// const data = ['brown', 'orange', 'red', 'blue', 'green'];

// export default function Banner() {
//   const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);
//   const [images, setImages] = useState([
//     { id: 1, img: `${BASE_URL}saas-master/get-banner/${saasId1}` },
//     { id: 2, img: `${BASE_URL}saas-master/get-banne2/${saasId1}` },
//     { id: 3, img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}` },
//   ]);

//   const scrollValue = useRef(new Animated.Value(0)).current;
//   const scrollViewRef = useRef(null);
//   const translateX = scrollValue.interpolate({
//     inputRange: [0, width],
//     outputRange: [0, 20],
//   });
//   const inputRange = [0];
//   const scaleOutputRange = [1];
//   data.forEach(
//     (_, i) =>
//       i != 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
//   );
//   data.forEach((_, i) => i != 0 && scaleOutputRange.push(...[0, 1]));
//   const scaleX = scrollValue.interpolate({
//     inputRange,
//     outputRange: scaleOutputRange,
//   });

//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       index = (index + 1) % data.length;
//       scrollViewRef.current.scrollTo({ x: index * width, animated: true });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         ref={scrollViewRef}
//         horizontal
//         pagingEnabled
//         decelerationRate="fast"
//         showsHorizontalScrollIndicator={false}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
//           { useNativeDriver: false },
//         )}
//         scrollEventThrottle={16}
//       >
//         {images.map(x => (
//           <Pressable style={[styles.card, { backgroundColor: x }]} key={x.id} onPress={() => console.log("onPress", x)}>
//             <FastImage
//               key={x.id}
//               style={[{ width: '100%', height: '100%', borderRadius: 8 }]}
//               source={{
//                 // uri: 'https://fastly.picsum.photos/id/1/400/400.jpg?hmac=lOytrN6lDOH_Yx7NwwGIaCtxp6pyuH2V4hD6Eac-VI0',
//                 uri: x.img,
//                 headers: { Authorization: 'someAuthToken' },
//                 priority: FastImage.priority.normal,
//               }}
//               resizeMode={FastImage.resizeMode.cover}
//             />
//           </Pressable>
//         ))}
//       </ScrollView>
//       <View style={styles.indicatorContainer} pointerEvents="none">
//         {images.map(x => (
//           <Indicator key={x.id} />
//         ))}
//         <Animated.View
//           style={[
//             styles.activeIndicator,
//             {
//               position: 'absolute',
//               transform: [{ translateX }, { scaleX }],
//             },
//           ]}
//         />
//       </View>
//     </View>
//   );
// }

// function Indicator() {
//   return <View style={styles.indicator} />;
// }

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1 / 6,
//     paddingVertical: 3,
//     borderRadius: 8
//   },
//   card: {
//     width: width - 10,
//     height: '100%',
//     marginHorizontal: 5,
//     borderRadius: 5,
//   },
//   indicatorContainer: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 20,
//     flexDirection: 'row',
//   },
//   indicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#00000044',
//     marginHorizontal: 5,
//   },
//   activeIndicator: {
//     height: 10,
//     width: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginHorizontal: 5,
//   },
// });









import React, { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../config/Base_Url';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const data = ['brown', 'orange', 'red', 'blue', 'green'];

export default function Banner(params) {
  const saasId1 = useSelector((state) => state?.authReducer?.user?.user_data?.saasId);
  const [bannerKey, setBannerKey] = useState(0);
  const [images, setImages] = useState([
    { id: 1, img: `${BASE_URL}saas-master/get-banner/${saasId1}` },
    { id: 2, img: `${BASE_URL}saas-master/get-banne2/${saasId1}` },
    { id: 3, img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}` },
  ]);
  const [forceRenderKey, setForceRenderKey] = useState(0); // State to force re-render

  const scrollValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const translateX = scrollValue.interpolate({
    inputRange: [0, width],
    outputRange: [0, 20],
  });
  const inputRange = [0];
  const scaleOutputRange = [1];
  data.forEach(
    (_, i) =>
      i !== 0 && inputRange.push(...[(width * (2 * i - 1)) / 2, width * i]),
  );
  data.forEach((_, i) => i !== 0 && scaleOutputRange.push(...[0, 1]));
  const scaleX = scrollValue.interpolate({
    inputRange,
    outputRange: scaleOutputRange,
  });

  // Update images when saasId1 changes
  useEffect(() => {
    setImages([
      { id: 1, img: `${BASE_URL}saas-master/get-banner/${saasId1}?key=$${new Date()}` },
      { id: 2, img: `${BASE_URL}saas-master/get-banne2/${saasId1}?key=$${new Date()}` },
      { id: 3, img: `${BASE_URL}saas-master/get-bannerLogo3/${saasId1}?key=$${new Date()}` },
    ]);
    setForceRenderKey((prev) => prev + 1); // Update key to force re-render
  }, [saasId1, bannerKey]);

  console.log("routes", params)
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % data.length;
      scrollViewRef.current.scrollTo({ x: index * width, animated: true });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Re-render Banner when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      // Trigger a re-render by changing the key of the Banner component
      setBannerKey((prevKey) => prevKey + 1);
    }, [])
  )

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
      >
        {images.map(x => (
          <Pressable
            style={[styles.card, { backgroundColor: x }]}
            key={`${x.id}-${forceRenderKey}`} // Update key to force re-render
            onPress={() => console.log("onPress", x)}
          >
            <Image
              // key={`${x.id}-${forceRenderKey}`} // Update key to force re-render
              key={bannerKey} // Update key to force re-render
              style={[{ width: '100%', height: '100%', borderRadius: 8 }]}
              source={{
                uri: x.img,
              }}
              resizeMode='cover'
            />
          </Pressable>
        ))}
      </ScrollView>
      <View style={styles.indicatorContainer} pointerEvents="none">
        {images.map(x => (
          <Indicator key={x.id} />
        ))}
        <Animated.View
          style={[
            styles.activeIndicator,
            {
              position: 'absolute',
              transform: [{ translateX }, { scaleX }],
            },
          ]}
        />
      </View>
    </View>
  );
}

function Indicator() {
  return <View style={styles.indicator} />;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 3,
    borderRadius: 8,
    height: 240,
  },
  card: {
    width: width - 10,
    height: '100%',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  indicatorContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#00000044',
    marginHorizontal: 5,
  },
  activeIndicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginHorizontal: 5,
  },
});
