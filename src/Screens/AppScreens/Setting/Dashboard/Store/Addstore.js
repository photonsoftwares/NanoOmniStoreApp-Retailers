import { Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import HeaderComp from '../../../../../Components/HeaderCompo'
import TextInputCompo from '../../../../../Components/TextInputCompo'
import { moderateScale, scale, textScale } from '../../../../../styles/responsiveSize'
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const Addstore = ({ navigation }) => {
    const [selectedFile1, setSelectedFile1] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [selectedFile3, setSelectedFile3] = useState(null);
    console.log("image", selectedFile1, selectedFile2, selectedFile3)
    const openImagePicker = (index) => {
        const options = {
            mediaType: 'photo',
            quality: 0.5,
        };

        launchImageLibrary(options, (response) => {
            if (response && !response.didCancel) {
                if (index === 0) {
                    setSelectedFile1(response);
                } else if (index === 1) {
                    setSelectedFile2(response);
                } else if (index === 2) {
                    setSelectedFile3(response);
                }
            } else {
                // Handle image selection cancellation
                console.log('Image selection canceled');
            }
        });
    };

    const uploadImage = async () => {
        try {
            const formData = new FormData();
            if (selectedFile1) {
                const file1 = {
                    uri: selectedFile1.assets[0].uri,
                    type: selectedFile1.assets[0].type,
                    name: selectedFile1.assets[0].fileName
                };
                formData.append('file1', selectedFile1?.assets[0]);
            }
            if (selectedFile2) {
                // console.log("selectedFile2.assets[0].fileName",selectedFile2.assets[0].uri)
                const file2 = {
                    uri: selectedFile2.assets[0].uri,
                    type: selectedFile2.assets[0].type,
                    name: selectedFile2.assets[0].fileName
                };
                formData.append('file2', selectedFile2?.assets[0]);
            }
            if (selectedFile3) {
                const file3 = {
                    uri: selectedFile3.assets[0].uri,
                    type: selectedFile3.assets[0].type,
                    name: selectedFile3.assets[0].fileName
                };
                formData.append('file3', selectedFile3?.assets[0]);
            }
            console.log("khumeshgautam", formData)
            const response = await axios.post(
                'http://103.139.59.233:8089/prod/api/v1/saas-master/save-brandlogo/24',
                formData,
                console.log("khum",formData?._parts[0]),
                {
                    headers: {

                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            console.log("responsedata", response)
            // Check if the response status is 200
            if (response.status === 200) {
                navigation.navigate("Home");
                console.log('Image upload response:', response.data);
            } else {
                throw new Error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error?.message);
        }
    };




    return (
        <View>
            <HeaderComp
                screenName={'Add Store'}
                onBackPress={() => navigation.goBack()} />
            <StatusBar backgroundColor="#851684" barStyle="light-content" />
            <ScrollView style={{ marginBottom: scale(100) }}>
                {[selectedFile1, selectedFile2, selectedFile3].map((file, index) => (
                    <View key={index} style={styles.boxContainer}>
                        {file?.assets?.[0]?.uri ? (
                            <Image source={{ uri: file?.assets?.[0]?.uri }} style={{ marginLeft: scale(60), width: 200, height: 200 }} />
                        ) : (
                            <TouchableOpacity style={styles.button1} onPress={() => openImagePicker(index)}>
                                <Text style={styles.buttonText}>Upload Logo</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity style={styles.button2} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default Addstore

const styles = StyleSheet.create({
    boxContainer: {
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        height: scale(200),
        marginRight: scale(30),
        marginLeft: scale(30),
        marginTop: scale(50)
    },
    button1: {
        backgroundColor: '#851684',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(10),
        width: scale(200),
        height: moderateScale(40),
        marginTop: moderateScale(50),
        marginLeft: scale(50)
    },
    button2: {
        backgroundColor: '#851684',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: scale(10),
        width: scale(300),
        height: moderateScale(40),
        marginTop: moderateScale(50),
        marginLeft: scale(40)
    },
    buttonText: {
        fontSize: textScale(18),
        fontWeight: 'bold',
        color: 'black',
    },
});