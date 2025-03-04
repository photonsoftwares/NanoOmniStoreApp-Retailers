import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Button } from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import { useDispatch } from 'react-redux';
import ButtonCompo from '../../../../../../Components/ButtonCompo';
import HeaderComp from '../../../../../../Components/HeaderCompo';
import { moderateScale } from '../../../../../../styles/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../../../../config/Base_Url';
import RNPrint from 'react-native-print';


const GenratePdfBilling = ({ route }) => {
    const pdf_file_name = route?.params
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const source = { uri: `${BASE_URL}transaction/pdf/${pdf_file_name}`, cache: true };

    const convertPdfToBase64 = async () => {
        try {
            const pdfUrl = `${BASE_URL}transaction/pdf/${pdf_file_name}`;
            const response = await fetch(pdfUrl);
            console.log('respgpb', response);

            if (!response.ok) {
                throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            // Convert the Uint8Array to base64
            const base64 =
                typeof btoa === 'function'
                    ? btoa(String.fromCharCode(...uint8Array)) // For browsers
                    : require('buffer').Buffer.from(uint8Array).toString('base64'); // For Node.js

            // console.log(base64);
            return base64;
        } catch (error) {
            console.error('Error fetching or converting PDF:', error);
            return null;
        }
    };

    const myCustomShare = async (pdfBase64Data) => {
        const shareOptions = {
            message: 'Order your next meal from FoodFinder App. I\'ve already ordered more than 10 meals on it.',
            url: `data:application/pdf;base64,${pdfBase64Data}`,
        };

        try {
            const ShareResponse = await Share.open(shareOptions);
            // console.log(JSON.stringify(ShareResponse));
        } catch (error) {
            // console.log('Error => ', error);
        }
    };

    // Usage
    const customeShare = async () => {
        const base64Data = await convertPdfToBase64();
        myCustomShare(base64Data);
    }

    const printFromURL = async () => {
        try {
            await RNPrint.print({
                filePath: source.uri
            });
        } catch (error) {
            console.error('Print Error:', error);
        }
    };

    return (
        <>
            <HeaderComp
                screenName={'Order Reciept'}
                onBackPress={() => navigation.goBack()}
            />

            <View style={styles.container}>
                <Pdf
                    source={source}
                    trustAllCerts={false}
                    onLoadComplete={(numberOfPages, filePath) => {
                    }}
                    onPageChanged={(page, numberOfPages) => {
                    }}
                    onError={(error) => {
                    }}
                    onPressLink={(uri) => {
                    }}
                    style={styles.pdf}
                />
                <View style={{ width: '100%' }}>
                    <ButtonCompo title="Share PDF" onPress={customeShare} />
                    <ButtonCompo title="PDF Print" onPress={printFromURL} />
                    <ButtonCompo title="Go To Home" onPress={() => navigation.popToTop()} />
                </View>
            </View>
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginTop: moderateScale(2)
    },
    pdf: {
        flex: 1,
        backgroundColor: '#FFF',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginHorizontal: 8
    },
});

export default GenratePdfBilling;



