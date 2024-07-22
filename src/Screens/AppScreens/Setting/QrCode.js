// import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { launchImageLibrary } from 'react-native-image-picker';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { moderateScale } from '../../../styles/responsiveSize';
// import ButtonCompo from '../../../Components/ButtonCompo';
// import { showToast } from '../../../utils/toast';
// import axios from 'axios';
// import { BASE_URL } from '../../../config/Base_Url';
// import { useSelector } from 'react-redux';
// import HeaderComp from '../../../Components/HeaderCompo';
// import { useNavigation } from '@react-navigation/native';



// const QrCode = () => {
//     const { userId, storeId, saasId, } = useSelector((state) => state?.authReducer?.user?.user_data)
//     const navigation = useNavigation()
//     const [selectedImage, setSelectedImage] = useState(null);
//     const getImg=`${BASE_URL}store-master/get-QR/${storeId}?key=${new Date()}`




//     const pickImage = async () => {
//         setSelectedImage(null)
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 includeBase64: false,

//             });

//             if (result.didCancel) {
//                 Alert.alert('Cancelled', 'Image selection was cancelled.');
//             } else if (result.error) {
//                 Alert.alert('Error', 'Error picking image: ' + result.error);
//             } else {
//                 setSelectedImage(result);
//                 console.log("result", result)
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//         }
//     };

//     const handleUploadQrCode = async () => {
//         if (!selectedImage) {
//             showToast('Please select an image first.')
//             return;
//         }

//         const imageData = selectedImage.assets[0];
//         const formData = new FormData();
//         formData.append('file', {
//             uri: imageData.uri,
//             type: imageData.type,
//             name: imageData.fileName,
//         });

//         try {
//             const response = await axios.post(
//                 `${BASE_URL}store-master/save-image/${storeId}`,
//                 formData,
//                 {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 }
//             );

//             showToast('Image uploaded successfully.')
//             console.log(response.data);
//         } catch (error) {
//             showToast(`${error.message}`)
//             console.error('Error uploading image:', error);
//         }
//     };

//     return (
//         <View>
//              <HeaderComp
//           screenName='QR Code'
//           onBackPress={() => navigation.goBack()}

//         />
//             <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: moderateScale(16), paddingBottom: moderateScale(32), }}>

//             <View style={{ height: moderateScale(120), width: moderateScale(120), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>
//                 <View style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
//                     {selectedImage ?
//                         (
//                             <TouchableOpacity style={{}} activeOpacity={0.8} onPress={() => pickImage()}>

//                                 <Image source={{ uri: selectedImage.assets[0].uri }} style={{ width: '100%', height: '100%', borderRadius: 10 }}
//                                     resizeMode='cover'
//                                 />
//                             </TouchableOpacity>
//                         )
//                         :
//                         <TouchableOpacity style={{ flex: 1, alignSelf: 'center' }} activeOpacity={0.8} onPress={() => pickImage()}>

//                             <MaterialCommunityIcons name="account" size={123} color={'#ECE447'} />

//                         </TouchableOpacity>
//                     }
//                 </View>
//                 </View>
//                 {
//                     selectedImage==null?
//                     <Text style={{color:'grey',padding:8}}>please select qr code!</Text>
//                     :
//                     null
//                 }
//             </View>
//             <ButtonCompo onPress={()=>handleUploadQrCode()} title={'Upload Qr Code'}/>
//            {
//             getImg&&
//              <View style={{alignItems:'center',marginTop:40,height:'100%',}}>
//              <Text style={styles.qrcode}>Your QR Code</Text>

//          <View style={{ height: moderateScale(400), width: moderateScale(350), justifyContent: 'center', borderRadius: 8, elevation: 8, backgroundColor: "#fff", }}>

//              <Image source={{ uri: getImg }} style={{ width: '100%', height: '100%', borderRadius: 10 }}

