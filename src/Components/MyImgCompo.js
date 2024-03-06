// import React, { useState } from 'react';
// import { View, Text, ActivityIndicator } from 'react-native';
// import FastImage from 'react-native-fast-image';

// const MyImgCompo = ({ imageUri, ImgCompoStyle, resizeMode, otherComponents }) => {
//   const [imgLoading, setImgLoading] = useState(true);
//   const [imgError, setImgError] = useState(false);

//   return (
//     <View>
//       <FastImage
//         style={[ImgCompoStyle, {}]}
//         source={{
//           uri: imageUri,
//           priority: FastImage.priority.low,
//         }}
//         resizeMode={resizeMode || FastImage.resizeMode.contain} // Set default resizeMode if not provided
//         onLoadStart={() => {
//           setImgLoading(true);
//           setImgError(false);
//         }}
//         onLoad={() => setImgLoading(false)}
//         onError={() => setImgError(true)} // Handle image loading error
//       />

//       {imgLoading && (
//         <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
//           <ActivityIndicator size="large" color="#ECE447" />
//         </View>
//       )}

//       {imgError && (
//         <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ textAlign: 'center' }}>Error loading image</Text>
//         </View>
//       )}

//       {otherComponents && otherComponents}
//     </View>
//   );
// };

// export default MyImgCompo;









import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePath from '../constants/ImagePath';

const MyImgCompo = ({ imageUri, ImgCompoStyle, resizeMode, otherComponents }) => {
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  return (
    <View>
      <FastImage
        style={[ImgCompoStyle, {}]}
        source={{
          uri: imageUri,
          priority: FastImage.priority.low,
        }}
        resizeMode={resizeMode || FastImage.resizeMode.contain} // Set default resizeMode if not provided
        onLoadStart={() => {
          setImgLoading(true);
          setImgError(false);
        }}
        onLoad={() => setImgLoading(false)}
        onError={() => setImgError(true)} // Handle image loading error
      />

      {imgLoading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ECE447" />
        </View>
      )}

      {imgError && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          {/* <Text style={{ textAlign: 'center' }}>Error loading image</Text> */}
          <FastImage
            style={[ImgCompoStyle, {}]}
            source={ImagePath.NoImage}
            // resizeMode={resizeMode || FastImage.resizeMode.contain} // Set default resizeMode if not provided
            // onLoadStart={() => {
            //   setImgLoading(true);
            //   setImgError(false);
            // }}
            // onLoad={() => setImgLoading(false)}
            // onError={() => setImgError(true)} // Handle image loading error
          />
        </View>
      )}

      {otherComponents && otherComponents}
    </View>
  );
};

export default MyImgCompo;
