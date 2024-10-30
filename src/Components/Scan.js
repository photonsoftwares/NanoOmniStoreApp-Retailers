// import React, { useState, useEffect, useRef } from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import { useDispatch, useSelector } from 'react-redux';
// import { AddToCartMethod, GetCartMethod, GetQRItemMethod } from '../config/userApiMethods';
// import { useNavigation } from '@react-navigation/native';
// import Cart from '../Screens/AppScreens/Billing/Cart/Cart';

// const Scan = () => {
//   const [lastScan, setLastScan] = useState('');
//   const [torchOn, setTorchOn] = useState(false);
//   const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
//   const scannerRef = useRef(null);
//   const dispatch = useDispatch();
//   const navigation = useNavigation();

//   useEffect(() => {
//     const scanInterval = setInterval(() => {
//       if (scannerRef.current) {
//         scannerRef.current.reactivate();
//       }
//     }, 1000);

//     return () => {
//       clearInterval(scanInterval);
//     };
//   }, []);

//   const toggleTorch = () => {
//     setTorchOn(prevTorchOn => !prevTorchOn);
//   };

//   const onSuccess = async (e) => {
//     const { data } = e;
//     setLastScan(data);
//     await getItem(data);
//   };

//   const getItem = async (data) => {
//     try {
//       const resp = await dispatch(GetQRItemMethod(data));
//       if (resp?.status) {
//         await addToCart(resp?.data);
//       }
//     } catch (error) {
//       console.error('Error fetching item:', error);
//     }
//   };

//   const addToCart = async (item) => {
//     const cartData = {
//       item_id: item?.item_id,
//       actual_price: item?.actual_price,
//       item_name: item?.item_name,
//       category: item?.category,
//       message: 'This is an example cart item.',
//       itemCode: 'ITEM002',
//       sku: 'SKU123',
//       description: item?.item_name,
//       price: item?.price,
//       new_price: item?.price,
//       discount: item?.discount,
//       status: 'In Stock',
//       department: 'department',
//       saas_id: saasId,
//       store_id: storeId,
//       promoId: '',
//       item_quantity: '1',
//       hsnCode: item?.hsn_code,
//       taxRate: '',
//       taxCode: '',
//       taxPercent: '',
//     };

//     try {
//       const resp = await dispatch(AddToCartMethod(JSON.stringify(cartData)));
//       if (resp) {
//         await dispatch(GetCartMethod());
//         navigation.navigate(Cart);
//       }
//     } catch (error) {
//       console.error('Error adding item to cart:', error);
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <QRCodeScanner
//         ref={scannerRef}
//         onRead={onSuccess}
//         reactivate={false}
//         flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
//         topContent={
//           <Text style={styles.centerText}>
//             Go{' '}and
//             <Text style={styles.textBold}> Scan the item </Text>
//             QR code.
//           </Text>
//         }
//         bottomContent={
//           <View>
//             <TouchableOpacity style={styles.buttonTouchable} onPress={toggleTorch}>
//               <Text style={styles.buttonText}>
//                 {torchOn ? 'Turn Off Torch' : 'Turn On Torch'}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         }
//       />
//       <Text style={styles.scanResult}>
//         Last scan: {lastScan}
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16,
//     marginVertical: 10
//   },
//   scanResult: {
//     padding: 20,
//     fontSize: 18,
//     textAlign: 'center'
//   }
// });

// export default Scan;









/////////////////
import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCartMethod, GetCartMethod, GetQRItemMethod } from '../config/userApiMethods';
import { useNavigation } from '@react-navigation/native';
import Cart from '../Screens/AppScreens/Billing/Cart/Cart';
import { showToast } from '../utils/toast';
import { clearCategoryData } from '../ReduxToolkit/features/categoriesSlice';
import HeaderComp from './HeaderCompo';
import { showSuccess } from '../utils/helperFunctions';

const Scan = () => {
  const [lastScan, setLastScan] = useState('');
  const [torchOn, setTorchOn] = useState(false);
  const { userId, storeId, saasId } = useSelector((state) => state?.authReducer?.user?.user_data);
  const scannerRef = useRef(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const scanInterval = setInterval(() => {
      if (scannerRef.current) {
        scannerRef.current.reactivate();
      }
    }, 1000);

    return () => {
      clearInterval(scanInterval);
    };
  }, []);

  const toggleTorch = () => {
    setTorchOn(prevTorchOn => !prevTorchOn);
  };

  const onSuccess = async (e) => {
    const { data } = e;
    console.log("OnSuccess",data)
    setLastScan(data);
    await getItem(data);
  };

  const getItem = async (data) => {
    try {
      const resp = await dispatch(GetQRItemMethod(data));
      if (resp?.status) {
        await addToCart(resp?.data);
      }
    } catch (error) {
      console.error('Error fetching item:', error);
    }
  };

  const addToCart = async (item) => {
    const cartData = {
      item_id: item?.item_id,
      actual_price: item?.actual_price,
      item_name: item?.item_name,
      category: item?.category,
      message: 'This is an example cart item.',
      itemCode: 'ITEM002',
      sku: 'SKU123',
      description: item?.item_name,
      price: item?.price,
      new_price: item?.price,
      discount: item?.discount,
      status: 'In Stock',
      department: 'department',
      saas_id: saasId,
      store_id: storeId,
      promoId: '',
      item_quantity: '1',
      hsnCode: item?.hsn_code,
      taxRate: '',
      taxCode: '',
      taxPercent: '',
    };

    try {
      const resp = await dispatch(AddToCartMethod(JSON.stringify(cartData)));
      if (resp) {
        await dispatch(GetCartMethod());
        // navigation.navigate(Cart);
        // showToast("item added to cart")
        showSuccess("item added to cart")
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
       <HeaderComp
        screenName={'Scan'}
        onBackPress={() => navigation.goBack()}
        cartTrue
        onPressCart={() => navigation.navigate(Cart)}
        // showScan={true}
        // onPressScan={() => navigation.navigate(Scan)}
      />
      <QRCodeScanner
        ref={scannerRef}
        onRead={onSuccess}
        reactivate={false}
        flashMode={torchOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Go{' '}and
            <Text style={styles.textBold}> Scan the item </Text>
            QR code.
          </Text>
        }
        bottomContent={
          <View>
            <TouchableOpacity style={styles.buttonTouchable} onPress={toggleTorch}>
              <Text style={styles.buttonText}>
                {torchOn ? 'Turn Off Torch' : 'Turn On Torch'}
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
      <Text style={styles.scanResult}>
        Last scan: {lastScan}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    marginTop:10
  },
  buttonTouchable: {
    padding: 16,
    marginVertical: 10,
    marginTop:20

  },
  scanResult: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default Scan;