//                  resizeMode='cover'
//                  />
//                  </View>
//                  </View>
//            }
//         </View>
//     )
// }

// export default QrCode

// const styles = StyleSheet.create({
//     qrcode:{
//         color:'grey',
//         padding:8,
//         fontWeight:'bold',
//         fontSize:18,
//         color:'#000'
//     }
// })



//////////////
import React, { useState, useCallback, useMemo } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale } from '../../../styles/responsiveSize';
import ButtonCompo from '../../../Components/ButtonCompo';
import { showToast } from '../../../utils/toast';
import axios from 'axios';
import { BASE_URL } from '../../../config/Base_Url';
import { useSelector } from 'react-redux';
import HeaderComp from '../../../Components/HeaderCompo';
import { useNavigation } from '@react-navigation/native';

const QrCode = () => {
    const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const getImg = useMemo(() => `${BASE_URL}store-master/get-QR/${storeId}?key=${new Date()}`, [storeId]);

    const pickImage = useCallback(async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                includeBase64: false,
            });

            if (result.didCancel) {
                Alert.alert('Cancelled', 'Image selection was cancelled.');
            } else if (result.error) {
                Alert.alert('Error', 'Error picking image: ' + result.error);
            } else {
                setSelectedImage(result);
                console.log("result", result);
            }
        } catch (error) {
            console.error('Error picking image:', error);
        }
    }, []);

    const handleUploadQrCode = useCallback(async () => {
        if (!selectedImage) {
            showToast('Please select an image first.');
            return;
        }

        const imageData = selectedImage.assets[0];
        const formData = new FormData();
        formData.append('file', {
            uri: imageData.uri,
            type: imageData.type,
            name: imageData.fileName,
        });

        try {
            const response = await axios.post(
                `${BASE_URL}store-master/save-image/${storeId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            showToast('Image uploaded successfully.');
            navigation.goBack()
            console.log(response.data);
        } catch (error) {
            showToast(error.message);
            console.error('Error uploading image:', error);
        }
    }, [selectedImage, storeId]);

    return (
        <View style={styles.container}>
            <HeaderComp
                screenName="QR Code"
                onBackPress={() => navigation.goBack()}
            />
            <View style={styles.imageContainer}>
                <TouchableOpacity activeOpacity={1} onPress={pickImage}>
                    <View style={styles.imageWrapper}>
                        {selectedImage ? (
                            <Image
                                source={{ uri: selectedImage.assets[0].uri }}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        ) : (
                            <MaterialCommunityIcons name="account" size={moderateScale(100)} color="#ECE447" />
                        )}
                    </View>
                </TouchableOpacity>
                {!selectedImage && <Text style={styles.selectPrompt}>Please select QR code!</Text>}
            </View>
            <ButtonCompo onPress={handleUploadQrCode} title="Upload QR Code" />
            {getImg && (
                <View style={styles.qrCodeContainer}>
                    <Text style={styles.qrCodeText}>Your QR Code</Text>
                    <View style={styles.qrCodeImageWrapper}>
                        <Image source={{ uri: getImg }} style={styles.qrCodeImage} resizeMode="cover" />
                    </View>
                </View>
            )}
        </View>
    );
};

export default QrCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateScale(16),
        paddingBottom: moderateScale(32),
    },
    imageWrapper: {
        height: moderateScale(120),
        width: moderateScale(120),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        elevation: 8,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    selectPrompt: {
        color: 'grey',
        padding: 8,
    },
    qrCodeContainer: {
        alignItems: 'center',
        marginTop: 40,
        height: '100%',
    },
    qrCodeText: {
        color: '#000',
        padding: 8,
        fontWeight: 'bold',
        fontSize: 18,
    },
    qrCodeImageWrapper: {
        height: moderateScale(400),
        width: moderateScale(350),
        justifyContent: 'center',
        borderRadius: 8,
        elevation: 8,
        backgroundColor: '#fff',
    },
    qrCodeImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
});

