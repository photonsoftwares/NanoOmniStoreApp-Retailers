// import React, { } from 'react';
import { StyleSheet, Dimensions, View, Button } from 'react-native';
import Pdf from 'react-native-pdf';
import Share from 'react-native-share';
import ButtonCompo from '../../../../../../Components/ButtonCompo';
import HeaderComp from '../../../../../../Components/HeaderCompo';
import { moderateScale } from '../../../../../../styles/responsiveSize';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL } from '../../../../../../config/Base_Url';
import RNPrint from 'react-native-print';



const GenrateInvoicePdf = ({ route }) => {
    const pdf_file_name = route?.params
    const navigation = useNavigation()
    const source = { uri: `${BASE_URL}transaction/pdf/${pdf_file_name}`, cache: true };

    // console.log("a",source.uri)

    const convertPdfToBase64 = async () => {
        try {
            const pdfUrl = `${BASE_URL}transaction/pdf/${pdf_file_name}`;
            const response = await fetch(pdfUrl);
            console.log('respgip', response);

            if (!response.ok) {
                throw new Error(`Failed to fetch PDF. Status: ${response.status}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const base64 =
                typeof btoa === 'function'
                    ? btoa(String.fromCharCode(...uint8Array))
                    : require('buffer').Buffer.from(uint8Array).toString('base64');

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
        } catch (error) {
            console.log('Error => ', error);
        }
    };

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
                    <ButtonCompo title="Print PDF" onPress={printFromURL} />
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
    },
});

export default GenrateInvoicePdf;



