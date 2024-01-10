// import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
// import React from 'react';
// import { useTheme } from '@react-navigation/native';
// import { moderateScale, scale, textScale, width } from '../styles/responsiveSize';

// const ButtonCompo = ({ title, onPress, style, bgColor, textStyle, disabled }) => {
//   const theme = useTheme().colors;

//   return (
//     <TouchableOpacity
//       style={[styles.TouchableOpacityStyle, style, {
//         backgroundColor: disabled ? '#CCCCCC' : theme.btnColor
        
//       }]}
//       onPress={onPress}
//     >
//       <Text
//         style={[styles.textStyle, textStyle]}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default ButtonCompo;

// const styles = StyleSheet.create({
//   TouchableOpacityStyle: {
//     width: width / 1.1,
//     alignItems: 'center',
//     alignSelf: "center",
//     justifyContent: 'center',
//     borderRadius: scale(10),
//     height: moderateScale(48),
//     paddingHorizontal: moderateScale(8),
//   }, textStyle: {
//     color: '#FFF',
//     fontSize: textScale(20),
//     fontWeight: 'bold'
//   }
// });



import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useTheme } from '@react-navigation/native';

const ButtonCompo = ({ title, onPress, style, bgColor, textStyle, disabled }) => {
  const colors = useTheme().colors;

  return (
    <View>
      <TouchableOpacity
        style={[{
          // backgroundColor: colors.YellowBtn,
          backgroundColor: disabled ? '#CCCCCC' : colors.YellowBtn,
          width: '90%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginLeft: 20,
          marginBottom: 14,
          height: 40,

        }, style]}
        activeOpacity={disabled && 1}
        onPress={disabled ? null : onPress} // Disable the button if disabled is true


      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[{
              color: '#1E1E1E',
              fontSize: 20,
              fontWeight: 'bold',
            }, textStyle]}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View >
  );
};

export default ButtonCompo;

const styles = StyleSheet.create({});


