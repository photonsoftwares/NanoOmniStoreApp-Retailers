// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import ImagePath from '../constants/ImagePath';
// import { moderateScale, textScale } from '../styles/responsiveSize';

// const HeaderComp = ({ screenName, onBackPress, onPressLeft, onPressLefttrue, onPressLeftImage }) => {

//     // console.log(onPressLefttrue)
//     return (
//         <View style={styles.container}>
//             <View style={{ flexDirection: 'row' }}>
//                 <TouchableOpacity onPress={onBackPress}>
//                     <Icon name="arrow-left" size={24} color="black" />
//                 </TouchableOpacity>
//                 <Text style={styles.screenName}>{screenName}</Text>
//             </View>

//             {/* {onPressLeft == undefined ?
//                 null

//                 :
//                 <TouchableOpacity onPress={() => onPressLeft} style={[{ height: moderateScale(30), width: moderateScale(30), alignSelf: 'center' }]}>
//                     <Image
//                         source={imagePath.AddPackgeService}
//                         style={{ height: '100%', width: '100%' }}
//                         resizeMode='center'
//                     />
//                 </TouchableOpacity>
//             } */}
//             {onPressLefttrue &&
//                 <TouchableOpacity onPress={() => onPressLeft()} style={[{ height: moderateScale(30), width: moderateScale(30), alignSelf: 'center', }]}>
//                     <Image
//                         source={onPressLeftImage}
//                         style={{ height: '100%', width: '100%' }}
//                         resizeMode='center'
//                     />
//                 </TouchableOpacity>
//             }




//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         padding: moderateScale(10),
//         // borderBottomWidth: 1,
//         elevation: 4,
//         // borderBottomColor: 'lightgray',
//         justifyContent: 'space-between'
//     },
//     screenName: {
//         fontSize: textScale(18),
//         fontWeight: 'bold',
//         marginLeft: moderateScale(10),
//     },
// });

// export default HeaderComp;






import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { moderateScale, textScale } from '../styles/responsiveSize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Scan from './Scan';
import WalletSearch from '../Screens/AppScreens/Setting/Wallet/WalletSearch';


const HeaderComp = ({ screenName, onBackPress, onPressLeft, onPressLefttrue, onPressLeftImage, onPressCart, cartTrue = false, showCustomer = false, showInventory = false, showScan = false, onPressScan, showWalletSearch = false }) => {
    const { cartItems } = useSelector((state) => state?.cartReducer);
    const { customerListData } = useSelector(state => state?.customerListReducer);
    const { recommendedData, recommendedCurrentPage } = useSelector((state) => state?.recommendedReducer)
    const navigation = useNavigation()


    // console.log(onPressLefttrue)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onBackPress}>
                    <Icon name="arrow-left" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.screenName}>{screenName}</Text>
            </View>


            {onPressLefttrue &&
                <View style={{ flexDirection: 'row',gap:16 }}>
                    {showWalletSearch &&
                        <TouchableOpacity onPress={() => navigation.navigate(WalletSearch)}>
                            <MaterialCommunityIcons name="magnify" size={30} color={'#000'} />
                        </TouchableOpacity>
                    }
                    <TouchableOpacity onPress={() => onPressLeft()} style={[{ height: moderateScale(30), width: moderateScale(30), alignSelf: 'center', }]}>
                        <Image
                            source={onPressLeftImage}
                            style={{ height: '100%', width: '100%' }}
                            resizeMode='center'
                        />
                    </TouchableOpacity>
                </View>
            }


            {/* Badge With Icon */}
            {cartTrue &&
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    {showScan &&
                        <TouchableOpacity onPress={() => navigation.navigate(Scan)}>
                            <MaterialCommunityIcons name="qrcode-scan" size={30} color={'#000'} />
                        </TouchableOpacity>
                    }

                    <TouchableOpacity onPress={onPressCart}>
                        <View style={{ marginRight: 10 }}>
                            <MaterialCommunityIcons name="cart" size={30} color={'#000'} />
                            {cartItems?.length > 0 && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        backgroundColor: 'red',
                                        borderRadius: 10,
                                        width: 20,
                                        height: 20,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Text style={{ color: '#FFF', fontSize: 12 }}>{cartItems?.length}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>

                </View>
            }
            {showCustomer &&
                <TouchableOpacity onPress={onPressCart}>
                    <View style={{ marginRight: 10, }}>
                        <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center', fontWeight: '800' }}>{customerListData?.length}</Text>
                    </View>
                </TouchableOpacity>
            }
            {showInventory &&
                <TouchableOpacity onPress={onPressCart}>
                    <View style={{ marginRight: 10, }}>
                        <Text style={{ color: '#000', fontSize: 18, alignSelf: 'center', fontWeight: '800' }}>{recommendedData?.length}</Text>
                    </View>
                </TouchableOpacity>
            }






        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: moderateScale(10),
        elevation: 4,
        justifyContent: 'space-between'
    },
    screenName: {
        fontSize: textScale(18),
        fontWeight: 'bold',
        marginLeft: moderateScale(10),
        color: '#000'
    },
});

export default HeaderComp;
